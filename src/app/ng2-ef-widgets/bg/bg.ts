import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { JsonSchemaFormService } from 'angular2-json-schema-form/src';
import { Qiniu, QiniuService } from 'ng2-ef-inputs/ng2-qiniu-img-input';
import { WidgetsService } from '../widgets.service';

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

  constructor(
    private qiniuService: QiniuService,
    private jsf: JsonSchemaFormService,
    public widgetsService: WidgetsService) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  get qiniu(): Qiniu {
    let qiniuData = this.jsf.globalOptions.qiniuData;
    let qiniu = (this.options && this.options.qiniu) || this.widgetsService.qiniuConfigName;
    return this.qiniuService.get(qiniuData ? _.template(qiniu)(qiniuData) : qiniu);
  }

  get prefix() {
    let qiniuData = this.jsf.globalOptions.qiniuData;
    let prefix = (this.options && this.options.prefix) || this.widgetsService.qiniuPrefix;
    return qiniuData ? _.template(prefix)(qiniuData) : prefix;
  }

  updateValue(event) {
    this.jsf.updateValue(this, event);
  }
}
