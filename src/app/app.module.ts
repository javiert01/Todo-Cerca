import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AgmCoreModule } from "@agm/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

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
import { LoginAdminComponent } from "./components/admin/login-admin/login-admin.component";
import { CommercesComponent } from "./components/admin/commerces/commerces.component";
import { AuthService } from "./services/auth.service";
import { TokenInterceptorService } from './services/token-interceptor.service';

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
    LoginAdminComponent,
    CommercesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAswlswB4nSDMpRuWl9MLTJVBLc4x9J7XE",
      libraries: ["places"]
    }),
    BrowserAnimationsModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
