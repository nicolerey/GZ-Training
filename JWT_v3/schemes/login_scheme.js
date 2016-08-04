var jwt = require('jsonwebtoken');

var user = {
	username: 'nicolerey',
	password: 'nicolerey',
	credentials: {
		name: 'Nicole Rey Arriesga',
		age: 20
	}
};

module.exports = function(server, options){
	options = options || {};

	function authenticate(request, reply){
		var user_acc = user.username + ":" + user.password;

		var req_acc = request.headers.authorization.split(/\s+/);
		var buf = new Buffer(req_acc[1], 'base64');

		var data = 'error';
		if(buf.toString('ascii')==user_acc){
			data = jwt.sign({
				scopes: options.scopes
			}, options.secret, {
				expiresIn: options.exp,
				issuer: options.issuer,
				subject: user.credentials.name
			});
		}

		return reply.continue({
			credentials: data
		});
	}

	return {authenticate: authenticate};
};