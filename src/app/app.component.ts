import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AlertService } from './services/alert.service';
import { RamlService } from './services/raml.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public view: string = 'general';

  constructor(
    private ramlService: RamlService,
    private alertService: AlertService,
    private snackbar: MatSnackBar,
    private searchService: SearchService
  ) {
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
}
