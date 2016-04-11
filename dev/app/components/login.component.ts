import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common';

// import {Cookie} from 'ng2-cookies/ng2-cookies';

import {User} from '../objects/user';
import {UserService} from '../services/user.service';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/login.component.html',
	inputs: ['hero']
})

export class LoginComponent implements OnInit {

	currentUser;
	submitted = false;
	test = "none";

	email = "";
	password = "";
	id;

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
		this._userService.authenticate(this.email, this.password).subscribe(res => {
			if (res !== undefined) {
				this.currentUser = new User(this.email, res, this.password);
			}
			else {
				this.currentUser = new User('', '', '');
			}

			// Cookie.setCookie('token', res, 1 /*days from now*/);

			// this.currentUser = res;
			this.email = this.currentUser.email;
			this.password = this.currentUser.password;
			this.id = this.currentUser.id;
		});
	}

}

