import {Injectable, Component} from 'angular2/core';

import {Http} from 'angular2/http';

import {User} from '../objects/user';


@Injectable()

export class UserService {

	constructor(public http: Http) {
		console.log('Task Service created.', http);
	}

	connect(user: User) {

		return this.http.get('http://localhost:3333/connect')
			.map((responseData) => { return responseData.json() })
			.map((obj: any) => {
				let result: User;
				if (obj) {
					result = new User(obj.username, obj.email, obj.password);
				}
				console.log(obj, result);
				return result;
			});

	}

}
