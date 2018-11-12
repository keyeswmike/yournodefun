'use strict';
const fs = require('fs');

fs.writeFile('target.txt', 'writing new line', (err, data) =>{
    if(err){
        throw err;
    }

    console.log('File saved!');
});