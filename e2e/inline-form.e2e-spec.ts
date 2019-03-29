import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  by,
  element,
  browser
} from 'protractor';

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

  it('should match previous screenshot for tile sections', (done) => {
    SkyHostBrowser.scrollTo('#inline-form-tiles');
    element.all(by.css('#inline-form-tiles .sky-btn')).get(2).click();
    browser.sleep(500);
    expect('#inline-form-tiles').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-form-tiles'
    });
  });

  it('should match previous screenshot for tile sections (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#inline-form-tiles');
    element.all(by.css('#inline-form-tiles .sky-btn')).get(2).click();
    browser.sleep(500);
    expect('#inline-form-tiles').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-form-tiles-xs'
    });
  });

});
