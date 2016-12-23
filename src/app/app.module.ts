import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Ng2AmapInputModule, AMAP_KEY } from 'ng2-amap-input';
import { Ng2BgInputModule } from 'ng2-bg-input';
import { Ng2FaInputModule, FA_NAMES_SRC, FaNamesSource } from 'ng2-fa-input';
import { Ng2SvgPatternInputModule, SVG_PATTERNS } from 'ng2-pattern-input';
import { value as patterns } from 'ng2-pattern-input/patterns';
import { Ng2ColorfulInputModule } from 'ng2-colorful-input';
import { Ng2TriangifyInputModule } from 'ng2-trianglify-input';
import { Ng2QiniuImageInputModule, QiniuConfig } from 'ng2-qiniu-img-input';
import { Ng2SmdInputModule } from 'ng2-smd-input';

import { ModalModule } from 'angular2-modal';
import { JsonSchemaFormModule } from 'angular2-json-schema-form/src';
import { EfWidgetsModule } from './ng2-ef-widgets';
import { FormModule } from './form/form.module';
import { AppComponent } from './app.component';

export function faCss(http: Http) {
  // let re = /@font-face\s*\{\s*font-family:\s*'FontAwesome'/;
  // let list = document.querySelectorAll('head>style');
  // for (let i = 0; i < list.length; ++i) {
  //   let text = list[i].textContent;
  //   if (re.test(text)) {
  //     return Observable.of(text);
  //   }
  // }
  // return Observable.of('');
  let re = /styles\.([a-z0-9-]+\.)?bundle\.css/;
  for (let i = 0; i < document.styleSheets.length; i++) {
    let href = document.styleSheets[i].href;
    if (re.test(href)) {
      return http.get(href).map(res => res.text());
    }
  }
}

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
    EfWidgetsModule.forRoot(),
    FormModule,
  ],
  providers: [
    { provide: AMAP_KEY, useValue: 'd3f5d8b3b05231fa6a11375492310e3a' },
    { provide: FA_NAMES_SRC, useValue: <FaNamesSource>{ css: faCss } },
    { provide: SVG_PATTERNS, useValue: patterns },
    {
      provide: QiniuConfig,
      useValue: {
        uptokenUrl: 'http://127.0.0.1:9999/uptoken',
        listUrl: 'http://127.0.0.1:9999/list',
        deleteUrl: 'http://127.0.0.1:9999/delete',
        bucketDomain: 'http://7xtjjx.com2.z0.glb.qiniucdn.com/',
        thumbnailStyle: '-48x48',
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
