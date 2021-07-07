import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyInlineFormComponent
} from './inline-form.component';

import {
  SkyInlineFormForRootCompatModule
} from '../shared/inline-form-for-root-compat.module';

import {
  SkyInlineFormResourcesModule
} from '../shared/inline-form-resources.module';

@NgModule({
  declarations: [
    SkyInlineFormComponent
  ],
  imports: [
    CommonModule,
    SkyInlineFormForRootCompatModule,
    SkyInlineFormResourcesModule
  ],
  exports: [
    SkyInlineFormComponent
  ]
})
export class SkyInlineFormModule { }
