import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, CanActivate} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {Http, Headers} from 'angular2/http';
import {contentHeaders} from '../objects/headers';


import {User} from '../objects/user';
import {UserService} from '../services/user.service';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';
// import {AuthConfig} from 'angular2-jwt';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/settings.component.html',
	inputs: ['hero']
})

@CanActivate(() => tokenNotExpired())

export class SettingsComponent implements OnInit {

	user: User;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		public http: Http,
		// public authHttp: AuthHttp,
		private _userService: UserService,
		private _routeParams: RouteParams) {
		console.log('constructor');
		this.http.get('http://localhost:3333/test', { headers: contentHeaders })
			.map((responseData) => { console.log('responseData', responseData); return responseData.json() })
			.subscribe(res => {
				console.log('ALLO', res);
			});
	}

	ngOnInit() {
		this.user = this._userService.getUser();
		console.log('test');
		// this.http.get('http://localhost:3333/test', { headers: contentHeaders })
		// 	.map((responseData) => { console.log('responseData', responseData); return responseData.json() })
		// 	.map((obj: any) => {
		// 		console.log('TEST', obj);
		// 	});
	}

	goBack() {
		// window.history.back();
	}


}

