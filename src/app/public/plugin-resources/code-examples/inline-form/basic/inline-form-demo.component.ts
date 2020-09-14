import {
  Component
} from '@angular/core';

import {
  SkyInlineFormButtonLayout,
  SkyInlineFormCloseArgs,
  SkyInlineFormConfig
} from '@skyux/inline-form';

@Component({
  selector: 'app-inline-form-demo',
  templateUrl: './inline-form-demo.component.html'
})
export class InlineFormDemoComponent {

  public demoModel: {
    title?: string;
  } = { };

  public inlineFormConfig: SkyInlineFormConfig = {
    buttonLayout: SkyInlineFormButtonLayout.SaveCancel
  };

  public showForm: boolean = false;

  public title: string = 'My inline form title';

  constructor() {
    this.demoModel.title = this.title;
  }

  public onInlineFormClose(args: SkyInlineFormCloseArgs): void {
    if (args.reason === 'save') {
      this.title = this.demoModel.title;
    }

    this.showForm = false;
  }

}
