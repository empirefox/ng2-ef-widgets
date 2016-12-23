import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Ng2AmapInputModule } from 'ng2-amap-input';
import { Ng2BgInputModule } from 'ng2-bg-input';
import { Ng2FaInputModule } from 'ng2-fa-input';
import { Ng2SvgPatternInputModule } from 'ng2-pattern-input';
import { Ng2ColorfulInputModule } from 'ng2-colorful-input';
import { Ng2TriangifyInputModule } from 'ng2-trianglify-input';
import { Ng2QiniuImageInputModule } from 'ng2-qiniu-img-input';
import { Ng2SmdInputModule } from 'ng2-smd-input';

import { JsonSchemaFormModule, WidgetLibraryService, FrameworkLibraryService } from 'angular2-json-schema-form/src';
import { Bootstrap3Component } from 'angular2-json-schema-form/src/frameworks/bootstrap-3.component';

import { BgWidgetComponent } from './bg/bg';
import { FaWidgetComponent } from './fa/fa';
import { ImgWidgetComponent } from './img/img';
import { SmdWidgetComponent } from './smd/smd';

export function widgetsInitializer(frameworkLibraryService: FrameworkLibraryService, widgetLibrary: WidgetLibraryService) {
  return () => {
    frameworkLibraryService.setFramework({ framework: Bootstrap3Component });
    widgetLibrary.registerWidget('bg', BgWidgetComponent);
    widgetLibrary.registerWidget('fa', FaWidgetComponent);
    widgetLibrary.registerWidget('img', ImgWidgetComponent);
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
    Ng2QiniuImageInputModule,
    Ng2SmdInputModule,
    Ng2SvgPatternInputModule,
    Ng2TriangifyInputModule,
  ],
  declarations: [BgWidgetComponent, FaWidgetComponent, ImgWidgetComponent, SmdWidgetComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    JsonSchemaFormModule,
    Ng2AmapInputModule,
    Ng2BgInputModule,
    Ng2ColorfulInputModule,
    Ng2FaInputModule,
    Ng2QiniuImageInputModule,
    Ng2SmdInputModule,
    Ng2SvgPatternInputModule,
    Ng2TriangifyInputModule,
    BgWidgetComponent, FaWidgetComponent, ImgWidgetComponent, SmdWidgetComponent,
  ],
})
export class EfWidgetsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EfWidgetsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: widgetsInitializer,
          deps: [FrameworkLibraryService, WidgetLibraryService],
          multi: true,
        },
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [BgWidgetComponent, FaWidgetComponent, ImgWidgetComponent, SmdWidgetComponent],
          multi: true,
        },
      ],
    };
  }

}
