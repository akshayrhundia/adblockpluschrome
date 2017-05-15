/*
    thomasjm - Build observations with additional properties
*/
function ObservationDecorator()
{
}

ObservationDecorator.tabFields = function(inputMessage, inputTab) {
	if (inputTab) {
		var message = {
			"browse.tab.active": inputTab.active,
			//@limit"browse.tab.audible": inputTab.audible,
			//@limit"browse.tab.favIconUrl": inputTab.favIconUrl,
			//@limit"browse.tab.height": inputTab.height,
			"browse.tab.highlighted": inputTab.highlighted,
			"browse.tab.id": inputTab.id,
			//@limit"browse.tab.index": inputTab.index,
			"browse.tab.incognito": inputTab.incognito,
			"browse.tab.pinned": inputTab.pinned,
			"browse.tab.selected": inputTab.selected,
			"browse.tab.status": inputTab.status,
			"browse.tab.title": inputTab.title,
			"browse.tab.url": inputTab.url,
			//@limit"browse.tab.width": inputTab.width,
			"browse.tab.windowId": inputTab.windowId
		};
		inputMessage.addStaticProperties(message);
	}
}
