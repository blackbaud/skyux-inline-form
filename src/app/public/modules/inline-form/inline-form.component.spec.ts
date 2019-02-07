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

function getSaveButton(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.css('.sky-inline-form-footer .sky-btn-primary')
  );
}

function getDeleteButton(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.css('.sky-inline-form-footer .sky-btn-secondary')
  );
}

function getCancelButton(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(
    By.css('.sky-inline-form-footer .sky-btn-link')
  );
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
      ]
    });

    fixture = TestBed.createComponent(SkyInlineFormFixtureComponent);
    component = fixture.componentInstance;
  });

  it('should hide delete button by default', () => {
    const deleteButton = getDeleteButton(fixture);

    expect(deleteButton).toBeNull();
  });

  it('should show delete button when showDeleteButton is set to true', () => {
    component.showDeleteButton = true;
    fixture.detectChanges();

    const deleteButton = getDeleteButton(fixture);

    expect(deleteButton).not.toBeNull();
  });

  it('should emit when save button is clicked', () => {
    const spy = spyOn(component, 'closed');

    const saveButton = getSaveButton(fixture);
    saveButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'save'
    });
  });

  it('should emit when cancel button is clicked', () => {
    const spy = spyOn(component, 'closed');

    const cancelButton = getCancelButton(fixture);
    cancelButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'cancel'
    });
  });

  it('should emit when delete button is clicked', () => {
    component.showDeleteButton = true;
    fixture.detectChanges();

    const spy = spyOn(component, 'closed');

    const deleteButton = getDeleteButton(fixture);
    deleteButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      reason: 'delete'
    });
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});
