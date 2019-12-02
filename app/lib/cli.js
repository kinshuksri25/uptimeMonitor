//cli related tasks

//dependencies
var readline = require('readline');
var util = require('util');
var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var _logs = require('./logs');
var _helpers = require('./helpers');
var debug = util.debuglog('cli');
var events = require('events');
var childProcess = require('child_process');

class _events extends events{};

var e = new _events();

//instantiate the cli module object
var cli ={};

//init script
cli.init = function()
{
	//send the start msg to console
	console.log('\x1b[34m%s\x1b[0m','the CLI is running');

	//start the interface
	var _interface = readline.createInterface({
		input : process.stdin,
		output : process.stdout,
		prompt : '->'
	});

	//create an inital prompt
	_interface.prompt();

	//handle each line of input seperately
	_interface.on('line',function(str)
	{
		//send to the input processor
		cli.processInput(str);
	});
	
	//Re-initialize the inital prompt
	_interface.prompt();

	// if the user stops the cli, kill the associated process
	_interface.on('close',function()
		{
			process.exit(0);
		});	
};

//input handlers
e.on('man',function(str)
{
	cli.responders.help();	
});

e.on('help',function(str)
{
	cli.responders.help();	
});

e.on('exit',function()
{
	cli.responders.exit();	
});

e.on('stats',function(str)
{
	cli.responders.stats();	
});

e.on('list users',function(str)
{
	cli.responders.listUsers();	
});

e.on('more user info',function(str)
{
	cli.responders.moreUserInfo(str);	
});

e.on('list checks',function(str)
{
	cli.responders.listChecks(str);	
});

e.on('more check info',function(str)
{
	cli.responders.moreCheckInfo(str);	
});

e.on('list logs',function(str)
{
	cli.responders.listLogs();	
});

e.on('more log info',function(str)
{
	cli.responders.moreLogInfo(str);	
});

//responders
cli.responders = {};

// help/man
cli.responders.help = function()
{
	var commands =
	{
		'man' : 'Show the help page',
		'help': 'alias of the man command',
		'exit': 'Kill the Cli and the rest of the application',
		'stats': 'Get the statistics of the underlying operating system and resource utilization',
		'list users': 'Show a list of all the registered user',
		'more user info --{userId}': 'Show details of the specific user',
		'list checks --up/down': 'Show active checks in the system, including there state, the up and down flags are optional',
		'more check info --{checkId}': 'Show details of a specified check',
		'list logs': 'Show a list of all the log files available to be read',
		'more log info --{fileName}': 'Show details of a specified log file'
	};

	//show a header for the help page that is as wide as the screen	
	cli.horizontalLine();
	cli.centered('CLI MANUAL');
	cli.horizontalLine();
	cli.veritcalSpace(2);

	//show each command followed by its explanation in white and yellow
	for(key in commands)
	{
		if(commands.hasOwnProperty(key))
		{
			var value = commands[key];
			var line = '\x1b[33m'+key+'\x1b[0m';
			var padding = 60-line.length;
			for(i=0;i<padding;i++)
			{
				line+=' ';
			}
			line+=value;
			console.log(line);
			cli.veritcalSpace(1);
		}
	}

	cli.veritcalSpace(1);

	//end with a horizontal line
	cli.horizontalLine();

};

//vetical space
cli.veritcalSpace = function(lines)
{
	lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
	for(i=0;i<lines;i++)
	{
		console.log('');
	}	
};

//horizontalLine
cli.horizontalLine = function()
{
	//get the available screen size
	var width = process.stdout.columns;
 	var lines ='';
 	for(i=0;i<width;i++)
 	{
 		lines+='-';
 	}
 	console.log(lines);
};

//createCenteredText
cli.centered = function(str)
{
	str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';
	var width = process.stdout.columns;

	//calculate the left padding there should be
	var leftPadding = Math.floor((width-str.length)/2);

	//put in the left padding
	var line='';
	for(i=0;i<leftPadding;i++)
	{
		line+=' ';
	}
	line+=str;
	console.log(line);
};


//exit
cli.responders.exit = function()
{
	console.log('exiting the application');
	process.exit(0);
};

//stats
cli.responders.stats = function()
{
	//compile an object of stats
	var stats = {
		'Load Average' : os.loadavg().join(' '),
		'Cpu Count' : os.cpus().length,
		'Free Memory' : os.freemem(),
		'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
		'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
		'Allocated Heap Used(%)' : Math.round((v8.getHeapStatistics().used_heap_size/v8.getHeapStatistics().total_heap_size)*100),
		'Available Heap Allocated(%)' : Math.round((v8.getHeapStatistics().total_heap_size/v8.getHeapStatistics().heap_size_limit)*100),
		'Uptime': os.uptime()+' Seconds'
	};

	//create a header for the stats
	//show a header for the STATS that is as wide as the screen	
	cli.horizontalLine();
	cli.centered('SYSTEM STATISTICS');
	cli.horizontalLine();
	cli.veritcalSpace(2);

	//show each command followed by its explanation in white and yellow
	for(key in stats)
	{
		if(stats.hasOwnProperty(key))
		{
			var value = stats[key];
			var line = '\x1b[33m'+key+'\x1b[0m';
			var padding = 60-line.length;
			for(i=0;i<padding;i++)
			{
				line+=' ';
			}
			line+=value;
			console.log(line);
			cli.veritcalSpace(1);
		}
	}

	cli.veritcalSpace(1);

	//end with a horizontal line
	cli.horizontalLine();

};

//list users
cli.responders.listUsers = function(str)
{
	_data.list('users',function(err,userIds)
		{
			if(!err && userIds && userIds.length > 0)
			{
				cli.veritcalSpace();
				userIds.forEach(function(userId){

					_data.read('users',userId,function(err,userData)
						{
							if(!err && userData)
							{
								var line = 'Name: '+userData.firstName+' '+userData.lastName+' Phone: '+userData.phone+' Checks: ';
								var numberOfChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length >0 ? userData.checks.length : 0;	
								line+=numberOfChecks;
								console.log(line);
								cli.veritcalSpace(1);
							}
						}); 
				});
			}	
		});
};

//moreUserInfo
cli.responders.moreUserInfo = function(str)
{
	//get the id
	var arr = str.split('--');
	var userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
	if(userId)
	{
		//look it up
		_data.read('users',userId,function(err,userData)
		{
			if(!err && userData)
			{
				//remove the hashed password
				delete userData.hashedPassword;

				//print the json obj with text highlighted
				cli.veritcalSpace(1);
				console.dir(userData,{'colors':true});
				cli.veritcalSpace(1);
			}
		});
	} 
};

//checks
cli.responders.listChecks = function(str)
{
	_data.list('checks',function(err,checkIds)
	{
		if(!err && checkIds && checkIds.length > 0)
		{
			cli.veritcalSpace(1);
			checkIds.forEach(function(checkId)
				{
					_data.read('checks',checkId,function(err,checkData)
					{
						var includeCheck = false;
						var lowerString = str.toLowerCase();

						//get the state of the check, but default to down
						var state =  typeof(checkData.state) == 'string' ? checkData.state : 'down';
						//default to unknown
						var stateOrUnknown	=typeof(checkData.state) == 'string' ? checkData.state : 'down';

						//if the user has specified the state, or hasnt specified any state include the state accordingly
						if(lowerString.indexOf('--'+state) > -1 || (lowerString.indexOf('--down') && lowerString.indexOf('--up')))
						{
							var line = 'ID: '+checkData.id+' '+checkData.method.toUpperCase()+' '+checkData.protocol+'://'+checkData.url+' State: '+stateOrUnknown;
							console.log(line);
							cli.veritcalSpace();
						}	
					});
				});
		}
	});
};

//moreCheckInfo
cli.responders.moreCheckInfo = function(str)
{
	//get the id
	var arr = str.split('--');
	var checkId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
	if(checkId)
	{
		//look it up
		_data.read('checks',checkId,function(err,checkData)
		{
			if(!err && checkData)
			{
				//print the json obj with text highlighted
				cli.veritcalSpace(1);
				console.dir(checkData,{'colors':true});
				cli.veritcalSpace(1);
			}
		});
	} 
};

//logsList
cli.responders.listLogs = function(str)
{
	// _logs.list(true,function(err,logFileNames)
	// {
	// 	if(!err && logFileNames && logFileNames.length > 0)
	// 	{
			
	// 	}
	// });

	//using child process
	var ls = childProcess.spawn('ls',['./.logs/']);
	ls.stdout.on('data',function(dataObject)
		{
			//explode into seperate lines
			var dataStr = dataObject.toString();
			var logFileNames = dataStr.split('\n');
			cli.veritcalSpace(1);
			logFileNames.forEach(function(logFileName)
			{
				if(typeof(logFileName) == 'string' && logFileName.length > 0 && logFileName.indexOf('-') > -1)
				{
					console.log(logFileName.trim().split('.')[0]);
					cli.veritcalSpace();
				}
			});
		});
};

//moreLogInfo
cli.responders.moreLogInfo = function(str)
{
	//get the fileName
	var arr = str.split('--');
	var fileName = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
	if(fileName)
	{
		cli.veritcalSpace(1);
		//Decompress the log file
		_logs.decompress(fileName,function(err,strData)
			{
				if(!err && strData)
				{
					//split into lines
					var arr = strData.split('\n');
					arr.forEach(function(jsonString)
						{
							var logObject = helpers.parseJsonToObject(jsonString);
							if(logObject && JSON.stringify(logObject) !== '{}')
							{
								console.dir(logObject,{'color': true});
								cli.veritcalSpace();
							}
						});
				}
			});
	} 
};


//process input
cli.processInput = function(str)
{
	str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

	//only process the str if str exist
	if(str)
	{
		//codify the unique strings 
		var uniqueInputs = [
		'man',
		'help',
		'exit',
		'stats',
		'list users',
		'more user info',
		'list checks',
		'more check info',
		'list logs',
		'more log info'
		];

		//go through the possible inputs, and emit an event if a match is found
		var matchFound = false;
		var counter = 0;
		uniqueInputs.some(function(input){
			if(str.toLowerCase().indexOf(input) > -1)
			{
				matchFound = true;
				//emit an event matching the unique input and include the full string
				e.emit(input,str);
				return true;
			}
		});

		//if no match is found
		if(!matchFound)
		{
			console.log('invalid keyword');
		}
	}
};



//export the module
module.exports=cli;
