import { Component, Input, OnInit } from '@angular/core';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-aniversariante',
  templateUrl: './aniversariante.component.html',
  styleUrls: ['./aniversariante.component.scss']
})
export class AniversarianteComponent implements OnInit {

  mesCorrente = new Date().toISOString().split('T')[0].split('-')[1];
  pessoas: Pessoa[];
  listaAniversariantes: Pessoa[] = [];
  errors: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private date: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.recuperaPessoa();
    //
  }

  recuperaPessoa(): void {
    try {
      this.pessoaService.getPessoas().subscribe(dados => {
        this.pessoas = dados;
        this.aniversariantesDoMes(this.pessoas);
      });
    } catch (error) {
      this.processarFalha(error);
    }
  }

  aniversariantesDoMes(pessoa: Pessoa[]): void {

    pessoa.map((dados) => {
      if (this.filtraAniversarianteSemana( dados.dataNascimento)) {
        this.listaAniversariantes.push(dados);
      }
    })
  }

  private filtraAniversarianteSemana(datanascimento: string): boolean {

    var dataAniver = moment(datanascimento, "DD/MM/YYYY");
    var diaAtual = moment(moment(), "DD/MM/YYYY");

    return moment(moment(dataAniver).format('MM-DD')).isSame(moment(diaAtual).format('MM-DD'));
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  calculaIdade(dataNascimento: any): number {
    var dataNasci = moment(dataNascimento, "DD/MM/YYYY");
    return moment().diff(dataNasci, 'years');
  }
}
