import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AlertService } from './services/alert.service';
import { RamlService } from './services/raml.service';
import { SearchService } from './services/search.service';
import { StorageService } from './services/storage.service';

type Route = 'routes' | 'general';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public route: Route;

  constructor(
    private ramlService: RamlService,
    private alertService: AlertService,
    private snackbar: MatSnackBar,
    private searchService: SearchService,
    private storageService: StorageService
  ) {
    this.route = this.storageService.getFromLocalStorage('route', 'routes');
    this.title = this.ramlService.getData().title;
    this.alertService.alert.subscribe(alert => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: 2000,
        data: {
          alert
        }
      });
    });
  }

  onSearchInputChange(value: any) {
    this.searchService.setValue(value);
  }

  onRouteChange(route: Route) {
    this.route = route;
    this.storageService.storeInLocalStorage('route', route);
  }
}
