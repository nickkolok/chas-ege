var fs = require('fs');
var expect = require('expect.js');
var chaslib  = require('../lib/load-chas-lib.js').libList;
var vm = require('vm');
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}

/* На всякий пожарный - ещё один вариан отсюда:
 * https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files
var fs = require("fs");

function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}

include('somefile_with_some_declarations.js');

*/


for(var i=0; i<chaslib.length; i++){
	try{
		include(chaslib[i]);
	}catch(e){
		console.log(e);
	}
}


expect([0,1]).to.contain(sl1());

expect(9 .koren()).to.be('3');
expect(9 .koren(true)).to.be('3');
expect(9 .koren(false)).to.be('3');
expect(8 .koren(true)).to.be('2\\sqrt{2}');
expect(8 .koren(false)).to.be('\\sqrt{8}');
expect(8 .koren()).to.be('\\sqrt{8}');
expect((-1) .koren()).to.be('\\sqrt{-1}');
expect(0 .koren()).to.be('0');
expect((-8) .koren()).to.be('\\sqrt{-8}');
expect((-8) .koren(1)).to.be('2\\sqrt{-2}');
expect((-9) .koren(1)).to.be('3\\sqrt{-1}');

expect(2 .frac(1)).to.be('2');
expect(1 .frac(1)).to.be('1');

expect(1 .texfrac(1)).to.be('1');
expect((-1) .texfrac(1)).to.be('-1');
expect((-1) .texfrac(-1)).to.be('1');
expect(1 .texfrac(-1)).to.be('-1');
expect((2).texfrac(-3)).to.be('-\\frac{2}{3}');
expect((2).texfrac(3)).to.be('\\frac{2}{3}');
expect((-2).texfrac(-3)).to.be('\\frac{2}{3}');
expect((-2).texfrac(3)).to.be('-\\frac{2}{3}');
expect((2).texfrac(4)).to.be('\\frac{1}{2}');
expect((-2).texfrac(4)).to.be('-\\frac{1}{2}');
expect((2).texfrac(-4)).to.be('-\\frac{1}{2}');
expect((-2).texfrac(-4)).to.be('\\frac{1}{2}');
expect((2).texfrac(4,'x')).to.be('\\frac{x}{2}');
expect((1).texfrac(1,'x')).to.be('x');
expect((-2).texfrac(4,'x')).to.be('-\\frac{x}{2}');
expect((2).texfrac(-4,'\\sin x')).to.be('-\\frac{\\sin x}{2}');
expect((-2).texfrac(-4,'xy')).to.be('\\frac{xy}{2}');
expect((-3).texfrac(4,'x')).to.be('-\\frac{3x}{4}');
expect((-2).texfrac('4','x')).to.be('-\\frac{2x}{4}');
expect((2).texfrac('4','x')).to.be('\\frac{2x}{4}');

expect((2).texfracpi(4)).to.be('\\frac{\\pi}{2}');

expect('12'.isNumeric()).to.be(true);
expect('1.2'.isNumeric()).to.be(true);
expect('1,2'.isNumeric()).to.be(true);
expect('1'.isNumeric()).to.be(true);
expect(''.isNumeric()).to.be(false);
expect('-12'.isNumeric()).to.be(true);
expect('-1'.isNumeric()).to.be(true);
expect('-'.isNumeric()).to.be(false);
expect('asd'.isNumeric()).to.be(false);
expect('2a3'.isNumeric()).to.be(false);
expect('2-3'.isNumeric()).to.be(false);
expect('-2.'.isNumeric()).to.be(false);
expect('2-'.isNumeric()).to.be(false);
expect('.2.'.isNumeric()).to.be(false);

expect('.2.'.isCyrillicWord()).to.be(false);
expect('ёлки-палки'.isCyrillicWord()).to.be(true);
expect('Ёлки-палки'.isCyrillicWord()).to.be(true);
expect('ёлки- палки'.isCyrillicWord()).to.be(false);
expect('ёлкипалки'.isCyrillicWord()).to.be(true);
expect('ёлки/палки'.isCyrillicWord()).to.be(false);

expect(' '.isSpace()).to.be(true);
expect('ёлки/палки'.isSpace()).to.be(false);
expect(' \t\r\n'.isSpace()).to.be(true);

expect('Настя'.transliterate()).to.be('Nastya');
expect('Nastya'.transliterate(true)).to.be('Настя');
expect('НастяMurr7'.transliterate()).to.be('NastyaMurr7');
expect('НастяMurr7'.transliterate(true)).to.be('НастяМурр7');




console.log('А в остальном, прекрасная маркиза, всё хорошо, всё хорошо!');
