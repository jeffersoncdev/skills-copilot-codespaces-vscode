// Create web server
// Run: node comments.js
// Open browser: http://localhost:3000
// Test: curl -i -X POST -H 'Content-Type: application/json' -d '{"body":"Hello World!"}' http://localhost:3000/comments

var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk) {
				item += chunk;
			});
			req.on('end', function() {
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			items.forEach(function(item, i) {
				res.write(i + ') ' + item + '\n');
			});
			res.end();
			break;
	}
});

server.listen(3000);
console.log('Server listening on port 3000');

// Test
// curl -i -X POST -H 'Content-Type: application/json' -d '{"body":"Hello World!"}' http://localhost:3000/comments
// curl -i http://localhost:3000