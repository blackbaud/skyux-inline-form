import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  ElementRef,
  TemplateRef
} from '@angular/core';

import 'rxjs/add/observable/zip';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Observable
} from 'rxjs/Observable';

import {
  SkyAppWindowRef
} from '@skyux/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  skySlideDissolve
} from './animations';

import {
  SkyInlineFormAdapterService
} from './inline-form-adapter.service';

import {
  SkyInlineFormCloseArgs,
  SkyInlineFormButtonLayout,
  SkyInlineFormConfig,
  SkyInlineFormButtonConfig
} from './types';

@Component({
  selector: 'sky-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ skySlideDissolve ]
})
export class SkyInlineFormComponent implements OnInit, OnDestroy {

  @Input()
  public config: SkyInlineFormConfig;

  @Input()
  public template: TemplateRef<any>;

  @Input()
  public set showForm(value: boolean) {
    this._showForm = value;

    if (value) {
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

  private _showForm: boolean = false;

  constructor(
    private adapter: SkyInlineFormAdapterService,
    private elementRef: ElementRef,
    private resourcesService: SkyLibResourcesService,
    private skyAppWindowRef: SkyAppWindowRef
  ) {}

  public ngOnInit(): void {
    if (this.isValidCustomConfig(this.config)) {
      this.buttons = this.getCustomButtons(this.config.buttons);
    } else {
      this.getPresetButtons().subscribe((buttons: SkyInlineFormButtonConfig[]) => {
        this.buttons = buttons;
      });
    }
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

  private getPresetButtons(): Observable<SkyInlineFormButtonConfig[]> {
    const emitter = new BehaviorSubject<SkyInlineFormButtonConfig[]>([]);

    let buttonType =
      this.config ? this.config.buttonLayout || SkyInlineFormButtonLayout.DoneCancel : SkyInlineFormButtonLayout.DoneCancel;

    switch (buttonType) {
      default:
      case SkyInlineFormButtonLayout.DoneCancel:
        Observable
          .zip(
            this.resourcesService.getString('skyux_inline_form_button_done'),
            this.resourcesService.getString('skyux_inline_form_button_cancel')
          )
          .take(1)
          .subscribe((values: any) => {
            emitter.next([
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
        break;

      case SkyInlineFormButtonLayout.SaveCancel:
        Observable
          .zip(
            this.resourcesService.getString('skyux_inline_form_button_save'),
            this.resourcesService.getString('skyux_inline_form_button_cancel')
          )
          .take(1)
          .subscribe((values: any) => {
            emitter.next([
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
        break;

      case SkyInlineFormButtonLayout.DoneDeleteCancel:
        Observable
          .zip(
            this.resourcesService.getString('skyux_inline_form_button_done'),
            this.resourcesService.getString('skyux_inline_form_button_delete'),
            this.resourcesService.getString('skyux_inline_form_button_cancel')
          )
          .take(1)
          .subscribe((values: any) => {
            emitter.next([
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
        break;

      case SkyInlineFormButtonLayout.SaveDeleteCancel:
        Observable
          .zip(
            this.resourcesService.getString('skyux_inline_form_button_save'),
            this.resourcesService.getString('skyux_inline_form_button_delete'),
            this.resourcesService.getString('skyux_inline_form_button_cancel')
          )
          .take(1)
          .subscribe((values: any) => {
            emitter.next([
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
        break;
    }

    return emitter;
  }

  private getCustomButtons(buttonConfigs: SkyInlineFormButtonConfig[]): SkyInlineFormButtonConfig[] {
    const buttons: SkyInlineFormButtonConfig[] = [];

    buttonConfigs.forEach((config: SkyInlineFormButtonConfig) => {
      buttons.push({
        text: config.text,
        action: config.action,
        styleType: config.styleType || 'default'
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
