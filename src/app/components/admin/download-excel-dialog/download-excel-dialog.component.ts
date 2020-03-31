import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-download-excel-dialog",
  templateUrl: "./download-excel-dialog.component.html",
  styleUrls: ["./download-excel-dialog.component.css"]
})
export class DownloadExcelDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DownloadExcelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
}
