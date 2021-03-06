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
		var x = req.url.split('=');

		var y = x[1].split('&');
		var text = JSON.parse(data);
		var d = '';
		for(var i=0; i<y.length; i++){
			var m =y[i];
			d= d+text[m]+'<br>'
		}
		res.send(d);
		//console.log(data);
	})
});

app.get('/a/:file', function(req, res) {
	//function to read file and then process it
	fs.readFile(req.params.file+'.json', 'utf8', function(err, data){
		if(err)
			return console.log(err);
		var d = JSON.parse(data);
		var x = req.url.split('=');
		var query = '$.'+x[1];
		var result = jsonql(query, d);	
		res.send(result);
	})
});