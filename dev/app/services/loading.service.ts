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

	showLoading() {
		this.loading = true;
	}

	hideLoading() {
		this.loading = false;
	}

}

@Component({
    selector: 'loading-indicator',
    template: `
    <div class="loading">
    	<div class="loading-message">
    		<paper-spinner active></paper-spinner>
    	</div>
    </div>
    <div class="backdrop"></div>
    `,
    styleUrls: ['app/services/loading.service.css']
})

export class LoadingIndicator { }
