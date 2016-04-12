var http = require('http');
var url = require("url");
var express = require('express');
var cors = require('cors');
var connect = require('connect');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var colors = require('colors');

var config = require('./config');

var app = express();

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

app.use(cookieParser());
// app.use(session({secret: 'keyboard cat'}));

//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next){

	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);








	// if (typeof(req.session.todolist) == 'undefined') {
	// 	req.session.todolist = [];
	// 	req.session.nextId = 1;
	// }
	next();
})

app.get('/', function(req, res) {
	res.json({ message: 'default' });
});

app.post('/authenticate', function(req, res) {

	logDel();
	logInfo(req);

	// var json = JSON.parse(req.body.json);
	// console.log('SEB', json);
	var email = req.body.email;
	var password = req.body.password;
	var resp;


	if (email === 'a@a.com' && password === 'a@a.com') {

		var user = {id: 1, username: 'server', email: email, password: password};
		var token = jwt.sign(user, config.secret, {
			expiresIn: 3600*24 // expires in 24 hours
		});

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

	logRes(req, resp);

	logDel();


});



app.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'secret', function(err, decoded) {
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












app.post('/connect', function(req, res) {

	logDel();
	logInfo(req);

	var json = JSON.parse(req.body.json);
	console.log('SEB', json);
	var email = json.email;
	var password = json.password;


	var resp = {error: '404'};
	if (email === 'a@a.com' && password === 'a@a.com')
		resp = {id: 1, username: 'server', email: email, password: password};

	logRes(req, resp);

	res.setHeader('Content-Type', 'application/json');
	res.json(resp);

	logDel();

});















function logDel() {
	console.log('////////////////////////////////////////////////////'.bgYellow.yellow);
}

function logInfo(req) {
	console.log(req.url.cyan, req.body);
}

function logRes(req, resp) {
	if (resp.error)
		console.log(req.url.bgRed.white, resp);
	else
		console.log(req.url.green, resp);
}





app.use(function(req, res, next){
	console.log('app.use - ' + req.url);
	res.redirect('/connect');
});

app.listen(3333);
console.log('Server started');





// app.get('/todo', function(req, res) {

// 	res.setHeader('Content-Type', 'application/json');
// 	res.json({ todolist: req.session.todolist });

// });

// app.post('/todo/add', function(req, res) {

// 	console.log('adding: ' + req.body.todo);

// 	if (req.body.todo != '') {
// 		var todo = {
// 			id: req.session.nextId,
// 			text: req.body.todo
// 		}
// 		req.session.todolist.push(todo);
// 		req.session.nextId++;
// 	}

// 	console.log("redirect");


// 	res.redirect('/todo');

// });

// app.post('/todo/delete', function(req, res) {
// 	console.log('deleting: ' + req.body.id);

// 	var id = req.body.id;
// 	var list = req.session.todolist;

// 	if (id != '') {

// 		var index = -1;

// 		for (var i = 0; i < list.length; i++) {
// 			if (list[i].id == id) {
// 				index = i;
// 				break;
// 			}
// 		}

// 		if (index !== -1)
// 			req.session.todolist.splice(index, 1);
// 	}

// 	res.redirect('/todo');
// });
