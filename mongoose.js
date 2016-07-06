var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_db');

var users = mongoose.model('User', {name: String, roles: Array, age: Number});

var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});

user1.name = user1.name.toUpperCase();

console.log(user1);

user1.save(function(err, userObj){
	if(err){
		console.log(err);
	}
	else{
		console.log("Successful save: ", userObj);
	}
});

user.findOne({name: 'modulus admin'}, function(err, userObj){
	if(err){
		console.log(err);
	}
	else if(userObj){
		console.log('Found: ', userObj);
		
		if(userObj.age != 30){
			userObj.age += 30;

			userObj.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log('Updated: ', userObj);
				}
			})
		}
	}
	else{
		console.log('User not found!');
	}
});