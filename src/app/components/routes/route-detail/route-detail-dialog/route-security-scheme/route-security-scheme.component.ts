import { Component, Input, OnInit } from '@angular/core';
import { IRamlSecurityScheme } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-route-security-scheme',
  templateUrl: './route-security-scheme.component.html',
  styleUrls: ['./route-security-scheme.component.scss']
})
export class RouteSecuritySchemeComponent implements OnInit {
  @Input()
  scheme: IRamlSecurityScheme;

  constructor() {}

  ngOnInit() {}
}
