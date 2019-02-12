import {
  NgModule
} from '@angular/core';

import {
  SkyRepeaterModule
} from '@blackbaud/skyux/dist/modules/repeater';

import {
  SkyTilesModule
} from '@blackbaud/skyux/dist/modules/tiles';

import {
  SkyInlineFormModule
} from './public';

import {
  SkyTileDemoTileComponent
} from './visual/inline-form/inline-form-demo-tile.component';

@NgModule({
  imports: [
    SkyInlineFormModule,
    SkyRepeaterModule,
    SkyTilesModule
  ],
  exports: [
    SkyInlineFormModule,
    SkyRepeaterModule,
    SkyTilesModule
  ],
  providers: [],
  entryComponents: [
    SkyTileDemoTileComponent
  ]
})
export class AppExtrasModule { }
