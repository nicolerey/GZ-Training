var Hapi = require('hapi');

var user = {
	username: 'hapi',
	password: 'auth'
};

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

var validate = function(request, username, password, callback){

	console.log('nicole');
	var isValid = (username===user.username && password===user.password);

	return callback(null, isValid, {name: user.username});
};

server.register(require('hapi-auth-basic'), function(err){
	if(err)
		throw err;

	server.auth.strategy('simple', 'basic', {validateFunc: validate});

	server.route({
		method: 'GET',
		path: '/',
		config: {
			auth: 'simple',
			handler: function(request, reply){
				reply();
			}
		}
	});
});

server.start();