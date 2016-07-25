var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.register(require('inert'), function(err){
	if(err)
		throw err;

	server.route({
		method: 'GET',
		path: '/',
		handler: {
			file: 'index.html'
		}
	});
});

server.start(function(err){
	if(err)
		throw err;

	console.log('Server is running');
});