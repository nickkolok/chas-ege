'use strict';
function okrugldo(a,b){
/**Округлить a с точностью до b*/
	if(!b)
		b=1;
	a=Math.round(a/b)*b;
	return a;
}
function sluchch(n,k,s){
/**Случайное число от n до k с шагом s.
Если s опущено - с шагом 1.
Если k опущено - от 0 до n*/
	if(!s)
		s=1;
	if(k==undefined)
		return sluchch(0,n,1);
	
	return okrugldo(Math.random() * (k-n),s) + n;
}

function slKrome(a,p1,p2,p3){
/**Случайное число, кроме a:
если a - массив, то не содержащееся в нём;
если a - число или строка, то не равное ему;
если a - функция, принимающая параметр - то не удовлетворяющее ей (т. е. чтобы функция вернула 0).*/
	var b;
	
	if(a.isNumber || a.isString)
		do{
			b=sl(p1,p2,p3);
		}while(b==a);
	else if(a.isArray)
		if(a.length)
			do{
				b=sl(p1,p2,p3);
			}while(a.hasElem(b));
		else
			return sl(p1,p2,p3);
	else if(a.isFunction)
		do{
			b=sl(p1,p2,p3);
		}while(a(b));
	else
		console.error('Первый параметр функции slKrome должен быть числом, строкой, массивом или функцией.');
	return b;
}

function sluchDel(a){
/**Случайный делитель числа a*/
	return a.sluchDel();
}

function sluchiz(a,n){
/**Массив n случайных неповторяющихся элементов массива a*/	
	if(!(n>=1))
		n=1;
	var b=a.slice();
	b.shuffle();
	b.length=n;
	return b;
}

function chislit(a,s1,s2,s5){
/**Вспомогательная процедура*/
	a=a%100;
	if((a>=5)&&(a<=20))
		return s5;
	
	a=a%10;
	if(a==1)
		return s1;
	
	if((a<=4)&&(a>=2))
		return s2;
	
	return s5;
}

function s3ug(Ax,Ay,Bx,By,Cx,Cy){
/**Площадь треугольника по координатам трёх вершин.*/
	return 0.5*(Ax*By+Ay*Cx+Bx*Cy-By*Cx-Cy*Ax-Ay*Bx).abs();
}

function chislitM(p1,p2,p3,p4){
	return p1.ts()+' '+chislit(p1,p2,p3,p4);
}

function chislitlx(p1,p2,p3){
/***/
	var rez=sklonlxkand(p2,undefined,0);
	switch(p3){
		case 'i': return chislitM(p1,	rez.ie,	(rez.r2?rez.r2:rez.re),	rez.rm);
		case 'r': return chislitM(p1,	rez.re,	 rez.rm,				rez.rm);
		case 'd': return chislitM(p1,	rez.de,	 rez.dm,				rez.dm);
		case 'v': return chislitM(p1,	rez.ve,	(rez.r2?rez.r2:rez.ve),	rez.vm);
		case 't': return chislitM(p1,	rez.te,	 rez.tm,				rez.tm);
		case 'p': return chislitM(p1,	rez.pe,	 rez.pm,				rez.pm);
	}
	return chislitM(p1,rez.ie,(rez.r2?rez.r2:rez.re),rez.rm);
}

var Drob={};

Drob.prov=function(p1){
	p1=Drob.fixN(p1);
	return !!p1.ch&&!!p1.zn;
}

Drob.fixN=function(p1){
	if(p1.isNumber)
		p1={ch:p1,zn:1};
	return p1;
}

Drob.sokr=function(p1){
	p1=Drob.fixN(p1);
	if(!Drob.prov(p1))return null;
	if(p1.zn<0){
		p1.ch*=-1;
		p1.zn*=-1;
	}
	var a1=p1.ch.nod(p1.zn);
	p1.ch/=a1;
	p1.zn/=a1;
	return p1;
}

function clone(obj){
	if(obj == null || typeof(obj) != 'object')
		return obj;
	
	var temp = {};
	for(var key in obj)
		if(obj[key] === undefined)
			temp[key]=undefined;
		else if(obj[key].isArray)
			temp[key]=obj[key].slice();
		else
			temp[key] = clone(obj[key]);
	return temp;
}

function sl1(){
	return Math.random().round();
}

function sp(a){//Я просто оставлю это здесь
	for(var i=0,c=a.split('\''),b=[];i<c.length;i++)
		b=b.concat(i%2?c[i]:c[i].split(' '));
	for(var i=0;i<b.length;b.splice(i,!b[i++])){};
	return b;
}

function cvet(a){
	return '#'+a.r.toString(16).dopdo('0',2)+a.g.toString(16).dopdo('0',2)+a.b.toString(16).dopdo('0',2);
}

function proporMezhdu(a,b,pr){
	return a.proporMezhdu(b,pr);
}

function cvetMezhdu(a,b,pr){
	return cvet({
		r:proporMezhdu(a.r,b.r,pr).round(),
		g:proporMezhdu(a.g,b.g,pr).round(),
		b:proporMezhdu(a.b,b.b,pr).round(),
	});
}

function perevodVelichin(a){
/**Наброски движка про перевод величин*/
	var edIzm=a.iz(2);
	var ishIzm=edIzm[0];
	var rezIzm=edIzm[1];
	var koef=sl(0.1,9.9,0.1)*10 .pow(sl(-1,1));
	var otv=koef*ishIzm[1]/rezIzm[1];
	window.vopr.txt='Выразите '+chislitlx(koef,ishIzm[0])+' в '+lx[rezIzm[0]].pm;
	window.vopr.ver=[otv.ts()];
}


function multiplyMatrix(A,B){//http://mathhelpplanet.com/viewtopic.php?f=44&t=22337
	var rowsA = A.length,
		colsA = A[0].length,
		rowsB = B.length,
		colsB = B[0].length,
		C = [];
	for(var i=0; i<rowsA; i++)
		C[i]=[];
	for(	var k=0; k<colsB; k++)
		for(	var i=0; i < rowsA; i++){
			var temp=0;
			for(	var j = 0; j < rowsB; j++)
				temp += A[i][j]*B[j][k];
			C[i][k] = temp;
		}
	return C;
}

function Determinant(A){	// Определитель матрицы (используется алгоритм Барейса)
	var N=A.length,
		B=[],
		denom=1,
		exchanges=0;
	for(var i=0; i<N; ++i){
		B[i]=[];
		for(var j=0; j<N; ++j)
			B[i][j] = A[i][j];
	}
	for(var i=0; i<N-1; ++i){
		var maxN=i,
		maxValue=Math.abs(B[i][i]);
		for(var j=i+1; j<N; ++j){
			var value=Math.abs(B[j][i]);
			if(value>maxValue){
				maxN=j;
				maxValue = value;
			}
		}
		if(maxN>i){
			var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
			++exchanges;
		}else if(maxValue==0)
			return maxValue; 
		var value1=B[i][i];
		for(var j = i+1; j < N; ++j){
			var value2=B[j][i];
			B[j][i]=0;
			for(var k=i+1; k<N; ++k)
				B[j][k]=(B[j][k]*value1-B[i][k]*value2)/denom;
		}
		denom=value1;
	} //@ http://mathhelpplanet.com/viewtopic.php?f=44&t=22390
	if(exchanges%2)
		return -B[N-1][N-1];
	else
		return B[N-1][N-1];
}

function MatrixCofactor(i,j,A){   //Алгебраическое дополнение матрицы
	var N=A.length,
		sign=((i+j)%2==0) ? 1 : -1;
	for(var m=0; m<N; m++){
		for(var n=j+1; n<N; n++)
			A[m][n-1]=A[m][n];
		A[m].length--;
	}
	for(var k=i+1; k<N; k++)
		A[k-1] = A[k];
	A.length--;
	return sign*Determinant(A);
}

function AdjugateMatrix(A){   //Союзная (присоединённая) матрица
	var N=A.length,
		B=[],
		adjA=[];
	for(var i=0; i<N; i++){
		adjA[i]=[]; 
		for(var j=0; j<N; j++){
			for(var m=0; m<N; m++)
			{
				B[m]=[];
				for(var n = 0; n < N; n++)
					B[m][n] = A[m][n];
			}
			adjA[i][j] = MatrixCofactor(j,i,B);
		}
	}
	return adjA;
}

function InverseMatrix(B){   // Обратная матрица
	var det=Determinant(B);
	if(!det)
		return false;
	var N=B.length,
		A = AdjugateMatrix(B);
	for(var i=0; i<N; i++)
		for(var j=0; j<N; j++)
			A[i][j] /= det; 
	return A;
}

function objSum(a,b){
/**Сложение двух матриц или двух чисел.*/
	if(!a)
		return b;
	if(!b)
		return a;
	if(a.isNumber && b.isNumber)
		return a+b;
	if(a.isArray && b.isArray)
		return a.map(function(a1,b1){
			return objSum(a1,b[b1]);
		});
	return undefined;
}

function objUmn(a,b){
/**Умножение a на b (матрица или число)*/
	if(!a || !b)
		return 0;
	if(a.isNumber && b.isNumber)
		return a*b;
	if(a.isArray && b.isArray)
		return multiplyMatrix(a,b);
	if(a.isArray && b.isNumber)
		return a.map(function(a1){
			return objUmn(a1,b);
		});
	if(b.isArray && a.isNumber)
		return objUmn(b,a);
	
	return undefined;
}

function generateMatrix(stroki,stolbcy,min,max,p1){
/**Генерирует матрицу из случайных чисел. min, max и p1 - параметры sluchch.*/
	var rez=[];
	for(var i=0;i<stroki;i++){
		rez[i]=[];
		for(var j=0;j<stolbcy;j++)
			rez[i][j]=sl(min,max,p1);
	}
	return rez;
}

function generateScalMatrix(x,n){
/**Генерирует скалярную иатрицу n на n с числом x на главной диагонали.*/
	var rez=generateMatrix(n,n,0);
	for(var i=0;i<n;i++)
		rez[i][i]=x;
	return rez;
}

//перевод числа x из системы с основанием sysBefore в систему с основанием sysAfter
function intoAnotherSystem(x,sysBefore,sysAfter) {
//перевод из заданной в 10-ную
	var i=String(x).length;
	var c = 1;
	var x10 = 0;
	while (i>0) {
		var t = String(x).charAt(i-1)*1;
		if (isNaN(t))
			t = String(x).charCodeAt(i-1)-String("A").charCodeAt(0)+10;
		x10 = t*c+x10;
		i=i-1;
		c = c*sysBefore;
	}
//перевод из 10-ной в заданную
	var finall = '';
	while (x10>0) {
		var t = String(x10 % sysAfter);
		if (x10 % sysAfter >= 10)
			t = String.fromCharCode(String("A").charCodeAt(0)+(x10 % sysAfter)-10);
		x10 = Math.floor(x10/sysAfter);
		finall = t+finall;
	}
	return(finall);
}

function isZ(n){
/**Является ли n целым числом.*/
	return n.isZ();
}

function isPolnKvadr(n){
/**Является ли n полным квадратом.*/
	return n.isPolnKvadr();
}

document.writeln=function(p1){
	return document.write(p1+'<br/>');
}

function hasErrors(p,bdr){
	if(p==undefined)
		return 'undefined; '
	if(p.isFunction)
		return 0;
	var rez='';
	if(p.isNumber)
		p=''+p;
	if(p.isString){
		if(p.match(/NaN/))
			rez+='NaN; ';
		if(p.match(/undefined/))
			rez+='undefined; ';
		if(p.match(/Infinity/))
			rez+='Infinity; ';
		if(p.match(/[.,][0-9]*00000/))
			rez+='00000; ';
		if(!bdr && p.reverse().match(/[0-9]{6,}[.,](?!0("|sir))/))
			rez+='6 и более цифр после десятичной запятой '+
				'(если так и должно быть, установите vopr.kat.bdr значение 1; ';
	}
	if(p.isArray){
		for(var i=0;i<p.length;i++){
			rez+=hasErrors(p[i]);
		}
	}
	return rez;
}

function rang_mat(A){//Отсюда: http://liloisproj.narod.ru/mat_rang.htm
	var i=A.length;
	var j=A[0].length;
	var q = Math.min(i,j);

	while(q) // проверка: порядок матрицы меньше или равен минимальному из размеров матрицы?
	{ // если да
		var B = []; // создаем новую матрицу размера q
		for(var w=0;w<q;w++)
			B[w]=[];
		
		for(var a=0;a<(i-(q-1));a++) // тут начинается перебор матриц q-го порядка
		{
			for(var b=0;b<(j-(q-1));b++)
			{
				for(var c=0;c<q;c++)
				{
					for(var d=0;d<q;d++)
					{
						B[c][d] = A[a+c][b+d];
					}
				}

				if(B.det()) // если определитель матрицы отличен от нуля
				{ // то
					return q; // присваиваем рангу значение q
				}
			}
		}
		q--;
	}
	return 0;
}

function getLen(x1, x2, y1, y2){
	return Math.sqrt( Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2) );
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeStruct(strNames){
	var names = strNames.split(' ');
	var count = names.length;
	function constructor(){
		for (var i = 0; i < count; i++){
			this[names[i]] = arguments[i];
		}
	}
	return constructor;
}

function make2Array(ch,k) {
/**из числа делает массив 0 и 1 с количеством элементов k*/
	var x=[];
	for (var i=0; i<k; i++) {
		var t=ch % 2;
		ch = Math.floor(ch / 2);
		x.push(t);
	}
	return x;
}

function parseLogic(exp) {
/**преобразует логическое выражение в выражение, доступное для вычисления*/
	while (exp.indexOf('>')!=-1){
		var t = exp.indexOf('>');
		var A = findA(exp,t);
		exp=exp.insert(A,'!');
		exp = exp.replace('>','||');
	}
	while (exp.indexOf('~')!=-1){
		var t = exp.indexOf('~');
		var A = findA(exp,t);
		var B = findB(exp,t);
		var exp1=exp.substring(A,t);
		var exp2=exp.substring(t+1,B+1);
		exp = exp.replace(exp1+'~'+exp2,'('+exp1+'&&'+exp2+')'+'||(!'+exp1+'&&!'+exp2+')');
	}
	return exp;
}

function findA(exp,t) {
	var i=t-1;
	if (exp[t-1]==')') {
		var k = 1;
		while (k>0){
			i--;
			if (exp[i]==')')
				k++;
			else if (exp[i]=='(')
				k--;
		}
	}
	else
		i=i-3;
	while (exp[i-1]=='!')
		i--;
	return i;
}

function findB(exp,t) {
	var i=t+1;
	while (exp[i]=='!')
		i++;
	if (exp[t+1]=='(') {
		var k = 1;
		while (k>0){
			i++;
			if (exp[i]=='(')
				k++;
			else if (exp[i]==')')
				k--;
		}
	}
	else
		i = i+3;
	return i;
}

function printLogic(exp) {
/**&#172; - отрицание
&#8594; - стрелка направо
&#8743; - Логическая и
&#8744; - Логическая иили
&#8801; - Идентичный, тождество
печатает логическое выражение*/
	exp=exp.replace(/\|\|/g,'&#8744;');
	exp=exp.replace(/\&\&/g,'&#8743;');
	exp=exp.replace(/\~/g,'&#8801;');
	exp=exp.replace(/\>/g,'&#8594;');
	exp=exp.replace(/\!/g,'&#172;');
	var re = /x\[(\d)\]/g;
	exp = exp.replace(re, function(str,a) { return 'X'+(Number(a)+1) });

	return exp;
}

function genLogFunc(k,b) {
/**генерирует логическую функцию*/
	var t=0;
	var f='';
	for (var i=0;i<k;i++) {
		var d3=sl1();
		if (d3&&i!=0) {
			f=f+'(';
			t++;
		}
		f+='!'.esli(sl1());
		f=f+'x['+i+']';
		if (i!=k-1)	{
			var d4=sl1();
			if (d4&&t>0) {
				f=f+')';
				t--;
			}
			var d2=0;
			if (!b)
				d2=sluchch(3);
			else
				d2=sluchch(1,2);
			switch (d2) {
				case 0: 
					f='('+f+')';
					f=f+'>';
					break;
				case 1: 
					f=f+'||';
					break;
				case 2: 
					f=f+'&&';
					break;
				case 3: 
					f='('+f+')'+'~'+'(';
					t++;
					break;
			}
		}
	}
	for (var i=0; i<t; i++)
		f=f+')';
	//убираем лишние скобки
	var re = /\(x\[(\d)\]\)/g;
	while (f.search(re)!=-1) {
		f = f.replace(re, "x[$1]");
	}
	re = /\(!x\[(\d)\]\)/g;
	while (f.search(re)!=-1) {
		f = f.replace(re, "!x[$1]");
	}
	return f;
}

function slLetter(b) {
/**генерирует случайную букву английского алфавита*/
	var a = '';
	if (!b)
		a = String.fromCharCode('a'.charCodeAt(0)+sluchch(25));
	else {
		if (b.isString) {
			var temp = b.charCodeAt(0)-'a'.charCodeAt(0);
			a = String.fromCharCode('a'.charCodeAt(0)+slKrome(temp,25));
		}
		else if (b.isArray) {
			var temp=[];
			for (var i=0; i<b.length; i++)
				temp[i] = b[i].charCodeAt(0)-'a'.charCodeAt(0);
			a = String.fromCharCode('a'.charCodeAt(0)+slKrome(temp,25));
		}
	}
	return a;
}

function genMask() {
/**генерирует случайную маску*/
	var l = sluchch(5,10);//количество символов в маске
	var mask = '';
	for (var i=0; i<l; i++) {
		var d = sluchch(3);
		switch(d) {
			case 0:
				mask+='?';
				break;
			case 1:
				mask+='*';
				break;
			case 2:
			case 3:
				mask+=slLetter();
				break;
			
		}
	}
	if (mask.search(/\?/)==-1)
		mask = mask+'?';
	return mask;
}

function genWrongWordForMask(rmask) {
/**генерирует случайное слово, похожее на маску, но с ошибкой*/
	var word='';
	var reg = rmask.replace(/\*/g,'[a-z]*').replace(/\?/g,'[a-z]');
	var mask = rmask;
	do{
		var re1 = /\*+\?\**|\**\?\*+/;//*?*
		var re2 = /([^\*]*)\?([^\*]*)/;//?
		if (sl1()&& mask.search(re1)!=-1) {
			mask=mask.replace(re1,'');
		}
		else if (sl1() && mask.search(re2)!=-1) {
			var w='';
			var d = slKrome(1,3);
			for (var j=0; j<d; j++)
				w+=slLetter();
			mask=mask.replace(re2,"$1"+w+"$2");
		}
		else {
			var l = mask.length;
			var d = sluchch(l-1);
			while (!mask[d].isLetter()) {
				d=sluchch(l-1);
			}
			mask=mask.replace(mask[d],slLetter());
		}
		var word = genWordForMask(mask);

	}
	while (word.search(reg)!=-1)
	return word;
}

function genWordForMask(mask) {
/**генерирует случайное слово по маске*/
	var l = mask.length;//количество символов в маске
	var word = '';
	for (var i=0; i<l; i++) {
		switch(mask[i]) {
			case '*':
				var d = sluchch(3);
				for (var j=0; j<d; j++)
					word+=slLetter();
				break;
			case '?':
				word+=slLetter();
				break;
			default:
				word+=mask[i];
				break;
			
		}
	}
	return word;
}

function genAlg() {
/**Для составления цепочек/слов/бус/чисел разрешается использовать бусины k типов, обозначаемых буквами  
цепочка должна состоять из N бусин
0) нет правила
1) На i-м месте цепочки стоит одна из бусин [список]
2) На i-м месте не может стоять одна из бусин [список]
3) На i-м месте цепочки стоит бусина, которой нет на j-м месте цепочки
4) На i-м месте цепочки такая же бусина, как и на j-м месте цепочки
5) На i-м – любая гласная, если j согласная, и любая согласная, если j гласная
6) На i-м – любая гласная, если j гласная, и любая согласная, если j согласная
7) На i-м месте цепочки стоит гласная/согласная буква*/
	var alg=[];
	if (sl1()==0)
		alg.push('z');//цифры
	else
		alg.push('l');//буквы
	var has0 = false;
	var has1 = false;
	var k = sluchch(4,6);
	var N = sluchch(3,k-1);
	alg[1]=[];
	for (var i=0; i<k; i++) {
		if (alg[0]=='z'){
			var c = slKrome(alg[1],9);//список элементов, которые  можно использовать в цепочке
			if (c%2==0)
				has0=true;
			else
				has1=true;
		}
		else {
			var c = slLetter(alg[1]);//список элементов, которые  можно использовать в цепочке
			if (c.isGl())
				has0=true;
			else
				has1=true;
		}
		alg[1].push(c);
	}

	for (var i=2; i<N+2; i++) {
		var d=0;
		if (has0 && has1)
			d = sluchch(7);//номер правила, используемого для данной бусины
		else
			d = sluchch(4);//если есть только согласные(гласные) буква, нельзя использовать 4,5 правило
		alg[i]=[];
		alg[i][0]=d;
		switch (d) {
			case 1:
			case 2:
				alg[i][1]=[];
				var c = sluchch(1,k-2);
				for (var j=0; j<c; j++)
					alg[i][1].push(slKrome(alg[i][1],k-1));//кладутся не сами буквы/цифры, а их индексы из alg[1]!
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				if (i>2)
					alg[i][1]=slKrome(i-2,i-2);
				else alg[i][0]=0;
				break;
			case 7:
				alg[i][1]=sl1();//
				break;
		}
	}
	return alg;
}

function algInText(alg) {
/**Преобразует алгоритм в текст*/
	var k = alg[1].length;
	var N = (alg.length-2);
	var ch = '';
	var text  = 'Для составления цепочек разрешается использовать бусины '+k+' типов, обозначаемых';
	if (alg[0]=='z'){
		text += ' цифрами ';
		ch = ['четная','нечетная'];
	}
	else {
		text += ' буквами ';
		ch = ['гласная','согласная'];
	}
	text += alg[1];
	text += '. Цепочка должна состоять из '+N+' бусин, при этом должны соблюдаться следующие правила:';
	for (var i=2; i<N+2; i++) {
		if (alg[i][0]!=0) {
			text = text+'<br/>';
			if (i==2)
				text = text+'На первом месте цепочки ';
			else if (i==N+1)
				text = text+'На последнем месте цепочки ';
			else
				text = text+'На '+(i-1)+'-м месте цепочки ';
		}
		switch (alg[i][0]) {
			case 1:
				text += 'стоит ';
				if (alg[i][1].length==1)
					text += 'бусина ';
				else
					text += 'одна из бусин ';
				for (var j=0; j<alg[i][1].length; j++)
					text += alg[1][alg[i][1][j]]+', ';
				break;
			case 2:
				text += 'не может стоять ';
				if (alg[i][1].length==1)
					text += 'бусина ';
				else
					text += 'одна из бусин ';
				for (var j=0; j<alg[i][1].length; j++)
					text += alg[1][alg[i][1][j]]+',';
				break;
			case 3:
				text += 'стоит бусина, которой нет на '+
					(alg[i][1]+1)+'-м месте цепочки';
				break;
			case 4:
				text += 'стоит такая же бусина, как и на '+
					(alg[i][1]+1)+'-м месте цепочки';
				break;
			case 5:
				text += 'стоит любая '+ch[0]+', если '+
					(alg[i][1]+1)+'-я '+ch[1]+', и любая '+ch[1]+', если '+
					(alg[i][1]+1)+'-я '+ch[0];
				break;
			case 6:
				text += 'стоит любая '+ch[0]+', если '+
					(alg[i][1]+1)+'-я '+ch[0]+', и любая '+ch[1]+', если '+
					(alg[i][1]+1)+'-я '+ch[1];
				break;
			case 7:
				text += 'стоит '+ch[alg[i][1]]+' буcина';
				break;
		}
	}
	return text;
}

function genWordForAlg(walg) {
/**генерирует цепочку для алгоритма*/
	var alg = walg.slice();
	var word='';
	var k = alg[1].length;
	var ar0 = [];
	var ar1 = [];
	for (var i=0; i<k; i++){
		if (alg[0]=='z'){
			if (alg[1][i]%2==0)
				ar0.push(alg[1][i]);
			else
				ar1.push(alg[1][i]);
		}
		else {
			if (alg[1][i].isGl())
				ar0.push(alg[1][i]);
			else
				ar1.push(alg[1][i]);
		}
	}
	for (var i=2; i<alg.length; i++) {
		switch (alg[i][0]) {
			case 0:
				word+=alg[1].iz();
				break;
			case 1:
				word+=alg[1][alg[i][1].iz()];
				break;
			case 2:
				word+=alg[1][slKrome(alg[i][1],k-1)];
				break;
			case 3:
				word+=alg[1][slKrome(alg[1].indexOf(word[alg[i][1]]),k-1)];
				break;
			case 4:
				word+=word[alg[i][1]];
				break;
			case 5:
				if (alg[0]=='z'){
					if (word[alg[i][1]]%2==0)
						word+=ar1.iz();
					else
						word+=ar0.iz();
				}
				else {
					if (word[alg[i][1]].isGl())
						word+=ar1.iz();
					else
						word+=ar0.iz();
				}
				break;
			case 6:
				if (alg[0]=='z'){
					if (word[alg[i][1]]%2==0)
						word+=ar0.iz();
					else
						word+=ar1.iz();
				}
				else {
					if (word[alg[i][1]].isGl())
						word+=ar0.iz();
					else
						word+=ar1.iz();
				}
				break;
			case 7:
				if (alg[i][1])
					word+=ar1.iz();
				else
					word+=ar0.iz();
				break;
		}
	}
	return word;
}

function genWrongWordForAlg(walg) {
/**генерирует цепочку для алгоритма*/
	var alg = walg.copyAr();
	var N = (alg.length-2);
	var r = 0;
	do {
		r = sluchch(2,N+1);
	} while (alg[r][0]==0);
	switch (alg[r][0]) {
		case 1:
			alg[r][0]=2;
			break;
		case 2:
			alg[r][0]=1;
			break;
		case 3:
			alg[r][0]=4;
			break;
		case 4:
			alg[r][0]=3;
			break;
		case 5:
			alg[r][0]=6;//
			break;
		case 6:
			alg[r][0]=5;//
			break;
		case 7:
			alg[r][1]=1-alg[r][1];//
			break;
	}
	var word = '';
	var word = genWordForAlg(alg);
	return word;
}


function printLogicRus(exp,ar) {
	exp=exp.replace(/\|\|/g,' ИЛИ ');
	exp=exp.replace(/\&\&/g,' И ');
	exp=exp.replace(/\!/g,' НЕ ');
	var re = /c\[(\d)\]/g;
	exp = exp.replace(re, function(str,a) { return ar[Number(a)] });
	return exp;
}

function genPifag(){
	return objUmn([[sl(1,5)]],[om.pifagtr.iz().slice()])[0];
}

function mapRecursive(obj,fun){
	if(obj.isFunction){
		return obj;
	}
	if(obj===undefined || obj.isNumber || obj.isString){
		return fun(obj);
	}
	if(obj.isArray){
		var len=obj.length;
		var rez=[];
		for(var i=0;i<len;i++){
			rez[i]=mapRecursive(obj[i],fun);
		}
		return rez;
	}
	if(obj.isObject){
		var rez={};
		for(var chto in obj){
			rez[chto]=mapRecursive(obj[chto],fun);
		}
		return rez;
	}
	return obj;
}

function compareObjects(a,b,propList){
	var len=propList.length;
	for(var i=0;i<len;i++){
		if(a[propList[i]]<b[propList[i]])
			return -1;
		else if (a[propList[i]]>b[propList[i]])
			return 1;
	}
	return 0;
}

function safeinc(obj,prop){
	if(!obj[prop])
		obj[prop]=1;
	else
		obj[prop]++;
}

function setProps(obj,props){
	for(var chto in props){
		obj[chto]=props[chto];
	}
}
