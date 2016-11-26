'use strict';
module('Basic Tests');

test('String.prototype.isNumeric', function() {
	expect('12'.isNumeric()).to.be.equal(true);
	expect('1.2'.isNumeric()).to.be.equal(true);
	expect('1,2'.isNumeric()).to.be.equal(true);
	expect('1'.isNumeric()).to.be.equal(true);
	expect(''.isNumeric()).to.be.equal(false);
	expect('-12'.isNumeric()).to.be.equal(true);
	expect('-1'.isNumeric()).to.be.equal(true);
	expect('-'.isNumeric()).to.be.equal(false);
	expect('asd'.isNumeric()).to.be.equal(false);
	expect('2a3'.isNumeric()).to.be.equal(false);
	expect('2-3'.isNumeric()).to.be.equal(false);
	expect('-2.'.isNumeric()).to.be.equal(false);
	expect('2-'.isNumeric()).to.be.equal(false);
	expect('.2.'.isNumeric()).to.be.equal(false);
});
