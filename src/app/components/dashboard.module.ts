import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "../templates/footer/footer.component";
import { HeaderComponent } from "../templates/header/header.component";
import { DashboardRountingModule } from "./dashboard.route";
import { DashboardComponent } from "./dashboard/dashboard.component";
// import { ForgotPasswordComponent } from "../login/forgot-password/forgot-password.component";
// import { SignInComponent } from "../login/sign-in/sign-in.component";
// import { SignUpComponent } from "./sign-up/sign-up.component";
// import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { DashboardAppComponent } from "./dashboard.app.component";

@NgModule({
  declarations: [
    DashboardAppComponent,
    DashboardComponent,   
    // SignInComponent,
    // SignUpComponent,
    //ForgotPasswordComponent,
    //VerifyEmailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports : [
    CommonModule,
    DashboardRountingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [

  ]
})
export class DashboardModule {}