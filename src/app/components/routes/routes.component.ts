import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { IRamlResource } from '../../interfaces/raml.interface';
import { RamlService } from '../../services/raml.service';
import { RouteDetailDialogComponent } from './route-detail/route-detail-dialog/route-detail-dialog.component';
import { StorageService } from 'src/app/services/storage.service';

interface IGroupedResources {
  title: string;
  resources: IRamlResource[];
}

type View = 'compact' | 'detail';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {
  public groupedResources: IGroupedResources[];

  private resources: IRamlResource[];
  private subscription: Subscription;

  public view: View;

  constructor(
    private dialog: MatDialog,
    private ramlService: RamlService,
    private searchService: SearchService,
    private storageService: StorageService
  ) {
    this.resources = this.ramlService.getResources();
    this.groupedResources = this.updateGroupedResources('');
    this.view = this.storageService.getFromLocalStorage('view', 'compact');
  }

  ngOnInit() {
    this.subscription = this.searchService.changed.subscribe(value => {
      this.groupedResources = this.updateGroupedResources(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private filterResources(value: string): IRamlResource[] {
    if (value === '') {
      return this.resources;
    }

    const regex = new RegExp(value, 'i');
    const filteredResources = [];
    for (const resource of this.resources) {
      const methods = resource.methods.filter(method =>
        method.themeSearchString.match(regex)
      );
      if (methods.length > 0) {
        const filteredResource = JSON.parse(JSON.stringify(resource));
        filteredResource.methods = methods;
        filteredResources.push(filteredResource);
      }
    }
    return filteredResources;
  }

  private updateGroupedResources(searchValue: string): IGroupedResources[] {
    const resources = this.filterResources(searchValue);
    const groupedResources: IGroupedResources[] = [];
    let lastGroup: IGroupedResources;
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      if (
        i === 0 ||
        resources[i].themeFirstUriSegment !==
          resources[i - 1].themeFirstUriSegment
      ) {
        lastGroup = { title: resource.themeFirstUriSegment, resources: [] };
        groupedResources.push(lastGroup);
      }

      lastGroup.resources.push(resource);
    }
    return groupedResources;
  }

  openDialog(resourceId: string, method: string): void {
    const dialogRef = this.dialog.open(RouteDetailDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: {
        resourceId,
        method
      }
    });
  }

  onViewChange(view: View) {
    this.view = view;
    this.storageService.storeInLocalStorage('view', view);
  }
}
