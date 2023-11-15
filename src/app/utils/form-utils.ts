import { FormControl, FormGroup } from '@angular/forms';

export const autocompleteValidator = (form: FormControl) =>
  !form.value || !form.value.codigo ? { required: true } : null;

export const listaElementosValidator = (form: FormControl) =>
  !form.value || form.value.length === 0 ? { required: true } : null;

export function verificaErroFormGroup(
  nomeCampo: string,
  erros: string | string[],
  formGroup: FormGroup
) {
  const campo = formGroup.get(nomeCampo);
  if (typeof erros === 'string') {
    return campo?.touched && campo.hasError(erros);
  } else {
    return campo?.touched && erros.some(erro => campo.hasError(erro));
  }
}
