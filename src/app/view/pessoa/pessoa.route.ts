import { RouterModule, Routes } from "@angular/router";
import { PessoaAppComponent } from "./pessoa.app.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { NgModule } from "@angular/core";

const pessoaRouterConfig: Routes = [ 
  {
     path: '', component: PessoaAppComponent,
     children: [
       { path: 'lista', component: ListaComponent },
       { path: 'novo', component: NovoComponent }
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