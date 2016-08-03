exports.register = function(server, options, next){
	server.route({
		method: 'POST',
		path: '/login',
		config: {
			auth: 'login_auth',
			handler: function(request, reply){
				reply(request.auth.credentials);
			}
		}
	});

	next();
};

exports.register.attributes = {
	name: 'user_authentication',
	version: '1.0.0'
};