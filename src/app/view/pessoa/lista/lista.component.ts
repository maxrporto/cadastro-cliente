import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() sortChange = new EventEmitter<Sort>();

  headersColumns = ['nomePessoa', 'dataNascimento', 'horaNascimento', 'email', 'observacao'];

  dataSource = new MatTableDataSource<Pessoa>();
  pessoas: Pessoa[];
  errorMessage: string;
  errors: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

      //this.recuperaPessoa();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.pessoas){
      this.dataSource.data = this.pessoas;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sortingDataAccessor = (item: any, header) => {
    //   return item[header];
    // };

    // this.sort.sortChange
    // .pipe(untilDestroyed(this))
    // .subscribe((sortEvent: Sort) => this.sortChange.emit(sortEvent));
  }

  ngOnInit(): void {
    this.recuperaPessoa();
    this.spinner.hide();
  }

  recuperaPessoa(): void {

    try {
      console.log('RECUPERA DADOS');
      this.pessoaService.getPessoas().subscribe(dados => {
        this.pessoas = dados;
        this.dataSource = new MatTableDataSource(dados);
        this.dataSource.sort = this.sort;
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

}
