import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  Ng2AmapInputModule,
  Ng2BgInputModule,
  Ng2FaInputModule,
  Ng2PhoneInputModule,
  Ng2SvgPatternInputModule,
  Ng2ColorfulInputModule,
  Ng2TriangifyInputModule,
  Ng2QiniuImageInputModule,
  Ng2SmdInputModule,
} from 'ng2-ef-inputs';

import { JsonSchemaFormModule, WidgetLibraryService, FrameworkLibraryService } from 'angular2-json-schema-form/src';
import { Bootstrap3Component } from 'angular2-json-schema-form/src/frameworks/bootstrap-3.component';

import { BgWidgetComponent } from './bg/bg';
import { FaWidgetComponent } from './fa/fa';
import { ImgWidgetComponent } from './img/img';
import { PhoneWidgetComponent } from './phone/phone';
import { SmdWidgetComponent } from './smd/smd';

import { WidgetsService, WIDGETS_QINIU_CONFIG_NAME, WIDGETS_QINIU_PREFIX } from './widgets.service';

export function widgetsInitializer(frameworkLibraryService: FrameworkLibraryService, widgetLibrary: WidgetLibraryService) {
  return () => {
    frameworkLibraryService.setFramework({ framework: Bootstrap3Component });
    widgetLibrary.registerWidget('bg', BgWidgetComponent);
    widgetLibrary.registerWidget('fa', FaWidgetComponent);
    widgetLibrary.registerWidget('img', ImgWidgetComponent);
    widgetLibrary.registerWidget('phone', PhoneWidgetComponent);
    widgetLibrary.registerWidget('smd', SmdWidgetComponent);
  };
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    JsonSchemaFormModule,
    Ng2AmapInputModule,
    Ng2BgInputModule,
    Ng2ColorfulInputModule,
    Ng2FaInputModule,
    Ng2PhoneInputModule,
    Ng2QiniuImageInputModule,
    Ng2SmdInputModule,
    Ng2SvgPatternInputModule,
    Ng2TriangifyInputModule,
  ],
  declarations: [BgWidgetComponent, FaWidgetComponent, ImgWidgetComponent, PhoneWidgetComponent, SmdWidgetComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    JsonSchemaFormModule,
    Ng2AmapInputModule,
    Ng2BgInputModule,
    Ng2ColorfulInputModule,
    Ng2FaInputModule,
    Ng2PhoneInputModule,
    Ng2QiniuImageInputModule,
    Ng2SmdInputModule,
    Ng2SvgPatternInputModule,
    Ng2TriangifyInputModule,
    BgWidgetComponent, FaWidgetComponent, ImgWidgetComponent, PhoneWidgetComponent, SmdWidgetComponent,
  ],
})
export class EfWidgetsModule {

  static forRoot(qiniuConfigName = 'default', qiniuPrefix = ''): ModuleWithProviders {
    return {
      ngModule: EfWidgetsModule,
      providers: [
        WidgetsService,
        {
          provide: WIDGETS_QINIU_CONFIG_NAME,
          useValue: qiniuConfigName,
        },
        {
          provide: WIDGETS_QINIU_PREFIX,
          useValue: qiniuPrefix,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: widgetsInitializer,
          deps: [FrameworkLibraryService, WidgetLibraryService],
          multi: true,
        },
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [BgWidgetComponent, FaWidgetComponent, ImgWidgetComponent, PhoneWidgetComponent, SmdWidgetComponent],
          multi: true,
        },
      ],
    };
  }

}
