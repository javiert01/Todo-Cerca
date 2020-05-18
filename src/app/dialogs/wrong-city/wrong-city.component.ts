import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wrong-city',
  templateUrl: './wrong-city.component.html',
  styleUrls: ['./wrong-city.component.css']
})
export class WrongCityComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WrongCityComponent>) { }

  ngOnInit(): void {
  }

  close(message) {
    this.dialogRef.close(message);
  }

}
