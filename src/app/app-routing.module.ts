import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VerifyRegisterDataComponent } from "./components/verify-register-data/verify-register-data.component";
import { ThankyouComponent } from "./components/thankyou/thankyou.component";
import { CommerceRegistrationComponent } from "./components/commerce-registration/commerce-registration.component";
import { UseConditionsComponent } from "./components/use-conditions/use-conditions.component";
import { CommerceSearchComponent } from "./components/commerce-search/commerce-search.component";
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "registrar", component: CommerceRegistrationComponent },
  { path: "verificar", component: VerifyRegisterDataComponent },
  { path: "gracias", component: ThankyouComponent },
  { path: "politicas-de-uso", component: UseConditionsComponent },
  { path: "home", component: CommerceSearchComponent},
  { path: "mapa", component: MapComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
