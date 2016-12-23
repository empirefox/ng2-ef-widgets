import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'angular2-json-schema-form/src';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { QiniuImageService } from 'ng2-qiniu-img-input';
import { StackFa } from 'fa-tool';
import { FaSelectService } from 'ng2-fa-input';
import { MdeCallback } from 'ng2-smd-input';

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
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;

  constructor(
    public modal: Modal,
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
    let zlist = document.querySelectorAll('div.al-main');
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
    this.qiniuImageService.open().then(dialog => dialog.result.then((src: string) => cb(src)));
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
