import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileService } from "src/app/services/file.service";
import { CommerceService } from "src/app/services/commerce.service";
import { tap } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-download-excel-dialog",
  templateUrl: "./download-excel-dialog.component.html",
  styleUrls: ["./download-excel-dialog.component.css"],
})
export class DownloadExcelDialogComponent implements OnInit, OnDestroy {
  allowed: boolean;
  pageNumber;
  category;
  cityParam;

  selectedCommercesIndex = [];
  selectedCommerces = [];
  commerceList = [];
  disableBtnPage;
  disableBtnSelected;

  commercesBeforePrint = [];
  dataCommerces: any = [];
  //=============================================================
  test: Subscription;
  test1: Subscription;
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
    this.cityParam = data.cityParam;
    // console.log("this.allowed", this.allowed);
    // console.log("this.pageNumber", this.pageNumber);
    // console.log("this.category", this.category);

    this.selectedCommercesIndex = data.selectedCommercesID;
    this.commerceList = data.commerceList;
    this.disableBtns();
    this.getCommecesFromIndex();
    //  console.log("this.selectedCommercesIndex: ", this.selectedCommercesIndex);
    //  console.log("this.commerceList: ", this.commerceList);
  }

  disableBtns() {
    this.disableBtnSelected =
      this.selectedCommercesIndex.length === 0 ? true : false;
    this.disableBtnPage = this.commerceList.length === 0 ? true : false;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  downloadSelected() {
    console.log("selectedCommerces: ", this.selectedCommerces);
    this.commercesBeforePrint = this.selectedCommerces;
    // console.log("this.selectedCommerces M: ", this.selectedCommerces);
    // console.log("this.commercesBeforePrint: ", this.commercesBeforePrint);
    this.constructCommercePrint();
    this.exportAsXLSX();
  }
  downloadPage() {
    this.test = this.commerceService
      .getAllCommerces(
        this.allowed,
        this.pageNumber,
        this.category,
        this.cityParam
      )
      .pipe(
        tap((content) => {
          // console.log("Contenido: ", content);
          this.commercesBeforePrint = content["commercesPaginated"];
          this.constructCommercePrint();
          this.exportAsXLSX();
        })
      )
      .subscribe();
  }
  // THIS IS FOR DOWNLOAD ALL COMMERCES IN THIS MOMENT IT IS DISABLE 
  // IS DANGEROUS FOR LOAD OF DATA 
  downloadAll() {
    this.test1 = this.commerceService
      .getAllCommercesNoPagination(this.allowed)
      .pipe(
        tap((content) => {
          // console.log("Contenido: ", content);
          this.commercesBeforePrint = content["commercesUshift"];
          this.constructCommercePrint();
          this.exportAsXLSX();
        })
      )
      .subscribe();
  }

  constructCommercePrint() {
    this.commercesBeforePrint.forEach((comm) => {
      console.log("Commercio: ", comm);
      comm.createdAt = this.getFormatDate(comm["createdAt"]);
      comm.category = comm["category"]["commerceCategory"];
      delete comm.id;
      delete comm.commercePhoto;
      // console.log("Commercio: ", comm);
      this.dataCommerces.push(comm);
    });
  }

  exportAsXLSX(): void {
    this.fileService.exportAsExcelFile(this.dataCommerces, "data");
    this.dataCommerces = [];
    this.commercesBeforePrint = [];
  }
  getCommecesFromIndex() {
    this.selectedCommercesIndex.forEach((e) => {
      this.selectedCommerces.unshift(this.commerceList[e]);
    });
    // console.log("this.selectedCommerces: ", this.selectedCommerces);
  }
  getFormatDate(uDate) {
    let date = new Date(uDate);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
  }
  ngOnDestroy() {
    this.test ? this.test.unsubscribe() : "";
    this.test1 ? this.test1.unsubscribe() : "";
  }
}
