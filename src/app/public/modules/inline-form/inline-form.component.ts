import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  SkyInlineFormCloseArgs
} from './';

@Component({
  selector: 'sky-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyInlineFormComponent {

  @Output()
  public closed = new EventEmitter<SkyInlineFormCloseArgs>();

  @Input()
  public showDeleteButton = false;

  public onDoneClick() {
    this.closeWithReason('save');
  }

  public onDeleteClick() {
    this.closeWithReason('delete');
  }

  public onCancelClick() {
    this.closeWithReason('cancel');
  }

  private closeWithReason(reason: string) {
    const args: SkyInlineFormCloseArgs = {
      reason: reason
    };
    this.closed.emit(args);
    this.closed.complete();
  }

}
