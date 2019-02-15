import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  skySlideDissolve
} from '../../public/modules/inline-form/animations';

import {
  SkyInlineFormConfig,
  SkyInlineFormType
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
  public activeRepeaterItemId: string;
  public repeaterData = [
    { id: '1', title: 'Octopus\'s Garden', note: 'Written by Ringo Starr' },
    { id: '2', title: 'With a Little Help from My Friends', note: 'Written by Paul McCartney and John Lennon' },
    { id: '3', title: 'While my Guitar Gently Weeps', note: 'Written by George Harrison' }
  ];
  public editConfig: SkyInlineFormConfig = {
    type: SkyInlineFormType.SaveDeleteCancel
  };
  public customConfig: SkyInlineFormConfig = {
    type: SkyInlineFormType.Custom,
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

  public onClose(event: any) {
    console.log(event);
  }

  public onRepeaterInlineFormClose(event: any) {
    this.activeRepeaterItemId = undefined;
  }

}
