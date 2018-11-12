'use strict';
const fs = require('fs');

// call readFile from fs module and output the data or err
fs.readFile('target.txt', (err, data) => {
    if(err){
        throw err;
    }

    console.log(data.toString());
});

fs.readFile('target.txt', )