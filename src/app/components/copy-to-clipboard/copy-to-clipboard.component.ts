import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss']
})
export class CopyToClipboardComponent implements OnInit {
  @ViewChild('textarea')
  textarea: ElementRef;

  @Input()
  content: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  copy() {
    try {
      this.textarea.nativeElement.select();
      document.execCommand('copy');
      this.textarea.nativeElement.setSelectionRange(0, 0);
      this.alertService.success('Copied to clipboard');
    } catch (err) {
      this.alertService.error('Copying to cliboard');
    }
  }
}
