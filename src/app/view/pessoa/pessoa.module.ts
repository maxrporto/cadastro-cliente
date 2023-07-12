import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from "@angular/router";
import { DashboardModule } from "src/app/components/dashboard.module";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { PessoaAppComponent } from "./pessoa.app.component";
import { PessoaRountingModule } from "./pessoa.route";
import { PessoaService } from "./service/pessoa.service";

@NgModule({
  declarations: [
    PessoaAppComponent,
    ListaComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    PessoaRountingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    DashboardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule


  ],
  providers: [
    PessoaService
  ]
})
export class PessoaModule { }
