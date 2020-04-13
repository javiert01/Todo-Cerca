import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-map-search-dialog",
  templateUrl: "./map-search-dialog.component.html",
  styleUrls: ["./map-search-dialog.component.css"],
})
export class MapSearchDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<MapSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
