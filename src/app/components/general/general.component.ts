import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IRamlItem } from 'src/app/interfaces/raml.interface';
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
  public securedBy: Array<{
    schemeName: string;
  }>;

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
    this.securedBy = data.securedBy;
  }

  ngOnInit() {}
}
