/*
Interface into server session lifecycle and functionality
 */

function Server() {}

    Server.sendCount = 0;

    Server.identify = function(callback) {
        chrome.storage.local.get(
        {
            'browserIdentity' : ''
        }, 
        function (items) {
            var browserIdentity = items.browserIdentity;
            //If the browser identifier does not exist in storage, then extension is newly installed, set to random string.
            if (!browserIdentity ) {
                console.warn("Missing browser identity, browser needs to identify to server");
                browserIdentity = Protects.random(Constants.RANDOM_PARANOIA, Constants.BROWSER_IDENTIFIER_SIZE);
                console.warn("New browser identity generated, now using to authenticate to server identifier = " + browserIdentity);
            }
            var identity = {
                identifier : browserIdentity,
                properties : ""
            }
            //Upload the browsers identity to the server and retrieve authentication materials
            ServerAPI.identify(identity, function (json) {
                var id = json["id"];
                var identifier = json["identifier"];
                var token = json["token"];
                console.log("Browser identified with ID = " + id + " identifier = " + identifier + " token = " + token);
                //Save the browser identity for next time
                chrome.storage.local.set({
                    'browserIdentity' : identifier
                }, function () {
                    callback(id, identifier, token);
                });		
            });
        });
    }

	Server.init = function (callback) {
        Server.identify(function(id, identifier, token) {
            var identity = {
                token : token
            };
            Observations.init(id);
            KeyServer.syncKeys(identity, function(sentIdentity, sentClientKey, sentKeyIdentifier) {
                Server.sendExistingBrowserIdentityProperties();
                callback();
            });
        });
	}
	
	Server.sendExistingBrowserIdentityProperties = function() {
		var toGet  = {};
		toGet[GUIDs.EmailIdentifier] = '';
		toGet[GUIDs.ClientIdIdentifier] = '';
		chrome.storage.local.get(toGet, function (items) {
			var properties = {
				email : items[GUIDs.EmailIdentifier]
			}
			if (properties.email != null && properties.email != "") {
					Server.sendBrowserIdentityProperty("email", properties.email);
			}
		});
	}
	
	Server.sendBrowserIdentityProperty = function(propertyName, propertyValue) {
		var properties = [];
		var payload = {
			key: propertyName,
			value: propertyValue
		};
		properties.push(payload);
        Server.identify(function(id, identifier, token) {
            var identity = {
              token : token  
            };
            ServerAPI.sendBrowserIdentityProperties(identity, properties, function (json) {
                console.debug("Successfully sent browser identity properties with results!");
            });
        });

	}
