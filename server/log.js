var colors = require('colors');

function Log() {

}

Log.prototype.constructor = Log;

Log.prototype.delimiter = function() {
	console.log('////////////////////////////////////////////////////'.bgYellow.yellow);
}

Log.prototype.result = function(req, resp) {
	if (resp.error)
		console.log(req.url.bgRed.white, resp);
	else
		console.log(req.url.green, resp);
	this.delimiter();
}

Log.prototype.info = function(req) {
	this.delimiter();
	console.log(req.url.cyan, req.body);
}

module.exports = Log;









