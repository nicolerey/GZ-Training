var Hapi = require('hapi');
var Path = require('path');

var db_module = require('./db');

var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.register(require('inert'), function(err) {
    if (err)
        throw err;
    
    // Static contents
    server.route([
	    {
		    method: 'GET',
		    path: '/',
		    handler: function(request, reply) {
		        reply.file('client/views/index.html');
		    }
		}, {
		    method: 'GET',
		    path: '/assets/{filename*}',
		    handler: function(request, reply) {
		        reply.file('client/assets/' + request.params.filename);
		    }
		}, {
		    method: 'GET',
		    path: '/modules/{filename*}',
		    handler: function(request, reply) {
		        reply.file('client/modules/' + request.params.filename);
		    }
		}, {
		    method: 'GET',
		    path: '/services/{filename*}',
		    handler: function(request, reply) {
		        reply.file('client/services/' + request.params.filename);
		    }
		}, {
		    method: 'GET',
		    path: '/controllers/{filename*}',
		    handler: function(request, reply) {
		        reply.file('client/controllers/' + request.params.filename);
		    }
		}
	]);
});

var db = db_module.DBModule(function() {
    var data = {};
    var condition = {};

    console.log('DB connection established');

    db.setCollectionName('test_table1');

    // Data request routes
	server.route([
	    {
	        method: 'GET',
	        path: '/getAllData',
	        handler: function(request, reply) {
	            db.searchDB('ALL', function(data) {
	                reply(data);
	            });
	        }
	    },
	    {
	        method: 'POST',
	        path: '/addName',
	        handler: function(request, reply) {
	            data = {
	                name: request.payload.name
	            };
	            db.insertToDB('ONE', data, function() {
	                reply();
	            });
	        }
	    },
	    {
	        method: 'POST',
	        path: '/deleteName',
	        handler: function(request, reply) {
	            condition = {
	                _id: db.convertStrToHexStr(request.payload._id)
	            };
	            db.deleteFromDB('ONE', condition, function(res) {
	                reply();
	            });
	        }
	    },
	    {
	        method: 'POST',
	        path: '/saveName',
	        handler: function(request, reply) {
	            condition = {
	                _id: db.convertStrToHexStr(request.payload._id)
	            };
	            data = {
	                $set: {
	                    name: request.payload.name
	                }
	            };
	            db.updateDB('ONE', condition, data, function(res) {
	                reply();
	            });
	        }
	    }
	]);
});

server.start(function(err) {
    if (err)
        throw err;

    console.log('Server is running at ' + server.info.uri);
});
