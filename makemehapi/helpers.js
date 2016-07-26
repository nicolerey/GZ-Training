var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.register([require('vision')], function(err){
	if(err)
		throw err;

	server.views({
		engines: {
			html: require('handlebars')
		},
		path: Path.join(__dirname, 'templates'),
		helpersPath: Path.join(__dirname, 'helpers')
	});

	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: "helper-index.html"
		}
	});
});

server.start();