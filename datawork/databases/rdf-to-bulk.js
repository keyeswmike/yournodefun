'use scrict';
const dir = require('node-dir');
const parseRDF = require('./lib/parse-rdf.js');
const dirname = process.argv[2];
const options = {
    match: /.rdf$/,
    exclude: ['pg2.rdf']
};

dir.readFiles(dirname, options, (err, content, next) => {
    if (err) throw err;
    const book = parseRDF(content);
    console.log(JSON.stringify({index: { _id: `pg${book.id}`} }));
    console.log(JSON.stringify(book));
    next();
});

process.stdout.on('error', (err) => {
    if(err.code === 'EPIPE') {
        process.exit();
    }
    throw err;
});