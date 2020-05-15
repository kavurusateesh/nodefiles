var crypto = require('crypto');
const config = require("../config/db.config.js");
var encryptData = function(data){
	// console.log(data+" ======Encrypt====== "+config.encryptionKey);
	if(data) {
		try {
			var cipher = crypto.createCipher('aes256', config.encryptionKey);  
			return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
		} catch (exception) {
			console.log(exception.stack);
			return data;
		} 
	} else {
		return null;
	}
};

var decryptData = function(data){
	// console.log(data+" ======Decrypt====== "+config.encryptionKey);
	if(data){
		try {
			var decipher = crypto.createDecipher('aes256', config.encryptionKey);
			return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
		} catch(exception) {
			console.log(exception.stack);
			return data;
		}
	} else {
		return null;
	}
};

module.exports.encryptData = encryptData;
module.exports.decryptData = decryptData;