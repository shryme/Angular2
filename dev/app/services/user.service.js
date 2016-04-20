System.register(['angular2/core', 'angular2/http', '../objects/user', 'angular2-jwt/angular2-jwt', './storage.service', './http.service'], function(exports_1, context_1) {
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
    var core_1, http_1, user_1, angular2_jwt_1, storage_service_1, http_service_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http, _storage) {
                    this.http = http;
                    this._storage = _storage;
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    console.log('Task Service created.', http);
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
                }
                UserService.prototype.authenticate = function (email, password, newAccount) {
                    var _this = this;
                    var json = JSON.stringify({ "email": email, "password": password, "newAccount": newAccount });
                    return this.http.post('http://localhost:3333/authenticate', json)
                        .map(function (obj) {
                        var objUser = _this.jwtHelper.decodeToken(obj.token);
                        obj.user = new user_1.User(objUser.username, objUser.email, objUser.id);
                        return obj;
                    });
                };
                UserService.prototype.getUser = function () {
                    if (this.user !== undefined)
                        return this.user;
                    else {
                        console.log('getUser - Used session');
                        var sessionUser = this._storage.get('user');
                        if (sessionUser)
                            return new user_1.User(sessionUser.username, sessionUser.email, sessionUser.id);
                        else {
                            //TODO - redirect to login
                            return undefined;
                        }
                    }
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_service_1.HttpService, storage_service_1.StorageService])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map