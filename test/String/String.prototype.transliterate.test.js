'use strict';
module('Basic Tests');

test('String.prototype.transliterate', function() {
	expect('Настя'.transliterate()).to.be.equal('Nastya');
	expect('Nastya'.transliterate(true)).to.be.equal('Настя');
	expect('НастяMurr7'.transliterate()).to.be.equal('NastyaMurr7');
	expect('НастяMurr7'.transliterate(true)).to.be.equal('НастяМурр7');
});
