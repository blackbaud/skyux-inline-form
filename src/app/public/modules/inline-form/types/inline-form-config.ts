import {
  SkyInlineFormType
} from './inline-form-type';

import {
  SkyInlineFormButtonConfig
} from './inline-form-button-config';

export interface SkyInlineFormConfig {
  type: SkyInlineFormType;
  buttons?: SkyInlineFormButtonConfig[];
}
