'use strict';
module('Basic Tests');

test('String.prototype.isSpace', function() {
	expect(' '.isSpace()).to.be.equal(true);
	expect('ёлки/палки'.isSpace()).to.be.equal(false);
	expect(' \t\r\n'.isSpace()).to.be.equal(true);
});
