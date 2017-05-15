
function Protects() {

}

	/*
		Generate a random string 
	*/
	Protects.random = function (paranoia, size) {
		var random = sjcl.random.randomWords(size, paranoia);
		var result = sjcl.codec.base64.fromBits(random);
		return result;
	}
	
	/*
		Generate a random client key for encryption
	*/
	Protects.generateKey = function (paranoia, size) {
		var words = size / Constants.WORD_SIZE;
		var random = sjcl.random.randomWords(words, paranoia);
		var result = sjcl.codec.base64.fromBits(random);
		return result;
	}

	/*
		Use asymmetric encryption to protect client encryption key
	*/
	Protects.protectClientKey = function (clientKey, serverKey) {
		return EncryptionUtility.asymmetricEncrypt(serverKey, clientKey);
	}
	
	/*
		Use symmetric encryption to protect observations with client key
	*/
	Protects.protectObservation = function (clientKey, iv, input) {
		return EncryptionUtility.symmetricEncrypt(clientKey, iv, input);
	}
