import { Directive, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: '[wheelDetect]'
})
export class WheelDetectDirective {
    @Output() wheelDetect: EventEmitter<"up" | "down"> = new EventEmitter<"up" | "down">();

    @HostListener('wheel', ['$event']) onMouseWheel(event: any) {
        if (event.deltaY > 0) {
            this.wheelDetect.emit("up");
        } else {
            this.wheelDetect.emit("down");
        }
    }
}
