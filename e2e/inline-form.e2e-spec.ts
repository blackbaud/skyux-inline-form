import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Inline form', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/inline-form');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should match previous screenshot for add mode', (done) => {
    SkyHostBrowser.scrollTo('#inline-form-add');
    expect('#inline-form-add').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-form-add'
    });
  });

  it('should match previous screenshot for add mode (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#inline-form-add');
    expect('#inline-form-add').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-form-add-xs'
    });
  });

  it('should match previous screenshot for edit mode', (done) => {
    SkyHostBrowser.scrollTo('#inline-form-edit');
    expect('#inline-form-edit').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-form-edit'
    });
  });

  it('should match previous screenshot for edit mode (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#inline-form-edit');
    expect('#inline-form-edit').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-form-edit-xs'
    });
  });

});
