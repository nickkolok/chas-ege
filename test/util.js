"use strict";

expect.configure({
	// expect(obj).to.contain(m);
	// Содержит ли obj элемент m
	//
	// Примеры:
	// expect([0, 1]).to.contain(1);
	// expect("foobarbaz").to.contain("a");
	contain: function(m) {
		QUnit.ok(this._actual.indexOf(m) >= 0, "expected " + this._actual + " to contain " + m);
	}
});
