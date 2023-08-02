'use strict';

if(typeof(Fraction) === 'undefined'){
	try{
		var Fraction = require('fractional').Fraction;
	} catch(e){
	}
}

Number.prototype.toFixedLess=function(n){
/**Возвращает строку - представление числа с не более чем n знаками после запятой.*/
	var a=this.toFixed(n);
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl()){};
	for(;a.posl()=='.';a=a.udalPosl()){};
	return a;
}

Number.prototype.pm=function(){
/**Случайным образом возвращает число или ему противоположное.*/
	return sl1()?0+this:0-this;
	//Да, именно так, а не просто -this или this, ибо тогда оно в нестриктовом режиме возвращает объект.
	//return sl1()?this:-this;
}

Number.prototype.dopdo=function(c,n){
/**Возвращает строковое представление числа, дополненное спереди строками c до длины не менее n*/
	return (''+this).dopdo(c,n);
}

Number.prototype.isZ=function(){
/**Проверяет, является ли число целым.*/
	return this-this.floor()==0;
}

Number.prototype.isAlmostInteger=function(){
/**Проверяет, является ли число целым.*/
	return (this-this.round()).abs() < 1/1024/1024;
}

Number.prototype.isPolnKvadr=function(){
/**Проверяет, является ли число полным квадратом.*/
	return this.sqrt().isZ();
}

Number.prototype.ts=
Number.prototype.toStandart=function(p1){
/**Возвращает представление числа в записи "по стандарту": с десятичной запятой и не более чем 10 знаками после неё.
Для отсечения "ложной точности" хватает.*/
	return this.toFixedLess(10).toStandart(p1);
}

Number.prototype.mzhd=function(a,b,c){
/**Находится ли число между a и b, если c - то включительно. a и b можно не упорядочивать.*/
	var p1=[a,b];
	var p2=p1[p1.max()];
	var p3=p1[p1.min()];
	return (this<p2)&&(this>p3)||((this==p2)||(this==p3))&&(!!c);
}

Number.prototype.polozh=function(){
/**Если число положительно, вернёт его, иначе 0.*/
	return this<0?0:0+this;
}

Number.prototype.nod=function(p1){
/**НОД данного числа и p1*/
	var a,b;
	a=this<0?0-this:0+this;
	b=p1<0?-p1:p1;
	if(a==b) return a;
	if((a==1)||(b==1))return 1;
	if(a==0) return b;
	if(b==0) return a;
	if(a>b) return b.nod(a%b);
			return a.nod(b%a);
}

Number.prototype.pina=
Number.prototype.texfracpi=function(p1){
/**TeX-представление дроби, у которой в числителе данное число, умноженное на пи, а в знаменателе p1.
Случай p1=1 учитывается.*/
	return this.frac(p1,'\\pi');
}

Number.prototype.koren = // Deprecated
Number.prototype.texsqrt = function(p1,p2){
/**TeX-представление корня из данного числа.
Если данное число - полный квадрат, то корень из числа.
Если p1, то из-под корня будут вынесены возможные множители.
Если p1, p2 и из-под корня выносится единица, то она будет опущена.*/
	if(this.isPolnKvadr())
		return this.sqrt().ts();
	var a='';
	var t=this;
	if(p1){
		a=this.polnKvadrMnozh();
		t=t/a.sqr();
	}
	return a.printIf(a != 1 || p2)+'\\sqrt{'+t.ts()+'}';
}

Number.prototype.printIf = function(condition) {
	return (''+this).printIf(condition);
}

Number.prototype.polnKvadrMnozh=function(){
/**Максимальный делитель данного числа, квадрат которого также является делителем данного числа.*/
	if(this==0)
		return 0;
	var t=this.abs();
	var i=1;
	for(var rez=1;i.sqr()<=t;i++)
		if(t.kratno(i.sqr()))
			rez=i;
	return rez;
}

Number.prototype.fracstr=//Depracated, нафига их плодить?
Number.prototype.frac=//Deprecated, вообще в отдельную либу пойдут!
Number.prototype.texfrac=function(p1,str){
/**TeX-представление дроби с числителем - произведением данного числа и строки str и знаменателем p1.
Случай p1=1 учитывается.*/
	str || (str='');
	if(p1.isString)
		return (
			p1!=1?
			(this<0?'-':'')+'\\frac{'+this.abs()+str+'}{'+p1+'}':
			'{'+this+str+'}'
		);

	var a1=new Fraction(1*this,p1);

	if(!a1.numerator)
		return '0';
	var z='';
	if(a1.numerator<0){
		z='-';
		a1.numerator*=-1;
	}
	var numerator = (a1.numerator==1 && str!=''?'':a1.numerator) + str;
	return z+(a1.denominator!=1?'\\frac{'+numerator+'}{'+a1.denominator+'}':numerator);

}

Number.prototype.texsqrtfrac = function(denominator) {
	if(this === 0)
		return '0';
	var frac = new Fraction(1*this, denominator);
	var additiveMultiplier = frac.denominator / frac.denominator.polnKvadrMnozh().sqr();
	return (frac.numerator * additiveMultiplier).texsqrt(true).texfrac((frac.denominator*additiveMultiplier).sqrt());
};

Number.prototype.texmixedfrac = function(den){
    if(this.abs()<den.abs())
        return this.texfrac(den);

    let intpart = parseInt(this.abs() / den.abs());
    let newnum = this.abs() - den.abs() * intpart;

	return '{'+intpart*(this*den).sgn()+'}' + newnum.texfrac(den.abs()).esli(newnum);
}

Number.prototype.texrndfrac = function(den){
	var f = new Fraction(1*this, den);
	var n = f.denominator;

	while(n%2==0)
		n/=2;
	while(n%5==0)
		n/=5;

	switch(n+''+sluchch(1,3)){
		case '11':
			return (f.numerator/f.denominator).ts(1);
		case '12':
			return (f.numerator).texfrac(f.denominator);
		case '13':
			return (f.numerator).texmixedfrac(f.denominator);
		default:
			break;
	}
	switch(sluchch(1,2)){
		case 1:
			return (f.numerator).texfrac(f.denominator);
		case 2:
			return (f.numerator).texmixedfrac(f.denominator);
	}
}

Number.prototype.perfectCubicMultiplier = function() {
	/**Максимальный делитель данного числа, куб которого также является делителем данного числа.*/
	if (this == 0)
		return 0;
	let t = this.abs();
	let i = 1;
	for (var rez = 1; i.pow(3) <= t; i++)
		if (t.kratno(i.pow(3)))
			rez = i;
	return rez;
};

Number.prototype.texcbrt = function(p1, p2) {
	/**TeX-представление корня из данного числа.
	Если данное число - полный квадрат, то корень из числа.
	Если p1, то из-под корня будут вынесены возможные множители.
	Если p1, p2 и из-под корня выносится единица, то она будет опущена.*/
	if ((Math.cbrt(this) * 1000).isZ())
		return this.cbrt().ts();
	let a = '';
	let t = this;
	if (p1) {
		a = this.perfectCubicMultiplier();
		t = t / a.pow(3);
	}
	return a.printIf(a != 1 || p2) + '\\sqrt[3]{' + t.ts() + '}';
};

Number.prototype.kratno=function(p1){
/**Кратно ли данное число p1*/
	return !(this%p1);
}

Number.prototype.delit=function(p1){
/**Является ли данное число делителем p1*/
	return !(p1%this);
}

Number.prototype.sluchDel=function(){
/**Возвращает случайный делитель числа.*/
	for(var r=this+1;!this.kratno(r);r=sluchch(1,this)){};
	return r;
}

Number.prototype.isPrime = function() {
/**Является ли число простым?*/
	var s = this.sqrt().floor();
	for (var i = 2; i <= s; i++) {
		if (!(this%i)) {
			return false;
		}
	}
	return true;
};

Number.prototype.nextPrime = function() {
/**Найти ближайшее не меньшее простое число*/
	for (var i = this.ceil(); ; i++) {
		if (i.isPrime()) {
			return i;
		}
	}
};


Number.prototype.toChMin=function(){
/**Трактует число как количество минут и возвращает строку вида "A часов B минут".*/
	var a=(this/60).floor();
	var b=this%60;
	return chislitlx(a,'час').esli(a)+' '.esli(a&&b)+chislitlx(b,'минута').esli(b);
}

Number.prototype.chislit=function(p1,p2,p3){
/**Вспомогательная функция для согласования существительного с числительным.*/
	return chislit(this,p1,p2,p3);
}

Number.prototype.chislitM=function(p1,p2,p3){
/**Вспомогательная функция для согласования существительного с числительным.*/
	return chislitM(this,p1,p2,p3);
}

Number.prototype.chislitlx=function(p1,p2){
/**Возвращает строку, состоящую из данного числа и подходящего падежа слова p1, при этом
полученное словосочетанию стоит в падеже p2 (если не указан - именительный).*/
	return chislitlx(this,p1,p2);
}

Number.prototype.min=function(){
/**Минимум из данного числа и всех аргументов функции.*/
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.minE();
}

Number.prototype.max=function(){
/**Максиимум из данного числа и всех аргументов функции.*/
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.maxE();
}

Number.prototype.plusminus=Number.prototype.ts;

Number.prototype.proporMezhdu=function(k,pr){
/**Возвращает число, лежащее между данным и k пропорционально pr*/
	return this+(k-this)*pr;
}

Number.prototype.toDvoet=function(a){
/**Представить число в виде "часы-минуты" с двоеточием.*/
	if(!a)
		a=60;
	return Math.floor(this/60)+':'+Math.floor(this%60).dopdo('0',2);
}

Number.prototype.okrugldo=function(p1){
/**Округлить число до кратных p1*/
	return okrugldo(this,p1);
}

Number.prototype.fct=function(){
/**Факториал числа*/
	return this>0?(this-1).fct()*this:1;
}

Number.prototype.rub=function(){
/**Возвращает строку вида this рублей*/
	return chislitlx(this,'рубль');
}

Number.prototype.toComplex=function(){
/**Представляет число в виде чисто действительного комплексного*/
	return new Complex(this);
}

Number.prototype.negativeBrackets=function(){
/**Отрицательное число берётся в скобки*/
	return this < 0 ? "(" + this + ")" : "" + this;
}

Number.prototype.reverseInField = function(E) {
/**Обращает число по модулю E*/
	// TODO: более вменяемый алгоритм
	for (var i = 2; i < E; i++) {
		if (this*i%E === 1) {
			return i;
		}
	}
	// А нефиг непростые брать, undefined
};

Number.prototype.powInField = function(E,p) {
	// TODO: более вменяемый алгоритм
	var rez = 1;
	for (var i = 0; i < p; i++) {
		rez *= this;
		rez %= E;
	}
	return rez;
}

Number.prototype.isNumber=true;

Number.prototype.addToGlobal('docsNumber',1);
