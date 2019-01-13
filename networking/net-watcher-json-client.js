'use strict';

const net = require('net');
// Create client that will connect to port 60300
const client = net.connect({port: 60300});

client.on('data', data => {
    // convert recieved JSON data to an JS object
    const message = JSON.parse(data);
    if (message.type === 'watching'){
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
        // Convert seconds time stamp to human readable data
        const date = new Date(message.timestamp);
        console.log(`File change: ${date}`);
    } else {
        console.log(`Unrecognized message type: ${message.type}`);
    }
});