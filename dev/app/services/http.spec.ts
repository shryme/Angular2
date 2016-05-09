import {provide} from 'angular2/core';

import {BaseRequestOptions, Response, ResponseOptions, Http, Headers} from 'angular2/http';
import {it, describe, expect, inject, injectAsync, beforeEachProviders, beforeEach} from 'angular2/testing';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {Injectable, Component} from 'angular2/core';

import {UserService} from './user.service';
import {StorageService, SessionService} from './storage.service';
import {HttpService} from './http.service';
import {User} from '../objects/user';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

describe('HttpService', () => {

	beforeEachProviders(() => [
		UserService,
		StorageService,
		SessionService,
		HttpService,
		BaseRequestOptions,
		MockBackend,
		provide(Http, {
			useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
				return new Http(backend, defaultOptions);
			},
			deps: [MockBackend, BaseRequestOptions]
		})
	]);


	it('should return headers with correct content',
		inject([HttpService, MockBackend, StorageService], (httpService: HttpService, backend: MockBackend, storageService: StorageService) => {
			let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXJ2ZXIiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE0NTk0NDc4ODAsImV4cCI6MTQ1OTUzNDI4MH0.b260_KHB1FBBNlu2avblbi9VzqSER9hnzzCzdf6cGA4';

			storageService.set('id_token', token);
			let headers = httpService.generateHeaders();
			storageService.del('id_token');

			expect(headers.keys()[0]).toBe("Accept");
			expect(headers.values()[0][0]).toBe("application/json");

			expect(headers.keys()[1]).toBe("Content-Type");
			expect(headers.values()[1][0]).toBe("application/json");

			expect(headers.keys()[2]).toBe("x-access-token");
			expect(headers.values()[2][0]).toBe(token);
		})
	);



});
