import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EfWidgetsModule } from '../ng2-ef-widgets';
import { Jsf } from './jsf';

@NgModule({
  imports: [
    CommonModule,
    EfWidgetsModule,
  ],
  declarations: [Jsf],
  exports: [
    EfWidgetsModule,
    Jsf,
  ],
})
export class FormModule { }
