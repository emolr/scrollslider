import { Component, OnInit, Renderer, ViewChild, ContentChild, Input, ElementRef } from '@angular/core';

type Behavior = 'auto' | 'static';
type Layout = 'default' | 'split';

@Component({
  selector: 'app-scrollslider',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements OnInit {
  @ViewChild('scroller')
    public scrollerRoot: ElementRef;
  @ViewChild('scroller__list')
    public scrollerList: ElementRef;
  @ViewChild('scroller__list__track')
    public scrollerView: ElementRef;
  @ContentChild('leftButton')
    public customLeftButton: ElementRef;
  @ContentChild('rightButton')
    public customRightButton: ElementRef;

  @Input()
    public buttonClasses: string;
  @Input()
    public scrollerTrackClasses: string;
  @Input()
    public duration: Number = 180;
  @Input()
    public scrollLength: Number = 100;
  @Input()
    public behavior: Behavior = 'auto';
  @Input()
    public layout: Layout = 'default';
  @Input()
    public showButtonsFrom: Number = 0;

  public navIsVisible = false;
  public disableScrollRight: Boolean = false;
  public disableScrollLeft: Boolean = true;
  public scrollerViewEl: HTMLElement;

  constructor( public renderer: Renderer ) { }

  ngOnInit() {
    this.scrollerViewEl = this.scrollerView.nativeElement;
    const scrollerViewHeight = this.scrollerViewEl.offsetHeight;

    // Set inital style to hide scrollbar
    this.renderer.setElementStyle(this.scrollerList.nativeElement, 'height', `${scrollerViewHeight}px`);
    this.renderer.setElementStyle(this.scrollerViewEl, 'overflowX', 'scroll');
    this.renderer.setElementStyle(this.scrollerViewEl, 'paddingBottom', '30px');

    // Check if scroll buttons should activated
    setTimeout(() => {
      this.shouldNavBeVisible();
      this.checkButtonStates();
    });

    // Keep checking if nav should be visible
    this.renderer.listenGlobal(
      'window',
      'resize',
      this.debounce(this.shouldNavBeVisible, 100, this)
    );

    // Check if user can scroll more to right / left
    this.renderer.listen(
      this.scrollerViewEl,
      'scroll',
      this.debounce(this.checkButtonStates, 0, this)
    );

    this.renderer.listenGlobal(
      'window',
      'resize',
      this.debounce(this.checkButtonStates, 100, this)
    );
  }

  /* Check if content overflows the
   * scrollView container and toggle variable
   *
   * {void}
   */
  shouldNavBeVisible() {
    if (this.behavior === 'auto') {

      if (this.scrollerViewEl.scrollWidth > this.scrollerViewEl.offsetWidth && this.scrollerRoot.nativeElement.offsetWidth > this.showButtonsFrom) {
        this.navIsVisible = true;
        console.log('1', this.scrollerRoot.nativeElement.offsetWidth > this.showButtonsFrom)
      } else {
        this.navIsVisible = false;
        console.log('2', this.scrollerRoot.nativeElement.offsetWidth > this.showButtonsFrom)
      };

    } else if (this.scrollerRoot.nativeElement.offsetWidth > this.showButtonsFrom && this.behavior === 'static') {
      this.navIsVisible = true;
      console.log('3')
    }
  }

  /* Smooth scrolling in the scrollView,
   *
   * {void}
   */
  scroll(val) {
    const currentScrollPos = this.scrollerViewEl.scrollLeft;
    const startTime = Date.now();
    let timeout;

    // Using request animation frame to smooth scroll
    const animateScroll = () => {
      var now = Date.now(),
          current = now - startTime,
          position = this.easeInOutQuad(current, currentScrollPos, val, this.duration);

      if (current > this.duration) {
          return;
      }

      // Update scroll views scroll position
      this.renderer.setElementProperty(this.scrollerViewEl, 'scrollLeft', position);
      timeout = this.nativeWindow.requestAnimationFrame(animateScroll);
    };

    animateScroll();
  }

  /* Toggle disabling variables for
   * left and right buttons depening on available
   * scroll directions.
   *
   * {void}
   */
  checkButtonStates() {
    if (this.scrollerViewEl.scrollLeft <= 0) {
      this.disableScrollLeft = true
    } else {
      this.disableScrollLeft = false
    }
    // Minus 2 is wrong, but can't seem to trigger without
    if (this.scrollerViewEl.scrollLeft + this.scrollerViewEl.offsetWidth > this.scrollerViewEl.scrollWidth - 2) {
      this.disableScrollRight = true;
    } else {
      this.disableScrollRight = false;
    }
  }
  /* debounce function calls
   * to avoid jitter.
   * {void}
   */
  debounce(func, wait, scope) {
    var timeout;
    return function() {
      var args = arguments;
      var later = function() {
        timeout = null;
        func.apply(scope, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  easeInOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
    if ((currentIteration /= totalIterations / 2) < 1) {
      return changeInValue / 2 * currentIteration * currentIteration + startValue;
    }
    return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
  }

  // Return window with a getter function instead
  // of using directly as adviced by angular
  _window() : any {
     return window;
  }

  get nativeWindow() : any {
    return this._window();
  }

}
