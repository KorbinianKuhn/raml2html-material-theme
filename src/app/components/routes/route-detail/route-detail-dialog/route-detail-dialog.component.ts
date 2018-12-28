import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  IRamlMethod,
  IRamlResource,
  IRamlSecurityScheme
} from 'src/app/interfaces/raml.interface';
import { RamlService } from 'src/app/services/raml.service';

interface IDialogData {
  resourceId: string;
  method: string;
}

@Component({
  selector: 'app-route-detail-dialog',
  templateUrl: './route-detail-dialog.component.html',
  styleUrls: ['./route-detail-dialog.component.scss']
})
export class RouteDetailDialogComponent implements OnInit {
  public resource: IRamlResource;
  public method: IRamlMethod;
  public showRequest: boolean;
  public showResponse: boolean;
  public showSecurity: boolean;
  public showTabs: boolean;
  public securitySchemes: IRamlSecurityScheme[] = [];

  constructor(
    private dialogRef: MatDialogRef<RouteDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDialogData,
    private ramlService: RamlService
  ) {
    this.resource = this.ramlService.getResourceById(data.resourceId);
    this.method = this.ramlService.getMethodByResource(
      this.resource,
      data.method
    );
    this.showRequest =
      this.method.allUriParameters.length !== 0 ||
      this.method.queryParameters !== undefined ||
      this.method.headers !== undefined ||
      this.method.body !== undefined;
    this.showResponse = !!this.method.responses;
    this.showSecurity = !!this.method.securedBy;
    this.showTabs = this.showRequest || this.showResponse || this.showSecurity;
    if (this.method.securedBy) {
      this.securitySchemes = this.method.securedBy.map(o =>
        this.ramlService.getSecuritySchemeByName(o.schemeName)
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
