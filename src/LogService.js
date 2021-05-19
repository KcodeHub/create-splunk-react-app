



export function log (error, errorInfo) {

var SplunkLogger = require("splunk-logging").Logger;

var config = {
    token: "3e8bc571-f357-4999-a77c-ed849a05aa21",  // Token Seutup on Splunk
    url: "http://localhost:8001"  ,                 // Splunk http collector url
    level: "info",
    maxRetries: 3 // Retries
};

var Logger = new SplunkLogger(config);
//Logger.requestOptions.strictSSL = true;

Logger.error = function(err, context) {
    // Handle errors here
   // console.log("error", err, "context", context);
};

// Custom message Formatter

Logger.eventFormatter = function(message, severity) {
    var event = "[" + severity + "]";

    if (typeof message === "object") {
        for (var key in message) {
            event += key + "=" + message[key] + " ";
        }
    }
    else {
        event += "message=" + message;
    }

    return event;
};

var payload = {
    // Message can be anything, it doesn't have to be an object
    message: error,
    // Metadata is optional
    metadata: {
            index: "react_error"
        },
    // Severity is also optional
    severity: "info"
};

console.log("Sending payload", payload);

Logger.send(payload, function(err, resp, body) {
    // If successful, body will be { text: 'Success', code: 0 }
    console.log("Response from Splunk", body);
});

}