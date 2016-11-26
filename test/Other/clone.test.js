'use strict';
module('Basic Tests');

test('clone', function() {
	var oldObject = { a:1, b:{ c:2, d:3, e:[4, 5] } };
	var newObject = clone(oldObject);
	oldObject.a = 6;
	oldObject.b.c = 7;
	oldObject.b.e[0] = 8;

	expect(newObject.a).to.eql(1);
	expect(newObject.b.c).to.eql(2);
	expect(newObject.b.e[0]).to.eql(4);
	expect(clone(1)).to.eql(1);
	expect(clone('2')).to.eql('2');
	expect(clone([1])).to.eql([1]);

	var oldArray = [1, 2];
	var newArray = clone(oldArray);
	oldArray[0] = 3;
	expect(newArray[0]).to.eql(1);
});
