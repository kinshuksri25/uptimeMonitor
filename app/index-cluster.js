/*
*Primary file
*
*/

//Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var cluster = require('cluster');
var os = require('os');

//declare the app
var app ={};

//init function
app.init = function(callback)
{	
	if(cluster.isMaster)//only on master thread
	{
		//start the workers
		workers.init();
		
		//start the cli, but make sure it starts last
		setTimeout(function(){
			cli.init();
			callback();
		},50);

		//fork the process
		for(var i = 0;i<os.cpus().length;i++)
		{
			cluster.fork();
		}
		
	}else //only on fork thread
	{
		//start the server
		server.init();
	}

};

//self invoking only if required directly
if(require.main == module)
app.init(function(){});

///export the module
module.exports = app;
