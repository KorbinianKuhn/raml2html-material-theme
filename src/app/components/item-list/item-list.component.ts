import { Component, Input, OnInit } from '@angular/core';
import { IRamlItem } from './../../interfaces/raml.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input()
  private items: IRamlItem[];

  public requiredItems: IRamlItem[] = [];
  public optionalItems: IRamlItem[] = [];

  constructor() {}

  ngOnInit() {
    this.items.map(item => {
      item.required
        ? this.requiredItems.push(item)
        : this.optionalItems.push(item);
    });
  }
}
