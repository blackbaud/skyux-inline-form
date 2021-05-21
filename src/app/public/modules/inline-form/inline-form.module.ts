import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyAppWindowRef
} from '@skyux/core';

import {
  SkyInlineFormAdapterService
} from './inline-form-adapter.service';

import {
  SkyInlineFormComponent
} from './inline-form.component';

import {
  SkyInlineFormResourcesModule
} from '../shared/inline-form-resources.module';

@NgModule({
  declarations: [
    SkyInlineFormComponent
  ],
  imports: [
    CommonModule,
    SkyInlineFormResourcesModule
  ],
  exports: [
    SkyInlineFormComponent
  ],
  providers: [
    SkyAppWindowRef,
    SkyInlineFormAdapterService
  ]
})
export class SkyInlineFormModule { }
