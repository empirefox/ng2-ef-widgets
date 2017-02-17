import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const jsonFormObject = require('./asf-simple.json');

@Component({
  selector: 'jsf-component',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './jsf.html',
  styleUrls: ['./jsf.scss']
})
export class Jsf {
  options: Observable<any>;
  schema = jsonFormObject.schema;
  layout = jsonFormObject.form;
  liveFormData: any;
  formIsValid: any;
  formValidationErrors: any;

  constructor() {
  }

  ngOnInit() {
    this.options = Observable.of({
      qiniuData: { siteid: 20 },
    });
  }

  get prettyValidationErrors() {
    if (!this.formValidationErrors) { return null; }
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
