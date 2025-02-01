'use strict';

String.prototype.neutralizeXSS = function() {
/**Нейтрализует (экранирует) XSS-угрозы. По крайней мере, должна. Будет пополняться.*/
	return this.replace(/<\//g, '');
};

String.prototype.vTabl =
String.prototype.toTable = function(p1, p2) {
/**"Оборачивает" данную строку в тэг таблицы. Применяется крайне редко и узко.*/
	return (p1 ? p1 : '<br/><br/>') +
		this.vTag('table', p2 ? p2 : 'style="text-align:center;font:inherit;" border=1');
		//.vTag('center');
};

String.prototype.vTag =
String.prototype.toTag = function(p1, p2) {
/**"Оборачивает" данную строку с тэг p1 c параметрами p2. p2 можно опускать.*/
	return '<' + p1 + (' ' + p2).esli(p2) + '>' + this + '</' + p1 + '>';
};

String.prototype.addToGlobal('docsString', 1);
