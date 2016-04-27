import { Directive, AfterViewInit, ApplicationRef, Input, ElementRef, provide, Injectable } from 'angular2/core';

@Directive({
	selector: '[mask]',
	host: {'(input)': 'onChange()'}
})
export class MaskDirective implements AfterViewInit {
// export class MaskDirective {
	@Input() mask: string;

	constructor(public el: ElementRef,
		private appRef: ApplicationRef) {
		// console.log('MASK');
		// el.nativeElement.style.backgroundColr = 'yellow';
	};

	ngAfterViewInit() {
		// this.onChange();
		// console.log('MASK', this.mask);
		// this.el.nativeElement.type = 'number';
		this.el.nativeElement.maxLength = 13;
	}


	onChange() {
		// this.el.nativeElement
		// console.log('MASK', this.mask);
		// debugger
		// console.log(this.el.nativeElement.value);
		// this.el.nativeElement.type = 'number';

		let v: string = this.el.nativeElement.value;

		v = v.replace(/\D/g, '');

		if (v.length > 1)
			v = "(" + v;

		if (v.length > 4)
			v = v.substr(0, 4) + ")" + v.substr(4);

		if (v.length > 8)
			v = v.substr(0, 8) + "-" + v.substr(8);

		if (v.length > 13)
			v = v.substr(0, 13);

		this.el.nativeElement.value = v;
		this.appRef.tick();
	}
}
