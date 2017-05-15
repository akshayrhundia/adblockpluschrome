/*
    thomasjm - Abstracts encrypion functionality.
*/
function EncryptionUtility()
{
}

function encryptString(stringToEncrypt) {
    return CryptoJS.enc.Base64.parse(encrypted.toString()).toString();
}

EncryptionUtility.symmetricEncrypt = function(key, iv, plaintext) {
	var byteEncryptionKey = CryptoJS.enc.Base64.parse(key);
	var byteEncryptionIv = CryptoJS.enc.Base64.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(plaintext, byteEncryptionKey, {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: byteEncryptionIv});
	var cipher = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	return cipher;
}

EncryptionUtility.symmetricDecrypt = function(key, cipher) {
	var decrypted = CryptoJS.AES.decrypt(cipher, key);
	return decrypted;
}

EncryptionUtility.asymmetricEncrypt = function(key, plaintext) {
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(key);
	var encrypted = encrypt.encrypt(plaintext);
	return encrypted;
}

EncryptionUtility.asymmetricDecrypt = function(key, cipher) {
	var decrypt = new JSEncrypt();
	decrypt.setPrivateKey(key);
	var plaintext = decrypt.decrypt(cipher);
	return plaintext;
}

EncryptionUtility.bcryptSalt = function(rounds) {
	return dcodeIO.bcrypt.genSaltSync(rounds);
}

EncryptionUtility.bcryptHash = function(input, salt) {
	return dcodeIO.bcrypt.hashSync(input, salt);
}

EncryptionUtility.bcryptHashAsync = function(input, salt) {
	return dcodeIO.bcrypt.hash(input, salt);
}