import { Component, Input, OnInit } from '@angular/core';
import { IRamlResponse } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {
  @Input()
  responses: IRamlResponse[];

  settings: any[] = [];

  constructor() {}

  ngOnInit() {
    this.responses.map(response => {
      this.settings.push({
        expandable:
          response.headers !== undefined || response.body !== undefined
      });
    });
  }
}
