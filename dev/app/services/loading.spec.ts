import {provide} from 'angular2/core';

import {BaseRequestOptions, Response, ResponseOptions, Http, Headers} from 'angular2/http';
import {it, describe, expect, inject, injectAsync, beforeEachProviders,
	beforeEach, TestComponentBuilder, setBaseTestProviders, ComponentFixture} from 'angular2/testing';
import {MockBackend, MockConnection,} from 'angular2/http/testing';

import {
	TEST_BROWSER_APPLICATION_PROVIDERS,
	TEST_BROWSER_PLATFORM_PROVIDERS
} from 'angular2/platform/testing/browser';

import {Injectable, Component} from 'angular2/core';

import {UserService} from './user.service';
import {StorageService, SessionService} from './storage.service';
import {HttpService} from './http.service';
import {User} from '../objects/user';

import {LoadingIndicator} from './loading.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

describe('LoadingService', () => {

	let tcb;

	// beforeEachProviders(() => [
	// 	TestComponentBuilder,
	// 	StorageService,
	// 	SessionService
	// ]);

	beforeEach(inject([TestComponentBuilder], _tcb => {
		tcb = _tcb
	}));

	setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

	it('should generate a template for loading spinner', done => {
		return tcb.createAsync(LoadingIndicator).then(fixture => {
			let element = fixture.nativeElement;
			fixture.detectChanges(); //trigger change detection
			// debugger
			expect(element.querySelector('div')).not.toBeNull();
			expect(element.querySelector('div').className).toBe('loading');

			expect(element.querySelector('div').querySelector('div')).not.toBeNull();
			expect(element.querySelector('div').querySelector('div').className).toBe('loading-message');

			expect(element.querySelector('div').querySelector('div').querySelector('paper-spinner')).not.toBeNull();
			removeLoading();
			done();
		})
			.catch(e => done.fail(e));
	});


});

function removeLoading() {
	let loadingDiv = document.getElementById('root0');
	loadingDiv.parentNode.removeChild(loadingDiv);
}
