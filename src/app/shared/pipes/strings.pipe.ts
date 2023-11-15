import { Pipe, PipeTransform } from '@angular/core';
import { SharedStrings, strings } from '../resources/string-resources';


@Pipe({
  name: 'strings',
})
export class StringsPipe implements PipeTransform {
  transform(key: keyof SharedStrings, ...params: any): string {
    return strings[key] ? strings[key] : this.trataErroKeyNaoEncontrada(key);
  }

  private trataErroKeyNaoEncontrada(key: keyof SharedStrings): string {
    console.error(
      `Não foi encontrado texto cadastrado para a propriedade '${key}'.`,
    );
    return `{{ ${key} }}`;
  }
}
