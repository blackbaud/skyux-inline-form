import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualComponent } from './visual.component';
import { SkyInlineFormDemoComponent } from './inline-form/inline-form-demo.component';
import { SkyTileDemoTileComponent } from './inline-form/inline-form-demo-tile.component';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyTilesModule } from '@skyux/tiles';
import { SkyInlineFormModule } from 'projects/inline-form/src/public-api';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SkyInlineFormDemoComponent,
    SkyTileDemoTileComponent,
    VisualComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyE2eThemeSelectorModule,
    SkyInlineFormModule,
    SkyTilesModule,
  ],
})
export class VisualModule {}
