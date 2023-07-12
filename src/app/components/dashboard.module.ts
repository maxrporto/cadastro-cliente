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

import { DashboardAppComponent } from "./dashboard.app.component";
import { FooterNenhumRegistroComponent } from './footer-nenhum-registro/footer-nenhum-registro.component';
import { NgxSpinnerModule } from "ngx-spinner";

const dashboardDeclarations = [
  DashboardAppComponent,
  DashboardComponent,
  HeaderComponent,
  FooterComponent,
  FooterNenhumRegistroComponent
]
@NgModule({
  declarations: dashboardDeclarations,
  imports: [
    CommonModule,
    DashboardRountingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    NgxSpinnerModule
  ],
  exports: [dashboardDeclarations],
  providers: [

  ],
  bootstrap: [DashboardAppComponent]
})
export class DashboardModule { }
