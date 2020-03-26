import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommerceRegistrationComponent } from './components/commerce-registration/commerce-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PipesModule } from '../app/pipes/pipes.module';
import { VerifyRegisterDataComponent } from './components/verify-register-data/verify-register-data.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { RegisterBannerComponent } from './components/register-banner/register-banner.component';
import { RegisterInfoComponent } from './components/register-info/register-info.component';

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
    RegisterInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAswlswB4nSDMpRuWl9MLTJVBLc4x9J7XE',
      libraries: ['places']
    }),
    BrowserAnimationsModule,
    MatTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    //{provide: OwlDateTimeIntl, useClass: DefaultIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
