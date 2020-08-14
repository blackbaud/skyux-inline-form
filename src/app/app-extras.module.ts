import {
  NgModule
} from '@angular/core';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyTilesModule
} from '@skyux/tiles';

import {
  SkyInlineFormModule
} from './public/public_api';

import {
  SkyTileDemoTileComponent
} from './visual/inline-form/inline-form-demo-tile.component';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyDocsToolsModule,
    SkyIconModule,
    SkyInlineFormModule,
    SkyTilesModule
  ],
  entryComponents: [
    SkyTileDemoTileComponent
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-inline-form',
        packageName: '@skyux/inline-form'
      }
    }
  ]
})
export class AppExtrasModule { }
