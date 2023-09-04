'use strict';

String.prototype.toZagl =
String.prototype.toCapitalized = function(){
/**Делает первую букву строки заглавной*/
	if(this=='')
		return '';
	return this[0].toUpperCase()+this.substr(1);//.toLowerCase();
};

String.prototype.tn=function(){
/**Возвращает число, если данная строка - запись числа с десятичной точкой или запятой.*/
	return 1*this.replace(',','.');
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

String.prototype.isNumeric=function(){
/**Является ли строка числом, возможно, с десятичной точкой или запятой?*/
	return /^-?[0-9]+([.,][0-9])?$/.test(this);
}

String.prototype.isCyrillicWord=function(){
/**Является ли строка русским словом?*/
	return /^[А-Яа-яЁё\-]+$/.test(this);
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

String.prototype.allDecimalsToStandard = function (p1) {
	/// Example usage:
	///"\\log_{3}5.4+\\log_{3}14.999999999999998".allDecimalsToStandard() = "\\log_{3} 5{,}4 +\\log_{3} 15 "
	return this.replace(/\d+\.\d+/g, (decimal) => Number(decimal).ts(p1));

}

String.prototype.isString=true;

String.prototype.addToGlobal('docsString',1);

