import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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
import { verificaErroFormGroup } from 'src/app/utils/form-utils';

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
  //pessoaForm: FormGroup;
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

  pessoaForm = new FormGroup({
    nomePessoa:  new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    horaNascimento:  new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required]),
    observacao:  new FormControl(''),

    endereco: new FormGroup({
      logradouro:  new FormControl(''),
      numero: new FormControl(''),
      complemento:  new FormControl(''),
      bairro:  new FormControl(''),
      cep:  new FormControl(''),
      cidade: new FormControl('', [Validators.required]),
      estado:  new FormControl('', [Validators.required]),
      pais:  new FormControl('', [Validators.required])
    })
  });
  ngOnInit(): void {

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

  verificaErro(nomeCampo: string, erros: string | string[]) {
    return verificaErroFormGroup(
      nomeCampo,
      erros,
      this.pessoaForm,
    );
  }
}
