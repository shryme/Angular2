
var database = require('./database');

var fct = {

	getById: function(id) {
		var promise = new Promise(function(resolve, reject) {

			database.transaction('SELECT * FROM `user` WHERE `id` = ?', [id])
			.then(function(rows) {
				resolve(rows[0]);
			}, function(err) {
				reject(err);
			});

		});

		return promise;
	},

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

	insert: function(email, username, password) {

		var promise = new Promise(function(resolve, reject) {

			database.transaction('insert  into `user`(`username`,`email`,`password`) values (?, ?, ?)', [email, email, password])
			.then(function(row) {
				resolve(row.insertId);
			}, function(err) {
				reject(err);
			});

		});

		return promise;


	},

	update: function(id, phone) {

		var promise = new Promise(function(resolve, reject) {



			var message = fct.validatePhone(phone);
			if (message !== '') {
				reject({message: message});
				return;
			}

			database.transaction('update  `user` SET `phone`=? WHERE `id`=?', [phone, id])
			.then(function(row) {
				resolve(row);
			}, function(err) {
				reject(err);
			});

		});

		return promise;


	},


	validatePhone: function(phone) {
		phone = phone.replace(/\D/g, '');
		if (isNumeric(phone) || phone.length !== 10) {
			return 'Phone format invalid';
		}

		return '';
	}



}

function isNumeric(n) {
	return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

module.exports = fct;
