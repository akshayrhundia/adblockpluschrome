/*
    thomasjm - This file contains the functionality for handling messages from other scripts, sent to the background script.
*/
function MessageConsumer()
{
}

MessageConsumer.consume = function(input, sender) {
	var messageType = input.type;
	var message = input.message;
    switch (messageType) {
        case MessageType.LOG:
            console.log(message);
            break;
        case MessageType.DEBUG:
            console.log(message);
            break;
        case MessageType.WARN:
            console.warn(message);
            break;
        case MessageType.ERROR:
            console.error(message);
            break;
		case MessageType.OBSERVATION:
            Observations.record(sender, message);
            break;
        default:
            console.warn("Unknown message: " + messageType);
            break;
    }
}
