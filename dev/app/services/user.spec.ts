import {provide} from 'angular2/core';

import {BaseRequestOptions, Response, ResponseOptions, Http, Headers} from 'angular2/http';
import {it, describe, expect, inject, injectAsync, beforeEachProviders, beforeEach} from 'angular2/testing';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {Injectable, Component} from 'angular2/core';

import {UserService} from './user.service';
import {User} from '../objects/user';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

describe('UserService', () => {

	beforeEachProviders(() => [
		UserService,
		BaseRequestOptions,
		MockBackend,
		provide(Http, {
			useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
				return new Http(backend, defaultOptions);
			},
			deps: [MockBackend, BaseRequestOptions]
		})
	]);

	beforeEach(inject([MockBackend], (backend: MockBackend) => {
		// const baseResponse = new Response(new ResponseOptions({ body: { id: 1, email: 'a@a.com', username: 'a@a.com', password: 'a@a.com' } }));
		// backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
	}));

	it('should return user when connect worked',
		inject([UserService, MockBackend], (userService: UserService, backend: MockBackend) => {
			let baseResponse = new Response(new ResponseOptions({ body: { id: 1, email: 'a@a.com', username: 'a@a.com', password: 'a@a.com' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

			userService.connect('a@a.com', 'a@a.com').subscribe((res: User) => {
				expect(res.id).toBe(1);
				expect(res.email).toBe('a@a.com');
				expect(res.password).toBe('a@a.com');
				expect(res.username).toBe('a@a.com');
			});
		})
	);

	it('should return an empty user when connect did not worked',
		inject([UserService, MockBackend], (userService: UserService, backend: MockBackend) => {
			let baseResponse = new Response(new ResponseOptions({ body: { error: '404' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
			User.setNextId(0);
			userService.connect('a@a.com', 'a@a.com').subscribe((res: User) => {
				expect(res.id).toBe(0);
				expect(res.email).toBe('');
				expect(res.password).toBe('');
				expect(res.username).toBe('');
			});
		})
	);



});
