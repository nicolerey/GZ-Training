var Hapi = require('Hapi');

var AuthenticationRoutes = require('./plugins/auth_routes');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.auth.scheme('login_scheme', require('./schemes/login_scheme'));
server.auth.scheme('jwt_scheme', require('./schemes/jwt_scheme'));

server.auth.strategy('auth_login', 'login_scheme', {
	secret: 'SecretKey',
	expiration: "1d",
	issuer: server.info.uri,
	scopes: ['private']
});
server.auth.strategy('auth_jwt', 'jwt_scheme', {
	secret: 'SecretKey'
});

server.register(AuthenticationRoutes, {
	routes: {
		prefix: '/auth'
	}
}, function(err){
	if(err)
		console.log(err);
});

server.start(function(err){
	if(err)
		console.log(err);

	console.log('Server is running @ ' + server.info.uri);
});