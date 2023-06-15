import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbrirContaComponent } from './abrir-conta.component';

const routes: Routes = [
  {path: "", component: AbrirContaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbrirContaRoutingModule { }
