import { Component, Input, OnInit } from '@angular/core';
import { IRamlMethod } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-route-request',
  templateUrl: './route-request.component.html',
  styleUrls: ['./route-request.component.scss']
})
export class RouteRequestComponent implements OnInit {
  @Input()
  method: IRamlMethod;

  constructor() {}

  ngOnInit() {}
}
