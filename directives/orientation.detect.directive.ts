// it is determined whether the image is Landescape or Portlate
import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appOrientationDetect]',
})
export class OrientationDetectDirective {

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    @HostListener('load') onLoad() {
        let cssClass = "square-image";
        let dataLandscape = false;
        if(this.el.nativeElement.naturalHeight > this.el.nativeElement.naturalWidth) {
            cssClass = "portrait-image"; 
        } else if(this.el.nativeElement.naturalHeight < this.el.nativeElement.naturalWidth) {
            cssClass = "landscape-image";
            dataLandscape = true;
        }
        this.renderer.addClass(this.el.nativeElement, cssClass);
        this.renderer.setAttribute(this.el.nativeElement, 'data-landscape', dataLandscape.toString());
        this.renderer.addClass(this.el.nativeElement.parentNode, cssClass);
    }
}
