var defaultHost = "localhost";
var defaultPort = "31337";

var fs = require('fs');

var databaseDirectory = "reverseProxy";
var databaseFile = "db";

var debug=true;

fs.readdir(databaseDirectory,function(err,files){
	if(err){
		console.log('Error, please run admin.js first !');
	}
	if(files){
		if(files.indexOf(databaseFile)<0){
			console.log('Error with file');
		}
	}
});

var connection = new(require('nosqlite').Connection)(databaseDirectory);
db = connection.database(databaseFile);


require('reverse-proxy').createServer({
	port : 80,
	map: function (config){
		sites = db.allSync();
		path=config.path;

		if((sites.filter(function(e){return e.url==config.host})).length == 1){
			good = sites.filter(function(e){return e.url==config.host})[0];
			config.host=good.redirHost;
			config.port=good.redirPort;
			if(debug){
				console.log(config);
			}
			return config;
		}else{
			config.host=defaultHost;
			config.port=defaultPort;
			if(debug){
				console.log(config);
			}
			return config;
		}
	}
});

