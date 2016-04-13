import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {User} from '../objects/user';
import {UserService} from '../services/user.service';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/settings.component.html',
	inputs: ['hero']
})

export class SettingsComponent implements OnInit {

	user: User;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _userService: UserService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		this.user = this._userService.getUser();
	}

	goBack() {
		// window.history.back();
	}


}

