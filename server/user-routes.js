var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var Log = require('./log');

var mysql = require('mysql');

var app = module.exports = express.Router();

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'sss',
	password : 'sss',
	database : 'angular2'
});


function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), config.secret, {
		expiresIn: 3600*24 // expires in 24 hours
	});
}

app.post('/authenticate', function(req, res) {

	Log.info(req);


	var email = req.body.email;
	var password = req.body.password;
	var resp;

	console.log('email ', email);
	console.log('password', password);

	connection.query('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?', [email, password], function(err, rows, fields) {
		if (err)
			throw err;

		console.log('LOGGED: ', rows[0]);

		if (rows[0] === undefined) {
			resp = {
				success: false,
				message: 'Authentication failed. Wrong password.'
			};
		}
		else {
			var user = {id: rows[0].id, username: rows[0].username, email: rows[0].email};
			var token = createToken(user);

			resp = {
				success: true,
				message: 'Enjoy your token!',
				token: token
			};
		}

		res.setHeader('Content-Type', 'application/json');
		res.json(resp);

		Log.result(req, resp);


	});



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

