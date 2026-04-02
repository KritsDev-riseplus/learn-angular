import { AbstractControl, ValidationErrors } from '@angular/forms';

export function setErrorValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  // Add custom validation logic here
  return null;
}
