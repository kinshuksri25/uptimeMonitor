//api test


//dependecies

var app = require('./../index');
var assert = require('assert');
var http = require('http');
var config = require('./../lib/config');

//container
var api={};
	
var helpers = {};

helpers.makeGetRequest = function(path,callback)
{
	//configure the request details
	var requestDetails={
		'protocol' : 'http:',
		'hostname' : 'localhost',
		'method' : 'GET',
		'path' :path,
		'port' : config.httpPort,
		'headers':{
			'Content-Type' : 'application/json'
		}	
	};
	//send the request
	var req = http.request(requestDetails,function(res)
		{
			callback(res);
		});
	req.end();
};

// the main init function should be able to run
api['the main init function should be able to run']=function(done)
{
	assert.doesNotThrow(function(){
		app.init(function(err)
			{
				done();
			});
	},TypeError);
};

//make a request to /ping
api['/ping should respond to GET with 200'] = function(done)
{
	helpers.makeGetRequest('/ping',function(res)
	{
		assert.equal(res.statusCode,200);
		done();
	});	
};


//make a request to /users
api['/api/users should respond to GET with 400'] = function(done)
{
	helpers.makeGetRequest('/api/users',function(res)
	{
		assert.equal(res.statusCode,400);
		done();
	});	
};

//make a request to randompath
api['randompath should respond to GET with 404'] = function(done)
{
	helpers.makeGetRequest('/api/urs',function(res)
	{
		assert.equal(res.statusCode,404);
		done();
	});	
};

//export
module.exports=api;

