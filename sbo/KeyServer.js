/*
Interface into key server session lifecycle and functionality
 */

function KeyServer() {}
	
	/*
		Called at start of application, initializes keys used throughout application and syncs with server.
        Callback(identity, key, keyId)
	*/
	KeyServer.syncKeys = function(identity, callback) {
		KeyServer.retrieveKeys(function(clientKey, keyIdentifier) {
            var key = clientKey;
            var keyId = keyIdentifier;
			if (!key || !keyId) {
				console.log("Missing keys in storage, need to re-create and sync keys with server");
				//Create a random client key
				key = Protects.generateKey(Constants.RANDOM_PARANOIA, Constants.SYMMETRIC_KEY_SIZE);
				//Create a random key identifier
				keyId = Protects.random(Constants.RANDOM_PARANOIA, Constants.KEY_IDENTIFIER_SIZE);
			} 
            //Upload client key materials to server
			KeyServer.sendClientKey(identity, key, keyId, function (sentIdentity, sentClientKey, sentKeyIdentifier) {
				console.debug("Sent keys to server");
				KeyServer.storeKeys(sentClientKey, sentKeyIdentifier, function() {
                    console.debug("Sent keys to server");
					callback(sentIdentity, sentClientKey, sentKeyIdentifier);
                });
			});
		});
	}
	
	
	/////////////Private functions below /////////////
	KeyServer.storeKeys = function(clientKey, keyIdentifier, callback) {
		var toSet = {};
		toSet[GUIDs.ClientKeyStorageIdentifier] = clientKey;
		toSet[GUIDs.ClientKeyIdIdentifier] = keyIdentifier;
		chrome.storage.local.set(toSet, function () {
			console.debug("Stored client key in local storage");
			callback();
		});
	}
	
	KeyServer.retrieveKeys = function(callback) {
		var toGet = {};
		toGet[GUIDs.ClientKeyStorageIdentifier] = '';
		toGet[GUIDs.ClientKeyIdIdentifier] = '';
		chrome.storage.local.get(toGet, function (items) {
			var clientKey = items[GUIDs.ClientKeyStorageIdentifier];
			var keyIdentifier = items[GUIDs.ClientKeyIdIdentifier];
			callback(clientKey, keyIdentifier);
		});
	}
	
	KeyServer.sendClientKey = function(identity, clientKey, keyIdentifier, callback) {
		ServerAPI.getServerKey(identity, function (json) {
			var serverKey = json["value"];
			var protectedKey = Protects.protectClientKey(clientKey, serverKey);
			var keyMaterial = {
				key : protectedKey,
				keyIdentifier : keyIdentifier
			};
			ServerAPI.sendClientKey(identity, keyMaterial, function (json) {
				callback(identity, clientKey, keyIdentifier);
			});
		});
	}

