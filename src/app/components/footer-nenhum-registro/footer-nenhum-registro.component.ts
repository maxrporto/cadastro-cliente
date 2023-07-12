import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatColumnDef, MatFooterRowDef, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-footer-nenhum-registro',
  templateUrl: './footer-nenhum-registro.component.html',
  styleUrls: ['./footer-nenhum-registro.component.scss']
})
export class FooterNenhumRegistroComponent implements OnInit {
  @Input() exibeFooter: boolean;
  @Input() mensagem = 'Nenhum registro encontrado.';
  @ViewChild(MatColumnDef) columnDef: MatColumnDef;
  @ViewChild(MatFooterRowDef) footerRowDef: MatFooterRowDef;

  constructor(
    private table: MatTable<any>,
    private changeDetector: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.changeDetector.detectChanges();
    this.table.addColumnDef(this.columnDef);
    this.table.addFooterRowDef(this.footerRowDef);
  }

}
