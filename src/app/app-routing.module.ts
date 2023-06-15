import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './Guard/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'abrir-conta',
    loadChildren: () => import('./components/abrir-conta/abrir-conta.module').then((m) => m.AbrirContaModule)
  },
  {
    path: 'pre-dashboard',
    loadChildren: () => import('./components/pre-dashboard/pre-dashboard.module').then((m) => m.PreDashboardModule),
    canActivate: [GuardGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
