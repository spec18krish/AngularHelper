import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPractiseComponent } from './form-practise/form-practise.component';
import { ValidateDirective } from './validate.directive';
import { FormFieldComponent } from './form-field/form-field.component';


@NgModule({
  declarations: [
    AppComponent,
    FormPractiseComponent,
    ValidateDirective,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
