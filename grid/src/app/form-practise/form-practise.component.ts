import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormInputType } from '../form-field/form-field.component';

@Component({
  selector: 'app-form-practise',
  templateUrl: './form-practise.component.html',
  styleUrls: ['./form-practise.component.scss']
})
export class FormPractiseComponent implements OnInit {

  public fgCustomer!: FormGroup ;
  public groupControls!: any;

  constructor(private customerBuilderService: FormBuilder) {

   }

  ngOnInit(): void {
    this.initializeForms();
  }

  public initializeForms() {
    this.fgCustomer = this.customerBuilderService.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: this.customerBuilderService.control('',[Validators.required, Validators.maxLength(2)]),
      phone: new FormArray([]),
      dob: new FormControl('', Validators.required)
    });

    this.groupControls = {
      firstName: this.fgCustomer?.get('firstName'),
      lastName: this.fgCustomer?.get('lastName'),
      phone: this.fgCustomer?.get('phone') as FormArray,
      dob: this.fgCustomer?.get('dob'),
    }

    console.log(this.groupControls.dob);
  }

  get phoneField() {
    return this.fgCustomer.get('phone') as FormArray;
  }

  public addPhoneControl(){
    this.phoneField.push(new FormControl(''));
  }

  public deletePhoneControl(indexToRemove: number) {
    this.phoneField.removeAt(indexToRemove);
  }


  public onSubmit() {
    if (this.fgCustomer.invalid) {
      this.validateAllFormFields(this.fgCustomer);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl && control.invalid) {            //{4}
        control.setValue(control.value);
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

}
