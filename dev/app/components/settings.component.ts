import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, CanActivate} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';

import {User} from '../objects/user';
import {UserService} from '../services/user.service';
import {HttpService} from '../services/http.service';

import {LoadingIndicator} from '../services/loading.service';
import {MaskDirective} from '../directives/mask.directive';

// import {AuthConfig} from 'angular2-jwt';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/settings.component.html',
	directives: [LoadingIndicator, MaskDirective],
	inputs: ['hero']
})

@CanActivate(() => tokenNotExpired())

export class SettingsComponent implements OnInit {

	user: User;
	message: string;

	phone: string = "";

	jwtHelper: JwtHelper = new JwtHelper();

	isReady: boolean = false;

	constructor(
		public http: HttpService,
		private _userService: UserService,
		private _routeParams: RouteParams) {



	}

	ngOnInit() {
		this.user = this._userService.getUser();
		if (this.user === undefined)
			this.user = new User('', '');
		console.log('test');

		console.log('constructor');
		this._userService.getSettings().subscribe(res => {
			this.phone = res.phone;
			this.isReady = true;
		},
		err => {
			console.log('SUBSCRIBE ERROR', err);
			this.phone = err.json().message;
			this.isReady = true;
		});

	}

	goBack() {
		// window.history.back();
	}

	onSubmit() {
		this._userService.saveSettings(this.phone).subscribe(res => {
		},
		err => {
			console.log('SUBSCRIBE ERROR', err);

			this.phone = err.json().message;

		});

	}


}

