'use strict';
const fs = require('fs');
const filename = process.argv[2];

if(!filename){
    // throwing will end the process
    throw Error('You must specifiy a filename in argv[2]')
}
fs.watch(filename, () => {
    console.log(`File ${filename} has been changed!`);
});

console.log(`Now watching ${filename}`);
