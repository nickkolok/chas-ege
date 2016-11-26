'use strict';
module('Basic Tests');

test('Object.clone', function() {
	var oldObject = { a:1, b:{ c:2, d:3, e:[4, 5] } };
	var newObject = oldObject.clone();
	oldObject.a = 6;
	oldObject.b.c = 7;
	oldObject.b.e[0] = 8;

	expect(newObject.a).to.be.equal(1);
	expect(newObject.b.c).to.eql(2);
	expect(newObject.b.e[0]).to.eql(4);
});
