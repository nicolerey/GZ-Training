var jwt = require('jsonwebtoken');

module.exports = function(server, options){
	options = options || {};

	function authenticate(request, reply){
		var token = request.headers.authorization;

		jwt.verify(token, options.secret, function(err, decoded){
			if(err){
				return reply.continue({
					credentials: {
						result: false,
						error: err
					}
				});
			}

			var scopes = decoded.scopes;
			var path = (request.path).split('/');
			var path_length = path.length;

			if(scopes.indexOf(path[path_length-1]) !== -1){
				return reply.continue({
					credentials: {
						result: true,
						data: decoded
					}
				});
			}
			
			return reply.continue({
				credentials: {
					result: false,
					error: {
						message: "User not authorized to access URL."
					}
				}
			});
		});
	}

	return {authenticate: authenticate};
};