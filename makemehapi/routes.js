var Hapi = require('Hapi');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function(request, reply){
		reply('Hello ' + request.params.name);
	}
});

server.start(function(err){
	if(err)
		throw err;

	console.log('Server is running');
});