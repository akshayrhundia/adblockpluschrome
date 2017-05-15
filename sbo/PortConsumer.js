/*
    thomasjm - This file contains Port consumer functionality for: chrome.runtime.onConnect
*/
function PortConsumer()
{
}

PortConsumer.consume = function(port) {
    port.onMessage.addListener(MessageConsumer.consume);
}