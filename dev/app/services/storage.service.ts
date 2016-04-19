import {Injectable, Component} from 'angular2/core';



@Injectable()

export class StorageService {

	set(key: string, value: any) {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	get(key: string) {
		let sessionStr: string = sessionStorage.getItem(key);
		let sessionObj: any;

		try {
			sessionObj = JSON.parse(sessionStr);
			return sessionObj;
		} catch (e) {
			return sessionStr;
		}

	}

	del(key: string) {
		sessionStorage.removeItem(key);
	}


}

export class PermanentStorageService {
	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	get(key: string) {
		let localStr: string = localStorage.getItem(key);
		let localObj: any;

		try {
			localObj = JSON.parse(localStr);
			return localObj;
		} catch (e) {
			return localStr;
		}

	}

	del(key: string) {
		localStorage.removeItem(key);
	}
}
