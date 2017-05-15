/*
	Handle Microsoft Edge support
*/
if (typeof msBrowser !== 'undefined') {
    chrome = msBrowser;
}
else if (typeof browser != 'undefined') {
    chrome = browser;
}





chrome.storage.local.get({
    "B4A97488159F4E3DA41A756DD088C747": '',
    "85C40732DB01447BBEB075982A4F23C9": ''
  }, function(items) {
	  var enabled = true;
	  if (items['B4A97488159F4E3DA41A756DD088C747']) {
		var email = items['B4A97488159F4E3DA41A756DD088C747'];
		if (email == "AF6CFCA28A4F4DE2A58ECFB1F316DDC3") {
			enabled = false;
		}
	  }
	start(enabled);
  });

function start(enabled) {
	
	if (enabled == true) {
		console.log("Extension flagged on!");

		chrome.runtime.onConnect.addListener(PortConsumer.consume);

		Server.init(function() {
			console.log("Initializing modules");
            chrome.windows.onRemoved.addListener(function(windowId) {
                console.log("Window closed, flushing cache: " + windowId);
                ObservationCache.output();
            });
			//Send data from background
			var message = {
				"source": "background",
				"normal.property1": "Hello World",
				"normal.property2": "Hello Again"
			};
			Observations.recordEvent(message);
		});
	} else {
		console.log("Extension flagged off!");
	}
}

