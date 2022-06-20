import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPractiseComponent } from './form-practise.component';

describe('FormPractiseComponent', () => {
  let component: FormPractiseComponent;
  let fixture: ComponentFixture<FormPractiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPractiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPractiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
