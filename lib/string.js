'use strict';

String.prototype.mesh=function(){
/**Перемешивает строку посимвольно в случайном порядке*/
	return this.split('').shuffle().soed();	
};

String.prototype.dopdo=function(c,n){
/**Дополняет строку подстроками спереди, пока длина строки не станет не менее n.*/
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

String.prototype.frac=//Deprecated
String.prototype.texfrac=function(p1){
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

String.prototype.encodeURIComponent=function(){
	return encodeURIComponent(this);
}

String.prototype.decodeURIComponent=function(){
	return decodeURIComponent(this);
}

String.prototype.encodeURI=function(){
	return encodeURI(this);
}

String.prototype.decodeURI=function(){
	return decodeURI(this);
}

String.prototype.neutralizeXSS=function(){
/**Нейтрализует (экранирует) XSS-угрозы. По крайней мере, должна. Будет пополняться.*/
	return this.replace(/<\//g,'');
}

String.prototype.toNumberExt=function(){
/**Превращает арифметическое выражение (+-/*) в число.*/
	if(/[\s0-9\.,\+\-\*\/\(\)]+/.test(this)){
		try{
			return eval(this.replace(/\,/g,'.'));
		}catch(e){
		}
	}
	return 0;
}

String.prototype.toMtr=function(){
/**Превращает многострочный текст в матрицу строк.*/
	var t=this.
		replace(/<br[\/]*>/g,'\n').
		replace(/[\t]+/g,' ').
		trim();
	var a=t.split(/\s*[\n\r]+\s*/);
	var len=a.length;
	for (var i=0;i<len;i++)
		a[i]=a[i].split(/\s+/);
	return a;
}

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
	a=a.replace(/[+]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'+');
	a=a.replace(/[-]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'-');
	a=a.replace(/[{]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'{');
	a=a.replace(/[}]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'}');
	a=a.replace(/[ ]1(?=[A-Za-zА-Яа-яЁё\\(])/g,' ');
	a=a.replace(/[~]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'~');
	a=a.replace(/[(]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'(');
	a=a.replace(/[)]1(?=[A-Za-zА-Яа-яЁё\\(])/g,')');
	a=a.replace(/[=]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'=');
	a=a.replace(/[;]1(?=[A-Za-zА-Яа-яЁё\\(])/g,';');
	a=a.replace(/\^1(?=[A-Za-zА-Яа-яЁё\\(])/g,'^');
	a=a.replace(/\$1(?=[A-Za-zА-Яа-яЁё\\(])/g,'$');
	a=a.replace(/^1(?=[A-Za-zА-Яа-яЁё])/g,'');
	a=a.replace(/^[+]/g,'');
	a=a.replace(/[;][-]0/g,';0');
	a=a.reverse();
	a=a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё\\])/g,'$.');
	a=a.reverse();
	return a;
};

String.prototype.insert=function(i,str) {
//вставляет в строку после i-го символа
	var ss='';
	if (i>0)
		ss=this.substring(0, i);
	var sss='';
	if (i<this.length-1)
		sss=this.substring(i);
	return ss+str+sss;
}

String.prototype.isLetter=function() {
/**проверяет, буква ли данный символ*/
	var d = (this.length==1) && (this.search(/[a-z]/)!=-1);
	return d;
}

String.prototype.isGl=function() {
/**проверяет, гласная ли данный символ*/
	var d = (this.search(/[aeiou]/)!=-1) && (this.length==1);
	return d;
}

String.prototype.cepZamena=function(mas1, mas2){
/**Заменяет i-й символ из массива mas1 i-м символом из массива mas2*/
	var len=this.length;
	var rez='';
	var fl;
	for(var i=0; i<len; i++){
		fl=1;
		for(var j=0;j<26 && fl;j++){
			if(this[i]==mas1[j]){
				rez+=mas2[j];
				fl=0;
			}
		}
		if(fl){
			rez+=this[i];
		}
	}
	return rez;
}

String.prototype.multiply=function(n){
/**Возвращает строку, записанную n раз подряд*/
	var rez=this;
	for(var i=1;i<n;i++)
		rez+=this;
	return rez;
}

String.prototype.negativeBracketsTeX=function(){
/**Отрицательное число (начинающееся со символа "-") берётся в скобки*/
	return this[0]== "-" ? "\\left(" + this + "\\right)" : "" + this;
}

String.prototype.isNumeric=function(){
/**Является ли строка числом, возможно, с десятичной точкой или запятой?*/
	return /^-?[0-9]+([.,][0-9])?$/.test(this);
}

String.prototype.isCyrillicWord=function(){
/**Является ли строка русским словом?*/
	return /^[А-Яа-яЁё\-]+$/.test(this);
}

String.prototype.isSpace=function(){
/**Состоит ли строка только из пробельных символов?*/
	return /^\s+$/.test(this);
}

String.prototype.transliterate = (
/**Транслитерация, отображающая кириллицу на множество валидных идентификаторов*/
//http://javascript.ru/forum/misc/27347-nadezhnyjj-dvukhstoronnijj-translit.html
    function() {
        var
            rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
            eng = "shh sh ch cz yu ya yo zh __ y_ e_ a b v g d e z i j k l m n o p r s t u f x _".split(/ +/g)
        ;
        return function(engToRus) {
            var x;
            var text=this;
            for(x = 0; x < rus.length; x++) {
                text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
            }
            return text;
        }
    }
)();

String.prototype.replaceCode = function(code, explanations){
	if(explanations.isString){
		explanations=[explanations];
	}
	var text=this;
	var len=explanations.length;
	for(var i=0;i<len;i++){
		text=text.replace(code,explanations[i]);
		//Внимание: заменяется одно вхождение на каждой итерации цикла
	}
	return text;
}

String.prototype.isString=true;

String.prototype.addToGlobal('docsString',1);

