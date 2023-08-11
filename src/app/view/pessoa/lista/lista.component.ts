import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DetalheComponent } from '../detalhe/detalhe.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() sortChange = new EventEmitter<Sort>();
  @Input() total: number;

  headersColumns = ['uid', 'nomePessoa', 'dataNascimento', 'horaNascimento', 'email', 'editar'];

  dataSource = new MatTableDataSource<Pessoa>();
  pessoas: Pessoa[];
  listaAniversariantes: Pessoa[] = [];
  errorMessage: string;
  errors: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private date: DatePipe,
    private dialog: MatDialog) {

    this.spinner.show();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.pessoas){
    //   this.dataSource.data = this.pessoas;
    // }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.recuperaPessoa();
    this.dataSource.paginator = this.paginator;
    this.spinner.hide();
  }

  recuperaPessoa(): void {
    try {
      this.pessoaService.getPessoas().subscribe(dados => {
        this.pessoas = dados;
        this.dataSource.data = this.pessoas.sort((sort1, sort2) => sort1.nomePessoa > sort2.nomePessoa ? 1 : -1);

        console.log(this.pessoas);
      });
    } catch (error) {
      this.processarFalha(error);
    }
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.pessoas.filter = filterValue.trim().toLowerCase();

    // if (this.pessoas.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  //   onCalcularData(date: any): number {
  //     return Math.abs(moment().startOf('day').diff(moment(date).startOf('day'), 'days'));
  // }

  aniversariantesDoMes(pessoa: Pessoa[]): void {

    pessoa.map((dados) => {
      if (this.filtraAniversarianteSemana(dados.dataNascimento)) {
        this.listaAniversariantes.push(dados);
      }
    })
  }

  filtraAniversarianteSemana(datanascimento: string): boolean {

    var dataAniver = moment(datanascimento, "DD/MM/YYYY");
    var inicioSemana = moment(moment().day(0), "DD/MM/YYYY");
    var fimSemana = moment(moment().day(6), "DD/MM/YYYY");

    return moment(moment(dataAniver).format('MM-DD')).isBetween(moment(inicioSemana).format('MM-DD'), moment(fimSemana).format('MM-DD'), undefined, '[]');

  }

  onDetalhe(idPessoa: any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "55%";

    const modalRef = this.dialog.open(DetalheComponent, dialogConfig);
    modalRef.componentInstance.idPessoa = idPessoa;

  }
}
