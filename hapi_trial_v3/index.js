var Hapi = require('Hapi');
var Path = require('path');

var UserAuthenticationRoutes = require('./plugins/user_authentication');

var user = {
	username: 'nicolerey',
	password: 'nicolerey',
	credentials: {
		name: 'Nicole Rey Arriesga',
		age: 20
	}
};

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

var AuthenticateUser = function(request, username, password, callback){
	var isValid = (username===user.username && password===user.password);

	if(isValid)
		return callback(null, isValid, user.credentials);
	else
		return callback(null, isValid);
};

server.register(require('hapi-auth-basic'), function(err){
	if(err)
		throw err;

	server.auth.strategy('login_auth', 'basic', {
		validateFunc: AuthenticateUser
	});
});

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