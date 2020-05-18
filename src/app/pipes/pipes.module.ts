import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SafePipe } from "./safe.pipe";
import { CapitalPipe } from './capitalize.pipe';

@NgModule({
  declarations: [SafePipe, CapitalPipe],
  imports: [CommonModule],
  exports: [SafePipe, CapitalPipe]
})
export class PipesModule {}
