// this is the test runner

//override node env var
process.env.NODE_ENV = 	'testing';

//container
var _app = {};

//application logic for the test runner
_app.tests = {};

_app.tests.unit = require('./unit');
_app.tests.api = require('./api');

//count all the tests
_app.countTests = function()
{
	var counter =0;
	for(var key in _app.tests)
	{
		if(_app.tests.hasOwnProperty(key))
		{
			var subTests = _app.tests[key];
			for(var testName in subTests)
			{
				if(subTests.hasOwnProperty(testName))
				{
					counter++;
				}
			}
		}
	}
	return counter;
};


//produce a test outcome report
_app.produceTestReport = function(limit,success,errors)
{
	console.log('');
	console.log('-------------BEGIN TEST REPORT--------------');
	console.log('');
	console.log('Total Tests',limit);
	console.log('Pass',success);
	console.log('Fails',errors.length);
	console.log('');

	//if there are errors print them in details
	if(errors.length > 0)
	{
		console.log('-------------BEGIN ERROR DETAILS--------------');
		console.log('');
		errors.forEach(function(testErrors)
		{
			console.log('\x1b[31m%s\x1b[0m',testErrors.name);
			console.log(testErrors.error);
		});
		console.log('');
		console.log('-------------END ERROR DETAILS--------------');
	}
	console.log('');
	console.log('-------------END TEST REPORT--------------');
	process.exit(0);
};

//run all the test, collecting the errors and success
_app.runTest = function()
{
	var error = [];
	var success =0;
	var limit = _app.countTests();
	var counter = 0;

	for(var key in _app.tests)
	{
		if(_app.tests.hasOwnProperty(key))
		{
			var subTests = _app.tests[key];
			for(var testName in subTests)
			{
				if(subTests.hasOwnProperty(testName))
				{
					(function()
						{
							var tempTestName = testName;
							var testValue = subTests[testName];
							//call the test
							try
							{
								testValue(function(){
									//if it calls back without throwing then its success
									 console.log('\x1b[32m%s\x1b[0m',tempTestName);
									 counter++;
									 success++;
									 if(counter == limit)
									 {
									 	_app.produceTestReport(limit,success,error);
									 }
								});
							}catch(e)
							{		
									error.push({
										'name' : testName,
										'error' : e
									});
								 	console.log('\x1b[31m%s\x1b[0m',tempTestName);
								 	counter++;	
								 	if(counter == limit)
									{
									 	_app.produceTestReport(limit,success,error);
									}
							}

						})();
				}
			}
		}
	}
};

//run the test
_app.runTest();