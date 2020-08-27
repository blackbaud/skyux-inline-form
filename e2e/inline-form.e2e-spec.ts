import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  by,
  element,
  browser
} from 'protractor';

describe('Inline form', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  function runTests(): void {

    it('should match previous screenshot for add mode', async (done) => {
      await SkyHostBrowser.scrollTo('#inline-form-add');

      expect('#inline-form-add').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('inline-form-add')
      });
    });

    it('should match previous screenshot for add mode (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');
      await SkyHostBrowser.scrollTo('#inline-form-add');

      expect('#inline-form-add').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('inline-form-add-xs')
      });
    });

    it('should match previous screenshot for edit mode', async (done) => {
      await SkyHostBrowser.scrollTo('#inline-form-edit');

      expect('#inline-form-edit').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('inline-form-edit')
      });
    });

    it('should match previous screenshot for edit mode (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');
      await SkyHostBrowser.scrollTo('#inline-form-edit');

      expect('#inline-form-edit').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('inline-form-edit-xs')
      });
    });

    it('should match previous screenshot for tile sections', async (done) => {
      await SkyHostBrowser.scrollTo('#inline-form-tiles');

      await element.all(by.css('#inline-form-tiles .sky-btn')).get(2).click();

      await browser.sleep(500);

      expect('#inline-form-tiles').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('inline-form-tiles')
      });
    });

    it('should match previous screenshot for tile sections (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');
      await SkyHostBrowser.scrollTo('#inline-form-tiles');

      await element.all(by.css('#inline-form-tiles .sky-btn')).get(2).click();

      await browser.sleep(500);

      expect('#inline-form-tiles').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('inline-form-tiles-xs')
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/inline-form');
    await SkyHostBrowser.setWindowBreakpoint('lg');
  });

  runTests();

  describe('when modern theme', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    runTests();
  });

  describe('when modern theme in dark mode', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    runTests();
  });
});
