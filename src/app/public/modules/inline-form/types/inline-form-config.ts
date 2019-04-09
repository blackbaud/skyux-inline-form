import {
  SkyInlineFormButtonLayout
} from './inline-form-button-layout';

import {
  SkyInlineFormButtonConfig
} from './inline-form-button-config';

export interface SkyInlineFormConfig {
  buttonLayout: SkyInlineFormButtonLayout;
  buttons?: SkyInlineFormButtonConfig[];
}
