
import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../utils/generic-form-validations';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  genericValidator!: GenericValidator;
  validationMessages?: ValidationMessages;

  mudancasNaoSalvas?: boolean;

  protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages){
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configurarValidacaoFormularioBase(formInputElements: ElementRef[], formGroup: FormGroup){
    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormalario(formGroup);
    });
  }

  protected validarFormalario(formGroup: FormGroup<any>) {
    this.displayMessage = this.genericValidator!.processarMensagens(formGroup)!;
    this.mudancasNaoSalvas = true;
  }
}