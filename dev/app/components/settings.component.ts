import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, CanActivate} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {Http, Headers} from 'angular2/http';
import {contentHeaders} from '../objects/headers';

import {LoadingIndicator, LoadingPage} from '../services/loading.service';

import {User} from '../objects/user';
import {UserService} from '../services/user.service';
import {HttpService} from '../services/http.service';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';
// import {AuthConfig} from 'angular2-jwt';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/settings.component.html',
	directives: [LoadingIndicator],
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

	ngOnInit() {
		this.user = this._userService.getUser();
		if (this.user === undefined)
			this.user = new User('', '');
		console.log('test');

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

