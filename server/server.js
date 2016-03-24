var http = require('http');
var url = require("url");
var express = require('express');
var connect = require('connect');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var app = express();

app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use(bodyParser.urlencoded());


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








	if (typeof(req.session.todolist) == 'undefined') {
		req.session.todolist = [];
		req.session.nextId = 1;
	}
	next();
})

app.post('/connect', function(req, res) {

	console.log('/connect', req.body);

	var email = req.body.email;
	var password = req.body.password;


	var resp = {error: '404'};
	if (email === 'a@a.com' && password === 'a@a.com')
		resp = {id: 1, username: 'server', email: email, password: password};

	res.setHeader('Content-Type', 'application/json');
	res.json(resp);

});













app.use(function(req, res, next){
	console.log(req.url);
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
