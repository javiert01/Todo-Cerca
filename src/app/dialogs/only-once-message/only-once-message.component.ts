import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-only-once-message',
  templateUrl: './only-once-message.component.html',
  styleUrls: ['./only-once-message.component.css']
})
export class OnlyOnceMessageComponent implements OnInit {

  message;
  constructor(private dialogRef: MatDialogRef<OnlyOnceMessageComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  close(message) {
    this.dialogRef.close(message);
  }
  
}
