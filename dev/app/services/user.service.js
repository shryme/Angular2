System.register(['angular2/core', 'angular2/http', '../objects/user', '../objects/headers', 'angular2-jwt/angular2-jwt'], function(exports_1, context_1) {
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
    var core_1, http_1, user_1, headers_1, angular2_jwt_1;
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
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    console.log('Task Service created.', http);
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
                }
                UserService.prototype.authenticate = function (email, password) {
                    var _this = this;
                    var json = JSON.stringify({ "email": email, "password": password });
                    return this.http.post('http://localhost:3333/authenticate', json, { headers: headers_1.contentHeaders })
                        .map(function (responseData) { return responseData.json(); })
                        .map(function (obj) {
                        var token;
                        if (obj.success) {
                            token = obj.token;
                            var objUser = _this.jwtHelper.decodeToken(token);
                            _this.user = new user_1.User(objUser.username, objUser.email, objUser.id);
                            sessionStorage.setItem('user', JSON.stringify(_this.user));
                        }
                        else {
                            token = undefined;
                            _this.user = undefined;
                        }
                        return token;
                    });
                };
                UserService.prototype.getUser = function () {
                    if (this.user !== undefined)
                        return this.user;
                    else {
                        console.log('getUser - Used session');
                        var sessionUserStr = sessionStorage.getItem('user');
                        var sessionUser = JSON.parse(sessionUserStr);
                        if (sessionUser !== null) {
                            return new user_1.User(sessionUser.username, sessionUser.email, sessionUser.id);
                        }
                        else {
                            //TODO - redirect to login
                            return new user_1.User('def', 'def');
                        }
                    }
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map