import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[skyInlineFormContent]'
})
export class SkyInlineFormContentDirective {

  @HostBinding('class')
  public elementClass = 'the-content';

  constructor(el: ElementRef) {
    if (el.nativeElement.style.display !== 'block' && el.nativeElement.style.display !== 'inline-block') {
      el.nativeElement.style.display = 'block';
    }
  }
}
