import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { Pessoa } from '../models/pessoa.model';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseService {
  pessoaRef: Pessoa[];
  pes$: Observable<Pessoa>;

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
        nomePessoa: pessoa.nomePessoa.toUpperCase(),
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
  }

  consultar(uid: string):Observable<Pessoa> {
    return this.db.collection<Pessoa>('cliente')
    .doc(uid)
    .valueChanges()
    .pipe(
      map((data) => {
        let dados = data as Pessoa;
        return {
          uid: uid, ...dados
        }
      })
    );
  }

  consultarPorNome(nome: string): Observable<boolean>{

    return this.db.collection('cliente', ref => ref.where('nomePessoa', '==', nome))
      .valueChanges()
      .pipe(
        map(name => {
          return name.length > 0 ? true  : false;
        })
      );
  }

  // updateUser(userKey, value){
  //   value.nameToSearch = value.name.toLowerCase();
  //   return this.db.collection('users').doc(userKey).set(value);
  // }

  // deleteUser(userKey){
  //   return this.db.collection('users').doc(userKey).delete();
  // }
}
