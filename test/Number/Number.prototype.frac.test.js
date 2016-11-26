'use strict';
module('Basic Tests');

test('Number.prototype.frac', function() {
	expect(2 .frac(1)).to.be.equal('2');
	expect(1 .frac(1)).to.be.equal('1');
});
