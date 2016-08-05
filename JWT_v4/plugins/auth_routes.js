var Boom = require('boom');

exports.register = function(server, options, next){
	server.route([
		{
			method: 'GET',
			path: '/login',
			config: {
				auth: 'auth_login',
				handler: function(request, reply){
					var auth_result = request.auth.credentials;

					reply(auth_result);
				}
			}
		},
		{
			method: 'GET',
			path: '/private',
			config: {
				auth: 'auth_jwt',
				handler: function(request, reply){
					var auth_result = request.auth.credentials;

					if(auth_result.result)
						reply(auth_result);
					else
						reply(Boom.unauthorized("Invalid token", 'sample', {error: auth_result.error}));
				}
			}
		},
		{
			method: 'GET',
			path: '/privateIsland',
			config: {
				auth: 'auth_jwt',
				handler: function(request, reply){
					var auth_result = request.auth.credentials;

					if(auth_result.result)
						reply(auth_result.data);
					else
						reply(Boom.forbidden("Page is out of user's scope."));
				}
			}
		}
	]);

	next();
};

exports.register.attributes = {
	name: 'auth_routes',
	version: '1.0.0'
};