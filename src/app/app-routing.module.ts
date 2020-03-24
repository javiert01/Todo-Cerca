import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VerifyRegisterDataComponent } from "./components/verify-register-data/verify-register-data.component";

const routes: Routes = [
  { path: "verificar", component: VerifyRegisterDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
