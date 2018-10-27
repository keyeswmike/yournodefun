'use strict';
const fs = require('fs');
fs.watch('target.txt', () => console.log('File has changed!'));
console.log('Now watching target.txt for changes...');
