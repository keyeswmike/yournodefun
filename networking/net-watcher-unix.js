'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
    throw Error('Filename not specified');
}

net.createServer(connection => {
    // Reporting code
    console.log('Subscriber connected!');
    connection.write(`Now watching "${filename}" for changes... \n`);

    // Watcher set-up
    const watcher = fs.watch(filename, () => {
        connection.write(`File "${filename}" changed ${new Date()} \n`)
    });

    // cleanup
    connection.on('close', () => {
        console.log('subscriber left!');
        watcher.close();
    });
}).listen('/tmp/watcher.sock', () => {
    console.log('Listening for subscribers...');
});