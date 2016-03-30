System.register(['angular2/core', 'angular2/http', 'angular2/testing', 'angular2/http/testing', './user.service', 'rxjs/Rx', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, testing_1, testing_2, user_service_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (testing_2_1) {
                testing_2 = testing_2_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            testing_1.describe('UserService', function () {
                testing_1.beforeEachProviders(function () { return [
                    user_service_1.UserService,
                    http_1.BaseRequestOptions,
                    testing_2.MockBackend,
                    core_1.provide(http_1.Http, {
                        useFactory: function (backend, defaultOptions) {
                            return new http_1.Http(backend, defaultOptions);
                        },
                        deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                    })
                ]; });
                testing_1.beforeEach(testing_1.inject([testing_2.MockBackend], function (backend) {
                    var baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: { id: 1, email: 'a@a.com', username: 'a@a.com', password: 'a@a.com' } }));
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                }));
                testing_1.it('should return user when connect worked', testing_1.inject([user_service_1.UserService], function (userService) {
                    userService.connect('a@a.com', 'a@a.com').subscribe(function (res) {
                        testing_1.expect(res.id).toBe(1);
                        testing_1.expect(res.email).toBe('a@a.com');
                        testing_1.expect(res.password).toBe('a@a.com');
                        testing_1.expect(res.username).toBe('a@a.com');
                    });
                }));
            });
        }
    }
});
//# sourceMappingURL=user.spec.js.map