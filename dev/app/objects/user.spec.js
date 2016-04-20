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
                    user_1.User.setNextId(0);
                    var user = new user_1.User('Super Cat', 'email', 1);
                    expect(user.id).toEqual(1);
                });
                it('has name given in the constructor', function () {
                    var user = new user_1.User('Super Cat', 'email', 1);
                    expect(user.username).toEqual('Super Cat');
                });
                it('has email given in the constructor', function () {
                    var user = new user_1.User('Super Cat', 'email', 1);
                    expect(user.email).toEqual('email');
                });
                it('has id initiated at 0 in the constructor', function () {
                    var user = new user_1.User('Super Cat', 'email');
                    expect(user.id).toEqual(0);
                });
                it('has id changed to 3 when setNextId is called with 3', function () {
                    user_1.User.setNextId(3);
                    var user = new user_1.User('Super Cat', 'email');
                    expect(user.id).toEqual(3);
                });
                it('has a copy of itself when clone is called', function () {
                    var user1 = new user_1.User('Super Cat', 'email');
                    var user2 = user_1.User.clone(user1);
                    delete user1.id;
                    delete user2.id;
                    expect(user1).toEqual(user2);
                });
            });
        }
    }
});
//# sourceMappingURL=user.spec.js.map