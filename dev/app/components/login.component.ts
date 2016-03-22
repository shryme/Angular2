import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {User} from '../objects/user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/components/login.component.html',
	inputs: ['hero']
})

export class LoginComponent implements OnInit {

	model = new User('', '', '');
	submitted = false;

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

	onSubmit() { this.submitted = true; }

}

