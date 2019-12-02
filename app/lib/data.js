//library for storing and editing data

//dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

//container for the module
var lib={};

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/');

// Write data to a file
lib.create = function(dir,file,data,callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });

};

//read data from a file

lib.read = function(dir,file,callback)
{
	fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data)
	{
		if(!err && data)
		{
			var parsedData = helpers.parseJsonToObject(data);
			callback(false,parsedData);	
		}
		else
		{
			callback(err,data);	
		}
		
	});
};

//update data inside a file

lib.update = function(dir,file,data,callback)
{
	//open the file the writing 
	fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err, fileDescriptor)
	{
		if(!err && fileDescriptor)
		{
			var stringData = JSON.stringify(data);

			//truncate the file
			fs.truncate(fileDescriptor,function(err)
				{
					if(!err)
					{
						//write to the file and close it
						fs.writeFile(fileDescriptor,stringData,function(err)
							{
								if(!err)
								{
									fs.close(fileDescriptor,function(err)
										{
											if(!err)
											{
												callback(false);
											}
											else
											{
												callback('error closing the file');
											}
										});
								}else
								{
									callback('error writing to existing file');
								}
							});
					}
					else
					{
						callback('error truncating file');
					}
				});

		}else
		{
			callback('could not open the file for update it may not exist yet');
		}
	});
};

//deleting a file
lib.delete=function(dir,file,callback)
{
	fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err)
	{
		if(!err)
		{
			callback(false);
		}
		else
		{
			callback('error deleting the file');
		}
	});
};

//list all the items in a directory
lib.list = function(dir,callback)
{
	fs.readdir(lib.baseDir+dir+'/',function(err,data)
	{
		if(!err && data && data.length>0)
		{
			var trimmedFileNames = [];
			data.forEach(function(fileName)
				{
					trimmedFileNames.push(fileName.replace('.json',''));
				});
			callback(false,trimmedFileNames);
		}
		else
		{
			callback(err,data);
		}
	}); 	
};

//export the modeule
module.exports = lib;