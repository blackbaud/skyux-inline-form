import {
  NgModule
} from '@angular/core';

import {
  SkyIconModule
} from '@skyux/indicators';

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
