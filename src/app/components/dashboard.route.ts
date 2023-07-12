import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const dashboardRoutes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./../view/pessoa/pessoa.module').then(m => m.PessoaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRountingModule { }
