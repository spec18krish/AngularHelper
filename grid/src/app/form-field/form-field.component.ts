import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit, OnChanges {

  @Input() type!: FormInputType;
  @Input() inputControl!: AbstractControl | null;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() validationMessages!: any;
  @Input() group!: FormGroup;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //  const controlCurrentVal = changes['controlName'].currentValue;

    //  if (controlCurrentVal && !this.group) {
    //   this.group = controlCurrentVal.parent;
    //  }
  }

  ngOnInit(): void {
  }

}

export type FormInputType =
   'text'
  | 'textarea'
  | 'password'
  | 'email'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'image'
  | 'tel'

