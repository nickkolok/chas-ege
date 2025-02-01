'use strict';

String.prototype.udalPerv =
String.prototype.deleteFirst = function(n) {
/**Удаляет n первых символов строки. При вызове без параметров удаляет 1 символ.*/
	if (n == undefined) {
		n = 1;
	}
	return this.substr(n, this.length - n);
};

String.prototype.udalPosl =
String.prototype.deleteLast = function(n) {
/**Удаляет n последних символов строки. При вызове без параметров удаляет 1 символ.*/
	if (n == undefined) {
		n = 1;
	}
	return this.substr(0, this.length - n);
};

String.prototype.insert = function(i, str) {
// TODO: переписать через printIf
//вставляет в строку после i-го символа
	var ss = '';
	if (i > 0) {
		ss = this.substring(0, i);
	}
	var sss = '';
	if (i < this.length - 1) {
		sss = this.substring(i);
	}
	return ss + str + sss;
};

String.prototype.isSpace = function() {
/**Состоит ли строка только из пробельных символов?*/
	return (/^\s+$/).test(this);
};

String.prototype.posl = // Deprecated
String.prototype.getLast = // Исключительно для того, чтобы было отглагольное название
String.prototype.last = function() {
/**Возвращает последний символ строки*/
	return this[this.length - 1];
};

String.prototype.multiply = function(n) {
/**Возвращает строку, записанную n раз подряд*/
	var rez = this;
	for (var i = 1; i < n; i++) {
		rez += this;
	}
	return rez;
};

String.prototype.dopdo = // Deprecated
String.prototype.padTo = function(padWith, targetLength) {
/**Дополняет строку подстроками спереди, пока длина строки не станет не менее n.*/
	var str = this;
	while (str.length < targetLength) {
		str = padWith + str;
	}
	return str;
};

String.prototype.esli = // Deprecated
String.prototype.printIf = function(p1) {
/**Возвращает данную строку, если p1, и пустую в противном случае.*/
	return p1 ? this : '';
};

String.prototype.reverse = function() {
/**Переворачивает строку*/
	return this.split('').reverse().soed();
};//http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript //Товарищ очень сильно выручил

String.prototype.mesh =
String.prototype.shuffle = function() {
/**Перемешивает строку посимвольно в случайном порядке*/
	return this.split('').shuffle().soed();
};


String.prototype.addToGlobal('docsString', 1);
