/*
    Adapts requests of extension logic to server requests.
*/

var routes = {
		
	host : "http://heinz-sparkle.heinz.cmu.edu/",
	browserIdentityRoute: "http://heinz-sparkle.heinz.cmu.edu/ads/browser",
	serverKeyRoute : "http://heinz-sparkle.heinz.cmu.edu/ads/server/key",
	browserKeyRoute : "http://heinz-sparkle.heinz.cmu.edu/ads/browser/key",
	browserObservationRoute : "http://heinz-sparkle.heinz.cmu.edu/ads/browser/observation",
	browserIdentityPropertyRoute : "http://heinz-sparkle.heinz.cmu.edu/ads/browser/properties"
	
}

function ServerAPI()
{
    
}
	/*
	Sends browser identity to server. Uniquely identifies a browser.
	Credentials expected as follows:
	
	{
		identifier: "HELLO WORLD",
	    properties: "NONE"
	}
	
	Callback parameter is called with json parsed results of request
	*/
ServerAPI.identify = function(credentials, callback) {
	console.debug("ServerAPI.identify: Identifying browser to server for authentication");
	var json = JSON.stringify(credentials);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", routes.browserIdentityRoute, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("ServerAPI.identify: result = " + xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			callback(jsonResponse);
        } else if(xhr.readyState == 4) {
			console.warn("ServerAPI.identify: Failed: " + JSON.stringify(xhr));
		}
    }
	xhr.send(json);
}

/*
	Retrieves server's public key to protect user encryption key.
*/
ServerAPI.getServerKey = function(identity, callback) {
	console.debug("ServerAPI.getServerKey: Retrieving server's key from server");
	var xhr = new XMLHttpRequest();
	xhr.open("GET", routes.serverKeyRoute, true);
	xhr.setRequestHeader('browser-authentication', identity["token"]);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("ServerAPI.getServerKey: result = " + xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			callback(jsonResponse);
        } else if(xhr.readyState == 4) {
			console.warn("ServerAPI.getServerKey: Failed: " + xhr.status);
		} 
    }
	xhr.send();
}

/*
	User login token to send server the encryption key to associate with the logged in user.
*/
ServerAPI.sendClientKey = function(identity, keyMaterial, callback) {
	console.debug("ServerAPI.sendClientKey: sending client key to server with credentials");
	var xhr = new XMLHttpRequest();
	var json = JSON.stringify(keyMaterial);
	xhr.open("POST", routes.browserKeyRoute, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('browser-authentication', identity["token"]);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("ServerAPI.sendClientKey: result = " + xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			callback(jsonResponse);
        } else if(xhr.readyState == 4) {
			console.warn("ServerAPI.sendClientKey: Failed: " + xhr.status);
		}
    }
	xhr.send(json);
}

/*
	Send observations recorded by extension to server (encrypted with previously submitted key)
*/
ServerAPI.sendObservations = function(identity, message, callback) {
	console.debug("ServerAPI.sendObservations: Sending observations to server");
	var xhr = new XMLHttpRequest();
	var json = JSON.stringify(message);
	xhr.open("POST", routes.browserObservationRoute, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('browser-authentication', identity["token"]);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("ServerAPI.sendObservations: result = " + xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			callback(jsonResponse);
        } else if(xhr.readyState == 4) {
			console.warn("ServerAPI.sendObservations: Failed: " + xhr.status);
		}
    }
	xhr.send(json);
}

/*
	Send observations recorded by extension to server (encrypted with previously submitted key)
*/
ServerAPI.sendBrowserIdentityProperties = function(identity, message, callback) {
	console.debug("ServerAPI.sendBrowserIdentityProperties: Sending browser identifying propeties to server");
	var xhr = new XMLHttpRequest();
	var json = JSON.stringify(message);
	xhr.open("POST", routes.browserIdentityPropertyRoute, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('browser-authentication', identity["token"]);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("ServerAPI.sendBrowserIdentityProperties: result = " + xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			callback(jsonResponse);
        } else if(xhr.readyState == 4) {
			console.warn("ServerAPI.sendBrowserIdentityProperties: Failed: " + xhr.status);
		}
    }
	xhr.send(json);
}
