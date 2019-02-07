import {
  Component
} from '@angular/core';

import {
  SkyInlineFormCloseArgs
} from '../inline-form-close-args';

@Component({
  selector: 'sky-inline-form-fixture',
  templateUrl: './inline-form.fixture.html'
})
export class SkyInlineFormFixtureComponent {

  public showDeleteButton = false;

  public closed(event: SkyInlineFormCloseArgs) {

  }
}
