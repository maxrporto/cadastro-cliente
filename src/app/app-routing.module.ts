import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
   { path: '', redirectTo: './login/sign-in', pathMatch: 'full' },
   { path: './login/sign-in', component: SignInComponent },
   { path: 'register-user', component: SignUpComponent },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
   { path: 'forgot-password', component: ForgotPasswordComponent },
   { path: 'verify-email-address', component: VerifyEmailComponent },
   { path: '',
    loadChildren: () => 
      import('./components/dashboard.module').then(m => m.DashboardModule), 
          canActivate: [AuthGuard]
   }
  // { path: 'pessoa',
  //   loadChildren: () => import('./view/pessoa/pessoa.module').then(m => m.PessoaModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
