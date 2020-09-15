import {
  Component
} from '@angular/core';

import {
  SkyInlineFormCloseArgs
} from '@skyux/inline-form';

@Component({
  selector: 'app-inline-form-tile-demo',
  templateUrl: './inline-form-tile-demo.component.html'
})
export class InlineFormTileDemoComponent {

  public demoModel: {
    description?: string;
  } = {};

  public description: string = 'My event description';

  public showForm: boolean = false;

  constructor() {
    this.demoModel.description = this.description;
  }

  public onInlineFormClose(args: SkyInlineFormCloseArgs): void {
    if (args.reason === 'save') {
      this.description = this.demoModel.description;
    }

    this.showForm = false;
  }
}
