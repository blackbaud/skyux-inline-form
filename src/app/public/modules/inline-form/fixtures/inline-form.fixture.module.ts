import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyInlineFormForRootCompatModule
} from '../../shared/inline-form-for-root-compat.module';

import {
  SkyInlineFormModule
} from '../inline-form.module';

import {
  SkyInlineFormFixtureComponent
} from './inline-form.fixture';

@NgModule({
  declarations: [
    SkyInlineFormFixtureComponent
  ],
  imports: [
    CommonModule,
    SkyInlineFormForRootCompatModule,
    SkyInlineFormModule
  ]
})
export class SkyInlineFormFixtureModule { }
