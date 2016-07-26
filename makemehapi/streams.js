var Hapi = require('hapi');
var FS = require('fs');
var Rot13 = require('rot13-transform');
var Path = require('path');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		var read_stream = FS.createReadStream(Path.join(__dirname, 'public/sample.txt'));

		reply(read_stream.pipe(Rot13()));
	}
});

server.start();