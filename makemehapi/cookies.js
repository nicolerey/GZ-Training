var Hapi = require('hapi');
var Boom = require('boom');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.state('session', {
	path: '/',
	encoding: 'base64json',
	ttl: 10,
	domain: 'localhost'
});

server.route([
	{
		method: 'GET',
		path: '/set-cookie',
		config: {
			handler: function(request, reply){
				reply({message: 'success'}).state('session', {key: 'makemehapi'});
			},
			state: {
				parse: true,
				failAction: 'log'
			}
		}
	},
	{
		method: 'GET',
		path: '/check-cookie',
		handler: function(request, reply){
			if(request.state.session)
				reply({user: 'hapi'});
			else
				reply(Boom.unauthorized('Missing authentication'));
		}
	}
]);

server.start();