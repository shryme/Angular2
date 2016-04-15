System.register(['angular2/core', 'angular2/router', '../services/user.service', 'angular2-jwt/angular2-jwt'], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, angular2_jwt_1;
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
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_userService, _routeParams, _router) {
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.submitted = false;
                    this.test = "none";
                    this.email = "";
                    this.password = "";
                    this.password2 = "";
                    this.username = "";
                    this.newAccount = false;
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                }
                LoginComponent.prototype.ngOnInit = function () {
                };
                LoginComponent.prototype.goBack = function () {
                    // window.history.back();
                };
                LoginComponent.prototype.switchNew = function () {
                    this.newAccount = !this.newAccount;
                };
                LoginComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.newAccount) {
                        if (this.password !== this.password2)
                            return;
                    }
                    this.submitted = true;
                    this._userService.authenticate(this.email, this.password, this.newAccount).subscribe(function (res) {
                        //If the auth was a success, we navigate elsewhere
                        if (res)
                            _this._router.navigate(['Settings']);
                        _this.email = "";
                        _this.password = "";
                        _this.username = 'Wrong email or password';
                        _this.id = -1;
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-hero-detail',
                        templateUrl: 'app/components/login.component.html',
                        inputs: ['hero']
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.RouteParams, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map