import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyInlineFormModule
} from '@skyux/inline-form';

import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyTilesModule
} from '@skyux/tiles';

import {
  InlineFormDemoComponent
} from './inline-form-demo.component';

import {
  InlineFormTileDemoComponent
} from './inline-form-tile-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SkyFluidGridModule,
    SkyTilesModule,
    SkyIconModule,
    SkyInlineFormModule
  ],
  exports: [
    InlineFormDemoComponent
  ],
  declarations: [
    InlineFormDemoComponent,
    InlineFormTileDemoComponent
  ],
  entryComponents: [
    InlineFormTileDemoComponent
  ]
})
export class InlineFormDemoModule { }
