var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');

var Log = require('./log');

var app = module.exports = express.Router();

app.get('/anonymous', function(req, res) {
	Log.result(req, "ahah");

	res.status(200).send("ahah");
});
