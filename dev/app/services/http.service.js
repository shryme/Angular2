System.register(['angular2/core', 'angular2/http', './storage.service'], function(exports_1, context_1) {
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
    var core_1, http_1, storage_service_1;
    var HttpService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            }],
        execute: function() {
            HttpService = (function () {
                function HttpService(http, _local) {
                    this.http = http;
                    this._local = _local;
                    console.log('constructor');
                }
                HttpService.prototype.get = function (address) {
                    return this.http.get(address, { headers: this.generateHeaders() })
                        .map(function (responseData) {
                        return responseData.json();
                    });
                };
                HttpService.prototype.post = function (address, json) {
                    return this.http.post(address, json, { headers: this.generateHeaders() })
                        .map(function (responseData) {
                        return responseData.json();
                    });
                };
                HttpService.prototype.generateHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append('Accept', 'application/json');
                    headers.append('Content-Type', 'application/json');
                    headers.append('x-access-token', this._local.get('id_token'));
                    return headers;
                };
                HttpService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, storage_service_1.PermanentStorageService])
                ], HttpService);
                return HttpService;
            }());
            exports_1("HttpService", HttpService);
        }
    }
});
//# sourceMappingURL=http.service.js.map