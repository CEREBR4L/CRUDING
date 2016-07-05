var mongodb = require('mongodb'),
	mongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/my_db';

mongoClient.connect(url, function(err, db){
	if(err){
		console.log("Can't connect to db");
	}
	else{
		console.log("Connection has been made! URL: ", url);

		var collection = db.collection('users');
		//create db entries
		var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
    	var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    	var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
    	//insert entries to collection
    	collection.insert([user1, user2, user3], function(err, result){
    		if(err){
    			console.log("Error inserting into users: ", err);
    		}
    		else{
    			console.log("Successful insert!");
    		}
    	});
    	//update entries in collection...
    	collection.update({name: 'modulus user'}, {$set: {enabled: flase}}, function(err, numUpdated){
    		if(err){
    			console.log("Error inserting into users: ", err);
    		}
    		else if(numUpdated){
    			console.log("Updayed successfully %d doc(s).", numUpdated);
    		}
    		else{
    			console.log("No docs found with defined criteria!");
    		}
    	});
    	//find entries in collection...
    	collection.find({name: 'modulus user'}).toArray(function(err, result){
    		if(err){
    			console.log("Cant find that: ", err); 
    		}
    		else if(result.length){
    			console.log("We found: ", result);
    		}
    		else{
    			console.log("No docs found with the given criteria :(");
    		}
    	});
    	//finding using DB cursor?
    	var cursor = collection.find({name: 'modulus user'});
    	cursor.sort({age: -1});
    	cursor.limit(10);
    	cursor.skip(0);
    	cursor.each(function(err, doc){
    		if(err){
    			console.log("Error finding item(s): ", err);
    		}
    		else{
    			console.log('Fetched: ', doc);
    		}
    	});

	}
});