import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common';

// import {Cookie} from 'ng2-cookies/ng2-cookies';

import {User} from '../objects/user';
import {UserService} from '../services/user.service';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/login.component.html',
	inputs: ['hero']
})

export class LoginComponent implements OnInit {

	currentUser: User;
	submitted: Boolean = false;
	test: String = "none";

	email: String = "";
	password: String = "";
	username: String = "";
	id: Number;
	token: String;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _userService: UserService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		// let id = +this._routeParams.get('id');
		// this._heroService.getHero(id)
		// 	.then(hero => this.hero = hero);
	}

	goBack() {
		// window.history.back();
	}

	onSubmit() {
		this.submitted = true;
		this._userService.authenticate(this.email, this.password).subscribe(token => {
			if (token !== undefined) {
				//https://github.com/auth0/angular2-jwt
				let obj = this.jwtHelper.decodeToken(token);
				this.currentUser = new User(obj.username, obj.email, obj.id);
				this.token = token;
				console.log('WORKED', obj);

			}
			else {
				this.currentUser = new User('', '');
			}

			this.email = this.currentUser.email;
			this.password = "";
			this.username = this.currentUser.username;
			this.id = this.currentUser.id;
		});
	}

}

