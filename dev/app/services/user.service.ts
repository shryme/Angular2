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
		if (this.user !== undefined)
			return this.user;
		else {
			console.log('getUser - Used session');
			let sessionUser = this._storage.get('user');

			if (sessionUser)
				return new User(sessionUser.username, sessionUser.email, sessionUser.id);
			else {
				//TODO - redirect to login
				return undefined;
			}

		}

	}

	// isLogIn() {
	// 	let sessionUser: string = this._storage.get('id_token');
	// }

}
