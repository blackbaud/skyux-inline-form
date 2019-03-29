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

import {
  Observable
} from 'rxjs/Observable';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/zip';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  SkyInlineFormButton,
  SkyInlineFormCloseArgs,
  SkyInlineFormType,
  SkyInlineFormConfig,
  SkyInlineFormButtonConfig
} from './types';

import {
  SkyInlineFormAdapterService
} from './inline-form-adapter.service';

import {
  skySlideDissolve
} from './animations';

@Component({
  selector: 'sky-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ skySlideDissolve ]
})
export class SkyInlineFormComponent implements OnInit, OnDestroy {

  @Output()
  public close = new EventEmitter<SkyInlineFormCloseArgs>();

  @Input()
  public config: SkyInlineFormConfig;

  @Input()
  public template: TemplateRef<any>;

  @Input()
  set showForm(value: boolean) {
    this._showForm = value;

    if (value) {
      window.setTimeout(() => this.adapter.applyAutofocus(this.elementRef));
    }
  }

  get showForm() {
    return this._showForm;
  }

  public buttons: SkyInlineFormButton[];

  private _showForm: boolean = false;

  constructor(
    private adapter: SkyInlineFormAdapterService,
    private elementRef: ElementRef,
    private resourcesService: SkyLibResourcesService
  ) {}

  public ngOnInit(): void {
    if (this.isValidCustomConfig(this.config)) {
      this.buttons = this.getCustomButtons(this.config.buttons);
    } else {
      this.getPresetButtons().subscribe((buttons: SkyInlineFormButton[]) => {
        this.buttons = buttons;
      });
    }
  }

  public ngOnDestroy() {
    this.close.complete();
  }

  public closeInlineForm(event: SkyInlineFormButton) {
    const args: SkyInlineFormCloseArgs = {
      reason: event.action
    };
    this.close.emit(args);
  }

  private getPresetButtons(): Observable<SkyInlineFormButton[]> {
    const emitter = new BehaviorSubject<SkyInlineFormButton[]>([]);

    let buttonType =
      this.config ? this.config.type || SkyInlineFormType.DoneCancel : SkyInlineFormType.DoneCancel;

    switch (buttonType) {
      default:
      case SkyInlineFormType.DoneCancel:
        Observable.zip(
          this.resourcesService.getString('skyux_inline_form_button_done'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')
        )
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

      case SkyInlineFormType.SaveCancel:
        Observable.zip(
          this.resourcesService.getString('skyux_inline_form_button_save'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')
        ).subscribe((values: any) => {
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

      case SkyInlineFormType.DoneDeleteCancel:
        Observable.zip(
          this.resourcesService.getString('skyux_inline_form_button_done'),
          this.resourcesService.getString('skyux_inline_form_button_delete'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')

        )
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

      case SkyInlineFormType.SaveDeleteCancel:
        Observable.zip(
          this.resourcesService.getString('skyux_inline_form_button_save'),
          this.resourcesService.getString('skyux_inline_form_button_delete'),
          this.resourcesService.getString('skyux_inline_form_button_cancel')

        )
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

  private getCustomButtons(buttonConfig: SkyInlineFormButtonConfig[]): SkyInlineFormButton[] {
    const buttons: SkyInlineFormButton[] = [];

    buttonConfig.forEach((config: SkyInlineFormButtonConfig) => {
      buttons.push({
        text: config.text,
        action: config.action,
        styleType: config.styleType || 'default'
      } as SkyInlineFormButton);
    });

    return buttons;
  }

  private isValidCustomConfig(config: SkyInlineFormConfig): boolean {
    return (
      config
      && config.type === SkyInlineFormType.Custom
      && config.buttons.length > 0
    );
  }

}
