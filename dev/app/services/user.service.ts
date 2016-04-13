import {Injectable, Component} from 'angular2/core';

import {Http, Headers} from 'angular2/http';

import {User} from '../objects/user';
import {contentHeaders} from '../objects/headers';

import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt/angular2-jwt';


@Injectable()

export class UserService {
	headers: Headers;

	jwtHelper: JwtHelper = new JwtHelper();
	user: User;

	constructor(public http: Http) {
		console.log('Task Service created.', http);
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
	}

	authenticate(email, password) {

		let json = JSON.stringify({ "email": email, "password": password });

		return this.http.post('http://localhost:3333/authenticate', json, { headers: contentHeaders })
			.map((responseData) => { return responseData.json() })
			.map((obj: any) => {
				// let result: User;
				let token: string;

				if (obj.success) {
					token = obj.token;
					let objUser = this.jwtHelper.decodeToken(token);
					this.user = new User(objUser.username, objUser.email, objUser.id);
					// result = new User('test', token, 'obj.password');
				}
				else {
					token = undefined;
					this.user = undefined;
					// result = new User('', '', '');
				}


				// console.log(obj, result);
				// console.log('TOKEN', token);
				return token;
			});

	}

	getUser() {
		if (this.user !== undefined)
			return this.user
		else {
			return new User('def', 'def');
		}

	}

}
