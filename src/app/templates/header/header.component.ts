import { Component, Input, OnInit, Output } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { TarefaService } from 'src/app/tarefa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private service: TarefaService){}

  ngOnInit(): void {
    this.service.emitirMenuSelecionado.subscribe(
      menu => console.log(menu)
    );
  }
}
