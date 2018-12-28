import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { IRamlResource } from '../../interfaces/raml.interface';
import { RamlService } from '../../services/raml.service';
import { RouteDetailDialogComponent } from './route-detail/route-detail-dialog/route-detail-dialog.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {
  public filteredResources: IRamlResource[];

  private resources: IRamlResource[];
  private subscription: Subscription;

  public view: 'compact' | 'detail' = 'compact';

  constructor(
    private dialog: MatDialog,
    private ramlService: RamlService,
    private searchService: SearchService
  ) {
    this.resources = this.ramlService.getResources();
    this.filteredResources = this.filterResources('');
  }

  ngOnInit() {
    this.subscription = this.searchService.changed.subscribe(value => {
      this.filteredResources = this.filterResources(value);
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
        method.searchString.match(regex)
      );
      if (methods.length > 0) {
        const filteredResource = JSON.parse(JSON.stringify(resource));
        filteredResource.methods = methods;
        filteredResources.push(filteredResource);
      }
    }
    return filteredResources;
  }

  openDialog(resourceId: string, method: string): void {
    const dialogRef = this.dialog.open(RouteDetailDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: {
        resourceId,
        method
      },
      panelClass: 'dialog-with-grey-background'
    });
  }
}
