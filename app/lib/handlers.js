//request handlers

//dependecies

var _data = require('./data');
var helpers = require('./helpers');
var config =  require('./config');
var _url = require('url');
var dns = require('dns');
var _performance = require('perf_hooks').performance;
var util = require('util');
var debug = util.debuglog('performance');

var handlers ={};


//html handlers

//index handlers
handlers.index = function(data,callback)
{
	//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'UptimeMonitoring',
			'head.description' : 'we offer free simple uptime monitoring services',
			'body.class' : 'index',
		};

		//read in a template as a string
		helpers.getTemplate('index',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//create account handler
handlers.accountCreate = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Create an Account',
			'head.description' : 'Sign Up is Easy and only takes a few seconds',
			'body.class' : 'accountCreate',
		};

		//read in a template as a string
		helpers.getTemplate('accountCreate',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};


//sessionCreate
handlers.sessionCreate = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Login to your Account',
			'head.description' : 'Please enter your phone number and password to access your account',
			'body.class' : 'sessionCreate',
		};

		//read in a template as a string
		helpers.getTemplate('sessionCreate',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//sessionDeleted
handlers.sessionDeleted = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Logged Out',
			'head.description' : 'You have been logged out of your account',
			'body.class' : 'sessionDeleted',
		};

		//read in a template as a string
		helpers.getTemplate('sessionDeleted',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//accountEdit
handlers.accountEdit = function(data,callback)
{
	//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Account Settings',	
			'body.class' : 'accountEdit',
		};

		//read in a template as a string
		helpers.getTemplate('accountEdit',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//accountDeleted
handlers.accountDeleted = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Account Deleted',
			'head.description' : 'You account has been deleted',	
			'body.class' : 'accountDeleted',
		};

		//read in a template as a string
		helpers.getTemplate('accountDeleted',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//checkCreate
handlers.checksCreate = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Create a New Check',
			'body.class' : 'checksCreate',
		};

		//read in a template as a string
		helpers.getTemplate('checksCreate',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//checkList (Dashboard)
handlers.checksList = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Dashboard',
			'body.class' : 'checksList',
		};

		//read in a template as a string
		helpers.getTemplate('checksList',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
};

//checksEdit
handlers.checksEdit = function(data,callback)
{
//reject any request is not GET
	if(data.method == 'get')
	{
		var templateData = {
			'head.title' : 'Edit Check',
			'body.class' : 'checksEdit',
		};

		//read in a template as a string
		helpers.getTemplate('checksEdit',templateData,function(err,str)
			{
				if(!err && str)
				{	
					//add the universal header and footer
					helpers.addUniversalTemplates(str,templateData,function(err,str)
					{
						if(!err && str)
						{
							callback(200,str,'html');
						}
						else
						{
							callback(500,undefined,'html');
						}
					});

				}else
				{
					callback(500,undefined,'html');
				}
			});
	}
	else
	{
		callback(405,undefined,'html');
	}
}; 


//Favicon
handlers.favicon = function(data,callback)
{
	//reject any method that isnt GET
	if(data.method == 'get')
	{
		//read in the favicon's data
		helpers.getStaticAsset('favicon.ico',function(err,data)
			{
				if(!err && data)
				{	
					//callback the data
					callback(200,data,'favicon');
				}else
				{
					callback(405);
				}
			});
	}else
	{
		callback(405,undefined,'html');
	}
};


//public assets
handlers.public = function(data,callback)
{
	//reject any method that isnt GET
	if(data.method == 'get')
	{	
		//get the filename being requested
		var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
		if(trimmedAssetName.length > 0)
		{
			//read in the assets data
			helpers.getStaticAsset(trimmedAssetName,function(err,data)
			{
				if(!err && data)
				{	
					//determine the contentType (default to text)
					var contentType = 'plain';
					if(trimmedAssetName.indexOf('.css') >-1)
					{
						contentType = 'css';
					}
					if(trimmedAssetName.indexOf('.png') >-1)
					{
						contentType = 'png';
					}
					if(trimmedAssetName.indexOf('.jpg') >-1)
					{
						contentType = 'jpg';
					}
					if(trimmedAssetName.indexOf('.ico') >-1)
					{
						contentType = 'ico';
					}
					if(trimmedAssetName.indexOf('.js') >-1)
					{
						contentType = 'js';
					}
					//callback the data
					callback(200,data,contentType);
				}else
				{
					callback(404);
				}
			});

		}else
		{
			callback(404);
		}
	}else
	{
		callback(405,undefined,'html');
	}
};
//json api handlers

//ping handler
handlers.ping = function(data,callback)
{
	//callback a http status code and payload object
	callback(200);
};

//not found handler
handlers.notfound = function(data,callback)
{
	//callback a http status code and payload object
	callback(404);
};

//user handler
handlers.users = function(data,callback)
{
	var acceptableMethods=['post','get','put','delete'];
	if(acceptableMethods.indexOf(data.method)>-1)
	{
		handlers._users[data.method](data,callback);
	}
	else
	{
		callback(405);
	}

};


//container for the users submethods
handlers._users={};


//users-post
//required data: fname,lname,phone,password,tosAgreement
//optional data:none
handlers._users.post=function(data,callback)
{
	//check that all required feilds are filled out
	var firstName = typeof(data.payload.firstName) == "string" && data.payload.firstName.trim().length>0 ? data.payload.firstName.trim() : false; 
	var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length>0 ? data.payload.lastName.trim() : false;
	var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length==10 ? data.payload.phone.trim() : false;
	var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length>0 ? data.payload.password.trim() : false;
	var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement==true ? true : false;

	if(firstName && lastName && phone && password && tosAgreement)
	{

		//make sure that the user doesnt already exist
		_data.read('users',phone,function(err,data)
			{
				if(err)
				{
					//hash the password (user crypto builtin function)
					var hashedPassword = helpers.hash(password);

					if(hashedPassword)
					{
						//create the user object
					var userObject ={
						'firstName':firstName,
						'lastName':lastName,
						'phone':phone,
						'hashedPassword':hashedPassword,
						tosAgreement:true
					};

					//store the user

					_data.create('users',phone,userObject,function(err)
						{
							if(!err)
							{
								callback(200);
							}
							else
							{
								console.log(err);
								callback(500,{'error':'could not create user'});
							}
						});
					}
					else
					{
						callback(500,{'error':'error hashing user password'});
					}
				}else
				{
					//user already exist
					callback(400,{'error':'user with that phone number already exist'});
				}
			});

	}else
	{
		callback(400,{'error':'missing required feilds'});
	}
};	

//users-get
//required data : phone
//optional data:none
handlers._users.get=function(data,callback)
{
	//check that the phone number provided is valid
	var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length ==10 ? data.queryStringObject.phone.trim() : false;
	if(phone)
	{ 	
		//get the token from the headers
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		//verify that the given token is valid for the phone number
		handlers._tokens.verifyToken(token,phone,function(tokenIsValid)
		{
			if(tokenIsValid)
			{
				_data.read('users',phone,function(err,data)
						{
							if(!err && data)
								{
									//remove the hashed password from the return object
									delete data.hashedPassword;
									callback(200,data);
								}
								else
								{
									callback(404,{'error':'could not find the specified user'});
								}
						});
			}else
			{
				callback(403,{'error':'missing token data in header'})
			}
		});
	}else
	{
		callback(400,{'error':'missing required feild'});
	}
};

//users-delete
//required data: phone
handlers._users.delete=function(data,callback)
{
	//check that the phone number provided is valid
	var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length ==10 ? data.queryStringObject.phone.trim() : false;
	if(phone)
	{
			//get the token from the headers
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		//verify that the given token is valid for the phone number
		handlers._tokens.verifyToken(token,phone,function(tokenIsValid)
		{
			if(tokenIsValid)
			{
				_data.read('users',phone,function(err,userData)
			{
				if(!err && userData)
					{
						_data.delete('users',phone,function(err)
							{
								if(!err)
								{
									//delete each of the checks associated with the user
											var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
											var checksToDelete =userChecks.length;
											if(checksToDelete >0)
											{
												var checksDeleted =0;
												var deletionErrors = false;
												//loop through the checks
												userChecks.forEach(function(checkId)
													{
														_data.delete('checks',checkId,function(err)
															{
																if(err)
																{
																	deletionErrors=true;
																}
																	checksDeleted++;
																	if(checksDeleted==checksToDelete)
																	{
																		if(!deletionErrors)
																		{
																			callback(200);
																		}
																		else
																		{
																			callback(500,{'errors':'encountered while deleting checks'});
																		}
																	}
															});
													});
											}
											else
											{
												callback(200);
											}
								}else
								{
									callback(500,{'error':'couldnot delete user data'});
								}
							});
					}
					else
					{
						callback(400,{'error':'could not find the user'});
					}
			});
			}
			else
			{
				callback(403,{'error':'missing token data in header'});
			}
		});
	}else
	{
		callback(400,{'error':'missing required feild'});
	}

};

//users-put
//required data: phone
//optional data: firstName,lastName,password(atleast one must be specified)
handlers._users.put=function(data,callback)
{
	
	//check that the phone number provided is valid
	var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length ==10 ? data.payload.phone.trim() : false;	

	//check for optional feild
	var firstName = typeof(data.payload.firstName) == "string" && data.payload.firstName.trim().length>0 ? data.payload.firstName.trim() : false; 
	var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length>0 ? data.payload.lastName.trim() : false;
	var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length>0 ? data.payload.password.trim() : false;
	var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement==true ? true : false;

	//error if the phone is invalid
	if(phone){

		//error if nothing is sent to update
		if(firstName || lastName || password)
		{
			var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		//verify that the given token is valid for the phone number
		handlers._tokens.verifyToken(token,phone,function(tokenIsValid)
			{
				if(tokenIsValid)
				{
					//look up the user
			_data.read('users',phone,function(err,userData)
				{
					if(!err && data)
					{
						//update the feilds necessary
						if(firstName){
							userData.firstName =firstName;
						}
						if(lastName){
							userData.lastName =lastName;
						}
						if(password){
							userData.hashedPassword =helpers.hash(password);
						}

						//store the new updates
						_data.update('users',phone,userData,function(err)
							{
								if(!err)
								{
									callback(200);
								}else
								{
									console.log(err);
									callback(500,{'error':'couldnot update the user'});
								}
							});

					}else
					{
						callback(400,{'error':'the specified user doesnot exist'});
					}
				});
				}
				else
				{
					callback(403,{'error':'missing token data in header'});
				}
			});	
			

		}
		else
		{
			callback(400,{'error':'missing feilds to update'});
		}

	}
	else
	{
		callback(400,{'error':'missing required feild'});
	}
};

//tokens handler
handlers.tokens = function(data,callback)
{
	var acceptableMethods=['post','get','put','delete'];
	if(acceptableMethods.indexOf(data.method)>-1)
	{
		handlers._tokens[data.method](data,callback);
	}
	else
	{
		callback(405);
	}

};

//container for all the token methods
handlers._tokens={};


//token -post
//required data: phone,password
//optional data: none
handlers._tokens.post=function(data,callback)
{	
	_performance.mark('entered function');
	var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length==10 ? data.payload.phone.trim() : false;
	var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length>0 ? data.payload.password.trim() : false;
	_performance.mark('inputs validated');
	if(phone && password)
	{
		_performance.mark('begining user lookup');
		//lookup the user 
		_data.read('users',phone,function(err,userData)
			{
				_performance.mark('user lookup complete');
				if(!err && userData)
				{
					_performance.mark('begining password hashing');
					//hash the password and compare the hashed hashedPassword	
					var hashedPassword = helpers.hash(password);
					_performance.mark('password hashing complete');
					if(hashedPassword ==  userData.hashedPassword)
					{
						_performance.mark('creating data for the token');
						//if valid, create a new token with random name, set expiration date to 1 hr
						var tokenId = helpers.createRandomString(20);

						var expires = Date.now()+1000*60*60;
						var tokenObject = {
							'phone': phone,
							'id' : tokenId,
							'expires' : expires
						};	
						_performance.mark('begining storing token');
						//store the token
						_data.create('tokens',tokenId,tokenObject,function(err)
							{	
								_performance.mark('storing token complete');

								//gather all the measurements
								_performance.measure('begining to end','entered function','storing token complete');
								_performance.measure('validating user','entered function','inputs validated');
								_performance.measure('user lookup','begining user lookup','user lookup complete');
								_performance.measure('password hashing','begining password hashing','password hashing complete');

								//log out measurements(	NOTE: PERFORMANCE IS DEPRECATED FROM NODE 10.0.0)
							 	// 	var measurements = _performance.getEntriesByType('measure');
								// measurements.forEach(function(measure)
								// 	{
								// 		 console.log('\x1b[33m%s\x1b[0m',measure.name+' '+measure.duration);
								// 	});
								if(!err)
								{
									callback(200,tokenObject);
								}
								else
								{
									callback(500,{'error':'could not create token'});
								}
							});
					}
					else
					{
						callback(400,{'error':'incorrect password'});
					}
				}
				else
				{
					callback(400,{'error':'could not find the user'});
				}
			});
	}
	else
	{
		callback(400,{'error':'missing required feilds'});
	}

};

//token -get
//required data :id
//optional data: none
handlers._tokens.get=function(data,callback)
{
	//check that the id is valid
	var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20 ? data.queryStringObject.id.trim() : false;
	if(id)
	{
		//lookup token
		_data.read('tokens',id,function(err,tokenData)
			{
				if(!err && tokenData)
					{
						callback(200,tokenData);
					}
					else
					{
						callback(404,{'error':'invalid token id'});
					}
			});
	}else
	{
		callback(400,{'error':'missing required feild'});
	}
};
//token -put
//required data: id,extend
//optional data: none
handlers._tokens.put=function(data,callback)
{
	var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length==20 ? data.payload.id.trim() : false;
	var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend ==true ? true : false;

	if(id && extend)
	{
		//lookup the token
		_data.read('tokens',id,function(err,tokenData)
			{
				if(!err && tokenData)
				{	
					//check if the session is active
					if(tokenData.expires > Date.now())
					{
						//set the expiration 1 hr from now 
						tokenData.expires = Date.now() + 1000*60*60;

						//store the new updated token data
						_data.update('tokens',id,tokenData,function(err)
							{
								if(!err)
								{
									callback(200);
								}
								else
								{
									callback(500,{'error':'could not update expiration date'});
								}
							});
					}else
					{
						callback(400,{'error':'token has already expired'});
					}
				}
				else
				{
					callback(400,{'error':'specified token doesnot exist'});
				}
			});
	}
	else
	{
		callback(400,{'error':'missing required feilds'});
	}

};
//token -delete
//required data: id
//optional data: none
handlers._tokens.delete=function(data,callback)
{
	//check that the id provided is valid
	var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20 ? data.queryStringObject.id.trim() : false;
	if(id)
	{
		_data.read('tokens',id,function(err,data)
			{
				if(!err && data)
					{
						_data.delete('tokens',id,function(err)
							{
								if(!err)
								{
									callback(200);
								}else
								{
									callback(500,{'error':'couldnot delete user token'});
								}
							});
					}
					else
					{
						callback(400,{'error':'could not find the token'});
					}
			});
	}else
	{
		callback(400,{'error':'missing required feild'});
	}

};


//Verify if a given token id is currently valid for a given user

handlers._tokens.verifyToken = function(id,phone,callback)
{
	//lookup the token
	_data.read('tokens',id,function(err,tokenData)
		{
			if(!err && tokenData)
			{
				//check that the token is for the given user and has not expired
				if(tokenData.phone == phone && tokenData.expires > Date.now())
				{
					callback(true);
				}else
				{
					callback(false);
				}
			}
			else
			{
				callback(false);
			}
		});
};

//checks handler
handlers.checks = function(data,callback)
{
	var acceptableMethods=['post','get','put','delete'];
	if(acceptableMethods.indexOf(data.method)>-1)
	{
		handlers._checks[data.method](data,callback);
	}
	else
	{
		callback(405);
	}

};


//container for all the checks
handlers._checks = {};

//checks-post
//required data: protocol,url,method,successCodes,timelapse settings
//optional data:none
handlers._checks.post = function(data,callback)
{
	//validate all the inputs
	var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
	var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
	var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
	var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
	var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds %1 == 0 && data.payload.timeoutSeconds>=1 && data.payload.timeoutSeconds <=5 ? data.payload.timeoutSeconds : false;

	if(protocol && url && method && successCodes && timeoutSeconds)
	{
		//get token from headers
		var token = typeof(data.headers.token) ==  'string' ? data.headers.token : false;

		//lookup the user
		_data.read('tokens',token,function(err,tokenData)
			{
				if(!err && tokenData)
				{
					var userPhone =tokenData.phone;

					//lookup the user data
					_data.read('users',userPhone,function(err,userData)
						{
							if(!err && userData)
							{
								var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

								//verify that the user has less than max checks
								if(userChecks.length < config.maxChecks)
								{
									//verify the url given has dns entries and can resolve
									var parsedUrl = _url.parse(protocol+'://'+url,true);
									var hostName = typeof(parsedUrl.hostName) == 'string' && parsedUrl.hostName.length > 0 ?parsedUrl.hostName : false;
									dns.resolve(hostName,function(err,records)
										{
											if(!err && records)
											{
												//create a random id for the check 
									 var checkId = helpers.createRandomString(20);
									 
									 //create the check object and include the user's phone number
									 var checkObject ={
									 	'id' : checkId,
									 	'userPhone' : userPhone,
									 	'protocol' : protocol,
									 	'method' : method,
									 	'url' : url,
									 	'successCodes' : successCodes,
									 	'timeoutSeconds' : timeoutSeconds
									 };
									 ///save the data to disk
									 _data.create('checks',checkId,checkObject,function(err)
									 	{
									 		if(!err)
									 		{
									 			//add the check id to user object
									 			userData.checks = userChecks;
									 			userData.checks.push(checkId);

									 			//save the new user data
									 			_data.update('users',userPhone,userData,function(err)
									 				{
									 					if(!err)
									 					{
									 						callback(200,checkObject);	
									 					}else
									 					{
									 						callback(500,{'error':'couldnot update user data'});
									 					}
									 				});
									 		}else
									 		{
									 			callback(500,{'error':'couldnot create new check'});
									 		}
									 	});
											}
											else
											{
												callback(400,{'error':'the hostname entered is invalid'});
											}
										});	
									
								}
								else
								{
									callback(400,{'error':'max checks reached'});
								}
							}
							else
							{
								callback(403,{'error':'unauthorized user'});
							}
						});
				}
				else
				{
					callback(403,{'error':'unauthorized user'});
				}
			});
	}
	else
	{
		callback(400,{'error':'missing required inputs'});
	}
};

//checks -get
//required data : id
//optional data :none
handlers._checks.get = function(data,callback)
{
	//check that the id is valid
	var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20 ? data.queryStringObject.id.trim() : false;
	if(id)
	{	
		//lookup token
		_data.read('checks',id,function(err,checkData)
			{
				if(!err && checkData)
					{
						//get the token from the headers
						var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
						//verify that the given token is valid and belongs to the user
						handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid)
						{
							if(tokenIsValid)
							{
								//return the check data
								callback(200,checkData);
							}else
							{
								callback(403);
							}
						});
					}	
					else
					{
						callback(404,{'error':'invalid check id'});
					}
			});
	}else
	{
		callback(400,{'error':'missing required feild'});
	}
};

//checks- put 
//required data: id
//optional data: protocol,method,url,successCodes,timeinseconds
handlers._checks.put = function(data,callback)
{
	//validate required input
	var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length ==20 ? data.payload.id.trim() : false;

	//validate optional inputs
	var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
	var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
	var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
	var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
	var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds %1 == 0 && data.payload.timeoutSeconds>=1 && data.payload.timeoutSeconds <=5 ? data.payload.timeoutSeconds : false;

	//make sure id is valid
	if(id)
	{
		//make sure one or more optional feilds are sent 
		if(protocol||url||method||successCodes||timeoutSeconds)
		{
			//look up check
			_data.read('checks',id,function(err,checkData)
				{
					if(!err && checkData)
					{	

						//get the token from the headers
						var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
						//verify that the given token is valid and belongs to the user
						handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid)
						{
							if(tokenIsValid)
							{
								//update the check where necessary
								if(protocol)
								{
									checkData.protocol = protocol;
								}
								if(url)
								{
									checkData.url = url;
								}
								if(method)
								{
									checkData.method = method;
								}
								if(successCodes)
								{
									checkData.successCodes = successCodes;
								}
								if(timeoutSeconds)
								{
									checkData.timeoutSeconds = timeoutSeconds;
								}

								//update check 
								_data.update('checks',id,checkData,function(err)
									{
										if(!err)
										{
											callback(200);
										}else
										{
											callback(500);
										}
									});	
							}
							else
							{
								callback(403);
							}
						});
					}else
					{
						callback(400,{'error':'invalid check id'});
					}
				});
		}else
		{
			callback(400,{'error':'missing feilds to update'});
		}
	}else
	{
		callback(400,{'error':'missing required feilds'});
	}
};

//check- delete
//required data: id
//optional data:none
handlers._checks.delete = function(data,callback)
{
	//check that the id provided is valid
	var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20 ? data.queryStringObject.id.trim() : false;
	if(id)
	{

		_data.read('checks',id,function(err,checkData)
			{
				if(!err)
				{	
					//get the token from the headers
					var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
					//verify that the given token is valid for the phone number
					handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid)
					{
						if(tokenIsValid)
						{
							//delete the check data
							_data.delete('checks',id,function(err)
								{
									if(!err)
									{
										_data.read('users',checkData.userPhone,function(err,userData)
										{
											if(!err && userData)
												{
													var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
													
													//remove the deleted check from the list
													var checkPostion = userChecks.indexOf(id);
													if(checkPostion >=-1)
													{
														userChecks.splice(checkPostion,1);

														//update the user data
														_data.update('users',checkData.userPhone,userData,function(err)
														{
															if(!err)
															{
																callback(200);
															}else
															{
																callback(500,{'error':'couldnot update the user'});
															}
														}); 	
													}else
													{
														callback(500,{'error':'the check doesnot exist for this user'});
													}
												}
												else
												{
													callback(500,{'error':'could not find the user who created the check'});
												}
										});

									}else
									{
										callback(500,{'error':'couldnot delete data'});
									}
								});
						}
						else
						{
							callback(403);
						}
					});
				}else
				{
					callback(400,{'error':'invalid check id'});
				}
			});
	}else
	{
		callback(400,{'error':'missing required feild'});
	}
};

//exports the module
module.exports=handlers;