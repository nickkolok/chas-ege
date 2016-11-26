'use strict';
module('Basic Tests');

test('String.prototype.texfrac', function() {
	expect('2'.texfrac(3)).to.be.equal('\\frac{2}{3}');
	expect('2'.texfrac('3')).to.be.equal('\\frac{2}{3}');
	expect('a'.texfrac('b')).to.be.equal('\\frac{a}{b}');
	expect('3'.texfrac('2')).to.be.equal('\\frac{3}{2}');
});
