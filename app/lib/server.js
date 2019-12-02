//server related tasks


//Dependencies
var http =  require('http');
var https = require('https');
var url = require('url');
var stringdecoder = require('string_decoder').StringDecoder;
var config =  require('./config');
var fs = require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');
var util = require('util');
var debug = util.debuglog('server');

//instantiate the server module object
var server = {};

//instanciating the https server
server.httpsServerOptions = {
	'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
	'cert': fs.readFileSync(path.join(__dirname,'/../https/server.crt'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res)
{
	server.unifiedServer(req,res);
});

//instanciating the http server
server.httpServer = http.createServer(function(req,res)
{
	server.unifiedServer(req,res);
});



//unified server logic
server.unifiedServer = function(req,res)
{
	//get the url and parse it
	//the parseurl is now an object containing all the meta data from the url 
	var parsedUrl = url.parse(req.url,true);

	//get the path from url
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	//get the query string as an object
	var queryStringObject = parsedUrl.query;

	//get the http method
	var method = req.method.toLowerCase();

	//get the headers as an object
	var headers = req.headers;

	//get the payload if any
	var decoder = new stringdecoder('utf-8');
	var buffer = '';
	//this is called only when we have a payload
	req.on('data',function(data)
		{
			buffer += decoder.write(data);
		});
	//this is always called
	req.on('end',function()
		{
			buffer += decoder.end();
			
			//choose the handler this request should go to
			var chosenhandler = typeof(server.router[trimmedPath]) !=='undefined'? server.router[trimmedPath] : handlers.notfound; 
			
			//if the request is in the public directory, use the public handler instead
			chosenhandler = trimmedPath.indexOf('public/') >-1 ? handlers.public : chosenhandler;

			//construct the data object to send to handler
			var data={
				'trimmedPath' : trimmedPath,
				'method':method,
				'payload':helpers.parseJsonToObject(buffer),
				'headers':headers,
				'queryStringObject':queryStringObject
			};
			//route the request to the handler specified in the router
			try{
			chosenhandler(data,function(status,payload,contentType)
				{
					server.processHandlerResponse(res,method,trimmedPath,status,payload,contentType);
				});
			}
			catch(e)
			{
				debug(e);
				server.processHandlerResponse(res,method,trimmedPath,500,{'error': 'an unkown error has occured'},'json');
			}
		});
};

//process the response from the handler
server.processHandlerResponse = function(res,method,trimmedPath,status,payload,contentType)
{
//use the status code called back by the handler or default to 200
					status = typeof(status) == 'number' ? status:200;
					//Determine the type of response
					contentType = typeof(contentType) == 'string' ? contentType : 'json';

					//return the response parts that are content specific
					var payloadString = '';
					if(contentType == 'json')
					{
						res.setHeader('Content-Type','application/json');
						
						//use the payload called back by the handler or default to empty
						payload = typeof(payload) == 'object'? payload : {};
						
						//convert the payload to string 
						payloadString = JSON.stringify(payload);
					}
					if(contentType == 'html')
					{
						res.setHeader('Content-Type','text/html');
						payloadString = typeof(payload) == 'string' ? payload : '';
					}
					if(contentType == 'favicon')
					{
						res.setHeader('Content-Type','image/x-icon');
						payloadString = typeof(payload) !== 'undefined' ? payload : '';
					}
					if(contentType == 'css')
					{
						res.setHeader('Content-Type','text/css');
						payloadString = typeof(payload) !== 'undefined' ? payload : '';
					}
					if(contentType == 'png')
					{
						res.setHeader('Content-Type','image/png');
						payloadString = typeof(payload) !== 'undefined' ? payload : '';
					}
					if(contentType == 'jpg')
					{
						res.setHeader('Content-Type','image/jpeg');
						payloadString = typeof(payload) !== 'undefined' ? payload : '';
					}
					if(contentType == 'plain')
					{
						res.setHeader('Content-Type','text/plain');
						payloadString = typeof(payload) == 'string' ? payload : '';
					}
					if(contentType == 'js')
					{
						res.setHeader('Content-Type','application/javascript');
						payloadString = typeof(payload) !== 'undefined' ? payload : '';
					}
					//return the response-parts that are common to all
					res.writeHead(status);
					res.end(payloadString);		

					//log a response	
					//console.log("returning response:",status,payloadString);			
};

//define a request router
server.router ={
'' : handlers.index,
'account/create' : handlers.accountCreate,
'account/edit' : handlers.accountEdit,
'account/deleted' : handlers.accountDeleted,
'session/create' : handlers.sessionCreate,
'session/deleted' : handlers.sessionDeleted,
'checks/all' : handlers.checksList,
'checks/create' : handlers.checksCreate,
'checks/edit' : handlers.checksEdit,
'ping' : handlers.ping,
'api/users' : handlers.users,
'api/tokens' : handlers.tokens,	
'api/checks' : handlers.checks,
'favicon.ico' : handlers.favicon,
'public': handlers.public,
};

//init function
server.init = function()
{
	//start the https server
	server.httpsServer.listen(config.httpsPort,function()
	{
		console.log('The https server is listening on port '+ config.httpsPort+' in '+config.envName+ ' mode');
	});

	//start the http server
	server.httpServer.listen(config.httpPort,function()
	{
		console.log('The http server is listening on port '+ config.httpPort+' in '+config.envName+ ' mode');
	});
};

//export the module
module.exports = server;
