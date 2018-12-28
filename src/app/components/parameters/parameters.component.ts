import { Component, Input, OnInit } from '@angular/core';
import { IRamlItem } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
  @Input()
  items: IRamlItem[];

  @Input()
  type: any;

  title: string;

  show: boolean;

  constructor() {}

  ngOnInit() {
    this.title = this.getTitleByType(this.type);
    switch (this.type) {
      case 'uri':
        this.show = this.items.length > 0;
        break;
      default:
        this.show = !!this.items;
    }
  }

  private getTitleByType(type: string): string {
    switch (type) {
      case 'uri':
        return 'URI';
      case 'query':
        return 'Query';
      case 'headers':
        return 'Headers';
      case 'body':
        return 'Body';
      default:
        return type;
    }
  }
}
