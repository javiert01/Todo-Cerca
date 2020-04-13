import { Component, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MapSearchDialogComponent } from "../commerce-search/map-search-dialog/map-search-dialog.component";
import { PlaceService } from 'src/app/services/place.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: "app-commerce-search",
  templateUrl: "./commerce-search.component.html",
  styleUrls: ["./commerce-search.component.css"],
})
export class CommerceSearchComponent implements OnInit {

  cities = [];
  categories = [];

  constructor(private dialog: MatDialog,
    private placeService: PlaceService,
    private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.cities = this.placeService.getCountryList();
    this.loadCategoryData();

  }

  loadCategoryData() {
    this.categoryService.getCategoryList().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openDialogMapSearch() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "380px";
    configuracionDialog.width = "560px";
    configuracionDialog.data = {};
    const dialogRef = this.dialog.open(
      MapSearchDialogComponent,
      configuracionDialog
    );
  }


}
