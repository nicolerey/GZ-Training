var JWTHelper = require('../helpers/JWT_helper');

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
		if(!options.needsToken){
			var user_acc = user.username + ":" + user.password;

			var req_acc = request.headers.authorization.split(/\s+/);
			var buf = new Buffer(req_acc[1], 'base64');

			var data = {};
			if(buf.toString('ascii')===user_acc){
				data = {
					result: true,
					message: "",
					data: user.credentials
				};

				var header = {
					"alg": "HS256",
					"typ": "JWT"
				};

				var payload = {
					"iss": 'localhost:8080',
					"exp": 5,
					"sub": 'Login JWT',
					"data": user.credentials
				};

				var JWT = JWTHelper.MakeJWT(header, payload, 'nicole');

				reply(data).auth('Credentials', JWT);
			}
			else{
				data = {
					result: false,
					message: "Username/password is invalid"
				};

				reply(data);
			}
		}
		/*else{

		}*/
	}

	return {authenticate: authenticate};
};