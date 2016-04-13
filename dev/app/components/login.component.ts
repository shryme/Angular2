import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
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
		private _routeParams: RouteParams,
		private _router: Router) {
	}

	ngOnInit() {

	}

	goBack() {
		// window.history.back();
	}

	onSubmit() {
		this.submitted = true;
		this._userService.authenticate(this.email, this.password).subscribe(res => {

			//If the auth was a success, we navigate elsewhere
			if (res)
				this._router.navigate(['Settings']);

			this.email = "";
			this.password = "";
			this.username = 'Wrong email or password';
			this.id = -1;
		});
	}

}

