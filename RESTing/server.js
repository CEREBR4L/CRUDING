var express = require('express'),
		app = express();
var wines = require('./routes/wines.js');

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.post('/wines', wines.addWine);
app.put('/wines/:id', wines.updateWine);
app.delete('/wines/:id', wines.deleteWine);

app.listen(3000);
console.log('Server running on port 3000');
