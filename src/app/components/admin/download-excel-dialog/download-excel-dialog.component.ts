import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileService } from "src/app/services/file.service";
import { CommerceService } from "src/app/services/commerce.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-download-excel-dialog",
  templateUrl: "./download-excel-dialog.component.html",
  styleUrls: ["./download-excel-dialog.component.css"]
})
export class DownloadExcelDialogComponent implements OnInit {
  allowed;
  pageNumber;
  category;

  commercesBeforePrint = [];
  //=============================================================
  dataCommerces: any = [];
  //=============================================================

  constructor(
    public fileService: FileService,
    public commerceService: CommerceService,
    private dialogRef: MatDialogRef<DownloadExcelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.allowed = data.allowed;
    this.pageNumber = data.pageNumber;
    this.category = data.category;
    // console.log("this.allowed", this.allowed);
    // console.log("this.pageNumber", this.pageNumber);
    // console.log("this.category", this.category);
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }

  downloadAll() {
    this.commerceService
      .getAllCommercesNoPagination()
      .pipe(
        tap(content => {
          // console.log("Contenido: ", content);
          this.commercesBeforePrint = content["commerces"];
          this.constructCommercePrint();
          this.exportAsXLSX();
        })
      )
      .subscribe();
  }
  downloadPage() {
    // this.allowed = false;
    // this.pageNumber = 1;
    // this.category = "all";
    this.commerceService
      .getAllCommerces(this.allowed, this.pageNumber, this.category)
      .pipe(
        tap(content => {
          // console.log("Contenido: ", content);
          this.commercesBeforePrint = content["commercesPaginated"];
          this.constructCommercePrint();
          this.exportAsXLSX();
        })
      )
      .subscribe();
  }
  downloadSelected() {}

  constructCommercePrint() {
    this.commercesBeforePrint.forEach(comm => {
      // console.log("Commercio: ", comm);
      comm.category = comm["category"]["commerceCategory"];
      // console.log("Commercio: ", comm);
      this.dataCommerces.push(comm);
    });
  }
  exportAsXLSX(): void {
    this.fileService.exportAsExcelFile(this.dataCommerces, "sample");
  }
}
