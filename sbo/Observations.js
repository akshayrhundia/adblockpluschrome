/*
    thomasjm - This file contains observation functions for sensor observations.
*/
function Observations()
{

}

Observations.init = function(browserId) {
    chrome.storage.local.get(
        {
            'browserSalt' : ''
        }, 
        function (items) {
           var salt = items.browserSalt;
            if (!salt) {
                salt = Protects.random(Constants.RANDOM_PARANOIA, Constants.SALT_SIZE);
                chrome.storage.local.set(
                {
                    'browserSalt' : salt
                }, function(){
                    console.warn("New browser salt stored = " + salt);
                });
            } 
            Observations.protect = salt;
            Observations.protectHash = EncryptionUtility.bcryptHash(salt, Constants.SALT_HASH_SALT);
            Observations.browserId = browserId;
        }
    );
}

/*
	Called through content script messages
*/
Observations.record = function(sender, inputMessage) {
	var observation = Observations.build();
	observation.addStaticProperties(inputMessage.normal);
	Observations.calculateProtected(observation, inputMessage.protect, function(results) {
		ObservationCache.add(results);
	});
}

/*
	Called through background scripts
*/
Observations.recordEvent = function(input) {
	var observation = Observations.build();
	observation.addStaticProperties(input);
	ObservationCache.add(observation.getStaticProperties());
}

Observations.build = function() {
	var observation = new Observation();
	var globals = {
		"ads.browser.id": Observations.browserId,
		"ads.sensor.time": LanguageUtilities.timestamp(),
		"ads.sensor.name": "ad_block",
		"ads.sensor.version": 1
	};
	observation.addStaticProperties(globals);
	return observation;
}

Observations.calculateProtected = function(observation, properties, callback) {
	var calculations = 0;
	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			calculations = calculations + 1;
			var inputName = key;
			var input = properties[key];
			var inputValue = ((input.length > Constants.PROTECTED_MAX_LENGTH) ? input.substring(0, Constants.PROTECTED_MAX_LENGTH) : input);
			//Calculate hash using SHA-256
			var hash = Observations.calculateHash(inputValue);
			observation.addStaticProperty(inputName, hash);
			//Add hash of salt
			var hashedSalt = Observations.protectHash;
			observation.addStaticProperty(inputName + ".saltHash", hashedSalt);
				
			var valueLength = -1;
			if (inputValue != null) {
				valueLength = inputValue.length;
			}
			observation.addStaticProperty(inputName + ".length", valueLength);
			
		}
	}
	callback(observation.getStaticProperties());
}

Observations.calculateHash = function(inputValue) {
	var toHash = Observations.protect + inputValue;
	if (!Observations.protect) {
		console.error("Hash salt is not set!");
	}
	var bitArray = sjcl.hash.sha256.hash(toHash);  
	var hash = sjcl.codec.hex.fromBits(bitArray);
	return hash;
}



