import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommerceRegistrationComponent } from './components/commerce-registration/commerce-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PipesModule } from "../app/pipes/pipes.module";
import { VerifyRegisterDataComponent } from './components/verify-register-data/verify-register-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CommerceRegistrationComponent,
    VerifyRegisterDataComponent
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
