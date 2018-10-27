'use strict';
const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if(!filename){
    throw Error('You must specify a filename!');
}

fs.watch(filename, () => {
    const lsChild = spawn('ls', ['-l', '-h', filename]);
    let output = ''; // string for buffer

    // event on childs stdout collect that data from buffer to output
    lsChild.stdout.on('data', chunk => output += chunk);

    // once buffer stream has been flushed. the close event is called
    lsChild.on('close', () => {
        const parts = output.split(/\s+/);
        console.log([parts[0], parts[2], parts[8]]);
        // console.log(output);
    });
});

console.log(`Watching for changes to ${filename}`);