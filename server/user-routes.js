var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var Log = require('./log');
var log = new Log();

var app = module.exports = express.Router();


function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), config.secret, {
		expiresIn: 3600*24 // expires in 24 hours
	});
}

app.post('/authenticate', function(req, res) {

	log.info(req);

	// var json = JSON.parse(req.body.json);
	// console.log('SEB', json);
	var email = req.body.email;
	var password = req.body.password;
	var resp;

	console.log('email ', email);
	console.log('password', password);


	if (email === 'a@a.com' && password === 'a@a.com') {

		var user = {id: 1, username: 'server', email: email, password: password};
		var token = createToken(user);

		resp = {
			success: true,
			message: 'Enjoy your token!',
			token: token
		};
	}
	else {

		resp = {
			success: false,
			message: 'Authentication failed. Wrong password.'
		};

	}

	res.setHeader('Content-Type', 'application/json');
	res.json(resp);

	log.result(req, resp);


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
	res.json({ message: 'Welcome to the coolest API on earth!' });
});
