import { Component, Input, OnInit } from '@angular/core';
import { IRamlResponse } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-route-response',
  templateUrl: './route-response.component.html',
  styleUrls: ['./route-response.component.scss']
})
export class RouteResponseComponent implements OnInit {
  @Input()
  responses: IRamlResponse[];

  constructor() {}

  ngOnInit() {}
}
