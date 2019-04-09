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
} from '../inline-form-adapter.service';

import {
  SkyInlineFormFixtureComponent
} from './inline-form.fixture';

import {
  SkyInlineFormModule
} from '../inline-form.module';

@NgModule({
  declarations: [
    SkyInlineFormFixtureComponent
  ],
  imports: [
    CommonModule,
    SkyInlineFormModule
  ],
  providers: [
    SkyInlineFormAdapterService,
    SkyAppWindowRef
  ]
})
export class SkyInlineFormFixtureModule { }
