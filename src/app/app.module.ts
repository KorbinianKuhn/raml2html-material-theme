import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import { HighlightModule } from 'ngx-highlightjs';
import { AppComponent } from './app.component';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';
import { ExampleComponent } from './components/example/example.component';
import { GeneralComponent } from './components/general/general.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item-list/item/item.component';
import { LetterIconComponent } from './components/letter-icon/letter-icon.component';
import { ParametersBodyComponent } from './components/parameters/parameters-body/parameters-body.component';
import { ParametersDefaultComponent } from './components/parameters/parameters-default/parameters-default.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ResponseComponent } from './components/response-list/response/response.component';
import { RouteDetailDialogComponent } from './components/routes/route-detail/route-detail-dialog/route-detail-dialog.component';
import { RouteRequestComponent } from './components/routes/route-detail/route-detail-dialog/route-request/route-request.component';
import { RouteResponseComponent } from './components/routes/route-detail/route-detail-dialog/route-response/route-response.component';
import { RouteSecuritySchemeComponent } from './components/routes/route-detail/route-detail-dialog/route-security-scheme/route-security-scheme.component';
import { RouteDetailComponent } from './components/routes/route-detail/route-detail.component';
import { RoutesComponent } from './components/routes/routes.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { RamlService } from './services/raml.service';
import { SearchService } from './services/search.service';

export function hljsLanguages() {
  return [{ name: 'json', func: json }, { name: 'xml', func: xml }];
}

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    RoutesComponent,
    RouteDetailComponent,
    RouteDetailDialogComponent,
    ItemComponent,
    ItemListComponent,
    CopyToClipboardComponent,
    SnackbarComponent,
    RouteSecuritySchemeComponent,
    LetterIconComponent,
    ResponseListComponent,
    ResponseComponent,
    RouteRequestComponent,
    RouteResponseComponent,
    ExampleComponent,
    ParametersComponent,
    ParametersBodyComponent,
    ParametersDefaultComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [RamlService, SearchService],
  bootstrap: [AppComponent],
  entryComponents: [RouteDetailDialogComponent, SnackbarComponent]
})
export class AppModule {}
