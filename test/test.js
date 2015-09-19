"use strict";


test("sl1", function(assert) {
	expect([0, 1]).to.contain(sl1());
});

test("Number.prototype.koren", function() {
	expect(9 .koren()).to.be.equal("3");
	expect(9 .koren(true)).to.be.equal("3");
	expect(9 .koren(false)).to.be.equal("3");
	expect(8 .koren(true)).to.be.equal("2\\sqrt{2}");
	expect(8 .koren(false)).to.be.equal("\\sqrt{8}");
	expect(8 .koren()).to.be.equal("\\sqrt{8}");
	expect((-1) .koren()).to.be.equal("\\sqrt{-1}");
	expect(0 .koren()).to.be.equal("0");
	expect((-8) .koren()).to.be.equal("\\sqrt{-8}");
	expect((-8) .koren(1)).to.be.equal("2\\sqrt{-2}");
	expect((-9) .koren(1)).to.be.equal("3\\sqrt{-1}");
});

test("Number.prototype.frac", function() {
	expect(2 .frac(1)).to.be.equal("2");
	expect(1 .frac(1)).to.be.equal("1");
});

test("Number.prototype.texfrac", function() {
	expect(1 .texfrac(1)).to.be.equal("1");
	expect((-1) .texfrac(1)).to.be.equal("-1");
	expect((-1) .texfrac(-1)).to.be.equal("1");
	expect(1 .texfrac(-1)).to.be.equal("-1");
	expect((2).texfrac(-3)).to.be.equal("-\\frac{2}{3}");
	expect((2).texfrac(3)).to.be.equal("\\frac{2}{3}");
	expect((-2).texfrac(-3)).to.be.equal("\\frac{2}{3}");
	expect((-2).texfrac(3)).to.be.equal("-\\frac{2}{3}");
	expect((2).texfrac(4)).to.be.equal("\\frac{1}{2}");
	expect((-2).texfrac(4)).to.be.equal("-\\frac{1}{2}");
	expect((2).texfrac(-4)).to.be.equal("-\\frac{1}{2}");
	expect((-2).texfrac(-4)).to.be.equal("\\frac{1}{2}");
	expect((2).texfrac(4, "x")).to.be.equal("\\frac{x}{2}");
	expect((1).texfrac(1, "x")).to.be.equal("x");
	expect((-2).texfrac(4, "x")).to.be.equal("-\\frac{x}{2}");
	expect((2).texfrac(-4, "\\sin x")).to.be.equal("-\\frac{\\sin x}{2}");
	expect((-2).texfrac(-4, "xy")).to.be.equal("\\frac{xy}{2}");
	expect((-3).texfrac(4, "x")).to.be.equal("-\\frac{3x}{4}");
	expect((-2).texfrac("4", "x")).to.be.equal("-\\frac{2x}{4}");
	expect((2).texfrac("4", "x")).to.be.equal("\\frac{2x}{4}");
});

test("Number.prototype.texfracpi", function() {
	expect((2).texfracpi(4)).to.be.equal("\\frac{\\pi}{2}");
});

test("String.prototype.isNumeric", function() {
	expect("12".isNumeric()).to.be.equal(true);
	expect("1.2".isNumeric()).to.be.equal(true);
	expect("1,2".isNumeric()).to.be.equal(true);
	expect("1".isNumeric()).to.be.equal(true);
	expect("".isNumeric()).to.be.equal(false);
	expect("-12".isNumeric()).to.be.equal(true);
	expect("-1".isNumeric()).to.be.equal(true);
	expect("-".isNumeric()).to.be.equal(false);
	expect("asd".isNumeric()).to.be.equal(false);
	expect("2a3".isNumeric()).to.be.equal(false);
	expect("2-3".isNumeric()).to.be.equal(false);
	expect("-2.".isNumeric()).to.be.equal(false);
	expect("2-".isNumeric()).to.be.equal(false);
	expect(".2.".isNumeric()).to.be.equal(false);
});

test("String.prototype.isCyrillicWord", function() {
	expect(".2.".isCyrillicWord()).to.be.equal(false);
	expect("ёлки-палки".isCyrillicWord()).to.be.equal(true);
	expect("Ёлки-палки".isCyrillicWord()).to.be.equal(true);
	expect("ёлки- палки".isCyrillicWord()).to.be.equal(false);
	expect("ёлкипалки".isCyrillicWord()).to.be.equal(true);
	expect("ёлки/палки".isCyrillicWord()).to.be.equal(false);
});

test("String.prototype.isSpace", function() {
	expect(" ".isSpace()).to.be.equal(true);
	expect("ёлки/палки".isSpace()).to.be.equal(false);
	expect(" \t\r\n".isSpace()).to.be.equal(true);
});

test("String.prototype.transliterate", function() {
	expect("Настя".transliterate()).to.be.equal("Nastya");
	expect("Nastya".transliterate(true)).to.be.equal("Настя");
	expect("НастяMurr7".transliterate()).to.be.equal("NastyaMurr7");
	expect("НастяMurr7".transliterate(true)).to.be.equal("НастяМурр7");
});

test("chaslib.toArray", function() {
	expect(chaslib.toArray([], 3)).to.eql([]);
	expect(chaslib.toArray(1, 3)).to.eql([1, 1, 1]);
	expect(chaslib.toArray(undefined, 1)).to.eql([undefined]);
});
