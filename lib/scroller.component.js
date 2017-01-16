"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ScrollerComponent = (function () {
    function ScrollerComponent(renderer) {
        this.renderer = renderer;
        this.duration = 180;
        this.scrollLength = 100;
        this.behavior = 'auto';
        this.layout = 'default';
        this.showButtonsFrom = 0;
        this.navIsVisible = false;
        this.disableScrollRight = false;
        this.disableScrollLeft = true;
        this.initiated = false;
    }
    ScrollerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.init();
        setTimeout(function () {
            _this.update();
            _this.initiated = true;
        });
        this.renderer.listenGlobal('window', 'resize', this.debounce(this.update, 100, this));
        this.renderer.listen(this.scrollerViewEl, 'scroll', this.debounce(this.checkButtonStates, 0, this));
    };
    ScrollerComponent.prototype.update = function () {
        this.init();
        this.checkButtonStates();
        this.shouldNavBeVisible();
    };
    ScrollerComponent.prototype.init = function () {
        this.scrollerViewEl = this.scrollerView.nativeElement;
        var scrollerViewHeight = this.scrollerView.nativeElement.children[0].offsetHeight;
        this.renderer.setElementStyle(this.scrollerList.nativeElement, 'height', scrollerViewHeight + "px");
        this.renderer.setElementStyle(this.scrollerViewEl, 'overflowX', 'scroll');
        this.renderer.setElementStyle(this.scrollerViewEl, '-webkit-overflow-scrolling', 'touch');
        this.renderer.setElementStyle(this.scrollerViewEl, 'paddingBottom', '30px');
    };
    ScrollerComponent.prototype.shouldNavBeVisible = function () {
        if (this.behavior === 'auto') {
            if (this.scrollerViewEl.scrollWidth > this.scrollerViewEl.offsetWidth && this.scrollerRoot.nativeElement.offsetWidth > this.showButtonsFrom) {
                this.navIsVisible = true;
            }
            else {
                this.navIsVisible = false;
            }
            ;
        }
        else if (this.scrollerRoot.nativeElement.offsetWidth > this.showButtonsFrom && this.behavior === 'static') {
            this.navIsVisible = true;
        }
    };
    ScrollerComponent.prototype.scroll = function (val) {
        var _this = this;
        var currentScrollPos = this.scrollerViewEl.scrollLeft;
        var startTime = Date.now();
        var timeout;
        var animateScroll = function () {
            var now = Date.now(), current = now - startTime, position = _this.easeInOutQuad(current, currentScrollPos, val, _this.duration);
            if (current > _this.duration) {
                return;
            }
            _this.renderer.setElementProperty(_this.scrollerViewEl, 'scrollLeft', position);
            timeout = _this.nativeWindow.requestAnimationFrame(animateScroll);
        };
        animateScroll();
    };
    ScrollerComponent.prototype.checkButtonStates = function () {
        if (this.scrollerViewEl.scrollLeft <= 0) {
            this.disableScrollLeft = true;
        }
        else {
            this.disableScrollLeft = false;
        }
        if (this.scrollerViewEl.scrollLeft + this.scrollerViewEl.offsetWidth > this.scrollerViewEl.scrollWidth - 2) {
            this.disableScrollRight = true;
        }
        else {
            this.disableScrollRight = false;
        }
    };
    ScrollerComponent.prototype.debounce = function (func, wait, scope) {
        var timeout;
        return function () {
            var args = arguments;
            var later = function () {
                timeout = null;
                func.apply(scope, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    ScrollerComponent.prototype.easeInOutQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * currentIteration * currentIteration + startValue;
        }
        return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    };
    ScrollerComponent.prototype._window = function () {
        return window;
    };
    Object.defineProperty(ScrollerComponent.prototype, "nativeWindow", {
        get: function () {
            return this._window();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('scroller'), 
        __metadata('design:type', core_1.ElementRef)
    ], ScrollerComponent.prototype, "scrollerRoot", void 0);
    __decorate([
        core_1.ViewChild('scroller__list'), 
        __metadata('design:type', core_1.ElementRef)
    ], ScrollerComponent.prototype, "scrollerList", void 0);
    __decorate([
        core_1.ViewChild('scroller__list__track'), 
        __metadata('design:type', core_1.ElementRef)
    ], ScrollerComponent.prototype, "scrollerView", void 0);
    __decorate([
        core_1.ContentChild('leftButton'), 
        __metadata('design:type', core_1.ElementRef)
    ], ScrollerComponent.prototype, "customLeftButton", void 0);
    __decorate([
        core_1.ContentChild('rightButton'), 
        __metadata('design:type', core_1.ElementRef)
    ], ScrollerComponent.prototype, "customRightButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ScrollerComponent.prototype, "buttonClasses", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ScrollerComponent.prototype, "scrollerTrackClasses", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ScrollerComponent.prototype, "duration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ScrollerComponent.prototype, "scrollLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ScrollerComponent.prototype, "behavior", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ScrollerComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ScrollerComponent.prototype, "showButtonsFrom", void 0);
    ScrollerComponent = __decorate([
        core_1.Component({
            selector: 'app-scrollslider',
            template: "\n    <div\n      class=\"scroller\"\n      #scroller\n      [class.scroller--split-layout]=\"layout === 'split'\"\n      [class.scroller--has-visible-nav]=\"navIsVisible\"\n      [class.scroller--is-initiated]=\"initiated\">\n      <div #scroller__list class=\"scroller__list {{scrollerTrackClasses}}\">\n        <div class=\"scroller__list__track\" #scroller__list__track>\n          <div>\n            <ng-content></ng-content>\n          </div>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"navIsVisible\"\n        class=\"scroller__nav scroller__nav--left\">\n        <span\n        (click)=\"scroll(-scrollLength)\"\n        [ngClass]=\"{'is-disabled': disableScrollLeft}\"\n        class=\"scroller__nav__button {{buttonClasses}}\">\n          <span *ngIf=\"!customLeftButton\">Button left</span>\n          <ng-content select=\"[leftButtonContent]\"></ng-content>\n        </span>\n      </div>\n\n      <div\n        *ngIf=\"navIsVisible\"\n        class=\"scroller__nav scroller__nav--right\">\n        <span\n        (click)=\"scroll(+scrollLength)\"\n        [ngClass]=\"{'is-disabled': disableScrollRight}\"\n        class=\"scroller__nav__button {{buttonClasses}}\">\n          <span *ngIf=\"!customRightButton\">Button right</span>\n          <ng-content select=\"[rightButtonContent]\"></ng-content>\n        </span>\n      </div>\n    </div>\n  ",
            styles: ["\n    .scroller {\n      position: relative;\n      display: flex;\n      overflow: hidden;\n      align-items: center;\n      opacity: 0;\n    }\n    .scroller--is-initiated {\n      opacity: 1;\n    }\n    .scroller__list {\n      position: relative;\n      min-height: 100%;\n      overflow: hidden;\n    }\n    .scroller__list__track {\n      display: block;\n      margin: 0;\n      padding: 0;\n      min-height: 100%;\n      overflow: hidden;\n      position: relative;\n      -webkit-overflow-scrolling: touch;\n    }\n    .scroller__nav {\n      flex-shrink: 0;\n      min-height: auto;\n      min-height: -webkit-min-content;\n    }\n    .scroller__nav > .scroller__nav__button {\n      user-select: none;\n      cursor: default;\n      display: block;\n    }\n    .scroller__nav > .scroller__nav__button.is-disabled {\n      opacity: .4;\n      pointer-events: none;\n    }\n    .scroller--split-layout .scroller__nav--left {\n      order: 1;\n    }\n    .scroller--split-layout .scroller__nav--right {\n      order: 3;\n    }\n    .scroller--split-layout .scroller__list {\n      order: 2;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], ScrollerComponent);
    return ScrollerComponent;
}());
exports.ScrollerComponent = ScrollerComponent;
//# sourceMappingURL=scroller.component.js.map