'use strict';
module('Basic Tests');

test('Number.prototype.koren', function() {
	expect(9 .koren()).to.be.equal('3');
	expect(9 .koren(true)).to.be.equal('3');
	expect(9 .koren(false)).to.be.equal('3');
	expect(8 .koren(true)).to.be.equal('2\\sqrt{2}');
	expect(8 .koren(false)).to.be.equal('\\sqrt{8}');
	expect(8 .koren()).to.be.equal('\\sqrt{8}');
	expect((-1) .koren()).to.be.equal('\\sqrt{-1}');
	expect(0 .koren()).to.be.equal('0');
	expect((-8) .koren()).to.be.equal('\\sqrt{-8}');
	expect((-8) .koren(1)).to.be.equal('2\\sqrt{-2}');
	expect((-9) .koren(1)).to.be.equal('3\\sqrt{-1}');
});
