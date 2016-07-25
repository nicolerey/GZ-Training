var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8000)
});

server.register([require('inert'), require('vision')], function(err){
	if(err)
		throw err;

	server.views({
		engines: {
			html: require('handlebars')
		},
		path: Path.join(__dirname, 'templates')
	});

	server.route({
		method: 'GET',
		path: '/{name*}',
		handler: {
			view: 'index.html'
		}
	});
});

server.start();