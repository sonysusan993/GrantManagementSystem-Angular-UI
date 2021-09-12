import { FormGroup } from '@angular/forms';

// custom validator to compare that two fields 
export function MustGreater(controlName: string, compareControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const compareControl = formGroup.controls[compareControlName];

        if (compareControl.errors && !compareControl.errors.mustGreater) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value > compareControl.value) {
            compareControl.setErrors({ mustGreater: true });
        } else {
            compareControl.setErrors(null);
        }
    }
}