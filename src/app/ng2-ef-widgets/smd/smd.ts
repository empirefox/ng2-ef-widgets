import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'angular2-json-schema-form/src';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { template } from 'lodash-es';
import { StackFa } from 'fa-tool';
import { QiniuService, QiniuImageService, FaSelectService, MdeCallback } from 'ng2-ef-inputs';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'ng2sf-smd-input',
  templateUrl: './smd.html',
})
export class SmdWidgetComponent implements OnInit {
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
    public modal: Modal,
    public widgetsService: WidgetsService,
    @Optional() private qiniuService: QiniuService,
    @Optional() private qiniuImageService: QiniuImageService,
    @Optional() private faSelectService: FaSelectService,
    private jsf: JsonSchemaFormService) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event);
  }

  onFullscreen(on: boolean) {
    let item, i = 0;
    const zlist = document.querySelectorAll('div.al-main');
    if (zlist) {
      if (on) {
        for (i = 0; i < zlist.length; ++i) {
          item = zlist[i];
          item.zindex = item.style.zIndex;
          item.style.zIndex = 1004;
        }
      } else {
        for (i = 0; i < zlist.length; ++i) {
          item = zlist[i];
          item.style.zIndex = item.zindex || 'auto';
        }
      }
    }
  }

  onAddLink(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddImage(cb: MdeCallback) {
    const qiniuData = this.jsf.globalOptions.qiniuData;
    let qiniu = (this.options && this.options.qiniu) || this.widgetsService.qiniuConfigName;
    let prefix = (this.options && this.options.prefix) || this.widgetsService.qiniuPrefix;
    qiniu = qiniuData ? template(qiniu)(qiniuData) : qiniu;
    prefix = qiniuData ? template(prefix)(qiniuData) : prefix;
    this.qiniuImageService.open(qiniu, prefix).then(dialog => dialog.result.then((src: string) => cb(src)));
  }

  onAddVideo(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddMaps(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddFa(cb: MdeCallback) {
    this.faSelectService.open().then(dialog => dialog.result.then((fa: StackFa) => fa && cb(fa.text())));
  }

  onAddEmoji(cb: MdeCallback) {
    this.prompt((text: string) => cb(text.startsWith(':') ? text : `:${text}:`));
  }

  prompt(cb: MdeCallback) {
    this.modal.prompt()
      .size('lg')
      .title('A simple Prompt style modal window')
      .body('Please type a value!')
      .open().then(dialog => dialog.result.then((text: string) => text && cb(text)));
  }
}
