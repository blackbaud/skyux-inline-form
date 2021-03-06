import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

import {
  SkyTileDemoTileComponent
} from './inline-form-demo-tile.component';

import {
  SkyInlineFormButtonLayout,
  SkyInlineFormConfig
} from '../../public/public_api';

@Component({
  selector: 'sky-inline-form-demo',
  templateUrl: './inline-form-demo.component.html',
  styleUrls: ['./inline-form-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(public themeSvc: SkyThemeService) { }

  public onClose(event: any): void {
    console.log(event);
  }

  public onChangeButtonConfigClick(): void {
    this.customConfig = {
      buttonLayout: SkyInlineFormButtonLayout.Custom,
      buttons: [
        {
          action: 'cancel',
          styleType: 'link',
          text: 'Yesterday, you said tomorrow.'
        }
      ]
    };
  }

  public onDisableButtonClick(): void {
    this.customConfig = {
      buttonLayout: SkyInlineFormButtonLayout.Custom,
      buttons: [
        { action: 'save', text: 'Save', styleType: 'primary', disabled: true },
        { action: 'cancel', text: 'Cancel', styleType: 'link' }
      ]
    };
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}
