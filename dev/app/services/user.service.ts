import {Injectable, Component} from 'angular2/core';

import {Http, Headers} from 'angular2/http';

import {User} from '../objects/user';
import {contentHeaders} from '../objects/headers';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';

import {StorageService, PermanentStorageService} from './storage.service';

@Injectable()

export class UserService {
	headers: Headers;

	jwtHelper: JwtHelper = new JwtHelper();
	user: User;

	constructor(public http: Http,
			private _storage: StorageService,
			private _local: PermanentStorageService) {
		console.log('Task Service created.', http);
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
	}

	authenticate(email, password) {

		let json = JSON.stringify({ "email": email, "password": password });

		return this.http.post('http://localhost:3333/authenticate', json, { headers: contentHeaders })
			.map((responseData) => { return responseData.json() })
			.map((obj: any) => {
				let token: string;

				if (obj.success) {
					token = obj.token;
					let objUser = this.jwtHelper.decodeToken(token);
					this.user = new User(objUser.username, objUser.email, objUser.id);
					this._storage.set('user', this.user);
					this._local.set('id_token', token);
					return true;
				}

				this.user = undefined;
				//TODO - remove from session
				return false;

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
				return new User('def', 'def');
			}

		}

	}

}
