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
	submitted: boolean = false;
	test: string = "none";

	email: string = "";
	password: string = "";
	password2: string = "";
	username: string = "";
	id: number;
	token: string;

	newAccount: boolean = false;

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

	switchNew() {
		this.newAccount = !this.newAccount;
	}

	onSubmit() {


		if (this.newAccount) {
			if (this.password !== this.password2)
				return;
		}

		this.submitted = true;

		this._userService.authenticate(this.email, this.password, this.newAccount).subscribe(res => {

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

