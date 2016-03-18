System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var nextId, User;
    return {
        setters:[],
        execute: function() {
            nextId = 30;
            User = (function () {
                function User(id, username, email, password) {
                    this.id = id;
                    this.username = username;
                    this.email = email;
                    this.password = password;
                    this.id = id || nextId++;
                }
                User.prototype.clone = function () { return User.clone(this); };
                User.setNextId = function (next) { nextId = next; };
                User.clone = function (u) { return new User(u.id, u.username, u.email, u.password); };
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map