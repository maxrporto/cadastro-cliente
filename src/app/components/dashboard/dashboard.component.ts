import { Component, Input, OnInit, EventEmitter } from '@angular/core';

import { TarefaService } from 'src/app/tarefa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    public tarefaService: TarefaService) {
    }

  ngOnInit(): void {
  }

  enviaMenuEvent(menu: string){
    this.tarefaService.emitirMenuSelecionado.subscribe(
      menu => {
        console.log(menu);
      }
    )
  }

}
