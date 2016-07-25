var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.register(require('inert'), function(err){
	if(err)
		throw err;

	server.route({
		method: 'GET',
		path: '/foo/bar/baz/{filename*}',
		handler: {
			directory: {
				path: __dirname + '/public'
			}
		}
	});
});

server.start();

/*var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

function hellohandler(request, reply) {
  reply('Hello ' + encodeURIComponent(request.params.name));
}

server.register(require('inert'), function(err){
	if(err)
		throw err;

	server.route({path: '/{name*}', method:'GET',
	  handler: {
	    directory: { path: __dirname }
	  }
	});
});

server.start();*/