import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

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
    SkyInlineFormAdapterService
  ]
})
export class SkyInlineFormFixtureModule { }
