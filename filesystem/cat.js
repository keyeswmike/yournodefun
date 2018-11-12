#!/usr/bin/env node
'use strict';
// create read stream
require('fs').createReadStream(process.argv[2]).pipe(process.stdout);