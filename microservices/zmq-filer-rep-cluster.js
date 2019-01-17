'use strict';
const cluster = require('cluster');
const fs = require('fs');
const zmq = require('zeromq');

// returns array of with infomation about CPU cores (subsequently the number of cores)
const numWorkers = require('os').cpus().length;

if (cluster.isMaster) {

    // Master process creates router and dealer, binds and sockets
    const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
    const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

    // forward messages between the router and the dealer
    router.on('message', (...frames) => dealer.send(frames));
    dealer.on('message', (...frames) => router.send(frames));

    // Listen for workers to come online
    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online.`);
    });

    // Fork a worker process for each CPU
    for (let i = 0; i < numWorkers; i++){
        cluster.fork();
    }
} else {
    const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

    responder.on('message', (data) => {
        const request = JSON.parse(data);
        console.log(`${process.pid} recieved a request for path: ${request.path}`);

        // Do requested action
        fs.readFile(request.path, (err, content) => {
            console.log(`${process.pid} is sending response!`);
            responder.send(JSON.stringify({
                content: content.toString(),
                timestamp: Date.now(),
                pid: process.pid
            }));
        });
    });
}