import { Component, Input, OnInit } from '@angular/core';
import { IRamlItem } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-parameters-body',
  templateUrl: './parameters-body.component.html',
  styleUrls: ['./parameters-body.component.scss']
})
export class ParametersBodyComponent implements OnInit {
  @Input()
  body: IRamlItem[];

  currentItem: IRamlItem;

  constructor() {}

  ngOnInit() {
    this.currentItem = this.body[0];
  }
}
