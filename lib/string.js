'use strict';

String.prototype.mesh=function(){
/**Перемешивает строку посимвольно в случайном порядке*/
	return this.split('').shuffle().soed();	
};

String.prototype.dopdo=function(c,n){
/**Дополняет строку подстроками c спереди, пока длина строки не станет не менее n.*/
	var str=this;
	for(;str.length<n;str=c+str){};
	return str;
};

String.prototype.toZagl=function(){
/**Делает первую букву строки заглавной*/
	if(this=='')
		return '';
	return this[0].toUpperCase()+this.substr(1);//.toLowerCase();
};

String.prototype.frac=function(p1){
/**Возвращает TeX-запись дроби, в которой числитель - данная строка, знаменатель p1.*/
	return '\\frac{'+this+'}{'+p1+'}';
}

String.prototype.posl=function(){
/**Возвращает последний символ строки*/
	return this[this.length-1];
};

String.prototype.udalPosl=function(n){
/**Удаляет n последних символов строки. При вызове без параметров удаляет 1 символ.*/
	if(n==undefined)
		n=1;
	return this.substr(0,this.length-n);
};

String.prototype.udalPerv=function(n){
/**Удаляет n первых символов строки. При вызове без параметров удаляет 1 символ.*/
	if(n==undefined)
		n=1;
	return this.substr(n,this.length-n);
};

String.prototype.toStandart=function(p1){
/**Приводит строку к записи "по стандарту": заменяет точку на запятую. 
Если p1, то берёт запятую в фигурные скобки, чтобы убрать отступы в TeX.
Предназначена для строк, содержащих представление числа.*/
	var a=this.replace(/[.]/g,',');
	if(p1)
		a=a.replace(/[,]/,'{,}');
	return a;
};

String.prototype.esli=function(p1){
/**Возвращает данную строку, если p1, и пустую в противном случае.*/
	return p1?this:'';
}

String.prototype.vTag=function(p1,p2){
/**"Оборачивает" данную строку с тэг p1 c параметрами p2. p2 можно опускать.*/
	return '<'+p1+(' '+p2).esli(p2)+'>'+this+'</'+p1+'>';
}

String.prototype.vTabl=function(p1,p2){
/**"Оборачивает" данную строку в тэг таблицы. Применяется крайне редко и узко.*/
	return (p1?p1:'<br/><br/>')+
		this.vTag('table',p2?p2:'style="text-align:center;font:inherit;" border=1');
		//.vTag('center');
}

String.prototype.ts=String.prototype.toStandart;

String.prototype.reverse=function (){
/**Переворачивает строку*/
	return this.split('').reverse().soed();
};//http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript //Товарищ очень сильно выручил

String.prototype.tn=function(){
/**Возвращает число, если данная строка - запись числа с десятичной точкой или запятой.*/
	return 1*this.replace(',','.');
};

String.prototype.ob$=function(){
/**Оборачивает строку в символы начала/конца формулы TeX - $*/
	return '$'+this+'$';
};

String.prototype.istDataToStd=function(){
/**Приводит дату, записанную в одной из общепринятых форм, к записи "по стандарту". Применяется только в комплексе заданий по истории.*/
	var a=this;
	a=a.replace(/\s/g,'.');
	a=a.replace(/\//g,'.');
	a=a.replace(/[-]/g,'.');
	a=a.replace(/[,]/g,'.');
	a=a.replace(/ю/g,'.');
	a=a.replace(/[.]+/g,'.');
	a=a.replace(/[.]0/g,'.');
	a=a.replace(/^0/g,'');
	a=a.replace(/^[.]/g,'');
	//Убираем г. в конце, если есть
	a=a.replace(/[.]$/g,'');
	a=a.replace(/г$/g,'');
	a=a.replace(/[.]$/g,'');
	//Теперь меняем номер месяца на месяц
	a=a.replace(/[.]1[.]/g, ' января '	);
	a=a.replace(/[.]2[.]/g, ' февраля '	);
	a=a.replace(/[.]3[.]/g, ' марта '	);
	a=a.replace(/[.]4[.]/g, ' апреля '	);
	a=a.replace(/[.]5[.]/g, ' мая '		);
	a=a.replace(/[.]6[.]/g, ' июня '	);
	a=a.replace(/[.]7[.]/g, ' июля '	);
	a=a.replace(/[.]8[.]/g, ' августа '	);
	a=a.replace(/[.]9[.]/g, ' сентября ');
	a=a.replace(/[.]10[.]/g,' октября '	);
	a=a.replace(/[.]11[.]/g,' ноября '	);
	a=a.replace(/[.]12[.]/g,' декабря '	);
	//И наконец, если исправление буквы "ю" на точку привело к повреждению названия месяца:
	a=a.replace(/и[.]ня/g, 'июня'	);
	a=a.replace(/и[.]ля/g, 'июля'	);
	//Меняем точки на пробелы
	a=a.replace(/[.]/g, ' '	);
	
	a=a+' г.';

	return a;
};

String.prototype.plusminus=function(){
/**Примитивное упрощение математических выражений. Меняет "++" на "+", например.*/
	var a=this;
	for(;a.match(/[+-][+-]/);){
		a=a.replace(/[+][+]/g,'+');
		a=a.replace(/--/g,'+');
		a=a.replace(/[+]-/g,'-');
		a=a.replace(/-[+]/g,'-');
		a=a.replace(/[+]$/g,'');
		a=a.replace(/[{][+]/g,'{');
		a=a.replace(/[+][}]/g,'}');
		a=a.replace(/\(\+/g,'(');
		a=a.replace(/\+\)/g,')');
	}
	a=a.replace(/[=]\s*[+]/g,'=');
	a=a.replace(/[+]1(?=[A-Za-zА-Яа-яЁё])/g,'+');
	a=a.replace(/[-]1(?=[A-Za-zА-Яа-яЁё])/g,'-');
	a=a.replace(/[{]1(?=[A-Za-zА-Яа-яЁё])/g,'{');
	a=a.replace(/[}]1(?=[A-Za-zА-Яа-яЁё])/g,'}');
	a=a.replace(/[ ]1(?=[A-Za-zА-Яа-яЁё])/g,' ');
	a=a.replace(/[~]1(?=[A-Za-zА-Яа-яЁё])/g,'~');
	a=a.replace(/[(]1(?=[A-Za-zА-Яа-яЁё])/g,'(');
	a=a.replace(/[)]1(?=[A-Za-zА-Яа-яЁё])/g,')');
	a=a.replace(/[=]1(?=[A-Za-zА-Яа-яЁё])/g,'=');
	a=a.replace(/[;]1(?=[A-Za-zА-Яа-яЁё])/g,';');
	a=a.replace(/\^1(?=[A-Za-zА-Яа-яЁё])/g,'^');
	a=a.replace(/^1(?=[A-Za-zА-Яа-яЁё])/g,'');
	a=a.replace(/^[+]/g,'');
	a=a.replace(/[;][-]0/g,';0');
	a=a.reverse();
	a=a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё])/g,'$.');
	a=a.reverse();
	return a;
};

String.prototype.isString=true;

var docsString;
if(!docsString)
	docsString={};

for(var chto in String.prototype){
	docsString[chto]=String.prototype[chto];
	Object.defineProperty(String.prototype, chto, {enumerable: false});
}
