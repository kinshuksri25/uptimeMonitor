/*
 * Create and export configuration variables
 *
 */

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'this is a secret',
  'maxChecks':5,
    'twilio':{
  	'accountSid' : 'ACc9f5071541dc79ea55f28282d42f431b',
  	'authToken' : 'e86a840e8a9448bd29e52908dd43789c',
  	'fromPhone' : '+12672968764'
  },
  'templateGlobals' : {
    'appName' : 'UpTimeChecker',
    'companyName' : 'NotARealCompanyInc',
    'yearCreated' : '2019',
    'baseUrl' : 'http://localhost:3000/'
  }
};

// Production environment
environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'this is a secret',
  'maxChecks':5,
  'twilio':{
  	'accountSid' : 'ACc9f5071541dc79ea55f28282d42f431b',
  	'authToken' : 'e86a840e8a9448bd29e52908dd43789c',
  	'fromPhone' : '+12672968764'
  },
  'templateGlobals' : {
    'appName' : 'UpTimeChecker',
    'companyName' : 'NotARealCompanyInc',
    'yearCreated' : '2019',
    'baseUrl' : 'http://localhost:3001/'
  }
};

// testing environment
environments.testing = {
  'httpPort' : 4000,
  'httpsPort' : 4001,
  'envName' : 'testing',
  'hashingSecret' : 'this is a secret',
  'maxChecks':5,
    'twilio':{
    'accountSid' : 'ACc9f5071541dc79ea55f28282d42f431b',
    'authToken' : 'e86a840e8a9448bd29e52908dd43789c',
    'fromPhone' : '+12672968764'
  },
  'templateGlobals' : {
    'appName' : 'UpTimeChecker',
    'companyName' : 'NotARealCompanyInc',
    'yearCreated' : '2019',
    'baseUrl' : 'http://localhost:3000/'
  }
};


// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;
// Export the module
module.exports = environmentToExport;
