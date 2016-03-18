System.register(['./user'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            describe('User', function () {
                it('has id given in the constructor', function () {
                    var user = new user_1.User(1, 'Super Cat', 'email', 'pass');
                    expect(user.id).toEqual(1);
                });
                it('has name given in the constructor', function () {
                    var user = new user_1.User(1, 'Super Cat', 'email', 'pass');
                    expect(user.username).toEqual('Super Cat');
                });
                it('has email given in the constructor', function () {
                    var user = new user_1.User(1, 'Super Cat', 'email', 'pass');
                    expect(user.email).toEqual('email');
                });
                it('has password given in the constructor', function () {
                    var user = new user_1.User(1, 'Super Cat', 'email', 'pass');
                    expect(user.password).toEqual('pass');
                });
            });
        }
    }
});
//# sourceMappingURL=user.spec.js.map