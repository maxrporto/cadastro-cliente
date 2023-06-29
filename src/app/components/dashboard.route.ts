import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const dashboardRoutes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {
        path: 'pessoa',
        loadChildren: () => import('./../view/pessoa/pessoa.module').then(m => m.PessoaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRountingModule { }
