'use scrict';
const fs = require('fs');
const zmq = require('zeromq');

const responder = zmq.socket('rep');

responder.on('message', (data) => {
    const request = JSON.parse(data);
    console.log(`Recived a requires to get: ${request.path}`);

    // Read the file and reply with the content
    fs.readFile(request.path, (err, content) => {
        if (err) {
            responder.send(JSON.stringify({
                content: err,
                timestamp: Date.now(),
                pid: process.pid
            }));
            throw err;
        }
        console.log('Sending response content');
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

// Listen on TCP port 60401
responder.bind('tcp://127.0.0.1:60401', (err) => {
    if (err) {
        throw err;
    }
    console.log('Listening for zmq requesters...');
});

// Close the responder when the Node process ends.
process.on('SIGINT', () => {
    console.log('Shutting down...');
    responder.close();
});
