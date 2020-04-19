import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AgmCoreModule } from "@agm/core";
import { AgmOverlays } from "agm-overlays";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatDialogModule } from "@angular/material/dialog";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommerceRegistrationComponent } from "./components/commerce-registration/commerce-registration.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PipesModule } from "../app/pipes/pipes.module";
import { VerifyRegisterDataComponent } from "./components/verify-register-data/verify-register-data.component";
import { ThankyouComponent } from "./components/thankyou/thankyou.component";
import { QuienesSomosComponent } from "./components/quienes-somos/quienes-somos.component";
import { InstructionsComponent } from "./components/instructions/instructions.component";
import { RegisterBannerComponent } from "./components/register-banner/register-banner.component";
import { RegisterInfoComponent } from "./components/register-info/register-info.component";
import { UseConditionsComponent } from "./components/use-conditions/use-conditions.component";
import { CommerceSearchComponent } from "./components/commerce-search/commerce-search.component";
import { MapSearchDialogComponent } from "./components/commerce-search/map-search-dialog/map-search-dialog.component";
import { CommerceListComponent } from './components/search-results/commerce-list/commerce-list.component';
import { CategoryListComponent } from './components/search-results/category-list/category-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CommerceResultsMapComponent } from './components/search-results/commerce-results-map/commerce-results-map.component';

/*  */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CommerceRegistrationComponent,
    VerifyRegisterDataComponent,
    ThankyouComponent,
    QuienesSomosComponent,
    InstructionsComponent,
    RegisterBannerComponent,
    RegisterInfoComponent,
    UseConditionsComponent,
    CommerceSearchComponent,
    MapSearchDialogComponent,
    CommerceListComponent,
    CategoryListComponent,
    SearchResultsComponent,
    CommerceResultsMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    PipesModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      //apiKey: "AIzaSyCHxxCxzPETWvNkPLbEDrKfCznVakh1ofQ", //prod
      apiKey: "AIzaSyAVweiK3Gbib30bUCtg5SW0g1m9_1yvphA", //dev
      libraries: ["places"],
    }),
    BrowserAnimationsModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [
    //{provide: OwlDateTimeIntl, useClass: DefaultIntl}
  ],
  bootstrap: [AppComponent],
  entryComponents: [MapSearchDialogComponent],
})
export class AppModule {}
