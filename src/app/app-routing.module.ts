import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VerifyRegisterDataComponent } from "./components/verify-register-data/verify-register-data.component";
import { ThankyouComponent } from "./components/thankyou/thankyou.component";

const routes: Routes = [
  { path: "verificar", component: VerifyRegisterDataComponent },
  { path: "gracias", component: ThankyouComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
