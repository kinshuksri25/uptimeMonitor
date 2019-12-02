//helpers for various tasks


//dependencies

var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');
var path =  require('path');
var fs = require('fs');


//container for the helper function 
var helpers ={};


//test function
helpers.getNumber = function()
{
	return 1;
};


//we user sha256 here
helpers.hash = function(str){

	if(typeof(str) == 'string' && str.length>0)
	{
		var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
		return hash;
	}else
	{
		return false;
	}
};


//parse a json string to object
helpers.parseJsonToObject= function(str) 
{
	try
	{
		var obj = JSON.parse(str);
		return obj;
	}catch(e)
	{
		return {};
	}
}

//create a string of random alphanumeric chars
helpers.createRandomString = function(strLength)
{
	strLength = typeof(strLength)=='number' && strLength >0 ? strLength : false;
	if(strLength)
	{
		//define all the possible chars that could go into the string
		var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

		//start the final string
		var str = '';
		for(var i=1;i<=strLength;i++)
		{
			//get a random char from possibleCharacters
			var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)); 
			//append this char to final string
			str+=randomCharacter;
		}
		//return the string
		return str;

	}else
	{
		return false;
	}
};

//Send an SMS message via Twilio
helpers.sendTwilioSms = function(phone,msg,callback)
{
	//validate the parameters
	phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
	msg = typeof(msg) == 'string' && msg.trim().length >0 && msg.trim().length <=1600 ? msg.trim() : false;

	if(phone && msg)
	{
		//configure the request payload
		var payload  = {
			'From' : config.twilio.fromPhone,
			'To' : '+91'+phone,
			'Body' : msg	
		};
		//Stringify the payload
		var stringPayload = querystring.stringify(payload);

		//configure the request details
		var requestDetails = {
			'protocol' : 'https:',
			'hostname' : 'api.twilio.com',
			'method' : 'POST',
			'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
			'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
			'headers' : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(stringPayload)				
			}
		};

		//instantiating the request object
		var req =  https.request(requestDetails,function(res)
		{
			//Grab the status of the sent request 
			var status = res.statusCode;
			//callback successfully if the request went through
			if(status == 200 || status ==201)
			{
				callback(false);
			}
			else
			{
				callback('status code returned was '+status);
			}
		});

		//Bind to the error event so it doesnt get thrown
		req.on('error',function(e)
		{
			callback(e);
		});
		//add the payload 
		req.write(stringPayload);

		// end/send the request
		req.end();
	}	
	else
		{
			callback('Given parameters were missing or invalid');	
		}
};

//get the string content of a template
helpers.getTemplate = function(templateName,data,callback)
{
	templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
	data = typeof(data) == 'object' && data !==null ? data : {};
	if(templateName)
	{
		var templatesDirectory = path.join(__dirname,'/../templates/');
		fs.readFile(templatesDirectory+templateName+'.html','utf-8',function(err,str)
			{
				if(!err && str && str.length > 0)
				{
					//do interpolation on the string
					var finalString = helpers.interpolate(str,data);
					callback(false,finalString);
				}
				else
				{
					callback('no template could be found');
				}
			});
	}
	else
	{
		callback('a valid template name was not specifed');
	}
};


//add the universal header and footer to a string, and pass provided data object to the header and footer for interpolcation
helpers.addUniversalTemplates = function(str,data,callback)
{
	str = typeof(str) == 'string' && str.length > 0 ? str : '';
	data = typeof(data) == 'object' && data !==null ? data : {};

	// get the header
	helpers.getTemplate("_header",data,function(err,headerString)
		{
			if(!err && headerString && headerString.length>0)
			{
				//get the footer
				helpers.getTemplate('_footer',data,function(err,footerString)
					{
						if(!err && footerString)
						{
							//add the strings together
							var fullString = headerString+str+footerString;
							callback(false,fullString);							
						}
						else
						{
							callback('couldnot find footer string');
						}
					});
			}else
			{
				callback('couldnot find the header template');
			}
		});	
};


//take a given string and a data object, find/ replace all the keys within it
helpers.interpolate =  function(str,data)
{
	str = typeof(str) == 'string' && str.length > 0 ? str : '';
	data = typeof(data) == 'object' && data !==null ? data : {};

	//add the templateGlobals to the data object, prepending their key names with "global"
	for(var keyName in config.templateGlobals)
	{
		if(config.templateGlobals.hasOwnProperty(keyName))
		{
			data['global.'+keyName] = config.templateGlobals[keyName];
		}
	}
	//for each key in the data object, 
	//insert its value into the string at the corresponding placeholder
	for(var key in data)
	{
		if(data.hasOwnProperty(key) && typeof(data[key]) == 'string')
		{
			var replace = data[key];
			var find = '{'+key+'}';
			str = str.replace(find,replace);
		}
	}
	return str;
};	


//get the contents of a static asset
helpers.getStaticAsset = function(fileName,callback)
{
	fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
	if(fileName)
	{
		var publicDir = path.join(__dirname,'/../public/');
		fs.readFile(publicDir+fileName ,function(err,data)
			{
				if(!err && data)
				{
					callback(false,data);
				}
				else
				{
					callback('no file could be found');
				}
			});
	}else
	{
		callback('a valid file name was not specified');
	}
}



//export the module
module.exports = helpers;