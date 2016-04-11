System.register(['angular2/core', 'angular2/http', 'angular2/testing', 'angular2/http/testing', './user.service', '../objects/user', 'rxjs/Rx', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, testing_1, testing_2, user_service_1, user_1;
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
            function (user_1_1) {
                user_1 = user_1_1;
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
                    // const baseResponse = new Response(new ResponseOptions({ body: { id: 1, email: 'a@a.com', username: 'a@a.com', password: 'a@a.com' } }));
                    // backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
                }));
                testing_1.it('should return token when authenticate worked', testing_1.inject([user_service_1.UserService, testing_2.MockBackend], function (userService, backend) {
                    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXJ2ZXIiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE0NTk0NDc4ODAsImV4cCI6MTQ1OTUzNDI4MH0.b260_KHB1FBBNlu2avblbi9VzqSER9hnzzCzdf6cGA4';
                    var baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: { success: true, message: 'Enjoy your token!', token: token } }));
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    user_1.User.setNextId(0);
                    userService.authenticate('a@a.com', 'a@a.com').subscribe(function (res) {
                        testing_1.expect(res).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzZXJ2ZXIiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE0NTk0NDc4ODAsImV4cCI6MTQ1OTUzNDI4MH0.b260_KHB1FBBNlu2avblbi9VzqSER9hnzzCzdf6cGA4');
                    });
                }));
                testing_1.it('should return an undefined token when authenticate did not worked', testing_1.inject([user_service_1.UserService, testing_2.MockBackend], function (userService, backend) {
                    var baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: { error: '404' } }));
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    user_1.User.setNextId(0);
                    userService.authenticate('a@a.com', 'a@a.com').subscribe(function (res) {
                        testing_1.expect(res).toBe(undefined);
                    });
                }));
            });
        }
    }
});
//# sourceMappingURL=user.spec.js.map