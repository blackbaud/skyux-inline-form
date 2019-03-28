import { Directive, ElementRef, HostBinding, ViewContainerRef, OnInit, Input, TemplateRef, AnimationPlayer, AfterViewInit, EmbeddedViewRef } from '@angular/core';
import {
  AnimationBuilder,
  AnimationFactory,
  animate,
  style,
  trigger,
  query,
  group,
  transition
} from '@angular/animations';

@Directive({
  selector: '[skyInlineForm]'
})
export class SkyInlineFormDirective implements OnInit, AfterViewInit {

  @HostBinding('class')
  public elementClass = 'the-form';

  @Input()
  set skyInlineForm(value: boolean) {
    console.log(value);

    // if (value && !this.hasView) {
    //   // Show inline form.
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    //   this.hasView = true;
    // } else if (!value && this.hasView) {
    //   // Hide inline form.
    //   this.viewContainer.clear();
    //   this.hasView = false;
    // }

    // window.setTimeout(() => this.animateOpen());

    // value ? this.animateOpen() : this.animateClose();
  }

  private player: AnimationPlayer;

  private hasView = false;

  constructor(
    private el: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private animationBuilder: AnimationBuilder
  ) {
    // if (el.nativeElement.style.display !== 'block' && el.nativeElement.style.display !== 'inline-block') {
    //   el.nativeElement.style.display = 'block';
    // }
    // el.nativeElement.style.height = '0';
    // el.nativeElement.style.opacity = '0';
  }

  public ngOnInit(): void {
    // this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.animateOpen();
  }

  public ngAfterViewInit(): void {
  }

  private animateOpen(): void {
    // Prevent overlapping animations.
    if (this.player) {
      this.player.destroy();
    }

    const animation = this.animationBuilder.build([
      animate('200ms ease-in', style({ height: '*', opacity: 0 }))
    ]);

    const container = this.getContainer();

    if (!!container) {
    }

    console.log(this.getContainer());
    this.player = animation.create(this.getContainer());
    this.player.play();
  }

  private getContainer(): HTMLElement {
    if (this.viewContainer.length > 0) {
        return (this.viewContainer.get(0) as EmbeddedViewRef<any>).rootNodes[0];
    } else {
        return undefined;
    }
  }
}
