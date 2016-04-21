import {Injectable, Component} from 'angular2/core';

import {Http, Headers} from 'angular2/http';

import {User} from '../objects/user';
import {contentHeaders} from '../objects/headers';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';

import {StorageService} from './storage.service';
import {HttpService} from './http.service';

@Injectable()

export class UserService {
	headers: Headers;

	jwtHelper: JwtHelper = new JwtHelper();
	user: User;

	constructor(public http: HttpService,
		private _storage: StorageService) {
		console.log('Task Service created.', http);
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
	}

	authenticate(email: string, password: string, newAccount: boolean) {

		let json = JSON.stringify({ "email": email, "password": password, "newAccount": newAccount });

		return this.http.post('http://localhost:3333/authenticate', json)
			.map((obj: any) => {

				let objUser = this.jwtHelper.decodeToken(obj.token);
				obj.user = new User(objUser.username, objUser.email, objUser.id);

				return obj;

			});

	}

	getUser() {

		return this.decodeUser();

	}

	setToken(token: string) {
		this._storage.set('id_token', token);
	}

	getToken(): string {
		return this._storage.get('id_token');
	}

	delToken() {
		this._storage.del('id_token');
	}

	decodeUser(): User {
		let token: string = this.getToken();
		if (token === null || token === undefined)
			return undefined;

		let objUser = this.jwtHelper.decodeToken(token);
		if (objUser !== undefined)
			return new User(objUser.username, objUser.email, objUser.id);
		else
			return undefined;
	}

	loggedIn() {
		return tokenNotExpired();
	}

	getSettings() {

		return this.http.get('http://localhost:3333/user/settings')
			.map((obj: any) => {

				return obj.settings;

			});
	}

	saveSettings(phone) {
		let json = JSON.stringify({ "phone": phone });

		return this.http.post('http://localhost:3333/user/settings', json));
	}

}
