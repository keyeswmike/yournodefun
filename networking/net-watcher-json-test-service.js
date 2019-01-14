// Create Server
// Message on connection
// Write a single chunk
// set timeout for message after
// write second message, on end: then send message
// tell server to listen on port 60300
'use strict';
const net = require('net');

net.createServer(connection => {
    console.log('Subscriber connected!');
    connection.write('{"type":"changed","file":"targ');

    let timer = setTimeout(function(){
        connection.write('et.txt","timestamp":1358175758495}' + "\n");
        connection.end();
    });

    
    connection.on('end', () => {
        clearTimeout(timer);
        console.log('Subscriber disconnected!');
    });
}).listen(60300, () => {
    console.log("Test server listening for subs!")
});