import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { template } from 'lodash-es';
import { JsonSchemaFormService } from 'angular2-json-schema-form/src';
import { Qiniu, QiniuService } from 'ng2-ef-inputs/ng2-qiniu-img-input';
import { WidgetsService } from '../widgets.service';

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
  controlDisabled = false;
  boundControl = false;
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
    const qiniuData = this.jsf.globalOptions.qiniuData;
    const qiniu = (this.options && this.options.qiniu) || this.widgetsService.qiniuConfigName;
    return this.qiniuService.get(qiniuData ? template(qiniu)(qiniuData) : qiniu);
  }

  get prefix() {
    const qiniuData = this.jsf.globalOptions.qiniuData;
    const prefix = (this.options && this.options.prefix) || this.widgetsService.qiniuPrefix;
    return qiniuData ? template(prefix)(qiniuData) : prefix;
  }

  updateValue(event) {
    this.jsf.updateValue(this, event);
  }
}
