import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'angular2-json-schema-form/src';

@Component({
  selector: 'img-widget',
  templateUrl: './img.html',
})
export class ImgWidgetComponent implements OnInit {
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;

  constructor(private jsf: JsonSchemaFormService) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event);
  }
}
