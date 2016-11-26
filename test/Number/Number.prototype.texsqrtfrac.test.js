'use strict';
module('Basic Tests');

test('Number.prototype.texsqrtfrac', function() {
	expect((16 * 15).texsqrtfrac(64)).to.be.equal('\\frac{\\sqrt{15}}{2}');
	expect((60).texsqrtfrac(8)).to.be.equal('\\frac{\\sqrt{30}}{2}');
	expect((0).texsqrtfrac(8)).to.be.equal('0');
});
