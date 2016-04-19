
var database = require('./database');

var fct = {

	getByEmail: function(email) {

		var promise = new Promise(function(resolve, reject) {

			database.transaction('SELECT * FROM `user` WHERE `email` = ?', [email])
			.then(function(rows) {
				resolve(rows[0]);
			}, function(err) {
				reject(err);
			});

		});

		return promise;


	},

	login: function(email, password) {

		var promise = new Promise(function(resolve, reject) {

			database.transaction('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?', [email, password])
			.then(function(rows) {
				resolve(rows[0]);
			}, function(err) {
				reject(err);
			});

		});

		return promise;

	},

	insert: function(email, email, password) {

		var promise = new Promise(function(resolve, reject) {

			database.transaction('insert  into `user`(`username`,`email`,`password`) values (?, ?, ?)', [email, email, password])
			.then(function(row) {
				resolve(row.insertId);
			}, function(err) {
				reject(err);
			});

		});

		return promise;


	}



}


module.exports = fct;
