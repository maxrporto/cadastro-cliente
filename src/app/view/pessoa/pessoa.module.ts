import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DashboardModule } from "src/app/components/dashboard.module";
import { AniversarianteComponent } from './aniversariante/aniversariante.component';
import { DetalheComponent } from "./detalhe/detalhe.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { PessoaAppComponent } from "./pessoa.app.component";
import { PessoaRountingModule } from "./pessoa.route";
import { PessoaService } from "./service/pessoa.service";

@NgModule({
  declarations: [
    PessoaAppComponent,
    ListaComponent,
    NovoComponent,
    AniversarianteComponent,
    DetalheComponent
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
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  providers: [
    PessoaService
  ]
})
export class PessoaModule { }
