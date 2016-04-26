var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var Log = require('./log');

var database = require('./database/database');
var userDao = require('./database/user');

var app = module.exports = express.Router();


function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), config.secret, {
		expiresIn: 3600*24 // expires in 24 hours
	});
}

app.post('/authenticate', function(req, res) {

	res.setHeader('Content-Type', 'application/json');

	Log.info(req);


	var email = req.body.email;
	var password = req.body.password;
	var newAccount = req.body.newAccount;
	var resp;

	console.log('email ', email);
	console.log('password', password);

	if (newAccount) {


		var promiseGetByEmail = userDao.getByEmail(email);

		promiseGetByEmail.then(function(user) {
			console.log('LOGGED: ', user);

			if (user === undefined) {
				var promiseInsert = userDao.insert(email, email, password);

				promiseInsert.then(function(insertId) {
					console.log(insertId);
					if (insertId === undefined) {
						res.status(500).json({
							success: false,
							message: 'Error with database.'
						});
						return;
					}
					else {
						var token = createToken({id: insertId, username: email, email: email});
						console.log('TOKEN', token);
						resp = {
							success: true,
							message: 'Success!',
							token: token
						};

						res.json(resp);

						Log.result(req, resp);
					}
				}, function(err) {
					resp = {
						success: false,
						message: err.message,
						code: err.code
					};
					res.status(500).json(resp);
					console.log(req.url.bgRed.white, err);
				});

			}
			else {

				resp = {
					success: false,
					message: 'Email already in use.'
				};

				res.status(500).json(resp);

				Log.result(req, resp);

			}
		}, function(err) {
			resp = {
				success: false,
				message: err.message,
				code: err.code
			};
			res.status(500).json(resp);
			console.log(req.url.bgRed.white, err);
		});



	}
	else {

		var promiseLogin = userDao.login(email, password);

		promiseLogin.then(function(row) {
			if (row === undefined) {
				resp = {
					success: false,
					message: 'Authentication failed.'
				};

				res.status(500).json(resp);
				return;
			}
			else {
				var token = createToken(row);

				resp = {
					success: true,
					message: 'Success!',
					token: token
				};
				res.json(resp);

			}
			Log.result(req, resp);
		}, function(err) {
			resp = {
				success: false,
				message: err.message,
				code: err.code
			};
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

app.get('/user/settings', function(req, res) {

	var id = req.decoded.id;

	var promiseSelect = userDao.getById(id);

	promiseSelect.then(function(row) {
		console.log('SELECT', row);

		resp = {
			success: true,
			message: 'Success UPDATE!',
			settings: {phone: row.phone}
		};

		res.json(resp);
		Log.result(req, resp);

	}, function(err) {
		resp = {
			success: false,
			message: err.message,
			code: err.code
		};
		res.status(500).json(resp);
		console.log(req.url.bgRed.white, err);
	});

});

app.post('/user/settings', function(req, res) {
	var id = req.decoded.id;
	var phone = req.body.phone;



	var promiseUpdate = userDao.update(id, phone);

	promiseUpdate.then(function(row) {
		console.log('UPDATE', row);

		resp = {
			success: true,
			message: 'Success UPDATE!'
		};

		setTimeout(function(){
			resp = {
				success: true,
				message: 'Success UPDATE!'
			};

			res.json(resp);
			Log.result(req, resp);
		}, 0);

		// res.json(resp);
		// Log.result(req, resp);

	}, function(err) {
		resp = {
			success: false,
			message: err.message,
			code: err.code
		};
		res.status(500).json(resp);
		console.log(req.url.bgRed.white, err);
	});



});
