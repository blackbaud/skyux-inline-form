import {
  Component
} from '@angular/core';

import {
  SkyInlineFormCloseArgs,
  SkyInlineFormConfig
} from '../types';

@Component({
  selector: 'sky-inline-form-fixture',
  templateUrl: './inline-form.fixture.html'
})
export class SkyInlineFormFixtureComponent {

  public config: SkyInlineFormConfig;

  public closed(event: SkyInlineFormCloseArgs) {

  }
}
