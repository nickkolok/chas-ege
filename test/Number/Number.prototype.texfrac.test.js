'use strict';
module('Basic Tests');

test('Number.prototype.texfrac', function() {
	expect(1 .texfrac(1)).to.be.equal('1');
	expect((-1) .texfrac(1)).to.be.equal('-1');
	expect((-1) .texfrac(-1)).to.be.equal('1');
	expect(1 .texfrac(-1)).to.be.equal('-1');
	expect((2).texfrac(-3)).to.be.equal('-\\frac{2}{3}');
	expect((2).texfrac(3)).to.be.equal('\\frac{2}{3}');
	expect((-2).texfrac(-3)).to.be.equal('\\frac{2}{3}');
	expect((-2).texfrac(3)).to.be.equal('-\\frac{2}{3}');
	expect((2).texfrac(4)).to.be.equal('\\frac{1}{2}');
	expect((-2).texfrac(4)).to.be.equal('-\\frac{1}{2}');
	expect((2).texfrac(-4)).to.be.equal('-\\frac{1}{2}');
	expect((-2).texfrac(-4)).to.be.equal('\\frac{1}{2}');
	expect((2).texfrac(4, 'x')).to.be.equal('\\frac{x}{2}');
	expect((1).texfrac(1, 'x')).to.be.equal('x');
	expect((-2).texfrac(4, 'x')).to.be.equal('-\\frac{x}{2}');
	expect((2).texfrac(-4, '\\sin x')).to.be.equal('-\\frac{\\sin x}{2}');
	expect((-2).texfrac(-4, 'xy')).to.be.equal('\\frac{xy}{2}');
	expect((-3).texfrac(4, 'x')).to.be.equal('-\\frac{3x}{4}');
	expect((-2).texfrac('4', 'x')).to.be.equal('-\\frac{2x}{4}');
	expect((2).texfrac('4', 'x')).to.be.equal('\\frac{2x}{4}');
});
