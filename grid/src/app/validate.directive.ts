import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validate]'
})
export class ValidateDirective implements OnInit {

  @Input()
  public validate!: AbstractControl  | null;

  @Input()
  public controlName: string = '';


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {

     }

  ngOnInit(): void {
    this.subscribeToValueChange();
  }

  subscribeToValueChange() {
    this.validate?.valueChanges.subscribe(s => {
      const errors = this.getValidationErrors(this.validate?.errors);
       if (errors.length) {
        this.validateAndAddError();
       }
       else {
        this.removeErrorElement();
       }
    })
  }


  getValidationMessages(controlName: string) {
    return {
      required: `${controlName} is Required`,
      minlength: `${controlName} is Too Short`,
      maxlength: `${controlName} is Too Long`,
      pattern: `${controlName} is Inavlid`,
      email: `${controlName} is Invalid`,
      date: `${controlName} is Invalid`,
  };
  }

  get targetElem() {
    return this.elementRef.nativeElement as HTMLElement;
  }

  getValidationErrors(errors: ValidationErrors | null | undefined): string[] {
    if (!errors) {
      return [];
    }
    return Object.keys(errors);
  }

  addErrorElement(errorContent: string) {
    const errorElem = this.document.createElement('div');
    errorElem.innerHTML = errorContent;
    errorElem.setAttribute('validator-message', 'errorValidator');
    errorElem.setAttribute('class','error-message');
    return errorElem;
  }

  removeErrorElement() {
    let allElem = Array.from((this.elementRef.nativeElement as HTMLElement).children);
    const foundElem = allElem.find(f => f.getAttribute('validator-message') === 'errorValidator');

    if (foundElem) {
     (this.elementRef.nativeElement as HTMLElement).removeChild(foundElem);
    }
  }



  validateAndAddError() {
    const errors = this.getValidationErrors(this.validate?.errors);
    let errorString = '';
    let name = this.controlName || this.targetElem.getAttribute('name') || '';
    const validationConstants = this.getValidationMessages(name);
    if (errors.length) {

      errors.forEach(f => {
        let keyVal = Object.entries(validationConstants)
                       .find(([key, value]) => key === f);
        errorString += `<span>${keyVal?.[1]}</span> <br />`;
      });


      this.removeErrorElement();
     const errorElem =  this.addErrorElement(errorString);
      (this.elementRef.nativeElement as HTMLElement).appendChild(errorElem);
    }
    else {
      this.removeErrorElement();
    }
  }

  @HostListener("focusout")
  onFocusout() {
    this.validateAndAddError();
  }

  @HostListener("change")
  onChange() {
    this.validateAndAddError();
  }

}
