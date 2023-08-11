import { Component, Input, OnInit } from '@angular/core';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Estados } from '../models/estados.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent extends FormBaseComponent implements OnInit{


  estados : Estados[] = [
    {value: "NI" , description: "Não Informado"},
    {value: "AC" , description: "Acre"},
    {value: "AL" , description: "Alagoas"},
    {value: "AP" , description: "Amapá"},
    {value: "AM" , description: "Amazonas"},
    {value: "BA" , description: "Bahia"},
    {value: "CE" , description: "Ceará"},
    {value: "DF" , description: "Distrito Federal"},
    {value: "ES" , description: "Espírito Santo"},
    {value: "GO" , description: "Goiás"},
    {value: "MA" , description: "Maranhão"},
    {value: "MT" , description: "Mato Grosso"},
    {value: "MS" , description: "Mato Grosso do Sul"},
    {value: "MG" , description: "Minas Gerais"},
    {value: "PA" , description: "Pará"},
    {value: "PB" , description: "Paraíba"},
    {value: "PR" , description: "Paraná"},
    {value: "PE" , description: "Pernambuco"},
    {value: "PI" , description: "Piauí"},
    {value: "RJ" , description: "Rio de Janeiro"},
    {value: "RN" , description: "Rio Grande do Norte"},
    {value: "RS" , description: "Rio Grande do Sul"},
    {value: "RO" , description: "Rondônia"},
    {value: "RR" , description: "Roraima"},
    {value: "SC" , description: "Santa Catarina"},
    {value: "SP" , description: "São Paulo"},
    {value: "SE" , description: "Sergipe"},
    {value: "TO" , description: "Tocantins"},
  ];

  @Input()
  idPessoa: any;

  errors: any[] = [];
  pessoaForm: FormControl;
  pessoa: Pessoa;
  selectedValue: string;

  formResult: string = '';

  constructor(
    private pessoaService: PessoaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DetalheComponent>) {

    super();
  }


  ngOnInit(): void {
    console.log(this.idPessoa);
     this.pessoaService.consultarPessoa(this.idPessoa)
     .subscribe( dados =>{
      this.pessoa = dados;
      this.selectedValue = this.pessoa.endereco.estado;
     })
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
