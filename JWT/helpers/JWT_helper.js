var EncodingHelper = require('../helpers/encoding_helper');

exports.MakeJWT = function(header, payload, secret){
	var base_header = EncodingHelper.Base64Encode(header);

	var base_payload = EncodingHelper.Base64Encode(payload);

	var base_signature = EncodingHelper.MakeJWTSignature(base_header, base_payload, secret);

	return base_header + "." + base_payload + "." + base_signature;
};