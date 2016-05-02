import { Directive, ApplicationRef, AfterViewInit, Input, ElementRef, provide, Injectable } from 'angular2/core';

@Directive({
	selector: '[mask]',
	host: {'(input)': 'onChange()'}
})
export class MaskDirective implements AfterViewInit {
	@Input() mask: string;

	constructor(public el: ElementRef,
		private _applicationRef: ApplicationRef) {

	};

	ngAfterViewInit() {
		this.el.nativeElement.pattern = '^\\([0-9]{3}\\)[0-9]{3}-[0-9]{4}$';
	}


	onChange() {

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

		this.el.nativeElement.value = v
	}
}
