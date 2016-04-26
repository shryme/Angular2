System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../objects/config', './storage.service', './loading.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, config_1, storage_service_1, loading_service_1;
    var HttpService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (loading_service_1_1) {
                loading_service_1 = loading_service_1_1;
            }],
        execute: function() {
            HttpService = (function (_super) {
                __extends(HttpService, _super);
                function HttpService(http, _storage) {
                    _super.call(this);
                    this.http = http;
                    this._storage = _storage;
                    this.server = config_1.config.server;
                    console.log('constructor');
                }
                HttpService.prototype.get = function (address) {
                    var _this = this;
                    this.showLoading();
                    return this.http.get(this.server + address, { headers: this.generateHeaders() })
                        .map(function (responseData) {
                        _this.hideLoading();
                        return responseData.json();
                    }).catch(function (err) {
                        _this.hideLoading();
                        return Observable_1.Observable.throw(err);
                    });
                };
                HttpService.prototype.post = function (address, json) {
                    var _this = this;
                    this.showLoading();
                    return this.http.post(this.server + address, json, { headers: this.generateHeaders() })
                        .map(function (responseData) {
                        _this.hideLoading();
                        return responseData.json();
                    }).catch(function (err) {
                        _this.hideLoading();
                        return Observable_1.Observable.throw(err);
                    });
                };
                HttpService.prototype.generateHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append('Accept', 'application/json');
                    headers.append('Content-Type', 'application/json');
                    headers.append('x-access-token', this._storage.get('id_token'));
                    return headers;
                };
                HttpService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, storage_service_1.StorageService])
                ], HttpService);
                return HttpService;
            }(loading_service_1.LoadingPage));
            exports_1("HttpService", HttpService);
        }
    }
});
//# sourceMappingURL=http.service.js.map