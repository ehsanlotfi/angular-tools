import { Directive, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Observable, fromEvent, debounceTime } from 'rxjs';
import { map } from 'rxjs/operators';

export interface debounceInputConfig {
    delay: number;
    event: string; // 'keyup', 'keydown', etc...
}

@Directive({
    selector: '[debounceInput]'
})
export class DebounceDirective implements OnInit {

    @Input() debounceInputConfig: debounceInputConfig = {
        delay: 1000,
        event: 'keyup'
    };

    @Output('debounceInput') value: EventEmitter<string> = new EventEmitter();

    constructor(public el: ElementRef) {
    }

    ngOnInit() {
        if (typeof this.debounceInputConfig.delay === 'undefined') {
            this.debounceInputConfig.delay = 300;
        }

        if (typeof this.debounceInputConfig.event === 'undefined') {
            this.debounceInputConfig.event = 'keyup';
        }

        fromEvent(this.el.nativeElement, this.debounceInputConfig.event).pipe(
            debounceTime(this.debounceInputConfig.delay),
            map((event: KeyboardEvent) => {
                const targetElement = <HTMLInputElement>event.target;
                const isInputableField = targetElement.nodeName === 'INPUT' || targetElement.nodeName === 'TEXTAREA';
                const text = isInputableField ? targetElement.value : targetElement.innerText;
                return text;
            })
        ).subscribe(text => {
            this.value.emit(text);
        });
    }


}
