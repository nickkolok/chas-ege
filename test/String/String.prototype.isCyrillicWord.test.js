'use strict';
module('Basic Tests');

test('String.prototype.isCyrillicWord', function() {
	expect('.2.'.isCyrillicWord()).to.be.equal(false);
	expect('ёлки-палки'.isCyrillicWord()).to.be.equal(true);
	expect('Ёлки-палки'.isCyrillicWord()).to.be.equal(true);
	expect('ёлки- палки'.isCyrillicWord()).to.be.equal(false);
	expect('ёлкипалки'.isCyrillicWord()).to.be.equal(true);
	expect('ёлки/палки'.isCyrillicWord()).to.be.equal(false);
});
