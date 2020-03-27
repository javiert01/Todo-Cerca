import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VerifyRegisterDataComponent } from "./components/verify-register-data/verify-register-data.component";
import { ThankyouComponent } from "./components/thankyou/thankyou.component";
import { CommerceRegistrationComponent } from "./components/commerce-registration/commerce-registration.component";
import { UseConditionsComponent } from './components/use-conditions/use-conditions.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { CommercesComponent } from './components/admin/commerces/commerces.component';

const routes: Routes = [
  { path: "", redirectTo: "registrar", pathMatch: "full" },
  { path: "registrar", component: CommerceRegistrationComponent },
  { path: "verificar", component: VerifyRegisterDataComponent },
  { path: "gracias", component: ThankyouComponent },
  { path: "politicas-de-uso", component: UseConditionsComponent },
  { path: "login-admin", component: LoginAdminComponent},
  { path: 'inicio-admin', component: CommercesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

