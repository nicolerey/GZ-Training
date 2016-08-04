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

					reply(auth_result);
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

					reply(auth_result);
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