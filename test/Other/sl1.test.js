'use strict';
module('Basic Tests');

test('sl1', function(assert) {
	expect([0, 1]).to.contain(sl1());
});
