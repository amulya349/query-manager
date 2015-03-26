var express  = require('express');
var jsonql = require('./jsonql');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 8880;
var path = require('path');

app.listen(port);
console.log('Listening at http://localhost:' + port);

app.get('/:file', function(req, res) {
	//function to read file and then process it
	fs.readFile(req.params.file+'.json', 'utf8', function(err, data){
		if(err)
			return console.log(err);
		var d = JSON.parse(data);
		var x = req.url.split('=');
		var query = '$.'+x[1];
		var result = jsonql(query, d);
		res.send(JSON.stringify(result));
	})
});

//get method to create db
app.get('/createdb/:dbName', function(req, res) {
	data = {};
	data.name = "Amulya Kumar Sahoo";
	data.age = 21;
	data.phone = "9556544754";

	fs.writeFile(req.params.dbName+'.json', JSON.stringify(data), function(err) {
		if(err)
			res.send(err);
		res.send("Successfully written to file: "+ req.params.dbName+'.json');
	});
});

//get method to delete db
app.get('/deletedb/:dbName', function(req, res){
	fs.unlink(req.params.dbName+'.json', function(err){
		if(err)
			res.send(err);
		res.status(200).send("File "+ req.params.dbName+".json successfully deleted")

	})
})