System.register(['angular2/core', 'angular2/router', '../services/loading.service', '../objects/user', '../services/user.service', '../services/http.service', 'angular2-jwt/angular2-jwt'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, loading_service_1, user_1, user_service_1, http_service_1, angular2_jwt_1;
    var SettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (loading_service_1_1) {
                loading_service_1 = loading_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            // import {AuthConfig} from 'angular2-jwt';
            SettingsComponent = (function () {
                function SettingsComponent(http, _userService, _routeParams) {
                    var _this = this;
                    this.http = http;
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this.phone = "";
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.isReady = false;
                    console.log('constructor');
                    this._userService.getSettings().subscribe(function (res) {
                        _this.phone = res.phone;
                        _this.isReady = true;
                    }, function (err) {
                        console.log('SUBSCRIBE ERROR', err);
                        _this.phone = err.json().message;
                        _this.isReady = true;
                    });
                }
                SettingsComponent.prototype.ngOnInit = function () {
                    this.user = this._userService.getUser();
                    if (this.user === undefined)
                        this.user = new user_1.User('', '');
                    console.log('test');
                };
                SettingsComponent.prototype.goBack = function () {
                    // window.history.back();
                };
                SettingsComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._userService.saveSettings(this.phone).subscribe(function (res) {
                    }, function (err) {
                        console.log('SUBSCRIBE ERROR', err);
                        _this.phone = err.json().message;
                    });
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'my-hero-detail',
                        templateUrl: 'app/components/settings.component.html',
                        directives: [loading_service_1.LoadingIndicator],
                        inputs: ['hero']
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService, user_service_1.UserService, router_1.RouteParams])
                ], SettingsComponent);
                return SettingsComponent;
            }());
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map