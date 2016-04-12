var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');

var app = module.exports = express.Router();

app.get('/anonymous', function(req, res) {
	res.status(200).send("ahah");
});
