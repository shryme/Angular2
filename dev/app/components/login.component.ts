import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common';

// import {Cookie} from 'ng2-cookies/ng2-cookies';

import {User} from '../objects/user';
import {UserService} from '../services/user.service';

import {StorageService} from '../services/storage.service';

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
	isLogged: boolean = false;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _userService: UserService,
		private _routeParams: RouteParams,
		private _router: Router,
		private _storage: StorageService) {
	}

	ngOnInit() {
		if (this._userService.getUser() !== undefined)
			this.isLogged = true;
	}

	goBack() {
		// window.history.back();
	}

	switchNew() {
		this.newAccount = !this.newAccount;
	}

	signOut() {
		this.isLogged = false;
		this._storage.del('user');
		this._storage.del('id_token');
		this.username = "";
		this.email = "";
		this.password = "";
		this.id = undefined;
		this.submitted = false;
	}

	onSubmit() {


		if (this.newAccount) {
			if (this.password !== this.password2)
				return;
		}

		this._userService.authenticate(this.email, this.password, this.newAccount).subscribe(res => {

			this._storage.set('user', res.user);
			this._storage.set('id_token', res.token);

			this._router.navigate(['Settings']);

		},
		err => {
			console.log('SUBSCRIBE ERROR', err);
			this.signOut();
			this.username = err.json().message;
			this.email = err.status;
			this.submitted = true;
		});
	}

}

