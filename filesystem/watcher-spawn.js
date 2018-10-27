'use strict';
const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if(!filename){
    throw Error('You must specifiy a filename!');
}

// Put watch on filename, on event, spawn child process for 'ls' command
// file that was changed and output to stdout
fs.watch(filename, () => {
    const lsChild = spawn('ls', ['-l', 'a', filename]);
    lsChild.stdout.pipe(process.stdout);
});

console.log(`Now watching for ${filename} changes!`);