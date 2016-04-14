import {Injectable, Component} from 'angular2/core';

import {Http, Headers} from 'angular2/http';
import {contentHeaders} from '../objects/headers';

import {StorageService, PermanentStorageService} from './storage.service';

@Injectable()

export class HttpService {

	constructor(
		public http: Http,
		private _local: PermanentStorageService) {
		console.log('constructor');

	}

	get(address: string) {

		return this.http.get(address, { headers: this.generateHeaders() })
			.map((responseData) => {
				return responseData.json()
			});
	}

	post(address: string, json: string) {

		return this.http.post(address, json, { headers: this.generateHeaders() })
			.map((responseData) => {
				return responseData.json()
			})
	}

	generateHeaders(): Headers {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('x-access-token', this._local.get('id_token'));

		return headers;
	}


}

