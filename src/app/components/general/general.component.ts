import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  IRamlItem,
  IRamlSecurityScheme
} from 'src/app/interfaces/raml.interface';
import { RamlService } from './../../services/raml.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public chapters: any[];
  public title: string;
  public version: string;
  public baseUri: string;
  public baseUriParameters: IRamlItem[];
  public protocols: string[];
  public mediaType: string[];
  public securitySchemes: IRamlSecurityScheme[];

  public styledBaseUri: SafeHtml;
  public exampleBaseUri: string;

  constructor(
    private ramlService: RamlService,
    private domSanitizer: DomSanitizer
  ) {
    this.chapters = this.ramlService.getDocumentation().map(o => {
      return {
        title: o.title,
        content: this.domSanitizer.bypassSecurityTrustHtml(o.content)
      };
    });
    const data = this.ramlService.getData();
    this.title = data.title;
    this.version = data.version;
    this.baseUri = data.baseUri;
    this.baseUriParameters = data.baseUriParameters;
    this.protocols = data.protocols;
    this.mediaType = data.mediaType;

    let styledBaseUri = this.baseUri;
    let exampleBaseUri = this.baseUri;
    this.baseUri.match(/{(.*?)}/g).map(o => {
      styledBaseUri = styledBaseUri.replace(
        o,
        `<span class="bold">${o}</span>`
      );
      const name = o.replace(/[{}]/g, '');
      const param = this.baseUriParameters.find(i => i.name === name);
      if (param && param.examples) {
        exampleBaseUri = exampleBaseUri.replace(o, param.examples[0].value);
      }
    });
    this.styledBaseUri = this.domSanitizer.bypassSecurityTrustHtml(
      styledBaseUri
    );
    this.exampleBaseUri = exampleBaseUri;
    this.securitySchemes = data.securedBy.map(o =>
      this.ramlService.getSecuritySchemeByName(o.schemeName)
    );
  }

  ngOnInit() {}
}
