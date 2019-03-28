import { Directive, ElementRef, QueryList, ContentChildren, AnimationPlayer, Input, AfterContentInit, Renderer2 } from '@angular/core';
import { SkyInlineFormContentDirective } from './inline-form-content.directive';

import {
  AnimationBuilder,
  AnimationFactory,
  animate,
  style
} from '@angular/animations';
import { SkyInlineFormDirective } from './inline-form.directive';

@Directive({
  selector: '[skyInlineFormContainer]'
})
export class SkyInlineFormContainerDirective implements AfterContentInit {

  @Input()
  set skyInlineFormShow(show: boolean) {
    if (this.formList && this.formRefList) {

      // Prevent overlapping animations.
      if (this.player) {
        this.player.destroy();
      }

      this.contentRefList.forEach(content => {
        const nativeEl = content.nativeElement;

        if (show) {
          this.player = this.formClose.create(nativeEl);
          this.player.onDone(() => {
            this.renderer.setStyle(nativeEl, 'height', 0);
            this.renderer.setStyle(nativeEl, 'opacity', 0);
          });
        } else {
          this.renderer.removeStyle(nativeEl, 'height');
          this.renderer.removeStyle(nativeEl, 'opacity');
          this.player = this.formOpen.create(nativeEl);
        }
        this.player.play();

      });

      // this.formRefList.forEach(form => {
      //   const nativeEl = form.nativeElement;

      //   if (!show) {
      //     this.player = this.formClose.create(nativeEl);
      //     this.player.onDone(() => {
      //       this.renderer.setStyle(nativeEl, 'height', 0);
      //       this.renderer.setStyle(nativeEl, 'opacity', 0);
      //     });
      //   } else {
      //     this.renderer.removeStyle(nativeEl, 'height');
      //     this.renderer.removeStyle(nativeEl, 'opacity');
      //     this.player = this.formOpen.create(nativeEl);
      //   }

      //   this.player.play();
      // });

      // const metadata = show ? this.fadeIn() : this.fadeOut();

      // const factory = this.animationBuilder.build(metadata);
      // const player = factory.create(this.contentRef.first.nativeElement);

      // player.play();
    }
  }

  @ContentChildren(SkyInlineFormContentDirective)
  public contentList: QueryList<SkyInlineFormContentDirective>;

  @ContentChildren(SkyInlineFormContentDirective, { read: ElementRef })
  public contentRefList: QueryList<ElementRef>;

  @ContentChildren(SkyInlineFormDirective)
  public formList: QueryList<SkyInlineFormDirective>;

  @ContentChildren(SkyInlineFormDirective, { read: ElementRef })
  public formRefList: QueryList<ElementRef>;

  private player: AnimationPlayer;
  private formClose: AnimationFactory;
  private formOpen: AnimationFactory;
  private contentOpen: AnimationFactory;
  private contentClose: AnimationFactory;

  constructor(private animationBuilder: AnimationBuilder, private renderer: Renderer2) {
    this.formOpen = this.animationBuilder.build([
      style({ height: 0, opacity: 0 }),
      animate('200ms ease-in', style({ height: '*', opacity: 0 })),
      animate('200ms ease-in', style({ opacity: 1 }))
    ]);

    this.formClose = this.animationBuilder.build([
      style({ height: '*', opacity: 1 }),
      animate('0ms', style({ opacity: 0 })),
      animate('200ms ease-in', style({ height: 0 }))
    ]);

    this.contentOpen = this.animationBuilder.build([
      style({ height: 0, opacity: 0 }),
      animate('200ms ease-in', style({ height: '*', opacity: 0 })),
      animate('200ms ease-in', style({ opacity: 1 }))
    ]);

    this.contentClose = this.animationBuilder.build([
      animate('500ms', style({ opacity: 0, height: 0 }))
    ]);
  }

  public ngAfterContentInit(): void {
    // const factory = this.animationBuilder.build(this.foobar());
    // const player = factory.create(this.el.nativeElement);

    // player.play();
  }
}
