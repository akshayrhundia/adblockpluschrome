/*
    Represents observation objects.
*/

function ObservationCache() {
	
}
	ObservationCache.received = 0;
	ObservationCache.sent = 0;
	ObservationCache.values = [];
	ObservationCache.created = Date.now();
	
	ObservationCache.add = function(value) {
		ObservationCache.values.push(value);
		ObservationCache.incrementReceived();
		ObservationCache.conditionalOutput();
	};
	
	ObservationCache.flush = function() {
		ObservationCache.values = [];
		ObservationCache.created = Date.now();
	}
	
	ObservationCache.size = function() {
		return ObservationCache.values.length;
	}
	
	ObservationCache.clear = function() {
		var results = ObservationCache.values;
		ObservationCache.flush();
		for (var result in results) {
			
		}
		return results;
	}
	
	ObservationCache.conditionalOutput = function() {
		if (ObservationCache.values.length > Constants.MAX_CACHE_SIZE) {
			console.log("Cache full, send to server: " + ObservationCache.values.length + " items; received = " + ObservationCache.received + " sent = " +ObservationCache.sent);
			var toOutput = ObservationCache.clear();
            ObservationCache.output(toOutput);
		}
	}
	
	ObservationCache.output = function(toOutput) {
        Server.identify(function(id, identifier, token) {
            var identity = {
                token : token
            };
            KeyServer.syncKeys(identity, function(sentIdentity, sentClientKey, sentKeyIdentifier) {
                if (toOutput.length > 0) {
                    ObservationCache.incrementSent(toOutput.length);
                    ObservationCache.sendSet(sentIdentity, sentClientKey, sentKeyIdentifier, toOutput);
                }
            });
        });
	}
	
	ObservationCache.sendSet = function(identity, key, keyId, toOutput) {
		var json = JSON.stringify(toOutput);
		var length = json.length;
		if (length  < Constants.MAX_SEND_SIZE) {
			ObservationCache.send(identity, key, keyId, json);
		} else {
			var sets = ObservationCache.split(toOutput);
			for (var index = 0; index < sets.length; index++) {
				ObservationCache.sendSet(identity, key, keyId, sets[index]);
			}
		}
	}
	
	ObservationCache.send = function(identity, key, keyId, json) {
		var compressed = LZString.compressToUTF16(json);
		var iv = Protects.generateKey(Constants.RANDOM_PARANOIA, Constants.SYMMETRIC_KEY_SIZE);
		var protectedMessage = Protects.protectObservation(key, iv, compressed);
		var message = {
			keyId : keyId,
			iv : iv,
			value : protectedMessage
		};		
		ServerAPI.sendObservations(identity, message, function (json) {
			console.log("Observation sent! Now sending properties");
            Server.sendExistingBrowserIdentityProperties();
		});
	}
	
	ObservationCache.incrementReceived = function() {
		ObservationCache.received = ObservationCache.received + 1;
	}
	
	ObservationCache.incrementSent = function(value) {
		ObservationCache.sent = ObservationCache.sent + value;
	}
		
	ObservationCache.split = function(toOutput) {
		var outputSize = 2;
		var outputs = [];
		outputs.push([]);
		outputs.push([]);
		for (var index = 0; index < toOutput.length; index++) {
			var set = index % outputSize;
			outputs[set].push(toOutput[index]);
		}
		return outputs;
	}

