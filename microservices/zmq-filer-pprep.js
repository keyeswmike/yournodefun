'use strict';
const zmq = require('zeromq');
const cluster = require('cluster');
const os = require('os');

const numWorkers = os.cpus().length;

if (cluster.isMaster) {
    let workerCount = 0;

    const push = zmq.socket('push').bind('ipc://master-push.ipc');
    const pull = zmq.socket('pull').bind('ipc://master-pull.ipc');

    pull.on('message', (data) => {
        const message = JSON.parse(data);

        if (message.type == 'ready') {
            console.log(`Worker ${message.pid} is ready!`);
            workerCount += 1;
        } else if (message.type == 'result') {
            console.log(`Work complete from worker ${message.pid}: ${message.content}`);
            workerCount -= 1;
        }

        if (workerCount == 4) {
            for(let i = 0; i < 30; i++){
                push.send(JSON.stringify({
                    type: 'job',
                    content: [i, 2]
                }));       
            }
        }
    });

    for(let i = 0; i < numWorkers; i++){
        cluster.fork();
    }
} else if (cluster.isWorker) {
    const workerPush = zmq.socket('push').connect('ipc://master-pull.ipc').send(JSON.stringify({
        type: 'ready',
        pid: process.pid
    }));;
    const workerPull = zmq.socket('pull').connect('ipc://master-push.ipc');

    workerPull.on('message', (data) => {
        const message = JSON.parse(data);
        if(message.type == 'job'){
            workerPush.send(JSON.stringify({
                type: 'result',
                content: message.content.reduce((a,b) => a + b, 0),
                pid: process.pid 
            }));
        }
    }); 
}