import { Endereco } from './../models/endereco.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { BaseService } from 'src/app/service/base.service';
import { Pessoa } from '../models/pessoa.model';
import { get, list } from '@angular/fire/database';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseService {

  pessoaRef: Pessoa[];

  constructor(
    private firestore: Firestore,
    private db: AngularFirestore

  ) {
    super();

    console.log('ENTROU NO PESSOA SERVICE');
  }

  incluirPessoa(pessoa: Pessoa) {
   return this.db.collection('cliente')
      .add({
        nomePessoa: pessoa.nomePessoa,
        dataNascimento: pessoa.dataNascimento,
        horaNascimento: pessoa.horaNascimento,
        email: pessoa.email,
        observacao: pessoa.observacao,
        endereco: {
          logradouro: pessoa.endereco.logradouro,
          numero: pessoa.endereco.numero,
          bairro: pessoa.endereco.bairro,
          cep: pessoa.endereco.cep,
          cidade: pessoa.endereco.cidade,
          complemento: pessoa.endereco.complemento,
          estado: pessoa.endereco.estado,
          pais: pessoa.endereco.pais
        }
      });
  }

  getPessoas(): Observable<Pessoa[]> {
    return this.db.collection('cliente').snapshotChanges()
    .pipe(
      map(docData => {
        return docData.map(doc => {
          let data = doc.payload.doc.data() as Pessoa;
          return {
            uid: doc.payload.doc.id, ...data
          };
        });
      }));
    // ).subscribe(docData => {
    //   console.log(docData);
    //    this.pessoaRef = docData;
    //   // this.dataSource = new MatTableDataSource(this.pessoas);
    //   // this.dataSource.sort = this.sort;
    //   // this.dataSource.paginator = this.paginator;
    // });

    //return this.pessoaRef;
  }

  // updateUser(userKey, value){
  //   value.nameToSearch = value.name.toLowerCase();
  //   return this.db.collection('users').doc(userKey).set(value);
  // }

  // deleteUser(userKey){
  //   return this.db.collection('users').doc(userKey).delete();
  // }
}
