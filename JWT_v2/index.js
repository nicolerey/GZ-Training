var Hapi = require('hapi');

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

var validate = function(decoded, request, callback){
	console.log(decoded);

	return callback(null, true);
};

server.register(require('hapi-auth-jwt2'), function(err){
	if(err)
		throw err;

	server.auth.strategy('jwt', 'jwt', {
		key: 'NeverShareYourSecret',
		validateFunc: validate,
		verifyOptions: {
			algorithms: ['HS265']
		}
	});

	server.auth.default('jwt');

	server.route([
		{
			method: "GET",
			path: "/",
			config: {
				auth: false
			},
			handler: function(request, reply) {
				reply({text: 'Token not required'});
			}
		},
			{
			method: 'GET',
			path: '/restricted',
			config: {
				auth: 'jwt'
			},
			handler: function(request, reply) {
				reply({text: 'You used a Token!'})
					.header("Authorization", request.headers.authorization);
			}
		}
    ]);
});

server.start(function(err){
	if(err)
		throw err;

	console.log('Server running @ ' + server.info.uri);
});