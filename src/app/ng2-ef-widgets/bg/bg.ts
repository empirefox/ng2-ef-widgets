import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'angular2-json-schema-form/src';

@Component({
  selector: 'bg-widget',
  templateUrl: './bg.html',
})
export class BgWidgetComponent implements OnInit {
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  boundControl: boolean = true;
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
