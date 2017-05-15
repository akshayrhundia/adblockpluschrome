/*
    Produces messages for background script consumer.
*/

function MessageProducer()
{
    
}

MessageProducer.produceLoggingMessage = function(type, message) {
    var toSend = MessageFactory.build(type, message)
    var port = chrome.runtime.connect();
    if (port != undefined) {
        port.postMessage(toSend);
    } else {
        console.log.warn("Undefined port encountered while sending" + toSend.type + " " + toSend.message)
    }
}

MessageProducer.produceObservationMessage = function(message) {
    var toSend = MessageFactory.build(MessageType.OBSERVATION, message)
    var port = chrome.runtime.connect();
    if (port != undefined) {
        port.postMessage(toSend);
    } else {
        console.log.warn("Undefined port encountered while sending" + toSend.type + " " + toSend.message)
    }
}