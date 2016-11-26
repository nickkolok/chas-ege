'use strict';
module('Basic Tests');

test('Number.prototype.texfracpi', function() {
	expect((2).texfracpi(4)).to.be.equal('\\frac{\\pi}{2}');
});
