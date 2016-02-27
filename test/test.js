'use strict';
module("Basic Tests");

test('sl1', function(assert) {
	expect([0, 1]).to.contain(sl1());
});

test('Number.prototype.koren', function() {
	expect(9 .koren()).to.be.equal('4');//Специально
	expect(9 .koren(true)).to.be.equal('3');
	expect(9 .koren(false)).to.be.equal('3');
	expect(8 .koren(true)).to.be.equal('2\\sqrt{2}');
	expect(8 .koren(false)).to.be.equal('\\sqrt{8}');
	expect(8 .koren()).to.be.equal('\\sqrt{8}');
	expect((-1) .koren()).to.be.equal('\\sqrt{-1}');
	expect(0 .koren()).to.be.equal('0');
	expect((-8) .koren()).to.be.equal('\\sqrt{-8}');
	expect((-8) .koren(1)).to.be.equal('2\\sqrt{-2}');
	expect((-9) .koren(1)).to.be.equal('3\\sqrt{-1}');
});

test('Number.prototype.frac', function() {
	expect(2 .frac(1)).to.be.equal('2');
	expect(1 .frac(1)).to.be.equal('1');
});

test('Number.prototype.texfrac', function() {
	expect(1 .texfrac(1)).to.be.equal('1');
	expect((-1) .texfrac(1)).to.be.equal('-1');
	expect((-1) .texfrac(-1)).to.be.equal('1');
	expect(1 .texfrac(-1)).to.be.equal('-1');
	expect((2).texfrac(-3)).to.be.equal('-\\frac{2}{3}');
	expect((2).texfrac(3)).to.be.equal('\\frac{2}{3}');
	expect((-2).texfrac(-3)).to.be.equal('\\frac{2}{3}');
	expect((-2).texfrac(3)).to.be.equal('-\\frac{2}{3}');
	expect((2).texfrac(4)).to.be.equal('\\frac{1}{2}');
	expect((-2).texfrac(4)).to.be.equal('-\\frac{1}{2}');
	expect((2).texfrac(-4)).to.be.equal('-\\frac{1}{2}');
	expect((-2).texfrac(-4)).to.be.equal('\\frac{1}{2}');
	expect((2).texfrac(4, 'x')).to.be.equal('\\frac{x}{2}');
	expect((1).texfrac(1, 'x')).to.be.equal('x');
	expect((-2).texfrac(4, 'x')).to.be.equal('-\\frac{x}{2}');
	expect((2).texfrac(-4, '\\sin x')).to.be.equal('-\\frac{\\sin x}{2}');
	expect((-2).texfrac(-4, 'xy')).to.be.equal('\\frac{xy}{2}');
	expect((-3).texfrac(4, 'x')).to.be.equal('-\\frac{3x}{4}');
	expect((-2).texfrac('4', 'x')).to.be.equal('-\\frac{2x}{4}');
	expect((2).texfrac('4', 'x')).to.be.equal('\\frac{2x}{4}');
});

test('String.prototype.texfrac', function() {
	expect('2'.texfrac(3)).to.be.equal('\\frac{2}{3}');
	expect('2'.texfrac('3')).to.be.equal('\\frac{2}{3}');
	expect('a'.texfrac('b')).to.be.equal('\\frac{a}{b}');
	expect('3'.texfrac('2')).to.be.equal('\\frac{3}{2}');
});

test('Number.prototype.texfracpi', function() {
	expect((2).texfracpi(4)).to.be.equal('\\frac{\\pi}{2}');
});

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

test('String.prototype.isCyrillicWord', function() {
	expect('.2.'.isCyrillicWord()).to.be.equal(false);
	expect('ёлки-палки'.isCyrillicWord()).to.be.equal(true);
	expect('Ёлки-палки'.isCyrillicWord()).to.be.equal(true);
	expect('ёлки- палки'.isCyrillicWord()).to.be.equal(false);
	expect('ёлкипалки'.isCyrillicWord()).to.be.equal(true);
	expect('ёлки/палки'.isCyrillicWord()).to.be.equal(false);
});

test('String.prototype.isSpace', function() {
	expect(' '.isSpace()).to.be.equal(true);
	expect('ёлки/палки'.isSpace()).to.be.equal(false);
	expect(' \t\r\n'.isSpace()).to.be.equal(true);
});

test('String.prototype.transliterate', function() {
	expect('Настя'.transliterate()).to.be.equal('Nastya');
	expect('Nastya'.transliterate(true)).to.be.equal('Настя');
	expect('НастяMurr7'.transliterate()).to.be.equal('NastyaMurr7');
	expect('НастяMurr7'.transliterate(true)).to.be.equal('НастяМурр7');
});

test('chaslib.toArray', function() {
	expect(chaslib.toArray([], 3)).to.eql([]);
	expect(chaslib.toArray(1, 3)).to.eql([1, 1, 1]);
	expect(chaslib.toArray(undefined, 1)).to.eql([undefined]);
});

test('String.prototype.parseHumanReadableToJSON', function() {
	expect('Задача: \n\r У Васи было три яблока \n\rОтвет:\n\r3'    .parseHumanReadableToJSON()).to.eql({ 'Задача':'У Васи было три яблока', 'Ответ':'3' });
	expect('Задача: \n\r У Васи было \nтри яблока \n\rОтвет:\n\r3'  .parseHumanReadableToJSON()).to.eql({ 'Задача':'У Васи было три яблока', 'Ответ':'3' });
	expect('Задача: \n\r У Васи было\r \nтри яблока \n\rОтвет:\n\r3'.parseHumanReadableToJSON()).to.eql({ 'Задача':'У Васи было три яблока', 'Ответ':'3' });
});

test('isCppCode', function() {
	expect(isCppCode('#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main()\n{\nsrand(time(0));\nunsigned int grad = rand()% 179 +1;\ncout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " << \ngrad << "°. Найдите угол "<< endl\n<< "C этого четырехугольника. Ответ дайте в градусах."<<endl;\nint answer = 180 - grad;\ncout <<"Ответ: " << endl << answer << endl;\n\nreturn 0;\n}')).to.eql(true);
	expect(isCppCode('#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main ()\n{\nsrand(time(0));\nunsigned int grad = rand()% 179 +1;\ncout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " << \ngrad << "°. Найдите угол "<< endl\n<< "C этого четырехугольника. Ответ дайте в градусах."<<endl;\nint answer = 180 - grad;\ncout <<"Ответ: " << endl << answer << endl;\n\nreturn 0;\n}')).to.eql(true);
	expect(isCppCode('#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\n{\nsrand(time(0));\nunsigned int grad = rand()% 179 +1;\ncout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " << \ngrad << "°. Найдите угол "<< endl\n<< "C этого четырехугольника. Ответ дайте в градусах."<<endl;\nint answer = 180 - grad;\ncout <<"Ответ: " << endl << answer << endl;\n\nreturn 0;\n}')).to.eql(false);
});
