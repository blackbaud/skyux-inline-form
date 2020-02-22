import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

import {
  SkyAppWindowRef
} from '@skyux/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  zip as observableZip
} from 'rxjs';

import {
  take
} from 'rxjs/operators';

import {
  skySlideDissolve
} from './animations/slide-dissolve';

import {
  SkyInlineFormButtonConfig
} from './types/inline-form-button-config';

import {
  SkyInlineFormButtonLayout
} from './types/inline-form-button-layout';

import {
  SkyInlineFormCloseArgs
} from './types/inline-form-close-args';

import {
  SkyInlineFormConfig
} from './types/inline-form-config';

import {
  SkyInlineFormAdapterService
} from './inline-form-adapter.service';

@Component({
  selector: 'sky-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ skySlideDissolve ]
})
export class SkyInlineFormComponent implements OnInit, OnDestroy {

  @Input()
  public set config(value: SkyInlineFormConfig) {
    if (value !== this._config) {
      this._config = value;
      this.setupButtons();
    }
  }

  public get config(): SkyInlineFormConfig {
    return this._config;
  }

  @Input()
  public template: TemplateRef<any>;

  @Input()
  public set showForm(value: boolean) {
    this._showForm = value;

    if (value) {
      // setTimeout() prevents applyAutofocus() from firing
      // until after *ngIf has added the form element to the DOM.
      this.skyAppWindowRef.nativeWindow.setTimeout(() => {
        this.adapter.applyAutofocus(this.elementRef);
      });
    }
  }

  public get showForm() {
    return this._showForm;
  }

  @Output()
  public close = new EventEmitter<SkyInlineFormCloseArgs>();

  public buttons: SkyInlineFormButtonConfig[];

  private _config: SkyInlineFormConfig;

  private _showForm: boolean = false;

  constructor(
    private adapter: SkyInlineFormAdapterService,
    private elementRef: ElementRef,
    private resourcesService: SkyLibResourcesService,
    private skyAppWindowRef: SkyAppWindowRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.setupButtons();
  }

  public ngOnDestroy(): void {
    this.close.complete();
  }

  public closeInlineForm(event: SkyInlineFormButtonConfig): void {
    const args: SkyInlineFormCloseArgs = {
      reason: event.action
    };
    this.close.emit(args);
  }

  private setupButtons(): void {
    if (this.isValidCustomConfig(this.config)) {
      this.buttons = this.getCustomButtons(this.config.buttons);
      this.changeDetectorRef.markForCheck();
      return;
    }

    this.getPresetButtons().then((buttons) => {
      this.buttons = buttons;
      this.changeDetectorRef.markForCheck();
    });
  }

  private getPresetButtons(): Promise<SkyInlineFormButtonConfig[]> {
    let buttonType =
      this.config ? this.config.buttonLayout || SkyInlineFormButtonLayout.DoneCancel : SkyInlineFormButtonLayout.DoneCancel;

    let promise: Promise<SkyInlineFormButtonConfig[]>;

    switch (buttonType) {
      /* istanbul ignore next */
      default:
      case SkyInlineFormButtonLayout.DoneCancel:
        observableZip(
          this.resourcesService.getString('skyux_inline_form_button_done'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')
        )
          .pipe(take(1))
          .subscribe((values: any) => {
            promise = new Promise<SkyInlineFormButtonConfig[]>((resolve: any) => {
              resolve([
                {
                  text: values[0],
                  styleType: 'primary',
                  action: 'done'
                },
                {
                  text: values[1],
                  styleType: 'link',
                  action: 'cancel'
                }
              ]);
            });
          });
        break;

      case SkyInlineFormButtonLayout.SaveCancel:
        observableZip(
          this.resourcesService.getString('skyux_inline_form_button_save'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')
        )
          .pipe(take(1))
          .subscribe((values: any) => {
            promise = new Promise<SkyInlineFormButtonConfig[]>((resolve: any) => {
              resolve([
                {
                  text: values[0],
                  styleType: 'primary',
                  action: 'save'
                },
                {
                  text: values[1],
                  styleType: 'link',
                  action: 'cancel'
                }
              ]);
            });
          });
        break;

      case SkyInlineFormButtonLayout.DoneDeleteCancel:
        observableZip(
          this.resourcesService.getString('skyux_inline_form_button_done'),
          this.resourcesService.getString('skyux_inline_form_button_delete'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')
        )
          .pipe(take(1))
          .subscribe((values: any) => {
            promise = new Promise<SkyInlineFormButtonConfig[]>((resolve: any) => {
              resolve([
                {
                  text: values[0],
                  styleType: 'primary',
                  action: 'done'
                },
                {
                  text: values[1],
                  styleType: 'default',
                  action: 'delete'
                },
                {
                  text: values[2],
                  styleType: 'link',
                  action: 'cancel'
                }
              ]);
            });
          });
        break;

      case SkyInlineFormButtonLayout.SaveDeleteCancel:
        observableZip(
          this.resourcesService.getString('skyux_inline_form_button_save'),
          this.resourcesService.getString('skyux_inline_form_button_delete'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')
        )
          .pipe(take(1))
          .subscribe((values: any) => {
            promise = new Promise<SkyInlineFormButtonConfig[]>((resolve: any) => {
              resolve([
              {
                text: values[0],
                styleType: 'primary',
                action: 'save'
              },
              {
                text: values[1],
                styleType: 'default',
                action: 'delete'
              },
              {
                text: values[2],
                styleType: 'link',
                action: 'cancel'
              }
            ]);
          });
        });
      break;
    }

    return promise;
  }

  private getCustomButtons(buttonConfigs: SkyInlineFormButtonConfig[]): SkyInlineFormButtonConfig[] {
    const buttons: SkyInlineFormButtonConfig[] = [];

    buttonConfigs.forEach((config: SkyInlineFormButtonConfig) => {
      buttons.push({
        action: config.action,
        disabled: config.disabled,
        styleType: config.styleType || 'default',
        text: config.text
      } as SkyInlineFormButtonConfig);
    });

    return buttons;
  }

  private isValidCustomConfig(config: SkyInlineFormConfig): boolean {
    return (
      config &&
      config.buttonLayout === SkyInlineFormButtonLayout.Custom &&
      config.buttons.length > 0
    );
  }

}
