'use scrict';
const cheerio = require('cheerio');

module.exports = (rdf) => {
    const $ = cheerio.load(rdf);

    const book = {};
    book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
    book.title = $('dcterms\\:title').text();
    book.authors = $('pgterms\\:agent pgterms\\:name').toArray().map(elem => $(elem).text());
    return book;
};