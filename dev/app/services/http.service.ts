import {Injectable, Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {config} from '../objects/config';
import {StorageService} from './storage.service';

@Injectable()

export class HttpService {

	server: string = config.server;

	constructor(
		public http: Http,
		private _storage: StorageService) {
		console.log('constructor');

	}

	get(address: string) {

		return this.http.get(this.server + address, { headers: this.generateHeaders() })
			.map((responseData) => {
				return responseData.json()
			});
	}

	post(address: string, json: string) {

		return this.http.post(this.server + address, json, { headers: this.generateHeaders() })
			.map((responseData) => {
				return responseData.json()
			})
	}

	generateHeaders(): Headers {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('x-access-token', this._storage.get('id_token'));

		return headers;
	}


}

