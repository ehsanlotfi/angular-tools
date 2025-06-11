import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[emailOrPhoneValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailOrPhoneValidatorDirective, multi: true }
  ]
})
export class EmailOrPhoneValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(c: FormControl) {
 
    let v: number = +c.value;
 
    if (isNaN(v)) {
      return { 'emailOrPhone': true, 'requiredValue': 10 }
    }
 
    if (v <= +10) {
      return { 'emailOrPhone': true, 'requiredValue': 10 }
    }
 
    return null;
  }
}
