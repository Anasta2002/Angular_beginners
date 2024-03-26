// Dependencies
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-window',
  standalone: true,
  imports: [MatButtonModule],
  template: `<button mat-button (click)="openDialog()" class="open-dialog-btn">Open dialog</button>`,
  styleUrls: ['./dialog-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogWindowComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public formData: any,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentDialogComponent, {
      data: this.formData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-window-content.component.html',
  styleUrls: ['./dialog-window-content.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DialogContentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public formData: any) {}
}
