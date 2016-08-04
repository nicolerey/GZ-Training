var CryptoJS = require('crypto-js');

exports.Base64Encode = function(data){
	var word_array = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
	return CryptoJS.enc.Base64.stringify(word_array);
};

exports.MakeJWTSignature = function(header, payload, secret){
	var signature = CryptoJS.HmacSHA256(header + "." + payload, secret);
	return CryptoJS.enc.Base64.stringify(signature);
};