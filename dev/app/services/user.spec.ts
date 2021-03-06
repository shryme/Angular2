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

describe('UserService', () => {

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

	// beforeEach(inject([MockBackend], (backend: MockBackend) => {
	// 	const baseResponse = new Response(new ResponseOptions({ body: { id: 1, email: 'a@a.com', username: 'a@a.com', password: 'a@a.com' } }));
	// 	backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
	// }));

	it('should return token when authenticate worked',
		inject([UserService, MockBackend], (userService: UserService, backend: MockBackend) => {
			let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXJ2ZXIiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE0NTk0NDc4ODAsImV4cCI6MTQ1OTUzNDI4MH0.b260_KHB1FBBNlu2avblbi9VzqSER9hnzzCzdf6cGA4';
			let baseResponse = new Response(new ResponseOptions({ body: { success: true, message: 'Enjoy your token!', token: token } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
			User.setNextId(0);
			userService.authenticate('a@a.com', 'a@a.com', false).subscribe((res: any) => {
				expect(res.token).toBe(token);
			});
		})
	);

	it('should return user when authenticate worked',
		inject([UserService, MockBackend], (userService: UserService, backend: MockBackend) => {
			let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXJ2ZXIiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE0NTk0NDc4ODAsImV4cCI6MTQ1OTUzNDI4MH0.b260_KHB1FBBNlu2avblbi9VzqSER9hnzzCzdf6cGA4';
			let baseResponse = new Response(new ResponseOptions({ body: { success: true, message: 'Enjoy your token!', token: token } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
			User.setNextId(0);
			userService.authenticate('a@a.com', 'a@a.com', false).subscribe((res: any) => {
				expect(res.user.id).toBe(1);
				expect(res.user.username).toBe('server');
				expect(res.user.email).toBe('a@a.com');
			});
		})
	);

	it('should return a user without password when authenticate worked',
		inject([UserService, MockBackend], (userService: UserService, backend: MockBackend) => {
			let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXJ2ZXIiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE0NTk0NDc4ODAsImV4cCI6MTQ1OTUzNDI4MH0.b260_KHB1FBBNlu2avblbi9VzqSER9hnzzCzdf6cGA4';
			let baseResponse = new Response(new ResponseOptions({ body: { success: true, message: 'Enjoy your token!', token: token } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
			User.setNextId(0);
			userService.authenticate('a@a.com', 'a@a.com', false).subscribe((res: any) => {
				console.log('HERE', res);
				expect(res.user.password).toBe(undefined);
			});
		})
	);


});
