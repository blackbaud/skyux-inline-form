import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  skySlideDissolve
} from '../../public/modules/inline-form/animations';

import {
  SkyInlineFormConfig,
  SkyInlineFormButtonLayout
} from '../../public/modules/inline-form/types';

import {
  SkyTileDemoTileComponent
} from './inline-form-demo-tile.component';

@Component({
  selector: 'sky-inline-form-demo',
  templateUrl: './inline-form-demo.component.html',
  styleUrls: ['./inline-form-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ skySlideDissolve ]
})
export class SkyInlineFormDemoComponent {
  public showInlineForm1 = false;
  public showInlineForm2 = false;
  public showInlineForm3 = false;

  public editConfig: SkyInlineFormConfig = {
    buttonLayout: SkyInlineFormButtonLayout.SaveDeleteCancel
  };

  public customConfig: SkyInlineFormConfig = {
    buttonLayout: SkyInlineFormButtonLayout.Custom,
    buttons: [
      { action: 'save', text: 'Do it!', styleType: 'primary' },
      { action: 'done', text: 'Don\'t let your dreams be dreams.', styleType: 'default' },
      { action: 'cancel', text: 'Yesterday, you said tomorrow.', styleType: 'link' },
      { action: 'save', text: 'Just do it! ', styleType: 'primary' }
    ]
  };

  public dashboardConfig = {
    tiles: [
      {
        id: 'tile1',
        componentType: SkyTileDemoTileComponent
      }
    ],
    layout: {
      singleColumn: {
        tiles: [
          {
            id: 'tile1',
            isCollapsed: false
          }
        ]
      },
      multiColumn: [
        {
          tiles: [
            {
              id: 'tile1',
              isCollapsed: false
            }
          ]
        }
      ]
    }
  };

  public onClose(event: any): void {
    console.log(event);
  }

}
