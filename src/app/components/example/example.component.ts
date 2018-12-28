import { Component, Input, OnInit } from '@angular/core';
import { IRamlExample } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input()
  example: IRamlExample;

  constructor() {}

  ngOnInit() {}
}
