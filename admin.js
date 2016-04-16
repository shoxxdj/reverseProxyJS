var prompt = require('prompt');
var fs = require('fs');

var databaseDirectory = "reverseProxy";
var databaseFile = "db";

fs.readdir(databaseDirectory,function(err,files){
	if(err){
		fs.mkdir(databaseDirectory,function(err){
      fs.mkdir(databaseDirectory+"/"+databaseFile,function(e){
        console.log(e);
      });
			console.log(err);
		});
	}
	if(files){
		if(files.indexOf(databaseFile)<0){
      fs.mkdir(databaseDirectory+"/"+databaseFile,function(e){
        console.log(e);
      });
		}
	}
});

var connection = new(require('nosqlite').Connection)(databaseDirectory);
db = connection.database(databaseFile);



var schema = {
    properties: {
      url: {
        pattern: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
        message: 'Enter a correct URL / IP. Be carefull, nothing is verified',
        required: true
      },
      redirHost: {
        pattern: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
        message: 'Enter a correct URL / IP. Be carefull, nothing is verified',
        required: true
      },
      redirPort: {
      	pattern: /^[0-9]{1,5}$/,
        message: 'Enter a correct Port',
        required: true
      }
    }
  };

if(process.argv.length<3){
  console.log("-------- Help Menu --------");
  console.log(' -a pour ajouter une entrée');
  console.log(' -l pour lister les entrées');
  console.log('@shoxxdj pour les remarques');
  console.log('---------------------------');
}

if(process.argv.indexOf('-l')>-1){
	docs = db.allSync();
	console.log(docs);
}

if(process.argv.indexOf('-a')>-1){
	if (!db.existsSync()){
		db.createSync();
  	}
  	prompt.get(schema, function (err, result) {
	  	if(!err){
	  		db.postSync(result);
	  		console.log('[=)] Ajout Termine')
	  	}else{
	  		console.log('[=(] Erreur :'+err);
	  	}
  	});
}

prompt.message = "Please Enter >";
prompt.start();


