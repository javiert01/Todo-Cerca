import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UseConditionsComponent } from './components/use-conditions/use-conditions.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { CommercesComponent } from './components/admin/commerces/commerces.component';

const routes: Routes = [
  { path: "", redirectTo: "login-admin", pathMatch: "full" },
  /*{ path: "registrar", component: CommerceRegistrationComponent },
  { path: "verificar", component: VerifyRegisterDataComponent },
  { path: "gracias", component: ThankyouComponent },*/
  { path: "politicas-de-uso", component: UseConditionsComponent },
  { path: "login-admin", component: LoginAdminComponent},
  { path: 'inicio-admin', component: CommercesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

