//dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');
var logs = require('./../lib/logs');
var exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem');

//container
var unit ={};

//assert that the get a number function is returning a number
unit['helpers.getNumber should return a number'] = function(done)
{
	var val = helpers.getNumber();
	assert.equal(typeof(val),'number');
	done();
};


unit['helpers.getNumber should return 1'] = function(done)
{
	var val = helpers.getNumber();
	assert.equal(val,1);
	done();
};


unit['helpers.getNumber should return 2'] = function(done)
{
	var val = helpers.getNumber();
	assert.equal(val,2);
	done();
};

//logs.list should callback an array and a false error
unit['logs.list should callback a false error and an array of log names'] = function(done)
{
	logs.list(true,function(err,logFileNames)
		{
			assert.equal(err,false);
			assert.ok(logFileNames instanceof Array);
			assert.ok(logFileNames.length > 1);
			done();
		});
};

////logs truncate should not throw if the log id doesnot exist
unit['logs.truncate should not throw if the log id does not exist'] = function(done)
{
	assert.doesNotThrow(function()
		{
			logs.truncate('000000',function(err)
			{
				assert.ok(err);
				done();
			});
		},TypeError);	
};

////exampleDebugProb.init should not throw
unit['exampleDebugProb.init should not throw'] = function(done)
{
	assert.doesNotThrow(function()
		{
			exampleDebuggingProblem.init();
			done();
		},TypeError);	
};

//export the module
module.exports = unit;