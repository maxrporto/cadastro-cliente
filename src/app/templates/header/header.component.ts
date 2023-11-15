import { Component, Input, OnInit, Output } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TarefaService } from 'src/app/tarefa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuSelecionado: string;
  constructor(private service: TarefaService,
            public authService: AuthService){}

  ngOnInit(): void {
    this.service.getText().subscribe( text => {
      this.menuSelecionado = text;
    })
  }

  // logout(){
  //   console.log("LOGOUT");
  //   this.authService.SignOut();
  // }
}
