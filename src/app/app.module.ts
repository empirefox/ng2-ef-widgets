import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { value as patterns } from 'ng2-ef-inputs/ng2-pattern-input/patterns';
import {
  Ng2AmapInputModule, AMAP_KEY,
  Ng2BgInputModule,
  Ng2FaInputModule, FA_NAMES_SRC, FaNamesSource,
  Ng2SvgPatternInputModule, SVG_PATTERNS,
  Ng2ColorfulInputModule,
  Ng2TriangifyInputModule,
  Ng2QiniuImageInputModule, QiniuConfig, QINIU_CONFIGS, QINIU_HTTP,
  Ng2SmdInputModule
} from 'ng2-ef-inputs';

import { ModalModule } from 'angular2-modal';
import { JsonSchemaFormModule } from 'angular2-json-schema-form/src';
import { EfWidgetsModule } from './ng2-ef-widgets';
import { FormModule } from './form/form.module';
import { AppComponent } from './app.component';

export function faCss1(http: Http) {
  let re = /@font-face\s*\{\s*font-family:\s*'FontAwesome'/;
  let list = document.querySelectorAll('head>style');
  for (let i = 0; i < list.length; ++i) {
    let text = list[i].textContent;
    if (re.test(text)) {
      return Observable.of(text);
    }
  }
  return Observable.of('');
}

export function faCss2(http: Http) {
  let re = /styles\.([a-z0-9-]+\.)?bundle\.css/;
  for (let i = 0; i < document.styleSheets.length; i++) {
    let href = document.styleSheets[i].href;
    if (re.test(href)) {
      return http.get(href).map(res => res.text());
    }
  }
}

export function uptokenUrl(key: string) { return `http://127.0.0.1:9999/qiniu/uptoken/${key}/1`; };
export function listUrl(prefix: string) { return `http://127.0.0.1:9999/qiniu/${prefix}`; };
export function deleteUrl(key: string) { return `http://127.0.0.1:9999/qiniu/${key}`; };
export function profileUptokenUrl(key: string) { return `http://127.0.0.1:9999/qiniu/headtoken/30`; };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    Ng2AmapInputModule.forRoot(),
    Ng2BgInputModule,
    Ng2ColorfulInputModule.forRoot(),
    Ng2FaInputModule.forRoot(),
    Ng2SvgPatternInputModule.forRoot(),
    Ng2QiniuImageInputModule.forRoot(),
    Ng2SmdInputModule.forRoot(),
    Ng2TriangifyInputModule.forRoot(),

    ModalModule.forRoot(),
    JsonSchemaFormModule.forRoot(),
    EfWidgetsModule.forRoot('site', 's/20/'),
    FormModule,
  ],
  providers: [
    { provide: AMAP_KEY, useValue: 'd3f5d8b3b05231fa6a11375492310e3a' },
    { provide: FA_NAMES_SRC, useValue: <FaNamesSource>{ css: faCss1 } },
    { provide: SVG_PATTERNS, useValue: patterns },
    { provide: QINIU_HTTP, useExisting: Http }, // AuthHttp
    {
      provide: QINIU_CONFIGS,
      useValue: <QiniuConfig[]>[
        {
          name: 'site',
          bucketDomain: 'http://7xtjjx.com2.z0.glb.qiniucdn.com/',
          thumbnailStyle: '-48x48',
          uptokenUrl,
          listUrl,
          deleteUrl,
        },
        {
          name: 'profile',
          bucketDomain: 'http://7xtjjx.com2.z0.glb.qiniucdn.com/',
          thumbnailStyle: '-48x48',
          cacheUptoken: true,
          uptokenUrl: profileUptokenUrl,
          // Not used
          // listUrl: (prefix: string) => `http://127.0.0.1:9999/qiniu/list/${prefix}`,
          // deleteUrl: (key: string) => `http://127.0.0.1:9999/qiniu/delete/${key}`,
        },
      ],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
