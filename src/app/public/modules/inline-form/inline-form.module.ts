import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyInlineFormComponent
} from './inline-form.component';

import {
  SkyInlineFormResourcesModule
} from '../shared';

@NgModule({
  declarations: [
    SkyInlineFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyInlineFormResourcesModule
  ],
  exports: [
    SkyInlineFormComponent
  ]
})
export class SkyInlineFormModule { }
