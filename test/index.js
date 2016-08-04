var Hapi = require('hapi');

var user = {
	name: 'Nicole Rey Arriesga',
	age: 21
};

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8000)
});

var validate = function(decoded, request, callback){
	console.log(decoded);

	return callback(null, true);
};

server.register(require('hapi-auth-jwt2'), function(err){
	if(err)
		console.log(err);

	server.auth.strategy('jwt', 'jwt', {
		key: 'NeverShareYourSecret',
		validateFunc: validate,
		verifyOptions: {
			algorithms: ['HS256']
		}
	});

	server.auth.default('jwt');

	server.route([{
        method: "GET",
        path: "/",
        config: { auth: false },
        handler: function(request, reply) {
            reply({ text: 'Token not required' });
        }
    }, {
        method: 'GET',
        path: '/restricted',
        config: { auth: 'jwt' },
        handler: function(request, reply) {
            reply({ text: 'You used a Token!' })
                .header("Authorization", request.headers.authorization);
        }
    }]);
});

server.start(function(err){
	if(err)
		console.log(err);

	console.log('Server running at:', server.info.uri);
});