var colors = require('colors');


var fct = {
	delimiter: function() {
		console.log('////////////////////////////////////////////////////'.bgYellow.yellow);
	},

	result: function(req, resp) {
		if (resp.error)
			console.log(req.url.bgRed.white, resp);
		else
			console.log(req.url.green, resp);
		fct.delimiter();
	},

	info: function(req, resp) {
		fct.delimiter();
		console.log(req.url.cyan, req.body);
	}
}


module.exports = fct;
