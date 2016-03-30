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
		const baseResponse = new Response(new ResponseOptions({ body: { id: 1, email: 'a@a.com', username: 'a@a.com', password: 'a@a.com' } }));
		backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
	}));

	it('should return user when connect worked',
		inject([UserService], (userService: UserService) => {
			userService.connect('a@a.com', 'a@a.com').subscribe((res: User) => {
				expect(res.id).toBe(1);
				expect(res.email).toBe('a@a.com');
				expect(res.password).toBe('a@a.com');
				expect(res.username).toBe('a@a.com');
			});
		})
	);



});
