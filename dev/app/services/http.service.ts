import {Injectable, Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {config} from '../objects/config';
import {StorageService} from './storage.service';

import {LoadingPage} from './loading.service';

@Injectable()

export class HttpService extends LoadingPage{

	server: string = config.server;

	constructor(
		public http: Http,
		private _storage: StorageService) {
		super();
		console.log('constructor');

	}

	get(address: string) {
		this.showLoading();
		return this.http.get(this.server + address, { headers: this.generateHeaders() })
			.map((responseData) => {
				this.hideLoading();
				return responseData.json()
			}).catch(err => {
				this.hideLoading();
				return Observable.throw(err);
			})
	}

	post(address: string, json: string) {
		this.showLoading();
		return this.http.post(this.server + address, json, { headers: this.generateHeaders() })
			.map((responseData) => {
				this.hideLoading();
				return responseData.json()
			}).catch(err => {
				this.hideLoading();
				return Observable.throw(err);
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

