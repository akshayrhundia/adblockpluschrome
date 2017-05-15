/*
    Creates message objects from inputs.
    Message are expected to be json-compatible and include a type field (adheres to MessageType) and message object
*/

function MessageFactory()
{
    
}

MessageFactory.build = function(type, message) {
    var output = {
        "type" : type, 
        "message" : message
    };
    return output;
}