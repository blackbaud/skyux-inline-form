import {
  NgModule
} from '@angular/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyRepeaterModule
} from '@skyux/lists';

import {
  SkyTilesModule
} from '@skyux/tiles';

import {
  SkyInlineFormAdapterService,
  SkyInlineFormModule
} from './public';

import {
  SkyTileDemoTileComponent
} from './visual/inline-form/inline-form-demo-tile.component';

@NgModule({
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
