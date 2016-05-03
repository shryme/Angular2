import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';

import {User} from '../objects/user';

import {UserService} from '../services/user.service';
import {HttpService} from '../services/http.service';
import {StorageService} from '../services/storage.service';

import {LoadingIndicator} from '../services/loading.service';


@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/login.component.html',
	directives: [LoadingIndicator],
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

	isReady: boolean = false;

	constructor(
		public http: HttpService,
		private _userService: UserService,
		private _routeParams: RouteParams,
		private _router: Router,
		private _storage: StorageService) {
	}

	ngOnInit() {
		this.isReady = true;
	}

	loggedIn() {
		return this._userService.loggedIn();
	}

	goBack() {
		// window.history.back();
	}

	switchNew() {
		this.newAccount = !this.newAccount;
	}

	signOut() {
		this._userService.delToken();
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

			this._userService.setToken(res.token);

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

