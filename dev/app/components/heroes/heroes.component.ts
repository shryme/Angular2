import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';

import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {Hero} from '../../objects/hero/hero';
import {HeroService} from '../../services/hero/hero.service';

@Component({
	selector: 'my-heroes',
	templateUrl: 'app/components/heroes/heroes.component.html',
	styleUrls: ['app/components/heroes/heroes.component.css'],
	directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {

	heroes: Hero[];
	selectedHero: Hero;

	constructor(
		private _router: Router,
		private _heroService: HeroService
	) { }

	ngOnInit() {
		this.getHeroes();
	}

	getHeroes() {
		this._heroService.getHeroes().then(heroes => this.heroes = heroes);
	}


	onSelect(hero: Hero) {
		this.selectedHero = hero;
	}

	gotoDetail() {
		this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
	}

}

