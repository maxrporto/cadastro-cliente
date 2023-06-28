import { NgModule } from "@angular/core";
import { PessoaAppComponent } from "./pessoa.app.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { CommonModule } from "@angular/common";
import { PessoaRountingModule } from "./pessoa.route";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "src/app/templates/header/header.component";
import { FooterComponent } from "src/app/templates/footer/footer.component";


@NgModule({
  declarations: [
    PessoaAppComponent,
    ListaComponent,
    NovoComponent
    // HeaderComponent,
    // FooterComponent
  ],
  imports : [
    CommonModule,
    PessoaRountingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule
  ],
  providers: [

  ]
})
export class PessoaModule {}