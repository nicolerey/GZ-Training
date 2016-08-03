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

		var data = {};
		if(buf.toString('ascii')===user_acc){
			data = {
				result: true,
				message: "",
				data: user.credentials
			};
		}
		else{
			data = {
				result: false,
				message: "Username/password is invalid"
			};
		}

		reply(data);
	}

	return {authenticate: authenticate};
};