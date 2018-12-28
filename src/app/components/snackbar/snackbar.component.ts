import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public title: string;
  public message: string;
  public icon: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: any) {
    this.title = data.alert.title;
    this.message = data.alert.message;
    this.icon = data.alert.icon;
  }

  ngOnInit() {}
}
