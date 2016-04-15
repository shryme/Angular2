var mysql = require('mysql');

var config = require('./config');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var Log = require('./log');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'sss',
	password : 'sss',
	database : 'angular2'
});


var fct = {
	transaction: function(a, b, c) {


		connection.beginTransaction(function(err) {
			if (err)
				throw err;

			connection.query(a, b, function(err, result, fields) {
				var log = 'Post ' + result.insertId + ' added';
				console.log(log);

				if (err) {
					return connection.rollback(function() {
						throw err;
					});
				}
				connection.commit(function(err) {
					if (err) {
						return connection.rollback(function() {
							throw err;
						});
					}
					c(err, result, fields);
					console.log('success!');
				});
			});
		});




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
