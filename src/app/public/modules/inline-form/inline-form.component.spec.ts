import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyInlineFormFixtureComponent
} from './fixtures/inline-form.fixture';

import {
  SkyInlineFormModule
} from './inline-form.module';

import {
  SkyInlineFormType
} from './types';

import {
  SkyInlineFormAdapterService
} from './inline-form-adapter.service';

function getPrimaryButton(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.css('.sky-inline-form-footer .sky-btn-primary')
  );
}

function getDefaultButton(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.css('.sky-inline-form-footer .sky-btn-default')
  );
}

function getLinkButton(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.css('.sky-inline-form-footer .sky-btn-link')
  );
}

function verifyDoneButtonisDefined(fixture: ComponentFixture<any>, isDefined: boolean) {
  const doneButton = getPrimaryButton(fixture);
  if (isDefined) {
    expect(doneButton).not.toBeNull();
    expect(doneButton.nativeElement.textContent).toContain('Done');
  } else {
    if (doneButton) {
      expect(doneButton.nativeElement.textContent).not.toContain('Done');
    }
  }
}

function verifySaveButtonisDefined(fixture: ComponentFixture<any>, isDefined: boolean) {
  const saveButton = getPrimaryButton(fixture);
  if (isDefined) {
    expect(saveButton).not.toBeNull();
    expect(saveButton.nativeElement.textContent).toContain('Save');
  } else {
    if (saveButton) {
      expect(saveButton.nativeElement.textContent).not.toContain('Save');
    }
  }
}

function verifyDeleteButtonIsDefined(fixture: ComponentFixture<SkyInlineFormFixtureComponent>, isDefined: boolean) {
  const deleteButton = getDefaultButton(fixture);
  if (isDefined) {
    expect(deleteButton).not.toBeNull();
    expect(deleteButton.nativeElement.textContent).toContain('Delete');
  } else {
    expect(deleteButton).toBeNull();
  }
}

function verifyCancelButtonIsDefined(fixture: ComponentFixture<SkyInlineFormFixtureComponent>, isDefined: boolean) {
  const cancelButton = getLinkButton(fixture);
  if (isDefined) {
    expect(cancelButton).not.toBeNull();
    expect(cancelButton.nativeElement.textContent).toContain('Cancel');
  } else {
    expect(cancelButton).toBeNull();
  }
}

describe('Inline form component', () => {
  let component: SkyInlineFormFixtureComponent,
  fixture: ComponentFixture<SkyInlineFormFixtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkyInlineFormFixtureComponent
      ],
      imports: [
        SkyInlineFormModule
      ],
      providers: [
        SkyInlineFormAdapterService
      ]
    });

    fixture = TestBed.createComponent(SkyInlineFormFixtureComponent);
    component = fixture.componentInstance;
  });

  it('should show Done/Cancel buttons as default if no SkyInlineFormConfig is defined', () => {
    fixture.detectChanges();

    verifyDoneButtonisDefined(fixture, true);
    verifyCancelButtonIsDefined(fixture, true);
    verifySaveButtonisDefined(fixture, false);
    verifyDeleteButtonIsDefined(fixture, false);
  });

  it('should show delete Done/Delete/Cancel buttons when SkyInlineFormConfig is defined', () => {
    component.config = {
      type: SkyInlineFormType.DoneDeleteCancel
    };
    fixture.detectChanges();

    verifyDoneButtonisDefined(fixture, true);
    verifyDeleteButtonIsDefined(fixture, true);
    verifyCancelButtonIsDefined(fixture, true);
    verifySaveButtonisDefined(fixture, false);
  });

  it('should show delete Save/Delete/Cancel buttons when SkyInlineFormConfig is defined', () => {
    component.config = {
      type: SkyInlineFormType.SaveDeleteCancel
    };
    fixture.detectChanges();

    verifySaveButtonisDefined(fixture, true);
    verifyDeleteButtonIsDefined(fixture, true);
    verifyCancelButtonIsDefined(fixture, true);
    verifyDoneButtonisDefined(fixture, false);
  });

  it('should show delete Save/Cancel buttons when SkyInlineFormConfig is defined', () => {
    component.config = {
      type: SkyInlineFormType.SaveCancel
    };
    fixture.detectChanges();

    verifySaveButtonisDefined(fixture, true);
    verifyCancelButtonIsDefined(fixture, true);
    verifyDeleteButtonIsDefined(fixture, false);
    verifyDoneButtonisDefined(fixture, false);
  });

  it('should emit when done button is clicked', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'onClose');
    const saveButton = getPrimaryButton(fixture);

    saveButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'done'
    });
  });

  it('should emit when cancel button is clicked', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'onClose');
    const cancelButton = getLinkButton(fixture);

    cancelButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'cancel'
    });
  });

  it('should emit when delete button is clicked', () => {
    component.config = {
      type: SkyInlineFormType.SaveDeleteCancel
    };
    fixture.detectChanges();
    const spy = spyOn(component, 'onClose');
    const deleteButton = getDefaultButton(fixture);

    deleteButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'delete'
    });
  });

  it('should emit when save button is clicked', () => {
    component.config = {
      type: SkyInlineFormType.SaveCancel
    };
    fixture.detectChanges();
    const spy = spyOn(component, 'onClose');
    const saveButton = getPrimaryButton(fixture);

    saveButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'save'
    });
  });

  it('should properly set up custom buttons', () => {
    component.config = {
      type: SkyInlineFormType.Custom,
      buttons: [
        { action: 'CUSTOM_ACTION_1', text: 'CUSTOM_TEXT_1', styleType: 'primary' },
        { action: 'CUSTOM_ACTION_2', text: 'CUSTOM_TEXT_2', styleType: 'default' },
        { action: 'CUSTOM_ACTION_3', text: 'CUSTOM_TEXT_3', styleType: 'link' }
      ]
    };
    fixture.detectChanges();
    const spy = spyOn(component, 'onClose');
    const button1 = getPrimaryButton(fixture);
    const button2 = getDefaultButton(fixture);
    const button3 = getLinkButton(fixture);

    // Expect first button has custom text and emits properly.
    button1.nativeElement.click();
    fixture.detectChanges();

    expect(button1.nativeElement.textContent).toContain('CUSTOM_TEXT_1');
    expect(button2.nativeElement.textContent).toContain('CUSTOM_TEXT_2');
    expect(button3.nativeElement.textContent).toContain('CUSTOM_TEXT_3');
    expect(spy).toHaveBeenCalledWith({
      reason: 'CUSTOM_ACTION_1'
    });
  });

  it('should focus the first focusable element when no autofocus is inside of content', () => {
    component.showFormWithOutAutocomplete = true;
    fixture.detectChanges();

    expect(document.activeElement).toEqual(document.querySelector('#demo-input-3'));
  });

  it('should focus the autofocus element when there is one present', () => {
    component.showFormWithAutocomplete = true;
    fixture.detectChanges();

    expect(document.activeElement).toEqual(document.querySelector('#demo-input-6'));
  });

  it('should focus the first element thats visible', () => {
    component.showFormWithHiddenElements = true;
    fixture.detectChanges();

    expect(document.activeElement).toEqual(document.querySelector('#demo-input-8'));
  });

  it('should not move focus if there are no focusable elements in the form', () => {
    component.showFormWithNoElements = true;
    fixture.detectChanges();

    expect(document.activeElement).toEqual(document.querySelector('#demo-input-1'));
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});
