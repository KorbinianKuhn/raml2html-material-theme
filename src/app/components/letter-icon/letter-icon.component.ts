import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter-icon',
  templateUrl: './letter-icon.component.html',
  styleUrls: ['./letter-icon.component.scss']
})
export class LetterIconComponent implements OnInit {
  @Input()
  letter: string;

  constructor() {}

  ngOnInit() {}
}
