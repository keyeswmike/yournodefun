'use scrict';

const fs = require('fs');
const expect = require('chai').expect;
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);
const parseRDF = require('../lib/parse-rdf.js');

describe('parseRDF', () => {
    it('should be a function', () => {
        expect(parseRDF).to.be.a('function');
    });

    it('should parse RDF content', () => {
        const book = parseRDF(rdf);
        expect(book).to.be.an('object');
        expect(book).to.have.a.property('id', 132);
        expect(book).to.have.a.property('title', 'The Art of War');
        expect(book).to.have.a.property('authors')
        .that.is.an('array').with.lengthOf(2)
        .and.contains('Sunzi, active 6th century B.C.')
        .and.contains('Giles, Lionel');
        expect(book).to.have.a.property('subjects')
        .that.is.an('array').with.lengthOf(2)
        .and.contains('Military art and science -- Early works to 1800')
        .and.contains('War -- Early works to 1800');
        expect(book).to.have.a.property('lcc')
        .that.is.an('array').with.lengthOf(1)
        .and.contains('U')
        .and.to.not.have.members(['I', 'O', 'W', 'X', 'Y']);
        expect(book).to.have.a.property('sources')
        .that.is.an('array').with.lengthOf(10)
        .and.contains('http://www.gutenberg.org/ebooks/132.kindle.noimages');
    });

});