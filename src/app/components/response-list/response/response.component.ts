import { Component, Input, OnInit } from '@angular/core';
import { IRamlResponse } from 'src/app/interfaces/raml.interface';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @Input()
  response: IRamlResponse;

  constructor() {}

  ngOnInit() {}
}
