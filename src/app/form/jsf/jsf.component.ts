import { Component, ViewEncapsulation } from '@angular/core';

const jsonFormObject = require('./asf-simple.json');

@Component({
  selector: 'jsf-component',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './jsf.html',
  styleUrls: ['./jsf.scss']
})
export class Jsf {
  jsonFormObject = jsonFormObject;
  liveFormData: any;
  formIsValid: any;
  formValidationErrors: any;

  constructor() {
  }

  get prettyValidationErrors() {
    if (!this.formValidationErrors) return null;
    let prettyValidationErrors = '';
    for (let error of this.formValidationErrors) {
      prettyValidationErrors += (error.dataPath.length ?
        error.dataPath.slice(1) + ' ' + error.message : error.message) + '\n';
    }
    return prettyValidationErrors;
  }

  isValid(data: any) {
    this.formIsValid = data;
  }

  onChanges(data: any) {
    this.liveFormData = data;
  }

  validationErrors(data: any) {
    this.formValidationErrors = data;
  }

  onSubmit(data: any) {
    console.log('submit', data);
  }
}
