var Path = require('path');

exports.register = function(server, options, next){
	console.log('nicole');

	server.register(require('inert'), function(err){
		if(err)
			throw err;

		server.route([
			{
				method: 'GET',
				path: '/test',
				handler: function(request, reply){
					reply('testing only');
				}
			},
			{
			    method: 'GET',
			    path: '/assets/{filename*}',
			    handler: {
			    	directory: {
			    		path: Path.join(__dirname, 'client/assets/')
			    	}
			    }
			},
			{
			    method: 'GET',
			    path: '/modules/{filename*}',
			    handler: {
			    	directory: {
			    		path: Path.join(__dirname, 'client/modules')
			    	}
			    }
			},
			{
			    method: 'GET',
			    path: '/services/{filename*}',
			    handler: {
			    	directory: {
			    		path: Path.join(__dirname, 'client/services')
			    	}
			    }
			},
			{
			    method: 'GET',
			    path: '/controllers/{filename*}',
			    handler: {
			    	directory: {
			    		path: Path.join(__dirname, 'client/controllers')
			    	}
			    }
			}
		]);
	});

	next();
};

exports.register.attributes = {
	name: 'static_content_routes',
	version: '1.0.0'
};