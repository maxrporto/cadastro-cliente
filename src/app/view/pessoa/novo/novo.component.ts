import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from '../models/pessoa.model';
import { Estados } from '../models/estados.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { map } from 'rxjs';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  estados: Estados[] = [
    { value: "NI", description: "Não Informado" },
    { value: "AC", description: "Acre" },
    { value: "AL", description: "Alagoas" },
    { value: "AP", description: "Amapá" },
    { value: "AM", description: "Amazonas" },
    { value: "BA", description: "Bahia" },
    { value: "CE", description: "Ceará" },
    { value: "DF", description: "Distrito Federal" },
    { value: "ES", description: "Espírito Santo" },
    { value: "GO", description: "Goiás" },
    { value: "MA", description: "Maranhão" },
    { value: "MT", description: "Mato Grosso" },
    { value: "MS", description: "Mato Grosso do Sul" },
    { value: "MG", description: "Minas Gerais" },
    { value: "PA", description: "Pará" },
    { value: "PB", description: "Paraíba" },
    { value: "PR", description: "Paraná" },
    { value: "PE", description: "Pernambuco" },
    { value: "PI", description: "Piauí" },
    { value: "RJ", description: "Rio de Janeiro" },
    { value: "RN", description: "Rio Grande do Norte" },
    { value: "RS", description: "Rio Grande do Sul" },
    { value: "RO", description: "Rondônia" },
    { value: "RR", description: "Roraima" },
    { value: "SC", description: "Santa Catarina" },
    { value: "SP", description: "São Paulo" },
    { value: "SE", description: "Sergipe" },
    { value: "TO", description: "Tocantins" },
  ];

  errors: any[] = [];
  pessoaForm: FormGroup;
  pessoa: Pessoa;
  selectedValue: string;
  existePessoa: boolean;
  formResult: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private pessoaService: PessoaService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {

    //super();

    //this.configValidacaoElementos();
  }

  ngOnInit(): void {

    this.pessoaForm = this.fb.group({
      nomePessoa: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      horaNascimento: ['', [Validators.required]],
      email: ['', [Validators.required]],
      observacao: [''],

      endereco: this.fb.group({
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cep: [''],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        pais: ['', [Validators.required]]
      })
    });
  }

  ngAfterViewInit(): void {
    //console.log(this.formInputElements);
    //super.configurarValidacaoFormularioBase(this.formInputElements, this.pessoaForm);
  }

  adicionarCliente() {
    if (this.pessoaForm.dirty && this.pessoaForm.valid) {
     // let existePessoa: Promise<boolean>;
      let dataFormatada: moment.Moment = moment.utc(this.pessoaForm.value.dataNascimento).local();
      this.pessoaForm.value.dataNascimento = dataFormatada.format("DD/MM/YYYY");

      const dadosPessoa = Object.assign({}, this.pessoa, this.pessoaForm.value);
      this.pessoa = dadosPessoa;
      this.verificaSeExistePessoaCadastrada(this.pessoa);
      if(this.existePessoa){
        console.log('JÁ EXISTE A PESSOA CADASTRADA');
      }
      this.pessoaService.incluirPessoa(dadosPessoa)
        .then((dados) => {
          console.log('Documento adicionado com ID:', dados.id);
          this.processarSucesso(dados);
        })
        .catch((error) => {
          console.error('Erro ao adicionar documento:', error);
          this.processarFalha(error);
        })
    }
  }

  verificaSeExistePessoaCadastrada(pessoa: Pessoa){
    this.pessoaService.consultarPorNome(pessoa.nomePessoa.toUpperCase()).subscribe( existe => this.existePessoa = existe);
  }

  editarEndereco() {
    const dadosPessoa = Object.assign({}, this.pessoa, this.pessoaForm?.value);
    console.log(dadosPessoa);
  }

  processarSucesso(response: any) {
    this.pessoaForm?.reset();
    this.errors = [];

    this.openSnackBar("Pessoa incluida com sucesso!", "Sucesso!");
  }

  openSnackBar(msg: string, acao: any) {
    this._snackBar.open(msg, acao, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3500
    });
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  // private configValidacaoElementos(){
  //   this.validationMessages = {
  //     nomePessoa: {
  //       required: 'Informe o Nome',
  //     },
  //     dataNascimento: {
  //       required: 'Informe a data de nascimento',
  //     },
  //     horaNascimento: {
  //       required: 'Informe a hora de nascimento',
  //     },
  //     email: {
  //       required: 'Informe o e-mail',
  //       email: 'Email inválido'
  //     },
  //     cidade: {
  //       required: 'Informe a Cidade',
  //     },
  //     estado: {
  //       required: 'Informe o Estado',
  //     },
  //     pais: {
  //       required: 'Informe o País',
  //     }
  //   };

  //   super.configurarMensagensValidacaoBase(this.validationMessages);
  // }

  // getErrorMessage() {
  //   // if (this..hasError('required')) {
  //   //   return 'You must enter a value';
  //   // }

  //   return this.pessoaForm.is.nomePessoa.hasError('email') ? 'Not a valid email' : '';
  //}
}
