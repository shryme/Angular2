var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var Log = require('./log');

var database = require('./database/database');

var app = module.exports = express.Router();


function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), config.secret, {
		expiresIn: 3600*24 // expires in 24 hours
	});
}

app.post('/authenticate', function(req, res) {

	Log.info(req);


	var email = req.body.email;
	var password = req.body.password;
	var newAccount = req.body.newAccount;
	var resp;

	console.log('email ', email);
	console.log('password', password);

	if (newAccount) {

		var promise = database.transaction('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?', [email, password]);

		promise.then(function(rows) {
			console.log('LOGGED: ', rows[0]);

			if (rows[0] === undefined) {
				var promiseInsert = database.transaction('insert  into `user`(`username`,`email`,`password`) values (?, ?, ?)', [email, email, password]);

				promiseInsert.then(function(row) {
					console.log('LOGGED: ', row);

					if (row.insertId === undefined) {
						resp = {
							success: false,
							message: 'Error with database.'
						};

						res.setHeader('Content-Type', 'application/json');
						res.status(500).json(resp);
						return;
					}
					else {
						var token = createToken({id: row.insertId, username: email, email: email});
						console.log('TOKEN', token);
						resp = {
							success: true,
							message: 'Success!',
							token: token
						};
					}

					res.setHeader('Content-Type', 'application/json');
					res.json(resp);

					Log.result(req, resp);

				}, function (err) {
					resp = {
						success: false,
						message: err.message,
						code: err.code
					};
					res.setHeader('Content-Type', 'application/json');
					res.status(500).json(resp);
					console.log(req.url.bgRed.white, err);
				});


			}
			else {

				var token = createToken(rows[0]);

				resp = {
					success: false,
					message: 'Email already in use.'
				};

				res.setHeader('Content-Type', 'application/json');
				res.status(500).json(resp);

				Log.result(req, resp);

			}

		}, function(err) {
			resp = {
				success: false,
				message: err.message,
				code: err.code
			};
			res.setHeader('Content-Type', 'application/json');
			res.status(500).json(resp);
			console.log(req.url.bgRed.white, err);
		});



	}
	else {
		var promise = database.transaction('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?', [email, password]);

		promise.then(function(rows) {
			console.log('LOGGED: ', rows[0]);

			if (rows[0] === undefined) {
				resp = {
					success: false,
					message: 'Authentication failed.'
				};

				res.setHeader('Content-Type', 'application/json');
				res.status(500).json(resp);
				return;
			}
			else {
				var token = createToken(rows[0]);

				resp = {
					success: true,
					message: 'Success!',
					token: token
				};
			}

			res.setHeader('Content-Type', 'application/json');
			res.json(resp);

			Log.result(req, resp);
		}, function(err) {
			resp = {
				success: false,
				message: err.message,
				code: err.code
			};
			res.setHeader('Content-Type', 'application/json');
			res.status(500).json(resp);
			console.log(req.url.bgRed.white, err);
		})


	}




});



app.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});



app.get('/test', function(req, res) {

	var json = { message: 'Welcome to you, ' + req.decoded.email + " - " + req.decoded.id + " --- "}
	Log.result(req, json);
	res.json(json);

});

