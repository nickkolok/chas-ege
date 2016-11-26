'use strict';
module('Basic Tests');

test('chaslib.toArray', function() {
	expect(chaslib.toArray([], 3)).to.eql([]);
	expect(chaslib.toArray(1, 3)).to.eql([1, 1, 1]);
	expect(chaslib.toArray(undefined, 1)).to.eql([undefined]);
});
