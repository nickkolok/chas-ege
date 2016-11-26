'use strict';
module('Basic Tests');

test('String.prototype.parseHumanReadableToJSON', function() {
	expect('Задача: \n\r У Васи было три яблока \n\rОтвет:\n\r3'    .parseHumanReadableToJSON()).to.eql({ 'Задача':'У Васи было три яблока', 'Ответ':'3' });
	expect('Задача: \n\r У Васи было \nтри яблока \n\rОтвет:\n\r3'  .parseHumanReadableToJSON()).to.eql({ 'Задача':'У Васи было три яблока', 'Ответ':'3' });
	expect('Задача: \n\r У Васи было\r \nтри яблока \n\rОтвет:\n\r3'.parseHumanReadableToJSON()).to.eql({ 'Задача':'У Васи было три яблока', 'Ответ':'3' });
});
