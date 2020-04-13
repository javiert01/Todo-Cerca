import { Component, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MapSearchDialogComponent } from "../commerce-search/map-search-dialog/map-search-dialog.component";

@Component({
  selector: "app-commerce-search",
  templateUrl: "./commerce-search.component.html",
  styleUrls: ["./commerce-search.component.css"],
})
export class CommerceSearchComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialogMapSearch() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "300px";
    configuracionDialog.width = "400px";
    configuracionDialog.data = {};
    const dialogRef = this.dialog.open(
      MapSearchDialogComponent,
      configuracionDialog
    );
  }

  
}
