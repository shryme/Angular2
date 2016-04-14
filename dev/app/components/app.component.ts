import { Component, provide, Injectable }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
// import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

import { UserService } from '../services/user.service';
import { StorageService, PermanentStorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';
import { HeroService }     from '../services/hero.service';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { LoginComponent } from './login.component';
import { SettingsComponent } from './settings.component';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
	selector: 'my-app',
	templateUrl: 'app/components/app.component.html',
	styleUrls: ['app/components/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		HTTP_PROVIDERS,
		// provide(AuthHttp, {
		// 	useFactory: (http) => {
		// 		return new AuthHttp(new AuthConfig(), http);
		// 	},
		// 	deps: [Http]
		// }),
		// AuthConfig,
		HttpService,
		HeroService,
		UserService,
		StorageService,
		PermanentStorageService
	]
})

@RouteConfig([
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardComponent,
		useAsDefault: true
	},
	{
		path: '/heroes',
		name: 'Heroes',
		component: HeroesComponent
	},
	{
		path: '/detail/:id',
		name: 'HeroDetail',
		component: HeroDetailComponent
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent
	},
	{
		path: '/profile/settings',
		name: 'Settings',
		component: SettingsComponent
	}
])

export class AppComponent {

	title = 'Tour of Heroes';

}
