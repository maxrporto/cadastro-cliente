import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalheComponent } from "./detalhe/detalhe.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";

const pessoaRouterConfig: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: 'novo', component: NovoComponent },
  { path: 'detalhe/:id', component: DetalheComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(pessoaRouterConfig)
  ],
  exports: [RouterModule]
})
export class PessoaRountingModule { }
