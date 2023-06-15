import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreDashboardRoutingModule } from './pre-dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/shared-material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PreDashboardComponent } from './pre-dashboard.component';


@NgModule({
  declarations: [
    PreDashboardComponent
  ],
  imports: [
    CommonModule,
    PreDashboardRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ]
  
})
export class PreDashboardModule { }
