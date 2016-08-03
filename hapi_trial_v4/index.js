var Hapi = require('Hapi');
var Path = require('path');

var UserAuthenticationRoutes = require('./plugins/user_authentication');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.auth.scheme('login_scheme', require('./schemes/auth_scheme'));
server.auth.strategy('auth_login', 'login_scheme', {});

server.register(UserAuthenticationRoutes,
	{
		routes: {
			prefix: '/api'
		}
	},
	function(err){
		if(err)
			throw err;
	}
);

server.start(function(err){
	if(err)
		throw err;

	console.log('Server is running @ ' + server.info.uri);
});