var mysql = require('mysql');

var config = require('../config');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var Log = require('../log');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'sss',
	password : 'sss',
	database : 'angular2'
});


var fct = {
	transaction: function(a, b, c) {

		var promise = new Promise(function(resolve, reject) {


			connection.beginTransaction(function(err) {
				if (err) {
					reject(err);
					return;
					// throw err;
				}

				connection.query(a, b, function(err, result, fields) {
					if (err) {
						reject(err);
						return;
						// throw err;
					}

					var log = 'Post ' + result.insertId + ' added';
					console.log(log);

					if (err) {
						return connection.rollback(function() {
							reject(err);
							return;
							// throw err;
						});
					}
					connection.commit(function(err) {
						if (err) {
							return connection.rollback(function() {
								reject(err);
								return;
								// throw err;
							});
						}
						else {
							resolve(result);
							// c(err, result, fields);
						}
					});
				});
			});



		});

		return promise;




		// connection.query(a, b, function(err, rows, fields) {
		// 	if (err)
		// 		throw err;

		// 	console.log('LOGGED: ', rows[0]);

		// 	if (rows[0] === undefined) {
		// 		resp = {
		// 			success: false,
		// 			message: 'Authentication failed. Wrong password.'
		// 		};
		// 	}
		// 	else {
		// 		var user = {id: rows[0].id, username: rows[0].username, email: rows[0].email};
		// 		var token = createToken(user);

		// 		resp = {
		// 			success: true,
		// 			message: 'Enjoy your token!',
		// 			token: token
		// 		};
		// 	}

		// 	res.setHeader('Content-Type', 'application/json');
		// 	res.json(resp);

		// 	Log.result(req, resp);


		// });


	},



}


module.exports = fct;
