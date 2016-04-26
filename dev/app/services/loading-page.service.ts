import {Injectable, Component, ChangeDetectorRef, ApplicationRef} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {config} from '../objects/config';
import {StorageService} from './storage.service';

@Injectable()

export class LoadingPage {

	public loading: boolean;

	constructor() {
		this.loading = false;
	}

	standby() {
		this.loading = true;
	}

	ready() {
		this.loading = false;
	}



}

