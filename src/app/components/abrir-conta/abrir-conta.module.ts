import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbrirContaRoutingModule } from './abrir-conta-routing.module';
import { AbrirContaComponent } from './abrir-conta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/shared-material/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AbrirContaComponent
  ],
  imports: [
    CommonModule,
    AbrirContaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ]
})
export class AbrirContaModule { }
