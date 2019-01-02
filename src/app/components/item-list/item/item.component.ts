import { Component, Input, OnInit } from '@angular/core';
import { ITEM_TYPE_COLORS, POSSIBLE_ITEM_CONDITIONS } from 'src/app/constants';
import { IRamlItem } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  item: IRamlItem;

  color: string;
  conditions: any[];

  type: string;

  constructor() {}

  ngOnInit() {
    this.type = this.item.type.includes('array') ? 'array' : this.item.type;
    this.color = ITEM_TYPE_COLORS[this.type] || ITEM_TYPE_COLORS.default;

    this.conditions = [];
    for (const condition of POSSIBLE_ITEM_CONDITIONS) {
      if (condition.key in this.item) {
        this.conditions.push({
          key: condition.displayName,
          value: this.item[condition.key]
        });
      }
    }
  }
}
