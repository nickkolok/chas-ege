'use strict';

String.prototype.plusminus = // Deprecated
String.prototype.beautifyAlgebraicNotation = function() {
/**Примитивное упрощение математических выражений. Меняет "++" на "+", например.*/
	var a = this;
	for (;a.match(/[+-][+-]/);) {
		a = a.replace(/[+][+]/g, '+');
		a = a.replace(/--/g, '+');
		a = a.replace(/[+]-/g, '-');
		a = a.replace(/-[+]/g, '-');
		a = a.replace(/[+]$/g, '');
		a = a.replace(/[{][+]/g, '{');
		a = a.replace(/[+][}]/g, '}');
		a = a.replace(/\(\+/g, '(');
		a = a.replace(/\+\)/g, ')');
	}
	a = a.replace(/[=]\s*[-]\s*0\$/g, '=0$');
	a = a.replace(/[(]\s*0\s*[+]/g, '(');
	a = a.replace(/[(]\s*0\s*[-]/g, '(-');
	a = a.replace(/[=]\s*[+]/g, '=');
	a = a.replace(/[+]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '+');
	a = a.replace(/[-]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '-');
	a = a.replace(/[{]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '{');
	a = a.replace(/[}]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '}');
	a = a.replace(/[ ]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, ' ');
	a = a.replace(/[~]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '~');
	a = a.replace(/[(]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '(');
	a = a.replace(/[)]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, ')');
	a = a.replace(/[=]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '=');
	a = a.replace(/[;]1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, ';');
	a = a.replace(/\^1(?=[A-Za-zА-Яа-яЁё\\(])/g, '^'); //TODO: really???
	a = a.replace(/\$1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '$');
	a = a.replace(/^1(?=[A-Za-zА-Яа-яЁё\\(]|\\vec)/g, '');
	a = a.replace(/^[+]/g, '');
	a = a.replace(/[;][-]0/g, ';0');
	a = a.reverse();
	a = a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g, '.');
	a = a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё\\])/g, '$.');
	a = a.reverse();
	return a;
};

String.prototype.negativeBracketsTeX = function() {
/**Отрицательное число (начинающееся с символа "-") берётся в скобки*/
	return this[0] ==  '-' ? '\\left(' + this + '\\right)' : '' + this;
};

String.prototype.ob$ = function() {
/**Оборачивает строку в символы начала/конца формулы TeX - $*/
	return '$' + this + '$';
};

String.prototype.frac = //Deprecated
String.prototype.texfrac = function(denominator) {
/**Возвращает TeX-запись дроби, в которой числитель - данная строка, знаменатель denominator.*/
	return '\\frac{' + this + '}{' + denominator + '}';
};

String.prototype.ts =
String.prototype.toStandart = function(wrapComma) {
/**Приводит строку к записи "по стандарту": заменяет точку на запятую.
Если wrapComma, то берёт запятую в фигурные скобки, чтобы убрать отступы в TeX.
Предназначена для строк, содержащих представление числа.*/
	var a = this.replace(/[.]/g, ',');
	if (wrapComma) {
		a = ' '+a.replace(/[,]/, '{,}')+' ';
	}
	return a;
};

String.prototype.addToGlobal('docsString', 1);
