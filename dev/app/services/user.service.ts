import {Injectable, Component} from 'angular2/core';

import {Http, Headers} from 'angular2/http';

import {User} from '../objects/user';


@Injectable()

export class UserService {

	constructor(public http: Http) {
		console.log('Task Service created.', http);
	}

	connect(email, password) {

		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		let body = "email=" + email + "&password=" + password;

		return this.http.post('http://localhost:3333/connect', body, {headers: headers})
			.map((responseData) => { return responseData.json() })
			.map((obj: any) => {
				let result: User;
				if (obj) {

					if (!obj.error) {
						result = new User(obj.username, obj.email, obj.password, obj.id);
					}
					else {
						result = new User('', '', '');
					}
				}
				console.log(obj, result);
				return result;
			});

	}

}
