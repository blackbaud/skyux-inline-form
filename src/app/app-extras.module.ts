import {
  NgModule
} from '@angular/core';

import {
  SkyIconModule
} from '@blackbaud/skyux/dist/modules/icon';

import {
  SkyRepeaterModule
} from '@blackbaud/skyux/dist/modules/repeater';

import {
  SkyTilesModule
} from '@blackbaud/skyux/dist/modules/tiles';

import {
  SkyInlineFormAdapterService,
  SkyInlineFormModule
} from './public';

import {
  SkyTileDemoTileComponent
} from './visual/inline-form/inline-form-demo-tile.component';

@NgModule({
  imports: [
    SkyIconModule,
    SkyInlineFormModule,
    SkyRepeaterModule,
    SkyTilesModule
  ],
  exports: [
    SkyIconModule,
    SkyInlineFormModule,
    SkyRepeaterModule,
    SkyTilesModule
  ],
  providers: [
    SkyInlineFormAdapterService
  ],
  entryComponents: [
    SkyTileDemoTileComponent
  ]
})
export class AppExtrasModule { }
