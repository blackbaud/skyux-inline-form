import {
  ElementRef,
  Injectable
} from '@angular/core';

/* tslint:disable */
let tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';
/* tslint:enable */

@Injectable()
export class SkyInlineFormAdapterService {

  public applyAutofocus(inlineFormElementRef: ElementRef) {
    let inputWithAutofocus = inlineFormElementRef.nativeElement.querySelector('[autofocus]');

    if (inputWithAutofocus) {
      inputWithAutofocus.focus();
    } else {
      let focusEl: HTMLElement = inlineFormElementRef.nativeElement.querySelector('.sky-inline-form-content');
      let focusableChildren = this.loadFocusableChildren(focusEl);

      this.focusFirstElement(focusableChildren);
    }
  }

  private loadFocusableChildren(elem: HTMLElement) {
    let elements: Array<HTMLElement>
      = Array.prototype.slice.call(elem.querySelectorAll(tabbableSelector));

    return elements.filter((element) => {
      return this.isVisible(element);
    });
  }

  private isVisible(element: HTMLElement) {
    const style = window.getComputedStyle(element);
    const isHidden = style.display === 'none' || style.visibility === 'hidden';
    if (isHidden) {
      return false;
    }

    const hasBounds = !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
    return hasBounds;
  }

  private focusFirstElement(list: Array<HTMLElement>): boolean {
    if (list.length > 0) {
      list[0].focus();
      return true;
    }
    return false;
  }
}
