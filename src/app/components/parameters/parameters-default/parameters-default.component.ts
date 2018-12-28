import { Component, Input, OnInit } from '@angular/core';
import { IRamlItem } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-parameters-default',
  templateUrl: './parameters-default.component.html',
  styleUrls: ['./parameters-default.component.scss']
})
export class ParametersDefaultComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  items: IRamlItem[];

  constructor() {}

  ngOnInit() {}
}
