System.register(['angular2/core', 'angular2/router', '../services/user.service', '../services/loading.service', '../services/storage.service', 'angular2-jwt/angular2-jwt'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_service_1, loading_service_1, storage_service_1, angular2_jwt_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (loading_service_1_1) {
                loading_service_1 = loading_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            LoginComponent = (function (_super) {
                __extends(LoginComponent, _super);
                function LoginComponent(_userService, _routeParams, _router, _storage) {
                    _super.call(this);
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._storage = _storage;
                    this.submitted = false;
                    this.test = "none";
                    this.email = "";
                    this.password = "";
                    this.password2 = "";
                    this.username = "";
                    this.newAccount = false;
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.showPage();
                }
                LoginComponent.prototype.ngOnInit = function () {
                };
                LoginComponent.prototype.loggedIn = function () {
                    return this._userService.loggedIn();
                };
                LoginComponent.prototype.goBack = function () {
                    // window.history.back();
                };
                LoginComponent.prototype.switchNew = function () {
                    this.newAccount = !this.newAccount;
                };
                LoginComponent.prototype.signOut = function () {
                    this._userService.delToken();
                    this.username = "";
                    this.email = "";
                    this.password = "";
                    this.id = undefined;
                    this.submitted = false;
                };
                LoginComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.showLoading();
                    if (this.newAccount) {
                        if (this.password !== this.password2)
                            return;
                    }
                    this._userService.authenticate(this.email, this.password, this.newAccount).subscribe(function (res) {
                        _this._userService.setToken(res.token);
                        _this._router.navigate(['Settings']);
                        _this.hideLoading();
                    }, function (err) {
                        console.log('SUBSCRIBE ERROR', err);
                        _this.signOut();
                        _this.username = err.json().message;
                        _this.email = err.status;
                        _this.submitted = true;
                        _this.hideLoading();
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-hero-detail',
                        templateUrl: 'app/components/login.component.html',
                        directives: [loading_service_1.LoadingIndicator],
                        inputs: ['hero']
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.RouteParams, router_1.Router, storage_service_1.StorageService])
                ], LoginComponent);
                return LoginComponent;
            }(loading_service_1.LoadingPage));
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map