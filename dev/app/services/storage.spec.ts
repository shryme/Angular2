import {provide} from 'angular2/core';

import {BaseRequestOptions, Response, ResponseOptions, Http, Headers} from 'angular2/http';
import {it, describe, expect, inject, injectAsync, beforeEachProviders, beforeEach} from 'angular2/testing';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {Injectable, Component} from 'angular2/core';

import {StorageService, SessionService} from './storage.service';
import {HttpService} from './http.service';
import {User} from '../objects/user';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

describe('StorageService', () => {

	beforeEachProviders(() => [
		StorageService,
		SessionService
	]);

	localStorage.clear();

	describe('Storage - local', () => {

		describe('Set', () => {

			it('should save a value inside the key when calling set',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					storageService.set('test', 'test');
					expect(JSON.parse(localStorage.getItem('test'))).toBe('test');
				})

			);

		});

		describe('Get', () => {

			it('should return null when the key dont exist',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					expect(JSON.parse(localStorage.getItem('doesntexist'))).toBeNull();
				})

			);

			it('should return the value when the key exist',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					let obj = { id: 1, name: 'test' };
					storageService.set('test', obj);
					let resp = storageService.get('test');
					expect(resp).not.toBeNull();
					expect(resp.id).toBe(obj.id);
					expect(resp.name).toBe(obj.name);
				})

			);

		});

		describe('Del', () => {

			it('should delete the value of the key',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					storageService.set('test', 'test');
					storageService.del('test');
					expect(storageService.get('test')).toBeNull();
				})

			);

		});

	});







	describe('Storage - session', () => {

		describe('Set', () => {

			it('should save a value inside the key when calling set',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					sessionService.set('test', 'test');
					expect(JSON.parse(sessionStorage.getItem('test'))).toBe('test');
				})

			);

		});

		describe('Get', () => {

			it('should return null when the key dont exist',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					expect(JSON.parse(sessionStorage.getItem('doesntexist'))).toBeNull();
				})

			);

			it('should return the value when the key exist',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					let obj = { id: 1, name: 'test' };
					sessionService.set('test', obj);
					let resp = sessionService.get('test');
					expect(resp).not.toBeNull();
					expect(resp.id).toBe(obj.id);
					expect(resp.name).toBe(obj.name);
				})

			);

		});

		describe('Del', () => {

			it('should delete the value of the key',
				inject([StorageService, SessionService], (storageService: StorageService, sessionService: SessionService) => {
					sessionService.set('test', 'test');
					sessionService.del('test');
					expect(sessionService.get('test')).toBeNull();
				})

			);

		});

	});






});
