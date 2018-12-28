import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteDetailDialogComponent } from './route-detail-dialog/route-detail-dialog.component';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.scss']
})
export class RouteDetailComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      if (params.id && params.method) {
        this.openDialog(params.id, params.method);
      }
    });
  }

  ngOnInit() {}

  openDialog(resourceId: string, method: string): void {
    const dialogRef = this.dialog.open(RouteDetailDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: {
        resourceId,
        method
      },
      panelClass: 'dialog-with-grey-background'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/routes']);
    });
  }
}
