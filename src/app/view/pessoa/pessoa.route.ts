import { RouterModule, Routes } from "@angular/router";
import { PessoaAppComponent } from "./pessoa.app.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { NgModule } from "@angular/core";
import { DetalheComponent } from "./detalhe/detalhe.component";

const pessoaRouterConfig: Routes = [
  {
     path: 'pessoa', component: PessoaAppComponent,
     children: [
       { path: 'lista', component: ListaComponent },
       { path: 'novo', component: NovoComponent },
       { path: 'detalhe/:id', component: DetalheComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pessoaRouterConfig)
  ],
  exports: [ RouterModule ]
})
export class PessoaRountingModule { }
