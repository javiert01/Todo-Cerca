import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';

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

export class DefaultIntl extends OwlDateTimeIntl  {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'Add a second';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'Minus a second';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'Add a minute';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'Minus a minute';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'Add a hour';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'Minus a hour';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Previous month';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Next month';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Previous year';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Next year';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel = 'Previous 21 years';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel = 'Next 21 years';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Change to month view';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Choose month and year';

  /** A label for the cancel button */
  cancelBtnLabel = 'Cancelar';

  /** A label for the set button */
  setBtnLabel = 'OK';

  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'From';

  /** A label for the range 'to' in picker info */
  rangeToLabel = 'To';

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'PM';
}

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
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: OwlDateTimeIntl, useClass: DefaultIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
