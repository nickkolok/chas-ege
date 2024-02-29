'use strict';

Number.prototype.pow=function(n){
/**Возвращает число в степени n*/
	return Math.pow(this,n);
}

Number.prototype.sqrt=function(){
/**Квадратный корень из числа.*/
	return Math.sqrt(this);
}

Number.prototype.cbrt=function(){
/**Кубический корень из числа.*/
	return Math.cbrt(this);
}

Number.prototype.sqr=function(){
/**Квадрат числа.*/
	return Math.pow(this,2);
}

Number.prototype.sgn=
Number.prototype.sign=function(){
/**Знак (сигнум) числа.*/
	return Math.sign(this);
}

Number.prototype.abs=function(){
/**Модуль числа.*/
	return Math.abs(this);
}

Number.prototype.floor=function(){
/**Округлить число до целых в меньшую сторону.*/
	return Math.floor(this);
}

Number.prototype.ceil=function(){
/**Округлить число до целых в большую сторону.*/
	return Math.ceil(this);
}

Number.prototype.arctg=
Number.prototype.atan=function(){
/**Арктангенс числа.*/
	return Math.atan(this);
}

Number.prototype.arcsin=
Number.prototype.asin=function(){
/**Арксинус числа.*/
	return Math.asin(this);
}

Number.prototype.arccos=
Number.prototype.acos=function(){
/**Арккосинус числа.*/
	return Math.acos(this);
}

Number.prototype.arcctg=function(){
/**Аркотангенс числа.*/
	return Math.atan(1/this);
}

Number.prototype.sin=function(){
/**Синус числа.*/
	return Math.sin(this);
}

Number.prototype.cos=function(){
/**Косинус числа.*/
	return Math.cos(this);
}

Number.prototype.tg=
Number.prototype.tan=function(){
/**Тангенс числа.*/
	return Math.tan(this);
}

Number.prototype.ctg=function(){
/**Котангенс числа.*/
	return 1/Math.tan(this);
}

Number.prototype.round=function(){
/**Округление числа до целых.*/
	return Math.round(this);
}

Number.prototype.addToGlobal('docsNumber',1);
