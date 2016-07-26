var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	method: 'GET',
	path: '/chickens/{breed}',
	config: {
		handler: function(request, reply){
			reply('Your chicken\'s breed is: ' + request.params.breed);
		},
		validate: {
			params: {
				breed: Joi.string().required()
			}
		}
	}
});

server.start();