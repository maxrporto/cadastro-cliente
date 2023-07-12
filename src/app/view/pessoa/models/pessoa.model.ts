import { Endereco } from "./endereco.model";

export interface  Pessoa {
  idPessoa: number;
  nomePessoa: string;
  dataNascimento: string; 
  horaNascimento: string;
  email: string;
  observacao: string;
  endereco: Endereco;
}

export interface SortQuery {
  property: string,
  direction: string
}