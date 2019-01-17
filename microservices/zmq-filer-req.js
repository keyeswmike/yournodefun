'use scrict';
const zmq = require('zeromq');
const filename = process.argv[2];

const requester = zmq.socket('req');

// Handle reply from responder
requester.on('message', (data) => {
    const response = JSON.parse(data);
    console.log('Received response:', response);
});

// connect to host and port
requester.connect('tcp://localhost:60401');

// Send request for content
for(let i = 1; i <= 5; i++){
    console.log(`Sending request ${i} for ${filename}`);
    requester.send(JSON.stringify({ path: filename }));
}