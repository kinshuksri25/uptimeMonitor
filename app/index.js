/*
*Primary file
*
*/

//Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');

//declare the app
var app ={};

//init function

app.init = function(callback)
{
	//start the server
	server.init();
	//start the workers
	workers.init();
	//start the cli, but make sure it starts last
	setTimeout(function(){
		cli.init();
		callback();
	},50);
};

//self invoking only if required directly
if(require.main == module)
app.init(function(){});

///export the module
module.exports = app;
