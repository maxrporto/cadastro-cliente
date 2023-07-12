import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  pessoaForm: FormGroup;
  pessoa: Pessoa;

  formResult: string = '';

  constructor(
    private pessoaService: PessoaService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {

    super();

    this.configValidacaoElementos();    
  }

  ngOnInit(): void {
    console.log(' 1° step - CADASTRO CLIENTE');

    this.pessoaForm = this.fb.group({
      nomePessoa: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      horaNascimento: ['', [Validators.required]],
      email: ['', [Validators.required]],
      observacao: [''],  

      endereco: this.fb.group ({
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cep: [''],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        pais:  ['', [Validators.required]]
      })
    }); 
  }

  ngAfterViewInit(): void{
    console.log(this.formInputElements);
    super.configurarValidacaoFormularioBase(this.formInputElements, this.pessoaForm);   
  }

  adicionarCliente(){
    console.log('ENTOU NO METODO ADICONA CLIENTE');
    console.log("FORM.VALID: " + this.pessoaForm.valid);

    if(this.pessoaForm.dirty && this.pessoaForm.valid){
      
      const dadosPessoa = Object.assign({}, this.pessoa, this.pessoaForm.value);
      this.pessoa = Object.assign({}, this.pessoa, this.pessoaForm.value);

      this.pessoaService.incluirPessoa(dadosPessoa)
        .then((dados) =>{
          console.log('Documento adicionado com ID:', dados.id);
          this.processarSucesso(dados);
        })
        .catch((error) => {
          console.error('Erro ao adicionar documento:', error);
          this.processarFalha(error);
        })

      // console.log(dadosPessoa);
      // console.log(this.pessoa);
      
      // this.formResult = JSON.stringify(this.pessoa);

      console.log('INCLUIU CLIENTE');
    }
    
  
  }

  editarEndereco() {
    const dadosPessoa = Object.assign({}, this.pessoa, this.pessoaForm?.value);
    console.log(dadosPessoa);
  }

  processarSucesso(response: any) {
    this.pessoaForm?.reset();
    this.errors= [];

   // this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Pessoa incluida com sucesso!', 'Sucesso!');
    if(toast) {
      toast.onHidden.subscribe(() => {
        //this.router.navigate(['/pessoa/lista']);
      });
    }    
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  private configValidacaoElementos(){
    this.validationMessages = {
      nomePessoa: {
        required: 'Informe o Nome',
      },
      dataNascimento: {
        required: 'Informe a data de nascimento',
      },
      horaNascimento: {
        required: 'Informe a hora de nascimento',
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },     
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      },
      pais: {
        required: 'Informe o País',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }
}
