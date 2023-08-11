import { EventEmitter, Injectable } from "@angular/core";
import { BaseService } from "./service/base.service";

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends BaseService {
  emitirMenuSelecionado = new EventEmitter<string>();

  comunicacaoEmmiter(menu: string){
    this.emitirMenuSelecionado.emit(menu);
  }
}
