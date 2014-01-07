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
	
	return okrugldo(okrugldo(Math.random() * (k-n),s) + n,s);
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

var sl=sluchch;

function sp(a){//Я просто оставлю это здесь
	for(var i=0,c=a.split('\''),b=[];i<c.length;i++)
		b=b.concat(i%2?c[i]:c[i].split(' '));
	for(var i=0;i<b.length;b.splice(i,!b[i++]));
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

function escapeFromIframe(){
/**"Выпрыгивание" из iframe*/
	if(top.location.href!=document.location.href)
		top.location.href=document.location.href;
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

function AtoB(n){
//n - количество неверных ответов
	n=n?n:3;
	var nev=window.vopr.nev.iz(n);
	var ver=window.vopr.ver.iz();
	var a=[[ver].concat(nev),[].N(n+1)].T().shuffle().T();
	window.vopr.ver=[a[1].pervSovp(1)+1];
	for(var i=0;i<=n;i++){
		window.vopr.txt+='<br/>'+(i+1)+') '+a[0][i];
	}
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
			rez[i][j]=sl(min,max,p1,p2,p3);
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
	var final = '';
	while (x10>0) {
		var t = String(x10 % sysAfter);
		if (x10 % sysAfter >= 10)
			t = String.fromCharCode(String("A").charCodeAt(0)+(x10 % sysAfter)-10);
		x10 = Math.floor(x10/sysAfter);
		final = t+final;
	}
	return(final);
}

function isZ(n){
/**Является ли n целым числом.*/
	return n.isZ();
}

function isPolnKvadr(n){
/**Является ли n полным квадратом.*/
	return n.isPolnKvadr();
}
'use strict';

Object.prototype.clone=function(){
/**Рекурсивно клонирует объект.*/
	return clone(this);
}

Object.prototype.makeAllPropertiesNotEnumerable=function(){
/**Сделать все свойства объекта неперечислимыми.*/
	for(var chto in this)
		Object.defineProperty(this, chto, {enumerable: false});
}

Object.prototype.cloneNonRecursive=function(){
/**Нерекурсивно клонирует объект.*/
	var a={};
	for(var chto in this)
		a[chto]=this[chto];
	return a;
}

Object.prototype.addToGlobal=function(glname,p1){
/**Добавляет все перечислимые свойства объекта в глобальную переменную и, если p1, то делает их в объекте неперечислимыми.*/
	if(window[glname]===undefined)
		window[glname]={};
	for(var chto in this){
		window[glname][chto]=this[chto];
		if(p1)
			Object.defineProperty(this, chto, {enumerable: false});
	}
	return this;
}

Object.prototype.isObject=true;

Object.prototype.addToGlobal('docsObject',1);
'use strict';
Array.prototype.shuffle = function(b){
/**Перемешивает массив случайным образом. Если b, то ещё и рекурсивно на один уровень.*/
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};//взято с tigir.com . Хорошо бы переписать ручками с нуля...

Array.prototype.soed=function(){
/**"Склеивает" массив в строку без разделителей*/
	return this.join('');
};

Array.prototype.sum=function(){
/**Находит сумму элементов числового массива. Если есть нечисловые элементы, они не учитываются.*/
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++){
		if((this[i]>0)||(this[i]<0)){
			a+=this[i];
		}
	}
 return a;
};

Array.prototype.sumObj=function(){
/**Находит сумму массива чисел или матриц.*/
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++){
		a=objSum(a,this[i]);
	}
 return a;
};

Array.prototype.umnObj=function(){
/**Находит произведение массива чисел или матриц.*/
	var a=1;
	var b=this.length;
	for(var i=0;i<b;i++){
		a=objUmn(a,this[i]);
	}
 return a;
};

Array.prototype.min=function(f){
/**Индекс минимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f)
		for(i=1;i<this.length;i++)
			if(this[i]<this[m])
				m=i;
	else
		for(i=1;i<this.length;i++)
			if(this[i]<=this[m])
				m=i;
	return m;
}

Array.prototype.max=function(f){
/**Индекс максимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f){
		for(i=1;i<this.length;i++){
			if(this[i]>this[m]){
				m=i;
			}
		}
	}else{
		for(i=1;i<this.length;i++){
			if(this[i]>=this[m]){
				m=i;
			}
		}
	}
	return m;
}

Array.prototype.minE=function(){
/**Минимальный элемент числового массива.*/
	return this[this.min()];
}

Array.prototype.maxE=function(){
/**Максимальный элемент числового массива.*/
	return this[this.max()];
}

Array.prototype.toStandart=function(){
/**Преобразует каждый элемент массива (строку или число) в строку, записанную "по стандарту".*/
	var len=this.length-1;
	for(;len+1;len--){
		this[len]=this[len].toStandart();
	}
}

Array.prototype.iz=function(p1){
/**Если p1 опущено, возвращает случайный элемент массива, иначе последовательность p1 неповторяющихся элементов массива.*/
	if(p1)
		return sluchiz(this,p1);
	else
		return this[sl(0,this.length-1)];
}

Array.prototype.tr=function(p1,p2){
/**Возвращает строку таблицы с записанными в неё элементами массива.
	p1 и p2 позволяют выбрать тэги, отличные от td и tr соотв.*/
	var len=this.length-1;
	var str='';
	for(;len+1;len--){
		str=this[len].vTag(p1?p1:'td')+str;
	}
	return str.vTag(p2?p2:'tr');
}

Array.prototype.zapslch=function(m,n,p1,p2,p3){
/**Присваивает элементам с m по n случайные значения от p1 до p2 с шагом генерации p3. p2 и p3 можно опускать, как в sluchch()*/
	for(;m<=n;m++)
		this[m]=sluchch(p1,p2,p3);
	return this;
}

Array.prototype.N=function(p1,p2){
/**Присваивает p1 первым элементам массива значения натурального ряда, умноженные на p2, если p2 не ноль*/
	for(var i=0;i<p1;this[i++]=(p2?i*p2:i)){};
	this.length=p1;
	return this;
}

Array.prototype.sluchiz=function(n){
/**Возвращает массив из p1 неповторяющихся элементов массива.*/
	return sluchiz(this,n);
}

Array.prototype.malRazn=function(n,s,p){
/**Заполняет массив значениями, каждое из к-рых отличается от предыдущего не более, чем на s*p, и притом с шагом дискретизации s
 n - сколько элементов добавляем
 s - шаг изменения
 p - максимальное количество шагов изменения (в обе стороны)
*/
	for(var i=1;i<=n;i++)
		this[i]=this[i-1]+s*sluchch(-p,p);
	return this;
}

Array.prototype.pervSovp=function(p1){
/**Возвращает индекс первого элемента, совпавшего с данным, и -1, если таких элементов нет*/
	for(var i=0;i<this.length;i++)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.poslSovp=function(p1){
/**Возвращает индекс последнего элемента, совпавшего с данным, и -1, если таких элементов нет*/
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.sovp=function(p1){
/**Возвращает количество элементов, совпавших с данным, и 0, если таких элементов нет*/
	var s=0;
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			s++;
	return s;
}

Array.prototype.toFixedLess=function(p1){
/**Возвращает массив, в котором каждый элемент - строка, содержащая соттв. элемент данного, округлённый до p1 цифр после запятой*/
	var a=[];
	var len=this.length;
	for(var i=0;i<len;i++)
		a[i]=this[i].toFixedLess(p1);
	return a;
}

Array.prototype.dopFixedLess=function(p1){
/**Дополняет массив элементами, округлёнными до p1 цифр после запятой и представленными в виде строк*/
	var len=this.length;
	for(var i=0;i<len;i++)
		this[i]=[this[i],this[i].toFixedLess(p1)];
	return this;
}

Array.prototype.T=function(){
/**Возвращает транспонированный массив*/
	var l1=this.length;
	var l2=0;
	for(var i=0;i<l1;i++)
		if(this[i].length>l2)
			l2=this[i].length;
	var a=[];
	for(i=0;i<l2;i++)
		a[i]=[];
	for(i=0;i<l1;i++)
		for(var j=0;j<l2;j++)
			a[j][i]=this[i][j];
	return a;
}

Array.prototype.zapMonot=function(n,a,minD,maxD,shag){
/**Заполняет массив монотонно возрастающими или убывающими числами.
a - нулевой (начальный) элемент массива.
n - количество элементов
Каждый следующий элемент массива отличается от предыдущего не менее, чес на minD и не более, чем maxD, с шагом shag*/
	this[0]=a;
	for(var i=1;i<n;i++)
		this[i]=this[i-1]+sluchch(minD,maxD,shag);
	return this;
}

Array.prototype.udFunc=function(f1){
/**Количество элементов, удовлетворяющих в качестве параметра функции, возвращающей 0 или 1. Дикий костыль.*/
	return this.map(f1).sum();
}

Array.prototype.kolvoMzhd=function(min,max,vkl){
/**Возвращает кол-во чисел в массиве, лежащих между min и max, если vkl, то включительно*/
	return this.udFunc(function(p1){
		return vkl?p1>=min&&p1<=max:p1>min&&p1<max;
	});
}

Array.prototype.isArray=true;

Array.prototype.mn_plus=function(p1){
/**Прибавляет к массиву коэффициентов многочлена, записанных по возрастанию степеней, другой такой массив.
Текущий массив не изменяет!
*/
	var b=this.slice()
	if(p1.isNumber){
		b[0]+=p1;
		return b;
	}
	if(!p1.isArray)
		return this;
	if(p1.length>this.length)
		return p1.mn_plus(this);

	var len=p1.length;
	for(var i=0; i<len;i++)
		b[i]+=p1[i];
	return b;
}

Array.prototype.mn_umn=function(p1){
/**Умножает массив коэффициентов многочлена, записанных по возрастанию степеней, на другой такой массив.
Текущий массив не изменяет!
*/
	var b=this.slice()
	if(p1.isNumber){
		return this.map(function(p2){return p1*p2;});
	}
	if(!p1.isArray){
		return this;
	}
	if(p1.length>this.length){
		return p1.mn_umn(this);
	}
	var c=p1.slice()
	var d=[];
	var len=p1.length;
	for(var i=0; i<len;i++){
		d=d.mn_plus(b.mn_umn(p1[i]));
		b.unshift(0);
	}
	return d;
}

Array.prototype.slag=function(){
/**Перемешивает массив в случайном порядке и радостно соединяет плюсиками.*/
	return this.shuffle().join('+');
}

Array.prototype.addPrefix=function(p1){
/**Добавляет к каждому элементы массива префикс p1.
Текущий массив не изменяет!*/
	return this.map(function(p2){return p1+p2;});
}

Array.prototype.toSum=function(a){
/**Возвращает массив, элементы которого пропорциональны элементам данного, но их сумма равна a или 1, если a не указано*/
	if(a==undefined)
		a=1;
	var s=this.sum();
	return this.map(function(p1){return a*p1/s});
}

Array.prototype.sumPyram=function(){
/**Присваивает каждому элементу массива значение суммы всех предыдущих*/
	for(var i=1;i<this.length;i++)
		this[i]+=this[i-1];
	return this;
}

Array.prototype.sVeroyatn=function(){
/**Возвращает номер элемента массива с вероятностью, пропорциональной значению элемента*/
	var th=this.toSum().sumPyram();
	var a=Math.random();
	var i;
	for(i=0; a>th[i] && i<th.length ;i++){};
	return i;
}

Array.prototype.hasElem=function(a){
/**Определяет, есть ли в массиве заданный элемент*/
	return this.some(function(p1){
		return p1==a;
	});
}

Array.prototype.matrToVect=function(n){
/**Раскладывает m-мерный массив в (m-n)-мерный. Если n не указано, то принимается равным 1.*/
	if(n>1)
		return this.matrToVect(n-1).matrToVect();
	else{
		var rez=[];
		var len=this.length;
		for(var i=0;i<len;i++){
			rez=rez.concat(this[i]);
		}
		return rez;
	}
}

Array.prototype.ob$=function(){
/**Возвращает массив, в котором элементы данного приведены к строкам и окружены символами $ (начало или конец формулы)*/
	return this.map(function(p1){
		return (''+p1).ob$();
	});
}

Array.prototype.sortDelDubl=function(p1){
/**Отсортировать копию массива по функции p1 (может быть опущена) и удалить дублирующиеся элементы*/
	if(this===[])
		return [];
	var a=this.slice().sort(p1);
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			a.splice(i--,1);
	return a;
}

Array.prototype.matrixToTex=function(){
/**Возвращает строку - представление массива как матрицы в TeX-нотации.*/
	if(this==[])
		return '';
	return '\\begin{array}{c}'+
		this.map(function(p1){
			return p1.isArray?
				p1.join(' & '):
				p1;
		}).join('\\\\')+
		'\\end{array}';
}

Array.prototype.det=function(){
/**Функция-обёртка. Возвращает определитель матрицы.*/
	return Determinant(this);
}

Array.prototype.inv=function(){
/**Функция-обёртка. Возвращает обратную матрицу.*/
	return InverseMatrix(this);
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';

Array.prototype.mt_prov=function(kolvo){
/**Проверяет, можно ли трактовать каждый элемент массива как точку, т. е.
у каждого ли элемента массива есть свойства x и y,
и, если kolvo, то есть ли в данном массиве kolvo точек.*/
	if(this.length<kolvo)
		return 0;
	var fl=true;
	var len=this.length-1;
	for(;(len+1) && fl;len--)
		fl=fl&&(this[len].x!=undefined)&&(this[len].y!=undefined);
	return fl;
};

Array.prototype.mt_s3ug=function(){
/**Площадь треугольника, вершины которого - первые три элемента массива точек.*/
	if(!this.mt_prov(3))
		return 0;
	return 0.5*(this[0].x*this[1].y+this[0].y*this[2].x+this[1].x*this[2].y-this[1].y*this[2].x-this[2].y*this[0].x-this[0].y*this[1].x).abs();
};

Array.prototype.mt_tgUnakl=function(){
/**Возвращает тангенс угла наклона прямой, проходящей через две первые точки массива.*/
	if(!this.mt_prov(2))
		return undefined;
	if(!(this[0].y-this[1].y))
		return 0;
	return (this[0].y-this[1].y)/(this[0].x-this[1].x);
}

Array.prototype.mt_is3ug=function(){
/**Проверяет, образуют ли три данные точки треугольник. 
Можно использовать и для того, чтобы выяснить, лежат ли три данные точки на одной прямой.*/
	if(!this.mt_prov(3))
		return 0;
	return this.mt_tgUnakl()!=[this[1],this[2]].mt_tgUnakl();
};

Array.prototype.mt_uPeres=function(){
/**Угол пересечения прямых, проходящих через первые две пары точек.*/
	if(!this.mt_prov(4))
		return 0;
	var u=(this.mt_tgUnakl().atan()-[this[2],this[3]].mt_tgUnakl().atan()).abs();
	for(;u>=Math.PI;u=u-Math.PI){};
	for(;u>Math.PI/2;u=u-Math.PI/2){};
	return u;
};

Array.prototype.mt_isMnug=function(p1){
/**Проверяет, задаёт ли массив точек p1-угольник.
При вызове без параметра - многоугольник.*/
	if(
			(p1!=undefined)&&(this.length!=p1)
		||	(!this.mt_prov(3))
		||	(this.mt_dubli())
		||	(this.mt_estSamoper())
		){
			return 0;
	}
	
	var len=this.length-1;
	var fl=1;
	
	fl*=[this[0],this[len],this[len-1]].mt_is3ug();
	fl*=[this[0],this[1],this[len]].mt_is3ug();
	for(;len-1;len--)
		fl*=[this[len],this[len-1],this[len-2]].mt_is3ug();

	return fl;
};

Array.prototype.mt_rasst=function(){
/**Расстояние между двумя первыми точками массива.*/
	if(!this.mt_prov(2))
		return undefined;
	return ((this[0].x-this[1].x).pow(2)+(this[0].y-this[1].y).pow(2)).sqrt();
};

Array.prototype.mt_s4ug=function(){
/**Площадь четырёхугольника.*/
	if(!this.mt_isMnug(4))
		return undefined;
	return 0.5*[this[0],this[2]].mt_rasst()*[this[1],this[3]].mt_rasst()*[this[0],this[2],this[1],this[3]].mt_uPeres().sin();
};

Array.prototype.mt_dubli=function(){
/**Есть ли в массиве повторяющиеся точки*/
	if(!this.mt_prov())
		return undefined;
	var len;
	var l2;
	for(len=this.length-1;len+1;len--)
		for(l2=this.length-1;l2>len;l2--)
			if(this[len].x==this[l2].x&&this[len].y==this[l2].y);
				return 1;
	return 0;
};

Array.prototype.mt_pryam=function(){
/**Возвращает коэффициенты a и b прямой y=ax+b, проходящей через две первые точки.*/
	if(!this.mt_prov(2))
		return undefined;
	var a=this.mt_tgUnakl();
	if(a.abs()==Infinity)
		var b=this[0].x;
	else
		var b=this[0].y-a*this[0].x;
	return {a:a,b:b};
};

Array.prototype.mt_join=function(p1){
/**Возращает строку - координаты точек через запятую.*/
	if(!this.mt_prov())
		return undefined;
	if(!p1)
		p1=', ';
	var p2='';
	var len=this.length-1;
	for(var l2=0;l2<len;l2++)
		p2+='('+this[l2].x+'; '+this[l2].y+')'+p1;
	p2+='('+this[l2].x+'; '+this[l2].y+')';
	return p2;
}

Array.prototype.mt_otrPeres=function(){
/**Количество точек пересечения двух отрезков, задаваемых первыми парами точек.*/
	if(!this.mt_prov())
		return undefined;
	var p1=[[this[0],this[1]].mt_pryam(),[this[2],this[3]].mt_pryam()].mp_tPeres();
	if(p1.x==Infinity)
		return Infinity;
	else if(p1.x.mzhd(this[0].x,this[1].x,1)&&p1.x.mzhd(this[2].x,this[3].x,1)&&p1.y.mzhd(this[0].y,this[1].y,1)&&p1.y.mzhd(this[2].y,this[3].y,1))
		return 1;
	return 0;
}

Array.prototype.mt_estSamoper=function(){
/**Имеет ли ломанная, образованная точками, самопересечения.*/	
	if(!this.mt_prov(3))
		return undefined;
	var len=this.length;
	var th=this.concat(this,this);
	var fl=0;
	for(var l1=0;l1<len;l1++)
		for(var l2=l1+2;l2<=l1+len-2;l2++)
			fl+=[th[l1],th[l1+1],th[l2],th[l2+1]].mt_otrPeres();
	return fl;
}

Array.prototype.mt_ladMnug=function(){
/**Перемешивать точки до тех пор, пока не получится многоугольник.*/
	if(		(!this.mt_prov(3))
		||	(this.mt_dubli())
	)
		return 0;
	
	for(;!this.mt_isMnug();this.shuffle());
	//Крайне криво, но думать лень.
	return this;
}

Array.prototype.mt_perpend=function(){
/**Перпендикулярны ли прямые, задаваемые первыми двумя парами точек.*/
	return (this.mt_uPeres()==Math.PI/2);
}

Array.prototype.mt_paral=function(){
/**Параллельны ли прямые, задаваемые первыми двумя парами точек.*/
	return this.mt_uPeres()==0;
}

Array.prototype.mt_imen4ug=function(){
/**Называет четырёхугольник.*/
	if(!this.mt_isMnug(4)){return 0;};
	var A=this[0];
	var B=this[1];
	var C=this[2];
	var D=this[3];
	var prug=	([A,B,B,C].mt_perpend())&&
				([B,C,C,D].mt_perpend())&&
				([A,D,D,C].mt_perpend());
	var rstor=	([A,B].mt_rasst()==[A,D].mt_rasst())*
				([C,B].mt_rasst()==[C,D].mt_rasst())+
				([B,A].mt_rasst()==[B,C].mt_rasst())*
				([D,A].mt_rasst()==[D,C].mt_rasst());
	var paral=	([A,B,C,D].mt_paral())+
				([A,D,B,C].mt_paral());
	if(prug&&(rstor==2))
		return lx['квадрат'];
	else if(prug)
		return lx['прямоугольник'];
	else if(rstor==2)
		return lx['ромб'];
	else if(paral==2)
		return lx['параллелограмм'];
	else if(paral==1)
		return lx['трапеция'];
	else if(rstor==1)
		return lx['дельтоид'];
	else
		return lx['четырёхугольник'];
};

Array.prototype.addToGlobal('docsArray',1);
'use strict';

Array.prototype.mp_prov=function(){
/**Проверяет, можно ли трактовать массив как массив прямых, 
т. е. у каждого ли элемента массива есть свойства a и b*/
	var fl=true;
	var len=this.length-1;
	for(;(len+1)&&fl;len--)
		fl=fl&&(this[len].a!=undefined)&&(this[len].b!=undefined);
	return fl;
}

Array.prototype.mp_tPeres=function(){
/**Находит точку пересечения первых двух прямых.*/
	if(!this.mp_prov())
		return undefined;
	
	var x;
	var y;
	if(this[0].a.abs()==Infinity){
		x=this[0].b;
		y=this[1].a*x+this[1].b;
	}else if(this[1].a.abs()==Infinity){
		x=this[1].b;
		y=this[0].a*x+this[0].b;
	}else{
		var c=this[1].a-this[0].a;
		if(c==0)
			if(this[0].b==this[1].b)
				x=y=Infinity;
			else
				x=y=NaN;
		else{
			x=(this[0].b-this[1].b)/(this[1].a-this[0].a);
			y=this[0].a*x+this[0].b;
		}
	}	
	return {x:x,y:y};
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';
Array.prototype.mn_proizv=function(){
/**Находит производную от многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива.*/
	var len=this.length;
	var th=[];
	for(var i=0;i<len-1;i++){
		th[i]=clone(this[i+1]);
		th[i]=Drob.fixN(th[i]);
		th[i].ch=th[i].ch*(i+1);
		Drob.sokr(th[i]);
	}
	return th;
}

Array.prototype.mn_vychisl=function(x){
/**Находит значение многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива,
при значении переменной, равном x*/
	var len=this.length;
	var s=0;
	for(var i=0;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		s+=this[i].ch*x.pow(i)/this[i].zn;
	}
	return s;
}

Array.prototype.mn_txt=function(x){
/**TeX-представление многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива, x - символ переменной.*/
	var len=this.length;
	this[0]=Drob.fixN(this[0]);
	var s=this[0].ch.frac(this[0].zn).esli(this[0].ch);
	for(var i=1;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		if(this[i].ch){
			s= this[i].ch.frac(this[i].zn)+x+('^{'+i+'}').esli(i!=1)
				+'+'+s;
		}
	}
	return s.plusminus();
}

Array.prototype.mn_pervoobr=function(){
/**Находит первообразную (C=0) от многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива.*/
	var len=this.length;
	var th=[0];
	for(var i=1;i<len+1;i++){
		th[i]=clone(this[i-1]);
		th[i]=Drob.fixN(th[i]);
		th[i].zn=th[i].zn*i;
		Drob.sokr(th[i]);
	}
	return th;
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';

Array.prototype.pe_inv=function(){
/**Количество инверсий в перестановке, образованной элементами массива.*/
	var perest=0;
	var len=this.length;
	for(var i=0;i<len;i++)
		for(var j=i;j<len;j++)
			if(this[i]>this[j])
				perest++;
	return perest;
}

Array.prototype.pe_txt=function(){
/**Перестановка, образованная элементами массива, в TeX-нотации.*/
	return "$\\left("+this.join(";")+"\\right)$";
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';
CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}

CanvasRenderingContext2D.prototype.setka=function(s,n){
	var i=-n;
	for(;i<=n;i++){
		this.drawLine(-s*n,s*i,s*n,s*i);
		this.drawLine(s*i,-s*n,s*i,s*n);
	}
}

CanvasRenderingContext2D.prototype.setkaXY=function(s,n1,n2,n3,n4){
	for(var i=n1;i<=n2;i++){
		this.drawLine(s*i,s*n3,s*i,s*n4);

	}
	for(i=n3;i<=n4;i++){

		this.drawLine(s*n1,s*i,s*n2,s*i);
	}
//		this.drawLine(s*n1,s*i,s*n,s*i);
}

CanvasRenderingContext2D.prototype.fillKrug=function(x,y,r){
	this.beginPath();
    this.arc(x,y, r, 0, 2*Math.PI, false);
    this.fill();
}

CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;

/*Иначе огнелисичка матюкается
var docsCanvas;
if(!docsCanvas)
	docsCanvas={};

for(var chto in CanvasRenderingContext2D.prototype){
	docsCanvas[chto]=CanvasRenderingContext2D.prototype[chto];
//	Object.defineProperty(CanvasRenderingContext2D.prototype, chto, { enumerable: false });
}*/
'use strict';
Number.prototype.toFixedLess=function(n){
/**Возвращает строку - предсиавление числа с не более чем n знаками после запятой.*/
	var a=this.toFixed(n);
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl()){};
	for(;a.posl()=='.';a=a.udalPosl()){};
	return a;
}

Number.prototype.pm=function(){
/**Случайным образом возвращает число или ему противоположное.*/
	return sl1()?this:-this;
}

Number.prototype.dopdo=function(c,n){
/**Возвращает строковое представление числа, дополненное спереди строками c до длины не менее n*/
		return (''+this).dopdo(c,n);
}

Number.prototype.isZ=function(){
/**Проверяет, является ли число целым.*/
	return this-this.floor()==0;
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
/**Находит ли число между a и b, если c - то включительно. a и b можно не упорядочивать.*/
	var p1=[a,b];
	var p2=p1[p1.max()];
	var p3=p1[p1.min()];
	return (this<p2)&&(this>p3)||((this==p2)||(this==p3))&&(!!c);
}

Number.prototype.polozh=function(){
/**Если число положительно, вернёт его, иначе 0.*/
	return this<0?0:this;
}

Number.prototype.nod=function(p1){
/**НОД данного числа и p1*/
	var a,b;
	a=this<0?-this:this;
	b=p1<0?-p1:p1;
	if(a==b) return a;
	if((a==1)||(b==1))return 1;
	if(a==0) return b;
	if(b==0) return a;
	if(a>b) return b.nod(a%b);
			return a.nod(b%a);
}

Number.prototype.pina=function(p1){
/**TeX-представление дроби, у которой в числителе данное число, умнолженное на пи, а в знаменателе p1.
Случай p1=1 учитывается.*/
	var a1={ch:this,zn:p1};
	Drob.sokr(a1);
	if(a1.ch==0)
		return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'':a1.ch)+'\\pi'+('}{'+a1.zn+'}').esli(a1.zn!=1);
}

Number.prototype.koren=function(p1){
/**TeX-представление корня из данного числа.
Если данное число  полный квадрат, то само число.
Если p1, то из-под корня будут вынесены возможные множители.*/
	if(this.isPolnKvadr())
		return this.ts();
	var a='';
	var t=this;
	if(p1){
		a=this.polnKvadrMnozh();
		t=t/a.sqr();
	}
	return a+'\\sqrt{'+t.ts()+'}';
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

Number.prototype.frac=function(p1){
/**TeX-представление дроби, у которой в числителе данное число, а в знаменателе p1.
Случай p1=1 учитывается.*/
	var a1={ch:this,zn:p1};
	if(p1.isString)
		return ('\\frac{').esli(a1.zn!='1')+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!='1');
	
	Drob.sokr(a1);
	if(a1.ch==0)return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
}

Number.prototype.fracstr=function(p1,str){
/**TeX-представление дроби с числителем - произведением данного числа и строки str и знаменателем p1.*/
	var a1={ch:this,zn:p1};
	if(p1.isString)
		return 
			a1.zn!=1?
			'\\frac{'+a1.ch+str+'}{'+a1.zn+'}':
			'{'+a1.ch+str+'}';
	
	Drob.sokr(a1);
	if(!a1.ch)
		return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?str:a1.ch+str)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
}

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
полученное словосочетанию стоит в падеже p2 (есдли не указан - именительный).*/
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
	return okrugldo(this.p1);
}

Number.prototype.fct=function(){
/**Факториал числа.*/
	return this>0?(this-1).fct()*this:1;
}

Number.prototype.isNumber=true;

Number.prototype.addToGlobal('docsNumber',1);
'use strict';

Number.prototype.pow=function(n){
/**Возвращает число в степени n*/
	return Math.pow(this,n);
}

Number.prototype.sqrt=function(){
/**Квадратный корень из числа.*/
	return Math.sqrt(this);
}

Number.prototype.sqr=function(){
/**Квадрат числа.*/
	return Math.pow(this,2);
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

String.prototype.addToGlobal('docsString',1);
'use strict';

Function.prototype.toStr=function(){
/**Возвращает код функции в виде строки*/
	return ''+this;
}

Function.prototype.telo=function(){
/**Возвращает тело функции в виде строки*/
	return this.toStr().replace(/}$/,'').replace(/^function \(.*\){/,'');
}

Function.prototype.zagl=function(){
/**Возвращает заголовок функции в виде строки*/
	return /^function \(.*\)/.exec(this.toStr())[0];
}

Function.prototype.attr=function(){
/**Возвращает список параметров функции в виде строки*/
	return this.zagl().replace(/^function /,'');
}

Function.prototype.codeComment=function(){
/**Возвращает первый документационный комментарий внутри функции - такой, как этот.*/
	try{
	return /\/\*\*.*?[\s\S]*?\*\//m.
		exec(this.toStr())[0].
		replace(/^\/\*\*/,'').
		replace(/\*\/$/,'');
	}catch(e){
		return '';
	}
}

Function.prototype.isFunction=true;

Function.prototype.addToGlobal('docsFunction',1);
'use strict';

RegExp.prototype.isRegExp=true;

RegExp.prototype.addToGlobal('docsRegExp',1);
////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//	de: дательный		падеж единственного	числа
//	ve: винительный		падеж единственного	числа
//	te: творительный	падеж единственного	числа
//	pe: предложный		падеж единственного	числа
//	ie: именительный	падеж множественного	числа
//	re: родительный		падеж множественного	числа
//	de: дательный		падеж множественного	числа
//	ve: винительный		падеж множественного	числа
//	te: творительный	падеж множественного	числа
//	pe: предложный		падеж множественного	числа
//
//	rod: род:
//		0: мужской
//		1: женский
//		2: средний
//		3: только множественное число
//
//	odu: одушевлённость:
//		0: неодушевлённое
//		1: одушевлённое
//
//	skl: склонение:
//		0: несклоняемое
//		1: первое
//		2: второе
//		3: третье
//		4: разносклоняемые существительные
////////////////////////////////////////////////////////////////////////
if(lx==undefined)
	var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////


//{{Существительные
lx['август']={
	ie:'август',
	re:'августа',
	de:'августу',
	ve:'август',
	te:'августом',
	pe:'августе',
	im:'августы',
	rm:'августов',
	dm:'августам',
	vm:'августы',
	tm:'августами',
	pm:'августах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Австралия']={
	ie:'Австралия',
	re:'Австралии',
	de:'Австралии',
	ve:'Австралию',
	te:'Австралией',
	pe:'Австралии',
	im:'Австралии',
	rm:'Австралий',
	dm:'Австралиям',
	vm:'Австралии',
	tm:'Австралиями',
	pm:'Австралиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Австрия']={
	ie:'Австрия',
	re:'Австрии',
	de:'Австрии',
	ve:'Австрию',
	te:'Австрией',
	pe:'Австрии',
	im:'Австрии',
	rm:'Австрий',
	dm:'Австриям',
	vm:'Австрии',
	tm:'Австриями',
	pm:'Австриях',
	rod:1,
	skl:1,
	odu:0,
};
lx['автобус']={
	ie:'автобус',
	re:'автобуса',
	de:'автобусу',
	ve:'автобус',
	te:'автобусом',
	pe:'автобусе',
	im:'автобусы',
	rm:'автобусов',
	dm:'автобусам',
	vm:'автобусы',
	tm:'автобусами',
	pm:'автобусах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['автомобиль']={
	ie:'автомобиль',
	re:'автомобиля',
	de:'автомобилю',
	ve:'автомобиль',
	te:'автомобилем',
	pe:'автомобиле',
	im:'автомобили',
	rm:'автомобилей',
	dm:'автомобилям',
	vm:'автомобили',
	tm:'автомобилями',
	pm:'автомобилях',
	rod:0,
	skl:2,
	odu:0,
};
lx['аквариум']={
	ie:'аквариум',
	re:'аквариума',
	de:'аквариуму',
	ve:'аквариум',
	te:'аквариумом',
	pe:'аквариуме',
	im:'аквариумы',
	rm:'аквариумов',
	dm:'аквариумам',
	vm:'аквариумы',
	tm:'аквариумами',
	pm:'аквариумах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Анастасия']={
	ie:'Анастасия',
	re:'Анастасии',
	de:'Анастасии',
	ve:'Анастасию',
	te:'Анастасией',
	pe:'Анастасии',
	im:'Анастасии',
	rm:'Анастасий',
	dm:'Анастасиям',
	vm:'Анастасий',
	tm:'Анастасиями',
	pm:'Анастасиях',
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
};
lx['Анатольевна']={
	ie:'Анатольевна',
	re:'Анатольевны',
	de:'Анатольевне',
	ve:'Анатольевну',
	te:'Анатольевной',
	pe:'Анатольевне',
	im:'Анатольевны',
	rm:'Анатольевн',
	dm:'Анатольевнам',
	vm:'Анатольевн',
	tm:'Анатольевнами',
	pm:'Анатольевнах',
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
};
lx['Англия']={
	ie:'Англия',
	re:'Англии',
	de:'Англии',
	ve:'Англию',
	te:'Англией',
	pe:'Англии',
	im:'Англии',
	rm:'Англий',
	dm:'Англиям',
	vm:'Англии',
	tm:'Англиями',
	pm:'Англиях',
	rod:1,
	skl:1,
	odu:0,
	sbs:1,
};
lx['апрель']={
	ie:'апрель',
	re:'апреля',
	de:'апрелю',
	ve:'апрель',
	te:'апрелем',
	pe:'апреле',
	im:'апрели',
	rm:'апрелей',
	dm:'апрелям',
	vm:'апрели',
	tm:'апрелями',
	pm:'апрелях',
	rod:0,
	skl:2,
	odu:0,
};
lx['аспирантка']={
	ie:'аспирантка',
	re:'аспирантки',
	de:'аспирантке',
	ve:'аспирантку',
	te:'аспиранткой',
	pe:'аспирантке',
	im:'аспирантки',
	rm:'аспиранток',
	dm:'аспиранткам',
	vm:'аспиранток',
	tm:'аспирантками',
	pm:'аспирантках',
	rod:1,
	skl:1,
	odu:0,
};
lx['атомоход']={
	ie:'атомоход',
	re:'атомохода',
	de:'атомоходу',
	ve:'атомоход',
	te:'атомоходом',
	pe:'атомоходе',
	im:'атомоходы',
	rm:'атомоходов',
	dm:'атомоходам',
	vm:'атомоходы',
	tm:'атомоходами',
	pm:'атомоходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['бадминтон']={
	ie:'бадминтон',
	re:'бадминтона',
	de:'бадминтону',
	ve:'бадминтон',
	te:'бадминтоном',
	pe:'бадминтоне',
	im:'бадминтоны',
	rm:'бадминтонов',
	dm:'бадминтонам',
	vm:'бадминтоны',
	tm:'бадминтонами',
	pm:'бадминтонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['батон']={
	ie:'батон',
	re:'батона',
	de:'батону',
	ve:'батон',
	te:'батоном',
	pe:'батоне',
	im:'батоны',
	rm:'батонов',
	dm:'батонам',
	vm:'батоны',
	tm:'батонами',
	pm:'батонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Белоруссия']={
	ie:'Белоруссия',
	re:'Белоруссии',
	de:'Белоруссии',
	ve:'Белоруссию',
	te:'Белоруссией',
	pe:'Белоруссии',
	im:'Белоруссии',
	rm:'Белоруссий',
	dm:'Белоруссиям',
	vm:'Белоруссии',
	tm:'Белоруссиями',
	pm:'Белоруссиях',
	rod:1,
	skl:1,
	odu:0,
	sbs:1,
};
lx['Бельгия']={
	ie:'Бельгия',
	re:'Бельгии',
	de:'Бельгии',
	ve:'Бельгию',
	te:'Бельгией',
	pe:'Бельгии',
	im:'Бельгии',
	rm:'Бельгий',
	dm:'Бельгиям',
	vm:'Бельгии',
	tm:'Бельгиями',
	pm:'Бельгиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['бензин']={
	ie:'бензин',
	re:'бензина',
	de:'бензину',
	ve:'бензин',
	te:'бензином',
	pe:'бензине',
	im:'бензины',
	rm:'бензинов',
	dm:'бензинам',
	vm:'бензины',
	tm:'бензинами',
	pm:'бензинах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['бетон']={
	ie:'бетон',
	re:'бетона',
	de:'бетону',
	ve:'бетон',
	te:'бетоном',
	pe:'бетоне',
	im:'бетоны',
	rm:'бетонов',
	dm:'бетонам',
	vm:'бетоны',
	tm:'бетонами',
	pm:'бетонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['блондинка']={
	ie:'блондинка',
	re:'блондинки',
	de:'блондинке',
	ve:'блондинку',
	te:'блондинкой',
	pe:'блондинке',
	im:'блондинки',
	rm:'блондинок',
	dm:'блондинкам',
	vm:'блондинок',
	tm:'блондинками',
	pm:'блондинках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Бразилия']={
	ie:'Бразилия',
	re:'Бразилии',
	de:'Бразилии',
	ve:'Бразилию',
	te:'Бразилией',
	pe:'Бразилии',
	im:'Бразилии',
	rm:'Бразилий',
	dm:'Бразилиям',
	vm:'Бразилии',
	tm:'Бразилиями',
	pm:'Бразилиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['брус']={
	ie:'брус',
	re:'бруса',
	de:'брусу',
	ve:'брус',
	te:'брусом',
	pe:'брусе',
	im:'брусья',
	rm:'брусьев',
	dm:'брусьям',
	vm:'брусья',
	tm:'брусьями',
	pm:'брусьях',
	rod:0,
	skl:2,
	odu:0,
};
lx['булавка']={
	ie:'булавка',
	re:'булавки',
	de:'булавке',
	ve:'булавку',
	te:'булавкой',
	pe:'булавке',
	im:'булавки',
	rm:'булавок',
	dm:'булавкам',
	vm:'булавки',
	tm:'булавками',
	pm:'булавках',
	rod:1,
	skl:1,
	odu:0,
};
lx['бутерброд']={
	ie:'бутерброд',
	re:'бутерброда',
	de:'бутерброду',
	ve:'бутерброд',
	te:'бутербродом',
	pe:'бутерброде',
	im:'бутерброды',
	rm:'бутербродов',
	dm:'бутербродам',
	vm:'бутерброды',
	tm:'бутербродами',
	pm:'бутербродах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Васильевна']={
	ie:'Васильевна',
	re:'Васильевны',
	de:'Васильевне',
	ve:'Васильевну',
	te:'Васильевной',
	pe:'Васильевне',
	im:'Васильевны',
	rm:'Васильевн',
	dm:'Васильевнам',
	vm:'Васильевн',
	tm:'Васильевнами',
	pm:'Васильевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['веб-дизайнер']={
	ie:'веб-дизайнер',
	re:'веб-дизайнера',
	de:'веб-дизайнеру',
	ve:'веб-дизайнера',
	te:'веб-дизайнером',
	pe:'веб-дизайнере',
	im:'веб-дизайнеры',
	rm:'веб-дизайнеров',
	dm:'веб-дизайнерам',
	vm:'веб-дизайнеров',
	tm:'веб-дизайнерами',
	pm:'веб-дизайнерах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ведомство']={
	ie:'ведомство',
	re:'ведомства',
	de:'ведомству',
	ve:'ведомство',
	te:'ведомством',
	pe:'ведомстве',
	im:'ведомства',
	rm:'ведомств',
	dm:'ведомствам',
	vm:'ведомства',
	tm:'ведомствами',
	pm:'ведомствах',
	rod:2,
	skl:2,
	odu:0,
};
lx['велосипед']={
	ie:'велосипед',
	re:'велосипеда',
	de:'велосипеду',
	ve:'велосипед',
	te:'велосипедом',
	pe:'велосипеде',
	im:'велосипеды',
	rm:'велосипедов',
	dm:'велосипедам',
	vm:'велосипеды',
	tm:'велосипедами',
	pm:'велосипедах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Венесуэла']={
	ie:'Венесуэла',
	re:'Венесуэлы',
	de:'Венесуэле',
	ve:'Венесуэлу',
	te:'Венесуэлой',
	pe:'Венесуэле',
	im:'Венесуэлы',
	rm:'Венесуэл',
	dm:'Венесуэлам',
	vm:'Венесуэлы',
	tm:'Венесуэлами',
	pm:'Венесуэлах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Вероника']={
	ie:'Вероника',
	re:'Вероники',
	de:'Веронике',
	ve:'Веронику',
	te:'Вероникой',
	pe:'Веронике',
	im:'Вероники',
	rm:'Вероник',
	dm:'Вероникам',
	vm:'Вероник',
	tm:'Верониками',
	pm:'Верониках',
	rod:1,
	skl:1,
	odu:0,
};
lx['верста']={
	ie:'верста',
	re:'версты',
	de:'версте',
	ve:'версту',
	te:'верстой',
	pe:'версте',
	im:'вёрсты',
	rm:'вёрст',
	dm:'вёрстам',
	vm:'вёрсты',
	tm:'вёрстами',
	pm:'вёрстах',
	rod:1,
	skl:1,
	odu:0,
};
lx['витрина']={
	ie:'витрина',
	re:'витрины',
	de:'витрине',
	ve:'витрину',
	te:'витриной',
	pe:'витрине',
	im:'витрины',
	rm:'витрин',
	dm:'витринам',
	vm:'витрины',
	tm:'витринами',
	pm:'витринах',
	rod:1,
	skl:1,
	odu:0,
};
lx['вода']={
	ie:'вода',
	re:'воды',
	de:'воде',
	ve:'воду',
	te:'водой',
	pe:'воде',
	im:'воды',
	rm:'вод',
	dm:'водам',
	vm:'воды',
	tm:'водами',
	pm:'водах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Воронеж']={
	ie:'Воронеж',
	re:'Воронежа',
	de:'Воронежу',
	ve:'Воронеж',
	te:'Воронежом',
	pe:'Воронеже',
	im:'Воронежи',
	rm:'Воронежей',
	dm:'Воронежам',
	vm:'Воронежи',
	tm:'Воронежами',
	pm:'Воронежах',
	rod:0,
	skl:2,
	odu:0,
	sbs:1,
	chr:1,
};
lx['воскресенье']={
	ie:'воскресенье',
	re:'воскресенья',
	de:'воскресенью',
	ve:'воскресенье',
	te:'воскресеньем',
	pe:'воскресенье',
	im:'воскресенья',
	rm:'воскресений',
	dm:'воскресеньям',
	vm:'воскресенья',
	tm:'воскресеньями',
	pm:'воскресеньях',
	rod:2,
	skl:2,
	odu:0,
};
lx['время']={
	ie:'время',
	re:'времени',
	de:'времени',
	ve:'время',
	te:'временем',
	pe:'времени',
	im:'времена',
	rm:'времён',
	dm:'временам',
	vm:'времена',
	tm:'временами',
	pm:'временах',
	rod:0,
	skl:4,
	odu:0,
};
lx['вторник']={
	ie:'вторник',
	re:'вторника',
	de:'вторнику',
	ve:'вторник',
	te:'вторником',
	pe:'вторнике',
	im:'вторники',
	rm:'вторников',
	dm:'вторникам',
	vm:'вторники',
	tm:'вторниками',
	pm:'вторниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['выступление']={
	ie:'выступление',
	re:'выступления',
	de:'выступлению',
	ve:'выступление',
	te:'выступлением',
	pe:'выступлении',
	im:'выступления',
	rm:'выступлений',
	dm:'выступлениям',
	vm:'выступления',
	tm:'выступлениями',
	pm:'выступлениях',
	rod:2,
	skl:2,
	odu:0,
	sbs:0,
	chr:1,
	rmn:'выступлениев',
};
lx['газ']={
	ie:'газ',
	re:'газа',
	de:'газу',
	ve:'газ',
	te:'газом',
	pe:'газе',
	im:'газы',
	rm:'газов',
	dm:'газам',
	vm:'газы',
	tm:'газами',
	pm:'газах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['гараж']={
	ie:'гараж',
	re:'гаража',
	de:'гаражу',
	ve:'гараж',
	te:'гаражом',
	pe:'гараже',
	im:'гаражы',
	rm:'гаражов',
	dm:'гаражам',
	vm:'гаражы',
	tm:'гаражами',
	pm:'гаражах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Германия']={
	ie:'Германия',
	re:'Германии',
	de:'Германии',
	ve:'Германию',
	te:'Германией',
	pe:'Германии',
	im:'Германии',
	rm:'Германий',
	dm:'Германиям',
	vm:'Германии',
	tm:'Германиями',
	pm:'Германиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['гимнастика']={
	ie:'гимнастика',
	re:'гимнастики',
	de:'гимнастике',
	ve:'гимнастику',
	te:'гимнастикой',
	pe:'гимнастике',
	im:'гимнастики',
	rm:'гимнастик',
	dm:'гимнастикам',
	vm:'гимнастики',
	tm:'гимнастиками',
	pm:'гимнастиках',
	rod:1,
	skl:1,
	odu:0,
};
lx['город']={
	ie:'город',
	re:'города',
	de:'городу',
	ve:'город',
	te:'городом',
	pe:'городе',
	im:'города',
	rm:'городов',
	dm:'городам',
	vm:'города',
	tm:'городами',
	pm:'городах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['городок']={
	ie:'городок',
	re:'городка',
	de:'городку',
	ve:'городок',
	te:'городком',
	pe:'городке',
	im:'городки',
	rm:'городков',
	dm:'городкам',
	vm:'городки',
	tm:'городками',
	pm:'городках',
	rod:0,
	skl:2,
	odu:0,
};
lx['гравий']={
	ie:'гравий',
	re:'гравия',
	de:'гравию',
	ve:'гравий',
	te:'гравием',
	pe:'гравии',
	im:'гравии',
	rm:'гравиев',
	dm:'гравиям',
	vm:'гравии',
	tm:'гравиями',
	pm:'гравиях',
	rod:0,
	skl:2,
	odu:0,
};
lx['гранит']={
	ie:'гранит',
	re:'гранита',
	de:'граниту',
	ve:'гранит',
	te:'гранитом',
	pe:'граните',
	im:'граниты',
	rm:'гранитов',
	dm:'гранитам',
	vm:'граниты',
	tm:'гранитами',
	pm:'гранитах',
	rod:0,
	skl:2,
	odu:0,
};
lx['грузовик']={
	ie:'грузовик',
	re:'грузовика',
	de:'грузовику',
	ve:'грузовик',
	te:'грузовиком',
	pe:'грузовике',
	im:'грузовики',
	rm:'грузовиков',
	dm:'грузовикам',
	vm:'грузовики',
	tm:'грузовиками',
	pm:'грузовиках',
	rod:0,
	skl:2,
	odu:0,
};
lx['груша']={
	ie:'груша',
	re:'груши',
	de:'груше',
	ve:'грушу',
	te:'грушой',
	pe:'груше',
	im:'груши',
	rm:'груш',
	dm:'грушам',
	vm:'груши',
	tm:'грушами',
	pm:'грушах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Дарья']={
	ie:'Дарья',
	re:'Дарьи',
	de:'Дарье',
	ve:'Дарью',
	te:'Дарьей',
	pe:'Дарье',
	im:'Дарьи',
	rm:'Дарий',
	dm:'Дарьям',
	vm:'Дарьи',
	tm:'Дарьями',
	pm:'Дарьях',
	rod:1,
	skl:1,
	odu:0,
};
lx['дача']={
	ie:'дача',
	re:'дачи',
	de:'даче',
	ve:'дачу',
	te:'дачей',
	pe:'даче',
	im:'дачи',
	rm:'дач',
	dm:'дачам',
	vm:'дачи',
	tm:'дачами',
	pm:'дачах',
	rod:1,
	skl:1,
	odu:0,
};
lx['декада']={
	ie:'декада',
	re:'декады',
	de:'декаде',
	ve:'декаду',
	te:'декадой',
	pe:'декаде',
	im:'декады',
	rm:'декад',
	dm:'декадам',
	vm:'декады',
	tm:'декадами',
	pm:'декадах',
	rod:1,
	skl:1,
	odu:0,
};
lx['дельтоид']={
	ie:'дельтоид',
	re:'дельтоида',
	de:'дельтоиду',
	ve:'дельтоид',
	te:'дельтоидом',
	pe:'дельтоиде',
	im:'дельтоиды',
	rm:'дельтоидов',
	dm:'дельтоидам',
	vm:'дельтоиды',
	tm:'дельтоидами',
	pm:'дельтоидах',
	rod:0,
	skl:2,
	odu:0,
};
lx['день']={
	ie:'день',
	re:'дня',
	de:'дню',
	ve:'день',
	te:'днём',
	pe:'дне',
	im:'дни',
	rm:'дней',
	dm:'дням',
	vm:'дни',
	tm:'днями',
	pm:'днях',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['деревня']={
	ie:'деревня',
	re:'деревни',
	de:'деревне',
	ve:'деревню',
	te:'деревней',
	pe:'деревне',
	im:'деревни',
	rm:'деревень',
	dm:'деревням',
	vm:'деревни',
	tm:'деревнями',
	pm:'деревнях',
	rod:1,
	skl:1,
	odu:0,
};
lx['деталь']={
	ie:'деталь',
	re:'детали',
	de:'детали',
	ve:'деталь',
	te:'деталью',
	pe:'детали',
	im:'детали',
	rm:'деталей',
	dm:'деталям',
	vm:'детали',
	tm:'деталями',
	pm:'деталях',
	rod:1,
	skl:3,
	odu:0,
};
lx['дециметр']={
	ie:'дециметр',
	re:'дециметра',
	de:'дециметру',
	ve:'дециметр',
	te:'дециметром',
	pe:'дециметре',
	im:'дециметры',
	rm:'дециметров',
	dm:'дециметрам',
	vm:'дециметры',
	tm:'дециметрами',
	pm:'дециметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'дм',
};
lx['диагональ']={
	ie:'диагональ',
	re:'диагонали',
	de:'диагонали',
	ve:'диагональ',
	te:'диагональю',
	pe:'диагонали',
	im:'диагонали',
	rm:'диагоналей',
	dm:'диагоналям',
	vm:'диагонали',
	tm:'диагоналями',
	pm:'диагоналях',
	rod:1,
	skl:3,
	odu:0,
};
lx['дизель']={
	ie:'дизель',
	re:'дизеля',
	de:'дизелю',
	ve:'дизель',
	te:'дизелем',
	pe:'дизеле',
	im:'дизели',
	rm:'дизелей',
	dm:'дизелям',
	vm:'дизели',
	tm:'дизелями',
	pm:'дизелях',
	rod:0,
	skl:2,
	odu:0,
};
lx['доллар']={
	ie:'доллар',
	re:'доллара',
	de:'доллару',
	ve:'доллар',
	te:'долларом',
	pe:'долларе',
	im:'доллары',
	rm:'долларов',
	dm:'долларам',
	vm:'доллары',
	tm:'долларами',
	pm:'долларах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['дом']={
	ie:'дом',
	re:'дома',
	de:'дому',
	ve:'дом',
	te:'домом',
	pe:'доме',
	im:'дома',
	rm:'домов',
	dm:'домам',
	vm:'дома',
	tm:'домами',
	pm:'домах',
	rod:0,
	skl:2,
	odu:0,
};
lx['домик']={
	ie:'домик',
	re:'домика',
	de:'домику',
	ve:'домик',
	te:'домиком',
	pe:'домике',
	im:'домики',
	rm:'домиков',
	dm:'домикам',
	vm:'домики',
	tm:'домиками',
	pm:'домиках',
	rod:0,
	skl:2,
	odu:0,
};
lx['дробь']={
	ie:'дробь',
	re:'дроби',
	de:'дроби',
	ve:'дробь',
	te:'дробью',
	pe:'дроби',
	im:'дроби',
	rm:'дробей',
	dm:'дробям',
	vm:'дроби',
	tm:'дробями',
	pm:'дробях',
	rod:1,
	skl:3,
	odu:0,
	chr:1,
};
lx['евро']={
	ie:'евро',
	re:'евро',
	de:'евро',
	ve:'евро',
	te:'евро',
	pe:'евро',
	im:'евро',
	rm:'евро',
	dm:'евро',
	vm:'евро',
	tm:'евро',
	pm:'евро',
	rod:2,
	skl:0,
	odu:0,
};
lx['Елена']={
	ie:'Елена',
	re:'Елены',
	de:'Елене',
	ve:'Елену',
	te:'Еленой',
	pe:'Елене',
	im:'Елены',
	rm:'Елен',
	dm:'Еленам',
	vm:'Елен',
	tm:'Еленами',
	pm:'Еленах',
	rod:1,
	skl:1,
	odu:0,
};
lx['жидкость']={
	ie:'жидкость',
	re:'жидкости',
	de:'жидкости',
	ve:'жидкость',
	te:'жидкостью',
	pe:'жидкости',
	im:'жидкости',
	rm:'жидкостей',
	dm:'жидкостям',
	vm:'жидкости',
	tm:'жидкостями',
	pm:'жидкостях',
	rod:1,
	skl:3,
	odu:0,
};
lx['задание']={
	ie:'задание',
	re:'задания',
	de:'заданию',
	ve:'задание',
	te:'заданием',
	pe:'задании',
	im:'задания',
	rm:'заданий',
	dm:'заданиям',
	vm:'задания',
	tm:'заданиями',
	pm:'заданиях',
	rod:2,
	skl:2,
	odu:0,
};
lx['"Запорожец"']={
	ie:'"Запорожец"',
	re:'"Запорожца"',
	de:'"Запорожцу"',
	ve:'"Запорожец"',
	te:'"Запорожцем"',
	pe:'"Запорожце"',
	im:'"Запорожцы"',
	rm:'"Запорожцев"',
	dm:'"Запорожцам"',
	vm:'"Запорожцы"',
	tm:'"Запорожцами"',
	pm:'"Запорожцах"',
	rod:0,
	skl:2,
	odu:0,
};
lx['значение']={
	ie:'значение',
	re:'значения',
	de:'значению',
	ve:'значение',
	te:'значением',
	pe:'значении',
	im:'значения',
	rm:'значений',
	dm:'значениям',
	vm:'значения',
	tm:'значениями',
	pm:'значениях',
	rod:2,
	skl:2,
	odu:0,
};
lx['Ивановна']={
	ie:'Ивановна',
	re:'Ивановны',
	de:'Ивановне',
	ve:'Ивановну',
	te:'Ивановной',
	pe:'Ивановне',
	im:'Ивановны',
	rm:'Ивановн',
	dm:'Ивановнам',
	vm:'Ивановн',
	tm:'Ивановнами',
	pm:'Ивановнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['известняк']={
	ie:'известняк',
	re:'известняка',
	de:'известняку',
	ve:'известняк',
	te:'известняком',
	pe:'известняке',
	im:'известняки',
	rm:'известняков',
	dm:'известнякам',
	vm:'известняки',
	tm:'известняками',
	pm:'известняках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Израиль']={
	ie:'Израиль',
	re:'Израиля',
	de:'Израилю',
	ve:'Израиль',
	te:'Израилем',
	pe:'Израиле',
	im:'Израили',
	rm:'Израилей',
	dm:'Израилям',
	vm:'Израили',
	tm:'Израилями',
	pm:'Израилях',
	rod:0,
	skl:2,
	odu:0,
};
lx['инноград']={
	ie:'инноград',
	re:'иннограда',
	de:'иннограду',
	ve:'инноград',
	te:'инноградом',
	pe:'иннограде',
	im:'иннограды',
	rm:'инноградов',
	dm:'инноградам',
	vm:'иннограды',
	tm:'инноградами',
	pm:'инноградах',
	rod:0,
	skl:2,
	odu:0,
};
lx['интервал']={
	ie:'интервал',
	re:'интервала',
	de:'интервалу',
	ve:'интервал',
	te:'интервалом',
	pe:'интервале',
	im:'интервалы',
	rm:'интервалов',
	dm:'интервалам',
	vm:'интервалы',
	tm:'интервалами',
	pm:'интервалах',
	rod:0,
	skl:2,
	odu:0,
};
lx['июнь']={
	ie:'июнь',
	re:'июня',
	de:'июню',
	ve:'июнь',
	te:'июнем',
	pe:'июне',
	im:'июни',
	rm:'июней',
	dm:'июням',
	vm:'июни',
	tm:'июнями',
	pm:'июнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['июль']={
	ie:'июль',
	re:'июля',
	de:'июлю',
	ve:'июль',
	te:'июлем',
	pe:'июле',
	im:'июли',
	rm:'июлей',
	dm:'июлям',
	vm:'июли',
	tm:'июлями',
	pm:'июлях',
	rod:0,
	skl:2,
	odu:0,
};
lx['кабельтов']={
	ie:'кабельтов',
	re:'кабельтова',
	de:'кабельтову',
	ve:'кабельтов',
	te:'кабельтовым',
	pe:'кабельтовом',
	im:'кабельтовы',
	rm:'кабельтовых',
	dm:'кабельтовым',
	vm:'кабельтовых',
	tm:'кабельтовыми',
	pm:'кабельтовых',
	rod:0,
	skl:2,
	odu:0,
};
lx['Казань']={
        ie:'Казань',
        re:'Казани',
        de:'Казани',
        ve:'Казань',
        te:'Казанью',
        pe:'Казани',
        im:'Казани',
        rm:'Казаней',
        dm:'Казаням',
        vm:'Казани',
        tm:'Казанями',
        pm:'Казанях',
        rod:1,
        skl:3,
        odu:0,
};
lx['кальций']={
	ie:'кальций',
	re:'кальция',
	de:'кальцию',
	ve:'кальций',
	te:'кальцием',
	pe:'кальции',
	im:'кальции',
	rm:'кальциев',
	dm:'кальциям',
	vm:'кальции',
	tm:'кальциями',
	pm:'кальциях',
	rod:0,
	skl:2,
	odu:0,
};
lx['камень']={
	ie:'камень',
	re:'камня',
	de:'камню',
	ve:'камень',
	te:'камнем',
	pe:'камне',
	im:'камни',
	rm:'камней',
	dm:'камням',
	vm:'камни',
	tm:'камнями',
	pm:'камнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['канцелярия']={
	ie:'канцелярия',
	re:'канцелярии',
	de:'канцелярии',
	ve:'канцелярию',
	te:'канцелярией',
	pe:'канцелярии',
	im:'канцелярии',
	rm:'канцелярий',
	dm:'канцеляриям',
	vm:'канцелярии',
	tm:'канцеляриями',
	pm:'канцеляриях',
	rod:1,
	skl:1,
	odu:0,
};
lx['катет']={
	ie:'катет',
	re:'катета',
	de:'катету',
	ve:'катет',
	te:'катетом',
	pe:'катете',
	im:'катеты',
	rm:'катетов',
	dm:'катетам',
	vm:'катеты',
	tm:'катетами',
	pm:'катетах',
	rod:0,
	skl:2,
	odu:0,
};
lx['квадрат']={
	ie:'квадрат',
	re:'квадрата',
	de:'квадрату',
	ve:'квадрат',
	te:'квадратом',
	pe:'квадрате',
	im:'квадраты',
	rm:'квадратов',
	dm:'квадратам',
	vm:'квадраты',
	tm:'квадратами',
	pm:'квадратах',
	rod:0,
	skl:2,
	odu:0,
};
lx['керосин']={
	ie:'керосин',
	re:'керосина',
	de:'керосину',
	ve:'керосин',
	te:'керосином',
	pe:'керосине',
	im:'керосины',
	rm:'керосинов',
	dm:'керосинам',
	vm:'керосины',
	tm:'керосинами',
	pm:'керосинах',
	rod:0,
	skl:2,
	odu:0,
};
lx['километр']={
	ie:'километр',
	re:'километра',
	de:'километру',
	ve:'километр',
	te:'километром',
	pe:'километре',
	im:'километры',
	rm:'километров',
	dm:'километрам',
	vm:'километры',
	tm:'километрами',
	pm:'километрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'км',
};
lx['Китай']={
	ie:'Китай',
	re:'Китая',
	de:'Китаю',
	ve:'Китай',
	te:'Китаем',
	pe:'Китае',
	im:'Китаи',
	rm:'Китаев',
	dm:'Китаям',
	vm:'Китаи',
	tm:'Китаями',
	pm:'Китаях',
	rod:0,
	skl:2,
	odu:0,
};
lx['клавиатура']={
	ie:'клавиатура',
	re:'клавиатуры',
	de:'клавиатуре',
	ve:'клавиатуру',
	te:'клавиатурой',
	pe:'клавиатуре',
	im:'клавиатуры',
	rm:'клавиатур',
	dm:'клавиатурам',
	vm:'клавиатуры',
	tm:'клавиатурами',
	pm:'клавиатурах',
	rod:1,
	skl:1,
	odu:0,
	sbs:0,
	chr:1,
};
lx['компакт-диск']={
	ie:'компакт-диск',
	re:'компакт-диска',
	de:'компакт-диску',
	ve:'компакт-диск',
	te:'компакт-диском',
	pe:'компакт-диске',
	im:'компакт-диски',
	rm:'компакт-дисков',
	dm:'компакт-дискам',
	vm:'компакт-диски',
	tm:'компакт-дисками',
	pm:'компакт-дисках',
	rod:0,
	skl:2,
	odu:0,
};
lx['конструкция']={
	ie:'конструкция',
	re:'конструкции',
	de:'конструкции',
	ve:'конструкцию',
	te:'конструкцией',
	pe:'конструкции',
	im:'конструкции',
	rm:'конструкций',
	dm:'конструкциям',
	vm:'конструкции',
	tm:'конструкциями',
	pm:'конструкциях',
	rod:1,
	skl:1,
	odu:0,
};
lx['корабль']={
	ie:'корабль',
	re:'корабля',
	de:'кораблю',
	ve:'корабль',
	te:'кораблём',
	pe:'корабле',
	im:'корабли',
	rm:'кораблей',
	dm:'кораблям',
	vm:'корабли',
	tm:'кораблями',
	pm:'кораблях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Красноярск']={
	ie:'Красноярск',
	re:'Красноярска',
	de:'Красноярску',
	ve:'Красноярск',
	te:'Красноярском',
	pe:'Красноярске',
	im:'Красноярски',
	rm:'Красноярсков',
	dm:'Красноярскам',
	vm:'Красноярски',
	tm:'Красноярсками',
	pm:'Красноярсках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Кристина']={
	ie:'Кристина',
	re:'Кристины',
	de:'Кристине',
	ve:'Кристину',
	te:'Кристиной',
	pe:'Кристине',
	im:'Кристины',
	rm:'Кристин',
	dm:'Кристинам',
	vm:'Кристин',
	tm:'Кристинами',
	pm:'Кристинах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Куба']={
	ie:'Куба',
	re:'Кубы',
	de:'Кубе',
	ve:'Кубу',
	te:'Кубой',
	pe:'Кубе',
	im:'Кубы',
	rm:'Куб',
	dm:'Кубам',
	vm:'Кубы',
	tm:'Кубами',
	pm:'Кубах',
	rod:1,
	skl:1,
	odu:0,
};
lx['кубометр']={
	ie:'кубометр',
	re:'кубометра',
	de:'кубометру',
	ve:'кубометр',
	te:'кубометром',
	pe:'кубометре',
	im:'кубометры',
	rm:'кубометров',
	dm:'кубометрам',
	vm:'кубометры',
	tm:'кубометрами',
	pm:'кубометрах',
	rod:0,
	skl:2,
	odu:0,
};
lx['литр']={
	ie:'литр',
	re:'литра',
	de:'литру',
	ve:'литр',
	te:'литром',
	pe:'литре',
	im:'литры',
	rm:'литров',
	dm:'литрам',
	vm:'литры',
	tm:'литрами',
	pm:'литрах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['луч']={
	ie:'луч',
	re:'луча',
	de:'лучу',
	ve:'луч',
	te:'лучом',
	pe:'луче',
	im:'лучи',
	rm:'лучей',
	dm:'лучам',
	vm:'лучи',
	tm:'лучами',
	pm:'лучах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Магадан']={
	ie:'Магадан',
	re:'Магадана',
	de:'Магадану',
	ve:'Магадан',
	te:'Магаданом',
	pe:'Магадане',
	im:'Магаданы',
	rm:'Магаданов',
	dm:'Магаданам',
	vm:'Магаданы',
	tm:'Магаданами',
	pm:'Магаданах',
	rod:0,
	skl:2,
	odu:0,
};
lx['магазин']={
	ie:'магазин',
	re:'магазина',
	de:'магазину',
	ve:'магазин',
	te:'магазином',
	pe:'магазине',
	im:'магазины',
	rm:'магазинов',
	dm:'магазинам',
	vm:'магазины',
	tm:'магазинами',
	pm:'магазинах',
	rod:0,
	skl:2,
	odu:0,
};
lx['магия']={
	ie:'магия',
	re:'магии',
	de:'магии',
	ve:'магию',
	te:'магией',
	pe:'магии',
	im:'магии',
	rm:'магий',
	dm:'магиям',
	vm:'магии',
	tm:'магиями',
	pm:'магиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['май']={
	ie:'май',
	re:'мая',
	de:'маю',
	ve:'май',
	te:'маем',
	pe:'мае',
	im:'маи',
	rm:'маев',
	dm:'маям',
	vm:'маи',
	tm:'маями',
	pm:'маях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Мария']={
	ie:'Мария',
	re:'Марии',
	de:'Марии',
	ve:'Марию',
	te:'Марией',
	pe:'Марии',
	im:'Марии',
	rm:'Марий',
	dm:'Мариям',
	vm:'Марии',
	tm:'Мариями',
	pm:'Мариях',
	rod:1,
	skl:1,
	odu:0,
};
lx['март']={
	ie:'март',
	re:'марта',
	de:'марту',
	ve:'март',
	te:'мартом',
	pe:'марте',
	im:'марты',
	rm:'мартов',
	dm:'мартам',
	vm:'марты',
	tm:'мартами',
	pm:'мартах',
	rod:0,
	skl:2,
	odu:0,
};
lx['матрёшка']={
	ie:'матрёшка',
	re:'матрёшки',
	de:'матрёшке',
	ve:'матрёшку',
	te:'матрёшкой',
	pe:'матрёшке',
	im:'матрёшки',
	rm:'матрёшек',
	dm:'матрёшкам',
	vm:'матрёшки',
	tm:'матрёшками',
	pm:'матрёшках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Мексика']={
	ie:'Мексика',
	re:'Мексики',
	de:'Мексике',
	ve:'Мексику',
	te:'Мексикой',
	pe:'Мексике',
	im:'Мексики',
	rm:'Мексик',
	dm:'Мексикам',
	vm:'Мексики',
	tm:'Мексиками',
	pm:'Мексиках',
	rod:1,
	skl:1,
	odu:0,
};
lx['меню']={
	ie:'меню',
	re:'меню',
	de:'меню',
	ve:'меню',
	te:'меню',
	pe:'меню',
	im:'меню',
	rm:'меню',
	dm:'меню',
	vm:'меню',
	tm:'меню',
	pm:'меню',
	rod:2,
	skl:0,
	odu:0,
};
lx['месяц']={
	ie:'месяц',
	re:'месяца',
	de:'месяцу',
	ve:'месяц',
	te:'месяцем',
	pe:'месяце',
	im:'месяцы',
	rm:'месяцев',
	dm:'месяцам',
	vm:'месяцы',
	tm:'месяцами',
	pm:'месяцах',
	rod:0,
	skl:2,
	odu:0,
};
lx['метр']={
	ie:'метр',
	re:'метра',
	de:'метру',
	ve:'метр',
	te:'метром',
	pe:'метре',
	im:'метры',
	rm:'метров',
	dm:'метрам',
	vm:'метры',
	tm:'метрами',
	pm:'метрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'м',
};
lx['мешок']={
	ie:'мешок',
	re:'мешка',
	de:'мешку',
	ve:'мешок',
	te:'мешком',
	pe:'мешке',
	im:'мешки',
	rm:'мешков',
	dm:'мешкам',
	vm:'мешки',
	tm:'мешками',
	pm:'мешках',
	rod:0,
	skl:2,
	odu:0,
};
lx['миллиметр']={
	ie:'миллиметр',
	re:'миллиметра',
	de:'миллиметру',
	ve:'миллиметр',
	te:'миллиметром',
	pe:'миллиметре',
	im:'миллиметры',
	rm:'миллиметров',
	dm:'миллиметрам',
	vm:'миллиметры',
	tm:'миллиметрами',
	pm:'миллиметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'мм',
};
lx['министерство']={
	ie:'министерство',
	re:'министерства',
	de:'министерству',
	ve:'министерство',
	te:'министерством',
	pe:'министерстве',
	im:'министерства',
	rm:'министерств',
	dm:'министерствам',
	vm:'министерства',
	tm:'министерствами',
	pm:'министерствах',
	rod:2,
	skl:2,
	odu:0,
};
lx['Минобрнауки']={
	ie:'Минобрнауки',
	re:'Минобрнауки',
	de:'Минобрнауки',
	ve:'Минобрнауки',
	te:'Минобрнауки',
	pe:'Минобрнауки',
	im:'Минобрнауки',
	rm:'Минобрнауки',
	dm:'Минобрнауки',
	vm:'Минобрнауки',
	tm:'Минобрнауки',
	pm:'Минобрнауки',
	rod:2,
	skl:0,
	odu:0,
};
lx['минута']={
	ie:'минута',
	re:'минуты',
	de:'минуте',
	ve:'минуту',
	te:'минутой',
	pe:'минуте',
	im:'минуты',
	rm:'минут',
	dm:'минутам',
	vm:'минуты',
	tm:'минутами',
	pm:'минутах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Москва']={
	ie:'Москва',
	re:'Москвы',
	de:'Москве',
	ve:'Москву',
	te:'Москвой',
	pe:'Москве',
	im:'Москвы',
	rm:'Москв',
	dm:'Москвам',
	vm:'Москвы',
	tm:'Москвами',
	pm:'Москвах',
	rod:1,
	skl:1,
	odu:0,
	sbs:1,
	chr:1,
};
lx['"Москвич"']={
	ie:'"Москвич"',
	re:'"Москвича"',
	de:'"Москвичу"',
	ve:'"Москвич"',
	te:'"Москвичом"',
	pe:'"Москвиче"',
	im:'"Москвичи"',
	rm:'"Москвичей"',
	dm:'"Москвичам"',
	vm:'"Москвичи"',
	tm:'"Москвичами"',
	pm:'"Москвичах"',
	rod:0,
	skl:2,
	odu:0,
};
lx['наукоград']={
	ie:'наукоград',
	re:'наукограда',
	de:'наукограду',
	ve:'наукоград',
	te:'наукоградом',
	pe:'наукограде',
	im:'наукограды',
	rm:'наукоградов',
	dm:'наукоградам',
	vm:'наукограды',
	tm:'наукоградами',
	pm:'наукоградах',
	rod:0,
	skl:2,
	odu:0,
};
lx['неделя']={
	ie:'неделя',
	re:'недели',
	de:'неделе',
	ve:'неделю',
	te:'неделей',
	pe:'неделе',
	im:'недели',
	rm:'недель',
	dm:'неделям',
	vm:'недели',
	tm:'неделями',
	pm:'неделях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Николаевна']={
	ie:'Николаевна',
	re:'Николаевны',
	de:'Николаевне',
	ve:'Николаевну',
	te:'Николаевной',
	pe:'Николаевне',
	im:'Николаевны',
	rm:'Николаевн',
	dm:'Николаевнам',
	vm:'Николаевн',
	tm:'Николаевнами',
	pm:'Николаевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['ноябрь']={
	ie:'ноябрь',
	re:'ноября',
	de:'ноябрю',
	ve:'ноябрь',
	te:'ноябрём',
	pe:'ноябре',
	im:'ноябри',
	rm:'ноябрей',
	dm:'ноябрям',
	vm:'ноябри',
	tm:'ноябрями',
	pm:'ноябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['октябрь']={
	ie:'октябрь',
	re:'октября',
	de:'октябрю',
	ve:'октябрь',
	te:'октябрём',
	pe:'октябре',
	im:'октябри',
	rm:'октябрей',
	dm:'октябрям',
	vm:'октябри',
	tm:'октябрями',
	pm:'октябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Олеся']={
	ie:'Олеся',
	re:'Олеси',
	de:'Олесе',
	ve:'Олесю',
	te:'Олесей',
	pe:'Олесе',
	im:'Олеси',
	rm:'Олесь',
	dm:'Олесям',
	vm:'Олесь',
	tm:'Олесями',
	pm:'Олесях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Ольга']={
	ie:'Ольга',
	re:'Ольги',
	de:'Ольге',
	ve:'Ольгу',
	te:'Ольгой',
	pe:'Ольге',
	im:'Ольги',
	rm:'Ольг',
	dm:'Ольгам',
	vm:'Ольг',
	tm:'Ольгами',
	pm:'Ольгах',
	rod:1,
	skl:1,
	odu:0,
};
lx['отрезок']={
	ie:'отрезок',
	re:'отрезка',
	de:'отрезку',
	ve:'отрезок',
	te:'отрезком',
	pe:'отрезке',
	im:'отрезки',
	rm:'отрезков',
	dm:'отрезкам',
	vm:'отрезки',
	tm:'отрезками',
	pm:'отрезках',
	rod:0,
	skl:2,
	odu:0,
};
lx['офис']={
	ie:'офис',
	re:'офиса',
	de:'офису',
	ve:'офис',
	te:'офисом',
	pe:'офисе',
	im:'офисы',
	rm:'офисов',
	dm:'офисам',
	vm:'офисы',
	tm:'офисами',
	pm:'офисах',
	rod:0,
	skl:2,
	odu:0,
};
lx['параллелограмм']={
	ie:'параллелограмм',
	re:'параллелограмма',
	de:'параллелограмму',
	ve:'параллелограмм',
	te:'параллелограммом',
	pe:'параллелограмме',
	im:'параллелограммы',
	rm:'параллелограммов',
	dm:'параллелограммам',
	vm:'параллелограммы',
	tm:'параллелограммами',
	pm:'параллелограммах',
	rod:0,
	skl:2,
	odu:0,
};
lx['пароход']={
	ie:'пароход',
	re:'парохода',
	de:'пароходу',
	ve:'пароход',
	te:'пароходом',
	pe:'пароходе',
	im:'пароходы',
	rm:'пароходов',
	dm:'пароходам',
	vm:'пароходы',
	tm:'пароходами',
	pm:'пароходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ПГТ']={
	ie:'ПГТ',
	re:'ПГТ',
	de:'ПГТ',
	ve:'ПГТ',
	te:'ПГТ',
	pe:'ПГТ',
	im:'ПГТ',
	rm:'ПГТ',
	dm:'ПГТ',
	vm:'ПГТ',
	tm:'ПГТ',
	pm:'ПГТ',
	rod:0,
	skl:0,
	odu:0,
};
lx['пенобетон']={
	ie:'пенобетон',
	re:'пенобетона',
	de:'пенобетону',
	ve:'пенобетон',
	te:'пенобетоном',
	pe:'пенобетоне',
	im:'пенобетоны',
	rm:'пенобетонов',
	dm:'пенобетонам',
	vm:'пенобетоны',
	tm:'пенобетонами',
	pm:'пенобетонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['песок']={
	ie:'песок',
	re:'песка',
	de:'песку',
	ve:'песок',
	te:'песком',
	pe:'песке',
	im:'пески',
	rm:'песков',
	dm:'пескам',
	vm:'пески',
	tm:'песками',
	pm:'песках',
	rod:0,
	skl:2,
	odu:0,
};
lx['песчаник']={
	ie:'песчаник',
	re:'песчаника',
	de:'песчанику',
	ve:'песчаник',
	te:'песчаником',
	pe:'песчанике',
	im:'песчаники',
	rm:'песчаников',
	dm:'песчаникам',
	vm:'песчаники',
	tm:'песчаниками',
	pm:'песчаниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Петровна']={
	ie:'Петровна',
	re:'Петровны',
	de:'Петровне',
	ve:'Петровну',
	te:'Петровной',
	pe:'Петровне',
	im:'Петровны',
	rm:'Петровн',
	dm:'Петровнам',
	vm:'Петровн',
	tm:'Петровнами',
	pm:'Петровнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['пирожок']={
	ie:'пирожок',
	re:'пирожка',
	de:'пирожку',
	ve:'пирожок',
	te:'пирожком',
	pe:'пирожке',
	im:'пирожки',
	rm:'пирожков',
	dm:'пирожкам',
	vm:'пирожки',
	tm:'пирожами',
	pm:'пирожах',
	rod:0,
	skl:2,
	odu:0,
};
lx['поезд']={
	ie:'поезд',
	re:'поезда',
	de:'поезду',
	ve:'поезд',
	te:'поездом',
	pe:'поезде',
	im:'поезды',
	rm:'поездов',
	dm:'поездам',
	vm:'поезды',
	tm:'поездами',
	pm:'поездах',
	rod:0,
	skl:2,
	odu:0,
};
lx['полуинтервал']={
	ie:'полуинтервал',
	re:'полуинтервала',
	de:'полуинтервалу',
	ve:'полуинтервал',
	te:'полуинтервалом',
	pe:'полуинтервале',
	im:'полуинтервалы',
	rm:'полуинтервалов',
	dm:'полуинтервалам',
	vm:'полуинтервалы',
	tm:'полуинтервалами',
	pm:'полуинтервалах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Польша']={
	ie:'Польша',
	re:'Польши',
	de:'Польше',
	ve:'Польшу',
	te:'Польшой',
	pe:'Польше',
	im:'Польши',
	rm:'Польш',
	dm:'Польшам',
	vm:'Польши',
	tm:'Польшами',
	pm:'Польшах',
	rod:1,
	skl:1,
	odu:0,
};
lx['понедельник']={
	ie:'понедельник',
	re:'понедельника',
	de:'понедельнику',
	ve:'понедельник',
	te:'понедельником',
	pe:'понедельнике',
	im:'понедельники',
	rm:'понедельников',
	dm:'понедельникам',
	vm:'понедельники',
	tm:'понедельниками',
	pm:'понедельниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['посёлок']={
	ie:'посёлок',
	re:'посёлка',
	de:'посёлку',
	ve:'посёлок',
	te:'посёлком',
	pe:'посёлке',
	im:'посёлки',
	rm:'посёлков',
	dm:'посёлкам',
	vm:'посёлки',
	tm:'посёлками',
	pm:'посёлках',
	rod:0,
	skl:2,
	odu:0,
};
lx['программистка']={
	ie:'программистка',
	re:'программистки',
	de:'программистке',
	ve:'программистку',
	te:'программисткой',
	pe:'программистке',
	im:'программистки',
	rm:'программисток',
	dm:'программисткам',
	vm:'программисток',
	tm:'программистками',
	pm:'программистках',
	rod:1,
	skl:1,
	odu:0,
};
lx['промежуток']={
	ie:'промежуток',
	re:'промежутка',
	de:'промежутку',
	ve:'промежуток',
	te:'промежутком',
	pe:'промежутке',
	im:'промежутки',
	rm:'промежутков',
	dm:'промежуткам',
	vm:'промежутки',
	tm:'промежутками',
	pm:'промежутках',
	rod:0,
	skl:2,
	odu:0,
};
lx['прямоугольник']={
	ie:'прямоугольник',
	re:'прямоугольника',
	de:'прямоугольнику',
	ve:'прямоугольник',
	te:'прямоугольником',
	pe:'прямоугольнике',
	im:'прямоугольники',
	rm:'прямоугольников',
	dm:'прямоугольникам',
	vm:'прямоугольники',
	tm:'прямоугольниками',
	pm:'прямоугольниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['пункт']={
	ie:'пункт',
	re:'пункта',
	de:'пункту',
	ve:'пункт',
	te:'пунктом',
	pe:'пункте',
	im:'пункты',
	rm:'пунктов',
	dm:'пунктам',
	vm:'пункты',
	tm:'пунктами',
	pm:'пунктах',
	rod:0,
	skl:2,
	odu:0,
};
lx['путь']={
	ie:'путь',
	re:'пути',
	de:'пути',
	ve:'путь',
	te:'путём',
	pe:'пути',
	im:'пути',
	rm:'путей',
	dm:'путям',
	vm:'пути',
	tm:'путями',
	pm:'путях',
	rod:0,
	skl:2,
	odu:0,
};
lx['пятница']={
	ie:'пятница',
	re:'пятницы',
	de:'пятнице',
	ve:'пятницу',
	te:'пятницей',
	pe:'пятнице',
	im:'пятницы',
	rm:'пятниц',
	dm:'пятницам',
	vm:'пятницы',
	tm:'пятницами',
	pm:'пятницах',
	rod:1,
	skl:1,
	odu:0,
};
lx['раствор']={
	ie:'раствор',
	re:'раствора',
	de:'раствору',
	ve:'раствор',
	te:'раствором',
	pe:'растворе',
	im:'растворы',
	rm:'растворов',
	dm:'растворам',
	vm:'растворы',
	tm:'растворами',
	pm:'растворах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ромб']={
	ie:'ромб',
	re:'ромба',
	de:'ромбу',
	ve:'ромб',
	te:'ромбом',
	pe:'ромбе',
	im:'ромбы',
	rm:'ромбов',
	dm:'ромбам',
	vm:'ромбы',
	tm:'ромбами',
	pm:'ромбах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Рособрнадзор']={
	ie:'Рособрнадзор',
	re:'Рособрнадзора',
	de:'Рособрнадзору',
	ve:'Рособрнадзор',
	te:'Рособрнадзором',
	pe:'Рособрнадзоре',
	im:'Рособрнадзоры',
	rm:'Рособрнадзоров',
	dm:'Рособрнадзорам',
	vm:'Рособрнадзоры',
	tm:'Рособрнадзорами',
	pm:'Рособрнадзорах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Россия']={
	ie:'Россия',
	re:'России',
	de:'России',
	ve:'Россию',
	te:'Россией',
	pe:'России',
	im:'России',
	rm:'Россий',
	dm:'Россиям',
	vm:'России',
	tm:'Россиями',
	pm:'Россиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['ртуть']={
	ie:'ртуть',
	re:'ртути',
	de:'ртути',
	ve:'ртуть',
	te:'ртутью',
	pe:'ртути',
	im:'ртути',
	rm:'ртутей',
	dm:'ртутям',
	vm:'ртути',
	tm:'ртутями',
	pm:'ртутях',
	rod:1,
	skl:3,
	odu:0,
};
lx['рубль']={
	ie:'рубль',
	re:'рубля',
	de:'рублю',
	ve:'рубль',
	te:'рублём',
	pe:'рубле',
	im:'рубли',
	rm:'рублей',
	dm:'рублям',
	vm:'рубли',
	tm:'рублями',
	pm:'рублях',
	rod:0,
	skl:2,
	odu:0,
};
lx['рука']={
	ie:'рука',
	re:'руки',
	de:'руке',
	ve:'руку',
	te:'рукой',
	pe:'руке',
	im:'руки',
	rm:'рук',
	dm:'рукам',
	vm:'руки',
	tm:'руками',
	pm:'руках',
	rod:1,
	skl:1,
	odu:0,
};
lx['ручка']={
	ie:'ручка',
	re:'ручки',
	de:'ручке',
	ve:'ручку',
	te:'ручкой',
	pe:'ручке',
	im:'ручки',
	rm:'ручек',
	dm:'ручкам',
	vm:'ручки',
	tm:'ручками',
	pm:'ручках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Санкт-Петербург']={
	ie:'Санкт-Петербург',
	re:'Санкт-Петербурга',
	de:'Санкт-Петербургу',
	ve:'Санкт-Петербург',
	te:'Санкт-Петербургом',
	pe:'Санкт-Петербурге',
	im:'Санкт-Петербурги',
	rm:'Санкт-Петербургов',
	dm:'Санкт-Петербургам',
	vm:'Санкт-Петербурги',
	tm:'Санкт-Петербургами',
	pm:'Санкт-Петербургах',
	rod:0,
	skl:2,
	odu:0,
};
lx['сантиметр']={
	ie:'сантиметр',
	re:'сантиметра',
	de:'сантиметру',
	ve:'сантиметр',
	te:'сантиметром',
	pe:'сантиметре',
	im:'сантиметры',
	rm:'сантиметров',
	dm:'сантиметрам',
	vm:'сантиметры',
	tm:'сантиметрами',
	pm:'сантиметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'см',
};
lx['секретариат']={
	ie:'секретариат',
	re:'секретариата',
	de:'секретариату',
	ve:'секретариат',
	te:'секретариатом',
	pe:'секретариате',
	im:'секретариаты',
	rm:'секретариатов',
	dm:'секретариатам',
	vm:'секретариаты',
	tm:'секретариатами',
	pm:'секретариатах',
	rod:0,
	skl:2,
	odu:0,
};
lx['село']={
	ie:'село',
	re:'села',
	de:'селу',
	ve:'село',
	te:'селом',
	pe:'селе',
	im:'сёла',
	rm:'сёл',
	dm:'сёлам',
	vm:'сёла',
	tm:'сёлами',
	pm:'сёлах',
	rod:2,
	skl:2,
	odu:0,
};
lx['Семилуки']={
        ie:'Семилуки',
        re:'Семилук',
        de:'Семилукам',
        ve:'Семилуки',
        te:'Семилуками',
        pe:'Семилуках',
        im:'Семилуки',
        rm:'Семилук',
        dm:'Семилукам',
        vm:'Семилуки',
        tm:'Семилуками',
        pm:'Семилуках',
        rod:3,
        skl:2,
        odu:0,
};
lx['сентябрь']={
	ie:'сентябрь',
	re:'сентября',
	de:'сентябрю',
	ve:'сентябрь',
	te:'сентябре',
	pe:'сентябре',
	im:'сентябри',
	rm:'сентябрей',
	dm:'сентябрям',
	vm:'сентябри',
	tm:'сентябрями',
	pm:'сентябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Сербия']={
	ie:'Сербия',
	re:'Сербии',
	de:'Сербии',
	ve:'Сербию',
	te:'Сербией',
	pe:'Сербии',
	im:'Сербии',
	rm:'Сербий',
	dm:'Сербиям',
	vm:'Сербии',
	tm:'Сербиями',
	pm:'Сербиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Сергеевна']={
	ie:'Сергеевна',
	re:'Сергеевны',
	de:'Сергеевне',
	ve:'Сергеевну',
	te:'Сергеевной',
	pe:'Сергеевне',
	im:'Сергеевны',
	rm:'Сергеевн',
	dm:'Сергеевнам',
	vm:'Сергеевн',
	tm:'Сергеевнами',
	pm:'Сергеевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['склонение']={
	ie:'склонение',
	re:'склонения',
	de:'склонению',
	ve:'склонение',
	te:'склонением',
	pe:'склонении',
	im:'склонения',
	rm:'склонений',
	dm:'склонениям',
	vm:'склонения',
	tm:'склонениями',
	pm:'склонениях',
	rod:2,
	skl:2,
	odu:0,
	sbs:0,
	chr:1,
};
lx['Словакия']={
	ie:'Словакия',
	re:'Словакии',
	de:'Словакии',
	ve:'Словакию',
	te:'Словакией',
	pe:'Словакии',
	im:'Словакии',
	rm:'Словакий',
	dm:'Словакиям',
	vm:'Словакии',
	tm:'Словакиями',
	pm:'Словакиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['словарь']={
	ie:'словарь',
	re:'словаря',
	de:'словарю',
	ve:'словарь',
	te:'словарем',
	pe:'словаре',
	im:'словари',
	rm:'словарей',
	dm:'словарям',
	vm:'словари',
	tm:'словарями',
	pm:'словарях',
	rod:0,
	skl:2,
	odu:0,
	chr:1,
};
lx['Словения']={
	ie:'Словения',
	re:'Словении',
	de:'Словении',
	ve:'Словению',
	te:'Словенией',
	pe:'Словении',
	im:'Словении',
	rm:'Словений',
	dm:'Словениям',
	vm:'Словении',
	tm:'Словениями',
	pm:'Словениях',
	rod:1,
	skl:1,
	odu:0,
};
lx['слово']={
	ie:'слово',
	re:'слова',
	de:'слову',
	ve:'слове',
	te:'словом',
	pe:'слове',
	im:'слова',
	rm:'слов',
	dm:'словам',
	vm:'слова',
	tm:'словами',
	pm:'словах',
	rod:2,
	skl:2,
	odu:0,
	chr:1,
};
lx['солярка']={
	ie:'солярка',
	re:'солярки',
	de:'солярке',
	ve:'солярку',
	te:'соляркой',
	pe:'солярке',
	im:'солярки',
	rm:'солярк',
	dm:'соляркам',
	vm:'солярки',
	tm:'солярками',
	pm:'солярках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Сочи']={
	ie:'Сочи',
	re:'Сочи',
	de:'Сочи',
	ve:'Сочи',
	te:'Сочи',
	pe:'Сочи',
	im:'Сочи',
	rm:'Сочи',
	dm:'Сочи',
	vm:'Сочи',
	tm:'Сочи',
	pm:'Сочи',
	rod:1,
	skl:0,
	odu:0,
};
lx['среда']={
	ie:'среда',
	re:'среды',
	de:'среде',
	ve:'среду',
	te:'средой',
	pe:'среде',
	im:'среды',
	rm:'сред',
	dm:'средам',
	vm:'среды',
	tm:'средами',
	pm:'средах',
	rod:1,
	skl:1,
	odu:0,
};
lx['сторона']={
	ie:'сторона',
	re:'стороны',
	de:'стороне',
	ve:'сторону',
	te:'стороной',
	pe:'стороне',
	im:'стороны',
	rm:'сторон',
	dm:'сторонам',
	vm:'стороны',
	tm:'сторонами',
	pm:'сторонах',
	rod:1,
	skl:1,
	odu:0,
};
lx['студентка']={
	ie:'студентка',
	re:'студентки',
	de:'студентке',
	ve:'студентку',
	te:'студенткой',
	pe:'студентке',
	im:'студентки',
	rm:'студенток',
	dm:'студенткам',
	vm:'студенток',
	tm:'студентками',
	pm:'студентках',
	rod:1,
	skl:1,
	odu:0,
};
lx['суббота']={
	ie:'суббота',
	re:'субботы',
	de:'субботе',
	ve:'субботу',
	te:'субботой',
	pe:'субботе',
	im:'субботы',
	rm:'суббот',
	dm:'субботам',
	vm:'субботы',
	tm:'субботами',
	pm:'субботах',
	rod:1,
	skl:1,
	odu:0,
};
lx['сувенир']={
	ie:'сувенир',
	re:'сувенира',
	de:'сувениру',
	ve:'сувенир',
	te:'сувениром',
	pe:'сувенире',
	im:'сувениры',
	rm:'сувениров',
	dm:'сувенирам',
	vm:'сувениры',
	tm:'сувенирами',
	pm:'сувенирах',
	rod:0,
	skl:2,
	odu:0,
};
lx['сырок']={
	ie:'сырок',
	re:'сырка',
	de:'сырку',
	ve:'сырок',
	te:'сырком',
	pe:'сырке',
	im:'сырки',
	rm:'сырков',
	dm:'сыркам',
	vm:'сырки',
	tm:'сырками',
	pm:'сырках',
	rod:0,
	skl:2,
	odu:0,
};
lx['теплоход']={
	ie:'теплоход',
	re:'теплохода',
	de:'теплоходу',
	ve:'теплоход',
	te:'теплоходом',
	pe:'теплоходе',
	im:'теплоходы',
	rm:'теплоходов',
	dm:'теплоходам',
	vm:'теплоходы',
	tm:'теплоходами',
	pm:'теплоходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['террариум']={
	ie:'террариум',
	re:'террариума',
	de:'террариуму',
	ve:'террариум',
	te:'террариумом',
	pe:'террариуме',
	im:'террариумы',
	rm:'террариумов',
	dm:'террариумам',
	vm:'террариумы',
	tm:'террариумами',
	pm:'террариумах',
	rod:0,
	skl:2,
	odu:0,
};
lx['тетрадь']={
	ie:'тетрадь',
	re:'тетради',
	de:'тетради',
	ve:'тетрадь',
	te:'тетрадью',
	pe:'тетради',
	im:'тетради',
	rm:'тетрадей',
	dm:'тетрадям',
	vm:'тетради',
	tm:'тетрадями',
	pm:'тетрадях',
	rod:1,
	skl:3,
	odu:0,
};
lx['тонна']={
	ie:'тонна',
	re:'тонны',
	de:'тонне',
	ve:'тонну',
	te:'тонной',
	pe:'тонне',
	im:'тонны',
	rm:'тонн',
	dm:'тоннам',
	vm:'тонны',
	tm:'тоннами',
	pm:'тоннах',
	rod:1,
	skl:1,
	odu:0,
}; 
lx['топливо']={
	ie:'топливо',
	re:'топлива',
	de:'топливу',
	ve:'топливо',
	te:'топливом',
	pe:'топливе',
	im:'топливо',
	rm:'топлива',
	dm:'топливу',
	vm:'топливо',
	tm:'топливом',
	pm:'топливе',
	rod:2,
	skl:2,
	odu:0,
}; 
lx['точка']={
	ie:'точка',
	re:'точки',
	de:'точке',
	ve:'точку',
	te:'точкой',
	pe:'точке',
	im:'точки',
	rm:'точек',
	dm:'точкам',
	vm:'точки',
	tm:'точками',
	pm:'точках',
	rod:1,
	skl:1,
	odu:0,
};
lx['трапеция']={
	ie:'трапеция',
	re:'трапеции',
	de:'трапеции',
	ve:'трапецию',
	te:'трапецией',
	pe:'трапеции',
	im:'трапеции',
	rm:'трапеций',
	dm:'трапециям',
	vm:'трапеции',
	tm:'трапециями',
	pm:'трапециях',
	rod:1,
	skl:1,
	odu:0,
};
lx['учебник']={
	ie:'учебник',
	re:'учебника',
	de:'учебнику',
	ve:'учебник',
	te:'учебником',
	pe:'учебнике',
	im:'учебники',
	rm:'учебников',
	dm:'учебникам',
	vm:'учебники',
	tm:'учебниками',
	pm:'учебниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['февраль']={
	ie:'февраль',
	re:'февраля',
	de:'февралю',
	ve:'февраль',
	te:'февралём',
	pe:'феврале',
	im:'феврали',
	rm:'февралей',
	dm:'февралям',
	vm:'феврали',
	tm:'февралями',
	pm:'февралях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Фёдоровна']={
	ie:'Фёдоровна',
	re:'Фёдоровны',
	de:'Фёдоровне',
	ve:'Фёдоровну',
	te:'Фёдоровной',
	pe:'Фёдоровне',
	im:'Фёдоровны',
	rm:'Фёдоровн',
	dm:'Фёдоровнам',
	vm:'Фёдоровн',
	tm:'Фёдоровнами',
	pm:'Фёдоровнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['флэшка']={
	ie:'флэшка',
	re:'флэшки',
	de:'флэшке',
	ve:'флэшку',
	te:'флэшкой',
	pe:'флэшке',
	im:'флэшки',
	rm:'флэшек',
	dm:'флэшкам',
	vm:'флэшки',
	tm:'флэшками',
	pm:'флэшках',
	rod:1,
	skl:1,
	odu:0,
};
lx['фонарик']={
	ie:'фонарик',
	re:'фонарика',
	de:'фонарику',
	ve:'фонарик',
	te:'фонариком',
	pe:'фонарике',
	im:'фонарики',
	rm:'фонариков',
	dm:'фонарикам',
	vm:'фонарики',
	tm:'фонариками',
	pm:'фонариках',
	rod:0,
	skl:2,
	odu:0,
};
lx['форма']={
	ie:'форма',
	re:'формы',
	de:'форме',
	ve:'форму',
	te:'формой',
	pe:'форме',
	im:'формы',
	rm:'форм',
	dm:'формам',
	vm:'формы',
	tm:'формами',
	pm:'формах',
	rod:1,
	skl:1,
	odu:0,
	chr:1,
};
lx['фурлонг']={
	ie:'фурлонг',
	re:'фурлонга',
	de:'фурлонгу',
	ve:'фурлонг',
	te:'фурлонгом',
	pe:'фурлонге',
	im:'фурлонги',
	rm:'фурлонгов',
	dm:'фурлонгам',
	vm:'фурлонги',
	tm:'фурлонгами',
	pm:'фурлонгах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Хабаровск']={
	ie:'Хабаровск',
	re:'Хабаровска',
	de:'Хабаровску',
	ve:'Хабаровск',
	te:'Хабаровском',
	pe:'Хабаровске',
	im:'Хабаровски',
	rm:'Хабаровсков',
	dm:'Хабаровскам',
	vm:'Хабаровски',
	tm:'Хабаровсками',
	pm:'Хабаровсках',
	rod:0,
	skl:2,
	odu:0,
	sbs:1,
	chr:1,
};
lx['хутор']={
	ie:'хутор',
	re:'хутора',
	de:'хутору',
	ve:'хутор',
	te:'хутором',
	pe:'хуторе',
	im:'хутора',
	rm:'хуторов',
	dm:'хуторам',
	vm:'хутора',
	tm:'хуторами',
	pm:'хуторах',
	rod:0,
	skl:2,
	odu:0,
};
lx['час']={
	ie:'час',
	re:'часа',
	de:'часу',
	ve:'час',
	te:'часом',
	pe:'часе',
	im:'часы',
	rm:'часов',
	dm:'часам',
	vm:'часы',
	tm:'часами',
	pm:'часах',
	rod:0,
	skl:2,
	odu:0,
};
lx['четверг']={
	ie:'четверг',
	re:'четверга',
	de:'четвергу',
	ve:'четверг',
	te:'четвергом',
	pe:'четверге',
	im:'четверги',
	rm:'четвергов',
	dm:'четвергам',
	vm:'четверги',
	tm:'четвергами',
	pm:'четвергах',
	rod:0,
	skl:2,
	odu:0,
};
lx['четырёхугольник']={
	ie:'четырёхугольник',
	re:'четырёхугольника',
	de:'четырёхугольнику',
	ve:'четырёхугольник',
	te:'четырёхугольником',
	pe:'четырёхугольнике',
	im:'четырёхугольники',
	rm:'четырёхугольников',
	dm:'четырёхугольникам',
	vm:'четырёхугольники',
	tm:'четырёхугольниками',
	pm:'четырёхугольниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Чехия']={
	ie:'Чехия',
	re:'Чехии',
	de:'Чехии',
	ve:'Чехию',
	te:'Чехией',
	pe:'Чехии',
	im:'Чехии',
	rm:'Чехий',
	dm:'Чехиям',
	vm:'Чехии',
	tm:'Чехиями',
	pm:'Чехиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['число']={
	ie:'число',
	re:'числа',
	de:'числу',
	ve:'число',
	te:'числом',
	pe:'числе',
	im:'числа',
	rm:'чисел',
	dm:'числам',
	vm:'числа',
	tm:'числами',
	pm:'числах',
	rod:2,
	skl:2,
	odu:0,
	chr:1,
};
lx['шахматы']={
	ie:'шахматы',
	re:'шахмат',
	de:'шахматам',
	ve:'шахматы',
	te:'шахматами',
	pe:'шахматах',
	im:'шахматы',
	rm:'шахмат',
	dm:'шахматам',
	vm:'шахматы',
	tm:'шахматами',
	pm:'шахматах',
	rod:0,
	skl:2,
	odu:0,
};
lx['шашки']={
	ie:'шашки',
	re:'шашек',
	de:'шашкам',
	ve:'шашки',
	te:'шашками',
	pe:'шашках',
	im:'шашки',
	rm:'шашек',
	dm:'шашкам',
	vm:'шашки',
	tm:'шашками',
	pm:'шашках',
	rod:3,
	skl:1,
	odu:0,
};
lx['школьница']={
	ie:'школьница',
	re:'школьницы',
	de:'школьнице',
	ve:'школьницу',
	te:'школьницей',
	pe:'школьнице',
	im:'школьницы',
	rm:'школьниц',
	dm:'школьницам',
	vm:'школьницы',
	tm:'школьницами',
	pm:'школьницах',
	rod:1,
	skl:1,
	odu:0,
};
lx['шлак']={
	ie:'шлак',
	re:'шлака',
	de:'шлаку',
	ve:'шлак',
	te:'шлаком',
	pe:'шлаке',
	im:'шлаки',
	rm:'шлаков',
	dm:'шлакам',
	vm:'шлаки',
	tm:'шлаками',
	pm:'шлаках',
	rod:0,
	skl:2,
	odu:0,
};
lx['шоколадка']={
	ie:'шоколадка',
	re:'шоколадки',
	de:'шоколадке',
	ve:'шоколадку',
	te:'шоколадкой',
	pe:'шоколадке',
	im:'шоколадки',
	rm:'шоколадок',
	dm:'шоколадкам',
	vm:'шоколадки',
	tm:'шоколадками',
	pm:'шоколадках',
	rod:1,
	skl:1,
	odu:0,
};
lx['щебень']={
	ie:'щебень',
	re:'щебня',
	de:'щебню',
	ve:'щебень',
	te:'щебнем',
	pe:'щебне',
	im:'щебни',
	rm:'щебней',
	dm:'щебням',
	vm:'щебни',
	tm:'щебнями',
	pm:'щебнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Эквадор']={
	ie:'Эквадор',
	re:'Эквадора',
	de:'Эквадору',
	ve:'Эквадор',
	te:'Эквадором',
	pe:'Эквадоре',
	im:'Эквадоры',
	rm:'Эквадоров',
	dm:'Эквадорам',
	vm:'Эквадоры',
	tm:'Эквадорами',
	pm:'Эквадорах',
	rod:0,
	skl:2,
	odu:0,
};
lx['электричка']={
	ie:'электричка',
	re:'электрички',
	de:'электричке',
	ve:'электричку',
	te:'электричкой',
	pe:'электричке',
	im:'электрички',
	rm:'электричк',
	dm:'электричкам',
	vm:'электрички',
	tm:'электричками',
	pm:'электричках',
	rod:1,
	skl:1,
	odu:0,
}; 
lx['Элеонора']={
	ie:'Элеонора',
	re:'Элеоноры',
	de:'Элеоноре',
	ve:'Элеонору',
	te:'Элеонорой',
	pe:'Элеоноре',
	im:'Элеоноры',
	rm:'Элеонор',
	dm:'Элеонорам',
	vm:'Элеонор',
	tm:'Элеонорами',
	pm:'Элеонорах',
	rod:1,
	skl:1,
	odu:0,
};
lx['этаж']={
	ie:'этаж',
	re:'этажа',
	de:'этажу',
	ve:'этаж',
	te:'этажом',
	pe:'этаже',
	im:'этажи',
	rm:'этажей',
	dm:'этажам',
	vm:'этажи',
	tm:'этажами',
	pm:'этажах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Юлия']={
	ie:'Юлия',
	re:'Юлии',
	de:'Юлии',
	ve:'Юлию',
	te:'Юлией',
	pe:'Юлии',
	im:'Юлии',
	rm:'Юлий',
	dm:'Юлиям',
	vm:'Юлий',
	tm:'Юлиями',
	pm:'Юлиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['яблоко']={
	ie:'яблоко',
	re:'яблока',
	de:'яблоку',
	ve:'яблоко',
	te:'яблоком',
	pe:'яблоке',
	im:'яблоки',
	rm:'яблок',
	dm:'яблокам',
	vm:'яблоки',
	tm:'яблоками',
	pm:'яблоках',
	rod:2,
	skl:2,
	odu:0,
};
lx['Яна']={
	ie:'Яна',
	re:'Яны',
	de:'Яне',
	ve:'Яну',
	te:'Яной',
	pe:'Яне',
	im:'Яны',
	rm:'Ян',
	dm:'Янам',
	vm:'Ян',
	tm:'Янами',
	pm:'Янах',
	rod:1,
	skl:1,
	odu:0,
};
lx['январь']={
	ie:'январь',
	re:'января',
	de:'январю',
	ve:'январь',
	te:'январём',
	pe:'январе',
	im:'январи',
	rm:'январей',
	dm:'январям',
	vm:'январи',
	tm:'январями',
	pm:'январях',
	rod:0,
	skl:2,
	odu:0,
};

//}}Существительные

////////////////////////////////////////////////////////////////////////

lx['выраженный']={};
lx['выраженный'].i=['выраженный','выраженная','выраженное','выраженные'];
lx['выраженный'].r=['выраженного','выраженной','выраженного','выраженных'];
lx['выраженный'].d=['выраженному','выраженной','выраженному','выраженным'];
lx['выраженный'].v=['выраженный','выраженную','выраженное','выраженные'];
lx['выраженный'].t=['выраженным','выраженной','выраженным','выраженными'];
lx['выраженный'].p=['выраженном','выраженной','выраженном','выраженных'];

///////////////////////////////////////////////////////////////////////
//Здесь - только список наречий
//sl - само слово. Оно же неизменяемое
//sr - сравнительная степень
//pr - превосходная степень
//chr - часть речи.
//0 - наречие
//1 - существительное
//2 - числительное
//3 - прилагательное
//4 - местоимение
'use strict';

lx['абсолютно']={
	sl:'абсолютно',
	chr:0,
}
lx['временно']={
	sl:'временно',
	chr:0,
}
////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//	de: дательный		падеж единственного	числа
//	ve: винительный		падеж единственного	числа
//	te: творительный	падеж единственного	числа
//	pe: предложный		падеж единственного	числа
//	ie: именительный	падеж множественного	числа
//	re: родительный		падеж множественного	числа
//	de: дательный		падеж множественного	числа
//	ve: винительный		падеж множественного	числа
//	te: творительный	падеж множественного	числа
//	pe: предложный		падеж множественного	числа
//
//	rod: род:
//		0: мужской
//		1: женский
//		2: средний
//		3: только множественное число
//
//	odu: одушевлённость:
//		0: неодушевлённое
//		1: одушевлённое
//
//	skl: склонение:
//		0: несклоняемое
//		1: первое
//		2: второе
//		3: третье
//		4: разносклоняемые существительные
////////////////////////////////////////////////////////////////////////
'use strict';
if(lx==undefined)
	var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////

//{{Словосочетания с главным словом - существительным
lx['американская миля']={
	ie:'американская миля',
	re:'американской мили',
	de:'американской миле',
	ve:'американскую милю',
	te:'американской милей',
	pe:'американской миле',
	im:'американские мили',
	rm:'американских миль',
	dm:'американским милям',
	vm:'американские мили',
	tm:'американскими милями',
	pm:'американских милях',
	rod:1,
	odu:0,
};
lx['бутылка газировки']={
	ie:'бутылка газировки',
	re:'бутылки газировки',
	de:'бутылке газировки',
	ve:'бутылку газировки',
	te:'бутылкой газировки',
	pe:'бутылке газировки',
	im:'бутылки газировки',
	rm:'бутылок газировки',
	dm:'бутылкам газировки',
	vm:'бутылки газировки',
	tm:'бутылками газировки',
	pm:'бутылках газировки',
	rod:0,
	odu:0,
};
lx['буханка хлеба']={
	ie:'буханка хлеба',
	re:'буханки хлеба',
	de:'буханке хлеба',
	ve:'буханку хлеба',
	te:'буханкой хлеба',
	pe:'буханке хлеба',
	im:'буханки хлеба',
	rm:'буханок хлеба',
	dm:'буханкам хлеба',
	vm:'буханки хлеба',
	tm:'буханками хлеба',
	pm:'буханках хлеба',
	rod:1,
	odu:0,
};
lx['вольная борьба']={
	ie:'вольная борьба',
	re:'вольной борьбы',
	de:'вольной борьбе',
	ve:'вольную борьбу',
	te:'вольной борьбой',
	pe:'вольной борьбе',
	im:'вольные борьбы',
	rm:'вольных борьб',
	dm:'вольным борьбам',
	vm:'вольные борьбы',
	tm:'вольными борьбами',
	pm:'вольных борьбах',
	rod:1,
	odu:0,
};
lx['доисторический омнибус']={
	ie:'доисторический омнибус',
	re:'доисторического омнибуса',
	de:'доисторическому омнибусу',
	ve:'доисторический омнибус',
	te:'доисторическим омнибусом',
	pe:'доисторическом омнибусе',
	im:'доисторические омнибусы',
	rm:'доисторических омнибусов',
	dm:'доисторическим омнибусам',
	vm:'доисторические омнибусы',
	tm:'доисторическими омнибусами',
	pm:'доисторических омнибусах',
	rod:0,
	odu:0,
};
lx['книжная полка']={
	ie:'книжная полка',
	re:'книжной полки',
	de:'книжной полке',
	ve:'книжную полку',
	te:'книжной полкой',
	pe:'книжной полке',
	im:'книжные полки',
	rm:'книжных полок',
	dm:'книжным полкам',
	vm:'книжные полки',
	tm:'книжными полками',
	pm:'книжных полках',
	rod:1,
	odu:0,
};
lx['комсомолка, спортсменка, отличница и, наконец, просто красавица']={
	ie:'комсомолка, спортсменка, отличница и, наконец, просто красавица',
	re:'комсомолки, спортсменки, отличницы и, наконец, просто красавицы',
	de:'комсомолке, спортсменке, отличнице и, наконец, просто красавице',
	ve:'комсомолку, спортсменку, отличницу и, наконец, просто красавицу',
	te:'комсомолкой, спортсменкой, отличницей и, наконец, просто красавицей',
	pe:'комсомолке, спортсменке, отличнице и, наконец, просто красавице',
	im:'комсомолки, спортсменки, отличницы и, наконец, просто красавицы',
	rm:'комсомолок, спортсменок, отличниц и, наконец, просто красавиц',
	dm:'комсомолкам, спортсменкам, отличницам и, наконец, просто красавицам',
	vm:'комсомолок, спортсменок, отличниц и, наконец, просто красавиц',
	tm:'комсомолками, спортсменками, отличницами и, наконец, просто красавицами',
	pm:'комсомолках, спортсменках, отличницах и, наконец, просто красавицах',
	rod:1,
	odu:0,
};
lx['круизный лайнер']={
	ie:'круизный лайнер',
	re:'круизного лайнера',
	de:'круизному лайнеру',
	ve:'круизный лайнер',
	te:'круизным лайнером',
	pe:'круизном лайнере',
	im:'круизные лайнеры',
	rm:'круизных лайнеров',
	dm:'круизным лайнерам',
	vm:'круизные лайнеры',
	tm:'круизными лайнерами',
	pm:'круизных лайнерах',
	rod:0,
	odu:0,
};
lx['лёгкая атлетика']={
	ie:'лёгкая атлетика',
	re:'лёкой атлетики',
	de:'лёгкой атлетике',
	ve:'лёгкую атлетику',
	te:'лёгкой атлетикой',
	pe:'лёгкой атлетике',
	im:'лёгкие атлетики',
	rm:'лёгких атлетик',
	dm:'лёгким атлетикам',
	vm:'лёгкие атлетики',
	tm:'лёгкими атлетиками',
	pm:'лёгких атлетиках',
	rod:1,
	odu:0,
};
lx['магнит на холодильник']={
	ie:'магнит на холодильник',
	re:'магнита на холодильник',
	de:'магниту на холодильник',
	ve:'магнит на холодильник',
	te:'магнитом на холодильник',
	pe:'магните на холодильник',
	im:'магниты на холодильник',
	rm:'магнитов на холодильник',
	dm:'магнитам на холодильник',
	vm:'магниты на холодильник',
	tm:'магнитами на холодильник',
	pm:'магнитах на холодильник',
	rod:0,
	odu:0,
};
lx['метиловый спирт']={
	ie:'метиловый спирт',
	re:'метилового спирта',
	de:'метиловому спирту',
	ve:'метиловый спирт',
	te:'метиловым спиртом',
	pe:'метиловом спирте',
	im:'метиловые спирты',
	rm:'метиловых спиртов',
	dm:'метиловым спиртам',
	vm:'метиловые спирты',
	tm:'метиловыми спиртами',
	pm:'метиловых спиртах',
	rod:0,
	odu:0,
};
lx['морская миля']={
	ie:'морская миля',
	re:'морской мили',
	de:'морской миле',
	ve:'морскую милю',
	te:'морской милей',
	pe:'морской миле',
	im:'морские мили',
	rm:'морских миль',
	dm:'морским милям',
	vm:'морские мили',
	tm:'морскими милями',
	pm:'морских милях',
	rod:1,
	odu:0,
};
lx['наименьшее значение']={
	ie:'наименьшее значение',
	re:'наименьшего значения',
	de:'наименьшему значению',
	ve:'наименьшее значение',
	te:'наименьшим значением',
	pe:'наименьшем значении',
	im:'наименьшие значения',
	rm:'наименьших значений',
	dm:'наименьшим значениям',
	vm:'наименьшие значения',
	tm:'наименьшими значениями',
	pm:'наименьших значениях',
	rod:2,
	odu:0,
};
lx['наибольшее значение']={
	ie:'наибольшее значение',
	re:'наибольшего значения',
	de:'наибольшему значению',
	ve:'наибольшее значение',
	te:'наибольшим значением',
	pe:'наибольшем значении',
	im:'наибольшие значения',
	rm:'наибольших значений',
	dm:'наибольшим значениям',
	vm:'наибольшие значения',
	tm:'наибольшими значениями',
	pm:'наибольших значениях',
	rod:2,
	odu:0,
};
lx['населённый пункт']={
	ie:'населённый пункт',
	re:'населённого пункта',
	de:'населённому пункту',
	ve:'населённый пункт',
	te:'населённым пунктом',
	pe:'населённом пункте',
	im:'населённые пункты',
	rm:'населённых пунктов',
	dm:'населённым пунктам',
	vm:'населённые пункты',
	tm:'населёнными пунктами',
	pm:'населённых пунктах',
	r2:'населённых пункта',
	rod:0,
	odu:0,
};
lx['настольный теннис']={
	ie:'настольный теннис',
	re:'настольного тенниса',
	de:'настольному теннису',
	ve:'настольный теннис',
	te:'настольным теннисом',
	pe:'настольном теннисе',
	im:'настольные теннисы',
	rm:'настольных теннисов',
	dm:'настольным теннисам',
	vm:'настольные теннисы',
	tm:'настольными теннисами',
	pm:'настольных теннисах',
	rod:0,
	odu:0,
};
lx['оконная рама']={
	ie:'оконная рама',
	re:'оконной рамы',
	de:'оконной раме',
	ve:'оконную раму',
	te:'оконной рамой',
	pe:'оконной раме',
	im:'оконные рамы',
	rm:'оконных рам',
	dm:'оконным рамам',
	vm:'оконные рамы',
	tm:'оконными рамами',
	pm:'оконных рамах',
	rod:1,
	odu:0,
};
lx['открытый луч']={
	ie:'открытый луч',
	re:'открытого луча',
	de:'открытому лучу',
	ve:'открытый луч',
	te:'открытым лучом',
	pe:'открытом луче',
	im:'открытые лучы',
	rm:'открытых лучей',
	dm:'открытым лучам',
	vm:'открытые лучи',
	tm:'открытыми лучами',
	pm:'открытых лучах',
	rod:0,
	odu:0,
};
lx['прогулочное судно']={
	ie:'прогулочное судно',
	re:'прогулочного судна',
	de:'прогулочному судну',
	ve:'прогулочное судно',
	te:'прогулочным судном',
	pe:'прогулочном судне',
	im:'прогулочные суда',
	rm:'прогулочных судов',
	dm:'прогулочным судам',
	vm:'прогулочные суда',
	tm:'прогулочными судами',
	pm:'прогулочных судах',
	rod:2,
	odu:0,
};
lx['русская миля']={
	ie:'русская миля',
	re:'русской мили',
	de:'русской миле',
	ve:'русскую милю',
	te:'русской милей',
	pe:'русской миле',
	im:'русские мили',
	rm:'русских миль',
	dm:'русским милям',
	vm:'русские мили',
	tm:'русскими милями',
	pm:'русских милях',
	rod:1,
	odu:0,
};
lx['сборник тестов для подготовки к ЕГЭ']={
	ie:'сборник тестов для подготовки к ЕГЭ',
	re:'сборника тестов для подготовки к ЕГЭ',
	de:'сборнику тестов для подготовки к ЕГЭ',
	ve:'сборник тестов для подготовки к ЕГЭ',
	te:'сборником тестов для подготовки к ЕГЭ',
	pe:'сборнике тестов для подготовки к ЕГЭ',
	im:'сборники тестов для подготовки к ЕГЭ',
	rm:'сборников тестов для подготовки к ЕГЭ',
	dm:'сборникам тестов для подготовки к ЕГЭ',
	vm:'сборники тестов для подготовки к ЕГЭ',
	tm:'сборниками тестов для подготовки к ЕГЭ',
	pm:'сборниках тестов для подготовки к ЕГЭ',
	rod:0,
	odu:0,
};
lx['скромный библиотекарь']={
	ie:'скромный библиотекарь',
	re:'скромного библиотекаря',
	de:'скромному библиотекарю',
	ve:'скромного библиотекаря',
	te:'скромным библиотекарем',
	pe:'скромном библиотекаре',
	im:'скромные библиотекари',
	rm:'скромных библиотекарей',
	dm:'скромным библиотекарям',
	vm:'скромных библиотекарей',
	tm:'скромными библиотекарями',
	pm:'скромных библиотекарях',
	rod:0,
	odu:0,
};
lx['суровая воронежская хакерша']={
	ie:'суровая воронежская хакерша',
	re:'суровой воронежской хакерши',
	de:'суровой воронежской хакерше',
	ve:'суровую воронежскую хакершу',
	te:'суровой воронежской хакершой',
	pe:'суровой воронежской хакерше',
	im:'суровые воронежские хакерши',
	rm:'суровых воронежских хакерш',
	dm:'суровым воронежским хакершам',
	vm:'суровых воронежских хакерш',
	tm:'суровыми воронежскими хакершами',
	pm:'суровых воронежских хакершах',
	rod:1,
	odu:0,
};
lx['точка минимума']={
	ie:'точка минимума',
	re:'точки минимума',
	de:'точке минимума',
	ve:'точку минимума',
	te:'точкой минимума',
	pe:'точке минимума',
	im:'точки минимума',
	rm:'точек минимума',
	dm:'точкам минимума',
	vm:'точки минимума',
	tm:'точками минимума',
	pm:'точках минимума',
	rod:1,
	odu:0,
};
lx['точка максимума']={
	ie:'точка максимума',
	re:'точки максимума',
	de:'точке максимума',
	ve:'точку максимума',
	te:'точкой максимума',
	pe:'точке максимума',
	im:'точки максимума',
	rm:'точек максимума',
	dm:'точкам максимума',
	vm:'точки максимума',
	tm:'точками максимума',
	pm:'точках максимума',
	rod:1,
	odu:0,
};
lx['тяжелая атлетика']={
	ie:'тяжелая атлетика',
	re:'тяжелой атлетики',
	de:'тяжелой атлетике',
	ve:'тяжелую атлетику',
	te:'тяжелой атлетикой',
	pe:'тяжелой атлетике',
	im:'тяжелые атлетики',
	rm:'тяжелых атлетик',
	dm:'тяжелым атлетикам',
	vm:'тяжелые атлетики',
	tm:'тяжелыми атлетиками',
	pm:'тяжелых атлетиках',
	rod:1,
	odu:0,
};
lx['упаковка сока']={
	ie:'упаковка сока',
	re:'упаковки сока',
	de:'упаковке сока',
	ve:'упаковку сока',
	te:'упаковкой сока',
	pe:'упаковке сока',
	im:'упаковки сока',
	rm:'упаковок сока',
	dm:'упаковкам сока',
	vm:'упаковки сока',
	tm:'упаковками сока',
	pm:'упаковках сока',
	rod:1,
	odu:0,
};
lx['флакон шампуня']={
	ie:'флакон шампуня',
	re:'флакона шампуня',
	de:'флакону шампуня',
	ve:'флакон шампуня',
	te:'флаконом шампуня',
	pe:'флаконе шампуня',
	im:'флаконы шампуня',
	rm:'флаконов шампуня',
	dm:'флаконам шампуня',
	vm:'флаконы шампуня',
	tm:'флаконами шампуня',
	pm:'флаконах шампуня',
	rod:0,
	odu:0,
};
lx['фунт стерлингов']={
	ie:'фунт стерлингов',
	re:'фунта стерлингов',
	de:'фунту стерлингов',
	ve:'фунт стерлингов',
	te:'фунтом стерлингов',
	pe:'фунте стерлингов',
	im:'фунты стерлингов',
	rm:'фунтов стерлингов',
	dm:'фунтам стерлингов',
	vm:'фунты стерлингов',
	tm:'фунтами стерлингов',
	pm:'фунтах стерлингов',
	rod:0,
	skl:2,
	odu:0,
};
lx['цветочный горшок']={
	ie:'цветочный горшок',
	re:'цветочного горшка',
	de:'цветочному горшку',
	ve:'цветочный горшок',
	te:'цветочным горшком',
	pe:'цветочном горшке',
	im:'цветочные горшки',
	rm:'цветочных горшков',
	dm:'цветочным горшкам',
	vm:'цветочные горшки',
	tm:'цветочными горшками',
	pm:'цветочных горшках',
	rod:0,
	skl:2,
	odu:0,
};
//}}Словосочетания с главным словом - существительным

'use strict';
////////////////////////////////////////////////////////////////////////
var lxskl=[];	//Объявляем глобальный объект lxskl - типичные окончания
////////////////////////////////////////////////////////////////////////
var lxpad={ie:1,re:1,de:1,ve:1,te:1,pe:1,im:1,rm:1,dm:1,vm:1,tm:1,pm:1,};

//Пустой шаблон

lxskl['']={
	ie:'',
	re:'',
	de:'',
	ve:'',
	te:'',
	pe:'',
	im:'',
	rm:'',
	dm:'',
	vm:'',
	tm:'',
	pm:'',
	rod:0,
	skl:2,
	odu:0,
};
//Первое склонение. Род считаем женским, если что, ставим вручную.
{
lxskl['я']={
	ie:'я',
	re:'и',
	de:'е',
	ve:'ю',
	te:'ей',
	pe:'е',
	im:'и',
	rm:'',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:1,
	skl:1,
	odu:0,
};
lxskl['а']={
	ie:'а',
	re:'ы',
	de:'е',
	ve:'у',
	te:'ой',
	pe:'е',
	im:'ы',
	rm:'',
	dm:'ам',
	vm:'ы',
	tm:'ами',
	pm:'ах',
	rod:1,
	skl:1,
	odu:0,
};
['ж','ш','ч','щ','к','х','г'].map(function(a){
	lxskl[a+'а']={
		ie:a+'а',
		re:a+'и',
		de:a+'е',
		ve:a+'у',
		te:a+'ой',
		pe:a+'е',
		im:a+'и',
		rm:a+'',
		dm:a+'ам',
		vm:a+'и',
		tm:a+'ами',
		pm:a+'ах',
		rod:1,
		skl:1,
		odu:0,
	}; 
});
['ж','ш','ч'].map(function(a){
	lxskl[a+'ка']={
		ie:a+'ка',
		re:a+'ки',
		de:a+'ке',
		ve:a+'ку',
		te:a+'кой',
		pe:a+'ке',
		im:a+'ки',
		rm:a+'ек',
		dm:a+'кам',
		vm:a+'ки',
		tm:a+'ками',
		pm:a+'ках',
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
['б','в','д','з','л','м','н','п','р','с','т'].map(function(a){
	lxskl[a+'ка']={
		ie:a+'ка',
		re:a+'ки',
		de:a+'ке',
		ve:a+'ку',
		te:a+'кой',
		pe:a+'ке',
		im:a+'ки',
		rm:a+'ок',
		dm:a+'кам',
		vm:a+'ки',
		tm:a+'ками',
		pm:a+'ках',
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
lxskl['ия']={
	ie:'ия',
	re:'ии',
	de:'ии',
	ve:'ию',
	te:'ией',
	pe:'ии',
	im:'ии',
	rm:'ий',
	dm:'иям',
	vm:'ии',
	tm:'иями',
	pm:'иях',
	rod:1,
	skl:1,
	odu:0,
};
}
//Второе склонение, средний род
lxskl['ие']={
	ie:'ие',
	re:'ия',
	de:'ию',
	ve:'ие',
	te:'ием',
	pe:'ии',
	im:'ия',
	rm:'ий',
	dm:'иям',
	vm:'ия',
	tm:'иями',
	pm:'иях',
	rod:2,
	skl:2,
	odu:0,
};
['ё','е'].map(function(a){
	lxskl[a]={
		ie:a,
		re:'я',
		de:'ю',
		ve:a,
		te:'ем',
		pe:'е',
		im:'я',
		rm:'ей',
		dm:'ям',
		vm:'я',
		tm:'ями',
		pm:'ях',
		rod:2,
		skl:2,
		odu:0,
	};
});

lxskl['о']={
	ie:'о',
	re:'а',
	de:'у',
	ve:'о',
	te:'ом',
	pe:'е',
	im:'а',
	rm:'',
	dm:'ам',
	vm:'а',
	tm:'ами',
	pm:'ах',
	rod:2,
	skl:2,
	odu:0,
};
//Второе склонение, мужской род
lxskl['ий']={
	ie:'ий',
	re:'ия',
	de:'ию',
	ve:'ий',
	te:'ием',
	pe:'ии',
	im:'ии',
	rm:'иев',
	dm:'иям',
	vm:'ии',
	tm:'иями',
	pm:'иях',
	rod:0,
	skl:2,
	odu:0,
};
lxskl['ь']={
	ie:'ь',
	re:'я',
	de:'ю',
	ve:'ь',
	te:'ем',
	pe:'е',
	im:'и',
	rm:'ей',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:0,
	skl:2,
	odu:0,
}; 
lxskl['й']={
	ie:'й',
	re:'я',
	de:'ю',
	ve:'й',
	te:'ем',
	pe:'е',
	im:'и',
	rm:'ев',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:0,
	skl:2,
	odu:0,
};
['б','в','д','з','л','м','н','п','р','с','т','ф','ц'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a+'а',
		de:a+'у',
		ve:a,
		te:a+'ом',
		pe:a+'е',
		im:a+'ы',
		rm:a+'ов',
		dm:a+'ам',
		vm:a+'ы',
		tm:a+'ами',
		pm:a+'ах',
		rod:0,
		skl:2,
		odu:0,
	}; 	
});
['ж','ш','ч','щ','к','х','г'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a+'а',
		de:a+'у',
		ve:a,
		te:a+'ом',
		pe:a+'е',
		im:a+'и',
		rm:a+'ей',
		dm:a+'ам',
		vm:a+'и',
		tm:a+'ами',
		pm:a+'ах',
		rod:0,
		skl:2,
		odu:0,
	}; 
});
lxskl['к'].rm='ков';
lxskl['г'].rm='гов';
lxskl['х'].rm='хов';

['ё','е','о'].map(function(a){
	lxskl[a+'к']={
		ie:a+'к',
		re:'ка',
		de:'ку',
		ve:a+'к',
		te:'ком',
		pe:'ке',
		im:'ки',
		rm:'ков',
		dm:'кам',
		vm:'ки',
		tm:'ами',
		pm:'ах',
		rod:0,
		skl:2,
		odu:0,
	};
});
//Костыли
lxskl['0']={
	ie:'',
	re:'',
	de:'',
	ve:'',
	te:'',
	pe:'',
	im:'',
	rm:'',
	dm:'',
	vm:'',
	tm:'',
	pm:'',
	rod:0,
	skl:0,
	odu:0,
};
lxskl['мя']={
	ie:'мя',
	re:'мени',
	de:'мени',
	ve:'мя',
	te:'менем',
	pe:'мени',
	im:'мена',
	rm:'мён',
	dm:'менам',
	vm:'мена',
	tm:'менами',
	pm:'менах',
	rod:0,
	skl:4,
	odu:0,
};
//И отдельный набор костылей для третьего склонения
lxskl['ь3']={
	ie:'ь',
	re:'и',
	de:'и',
	ve:'ь',
	te:'ью',
	pe:'и',
	im:'и',
	rm:'ей',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:1,
	skl:3,
	odu:0,
};
['ж','ш','ч','щ'].map(function(a){
	lxskl[a+'ь']={
		ie:a+'ь',
		re:a+'и',
		de:a+'и',
		ve:a+'ь',
		te:a+'ью',
		pe:a+'и',
		im:a+'и',
		rm:a+'ей',
		dm:a+'ям',
		vm:a+'и',
		tm:a+'ями',
		pm:a+'ях',
		rod:1,
		skl:3,
		odu:0,
	};
});
//Несклоняемые
['у','ю','э'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a,
		de:a,
		ve:a,
		te:a,
		pe:a,
		im:a,
		rm:a,
		dm:a,
		vm:a,
		tm:a,
		pm:a,
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
'use strict';

function autosklon(slovo,p1){
	if(slovo.isArray){
		for(var lensl=slovo.length-1;lensl>=0;lensl--)
			autosklon(slovo[lensl],p1);
		return;
	}
	if(lx[slovo])
		return console.log('Такое слово уже есть в словаре.');
	var rez=setlx(slovo);
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv());
	var lxparent=lx[sl]?lx[sl]:lxskl[sl];
	var osnova=slovo.udalPosl(sl.length);
	for(var padezh in lxpad)
		rez+=logparam(padezh,osnova+lxparent[padezh]);
	rez+=logparam('rod',lxparent.rod);
	rez+=logparam('skl',lxparent.skl);
	rez+=logparam('odu',lxparent.odu);
	rez+='};\n'
	console.log(rez);//Это НЕ ОТЛАДКА!!!
}

var lxkand=[];

function sklonlxkand(slovo,p1,al){
	if(lx[slovo]){
		if(al)
			alert('Такое слово уже есть в словаре.');
		return lx[slovo];
	}
	lxkand[slovo]={};
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv());
	var lxparent=lx[sl]?lx[sl]:lxskl[sl];
	var osnova=slovo.udalPosl(sl.length);
	lxkand[slovo]=lxparent.clone();
	for(var padezh in lxpad)
		lxkand[slovo][padezh]=osnova+lxparent[padezh];
	lxkand[slovo].chr=1;
	return lxkand[slovo];
}

var lxdop={
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
	sl:1,
	sr:1,
	pr:1,
	chr:1,
};

function strlxkand(slovo,p1,al){
	var rez=setlx(slovo);
	var sl;
	if(!lxkand[slovo])
		sl=sklonlxkand(slovo,p1,al).clone();
	else
		sl=lxkand[slovo].clone();
	for(var pad in lxpad){
		rez+=logparam(pad,sl[pad]);
		sl[pad]=undefined;
	}
	for(var pad in lxdop){
		rez+=logparam(pad,sl[pad]);
		sl[pad]=undefined;
	}
	for(var pad in sl)
		rez+=logparam(pad,sl[pad]);
	rez+='};\n';
	return rez;
}

function loglxkand(slovo,p1){
	console.log(strlxkand(slovo,p1,1));
}

function setlx(p1){
	return('\nlx[\''+p1+'\']={\n');
}

function logparam(p1,p2){
	return p2!=undefined? 
		p2.isString?
			('\t'+p1+':\''+p2+'\',\n'):
			('\t'+p1+':'+p2+',\n')
		:'';
}

function logsklon(a){
	if(slovo.isArray){
		for(var lensl=slovo.length-1;lensl>=0;lensl--)
			logsklon(slovo[lensl],p1);
		return;
	}
	console.log(sklon(a))
}

function sklon(a){
	setlx(a);
	var osn;//"Основа" слова. Выбирается так, чтобы было удобно.
	var rez='';//То, что отправим в результат. Например, в консоль.
	rez+=setlx(a);
	if(a.posl()=='а'){
		osn=a.udalPosl();
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'ы');
		rez+=logparam('de',osn+'е');
		rez+=logparam('ve',osn+'у');
		rez+=logparam('te',osn+'ой');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'ы');
		rez+=logparam('rm',osn);
		rez+=logparam('dm',osn+'ам');
		rez+=logparam('vm',osn+'ы');
		rez+=logparam('tm',osn+'ами');
		rez+=logparam('pm',osn+'ах');
		rez+=logparam('rod',1);
		rez+=logparam('skl',1);
		rez+=logparam('odu',0);
	}else
	if(a.posl()=='ь'){
		osn=a.udalPosl();
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'я');
		rez+=logparam('de',osn+'ю');
		rez+=logparam('ve',a);
		rez+=logparam('te',osn+'ем');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'и');
		rez+=logparam('rm',osn+'ей');
		rez+=logparam('dm',osn+'ям');
		rez+=logparam('vm',osn+'и');
		rez+=logparam('tm',osn+'ями');
		rez+=logparam('pm',osn+'ях');
		rez+=logparam('rod',0);
		rez+=logparam('skl',2);
		rez+=logparam('odu',0);
	}else
	{
		osn=a;
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'а');
		rez+=logparam('de',osn+'у');
		rez+=logparam('ve',a);
		rez+=logparam('te',osn+'ом');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'ы');
		rez+=logparam('rm',osn+'ов');
		rez+=logparam('dm',osn+'ам');
		rez+=logparam('vm',osn+'ы');
		rez+=logparam('tm',osn+'ами');
		rez+=logparam('pm',osn+'ах');
		rez+=logparam('rod',0);
		rez+=logparam('skl',2);
		rez+=logparam('odu',0);
	}
	rez+='};\n'
	return rez;
}
'use strict';
lx['один']={
	chr:2,
	i:'один',
	r:'одного',
	d:'одному',
	v:'один',
	t:'одним',
	p:'одном',
};
lx['одна']={
	chr:2,
	i:'одна',
	r:'одной',
	d:'одной',
	v:'одну',
	t:'одной',
	p:'одной',
};
lx['одно']={
	chr:2,
	i:'одно',
	r:'одного',
	d:'одному',
	v:'одно',
	t:'одним',
	p:'одном',
};
lx['одни']={
	chr:2,
	i:'одни',
	r:'одних',
	d:'одним',
	v:'одни',
	t:'одними',
	p:'одних',
};
lx['две']={
	chr:2,
	i:'две',
	r:'двух',
	d:'двум',
	v:'две',
	t:'двумя',
	p:'двух',
};
lx['два']={
	chr:2,
	i:'два',
	r:'двух',
	d:'двум',
	v:'два',
	t:'двумя',
	p:'двух',
};
lx['три']={
	chr:2,
	i:'три',
	r:'трёх',
	d:'трём',
	v:'три',
	t:'тремя',
	p:'трех',
};
lx['четыре']={
	chr:2,
	i:'четыре',
	r:'четырёх',
	d:'четырём',
	v:'четыре',
	t:'четырьмя',
	p:'четырёх',
};
lx['пять']={
	chr:2,
	i:'пять',
	r:'пяти',
	d:'пяти',
	v:'пять',
	t:'пятью',
	p:'пяти',
};
lx['шесть']={
	chr:2,
	i:'шесть',
	r:'шести',
	d:'шести',
	v:'шесть',
	t:'шестью',
	p:'шести',
};
lx['семь']={
	chr:2,
	i:'семь',
	r:'семи',
	d:'семи',
	v:'семь',
	t:'семью',
	p:'семи',
};
lx['восемь']={
	chr:2,
	i:'восемь',
	r:'восьми',
	d:'восьми',
	v:'восемь',
	t:'восемью',
	p:'восьми',
};
lx['девять']={
	chr:2,
	i:'девять',
	r:'девяти',
	d:'девяти',
	v:'девять',
	t:'девятью',
	p:'девяти',
};
lx['десять']={
	chr:2,
	i:'десять',
	r:'десяти',
	d:'десяти',
	v:'десять',
	t:'десятью',
	p:'десяти',
};
lx['одиннадцать']={
	chr:2,
	i:'одиннадцать',
	r:'одиннадцати',
	d:'одиннадцати',
	v:'одиннадцать',
	t:'одиннадцатью',
	p:'одиннадцати',
};
lx['двенадцать']={
	chr:2,
	i:'двенадцать',
	r:'двенадцати',
	d:'двенадцати',
	v:'двенадцать',
	t:'двенадцатью',
	p:'двенадцати',
};
lx['тринадцать']={
	chr:2,
	i:'тринадцать',
	r:'тринадцати',
	d:'тринадцати',
	v:'тринадцать',
	t:'тринадцатью',
	p:'тринадцати',
};
lx['четырнадцать']={
	chr:2,
	i:'четырнадцать',
	r:'четырнадцати',
	d:'четырнадцати',
	v:'четырнадцать',
	t:'четырнадцатью',
	p:'четырнадцати',
};
lx['пятнадцать']={
	chr:2,
	i:'пятнадцать',
	r:'пятнадцати',
	d:'пятнадцати',
	v:'пятнадцать',
	t:'пятнадцатью',
	p:'пятнадцати',
};
lx['шестнадцать']={
	chr:2,
	i:'шестнадцать',
	r:'шестнадцати',
	d:'шестнадцати',
	v:'шестнадцать',
	t:'шестнадцатью',
	p:'шестнадцати',
};
lx['семнадцать']={
	chr:2,
	i:'семнадцать',
	r:'семнадцати',
	d:'семнадцати',
	v:'семнадцать',
	t:'семнадцатью',
	p:'семнадцати',
};
lx['восемнадцать']={
	chr:2,
	i:'восемнадцать',
	r:'восемнадцати',
	d:'восемнадцати',
	v:'восемнадцать',
	t:'восемнадцатью',
	p:'восемнадцати',
};
lx['девятнадцать']={
	chr:2,
	i:'девятнадцать',
	r:'девятнадцати',
	d:'девятнадцати',
	v:'девятнадцать',
	t:'девятнадцатью',
	p:'девятнадцати',
};
lx['двадцать']={
	chr:2,
	i:'двадцать',
	r:'двадцати',
	d:'двадцати',
	v:'двадцать',
	t:'двадцатью',
	p:'двадцати',
};
lx['тридцать']={
	chr:2,
	i:'тридцать',
	r:'тридцати',
	d:'тридцати',
	v:'тридцать',
	t:'тридцатью',
	p:'тридцати',
};
lx['сорок']={
	chr:2,
	i:'сорок',
	r:'сорока',
	d:'сорока',
	v:'сорок',
	t:'сорока',
	p:'сорока',
};
lx['пятьдесят']={
	chr:2,
	i:'пятьдесят',
	r:'пятидесяти',
	d:'пятидесяти',
	v:'пятьдесят',
	t:'пятьюдесятью',
	p:'пятидесяти',
};
lx['шестьдесят']={
	chr:2,
	i:'шестьдесят',
	r:'шестидесяти',
	d:'шестидесяти',
	v:'шестьдесят',
	t:'шестьюдесятью',
	p:'шестидесяти',
};
lx['семьдесят']={
	chr:2,
	i:'семьдесят',
	r:'семидесяти',
	d:'семидесяти',
	v:'семьдесят',
	t:'семьюдесятью',
	p:'семидесяти',
};
lx['восемьдесят']={
	chr:2,
	i:'восемьдесят',
	r:'восьмидесяти',
	d:'восьмидесяти',
	v:'восемьдесят',
	t:'восемьюдесятью',
	p:'восьмидесяти',
};
lx['девяносто']={
	chr:2,
	i:'девяносто',
	r:'девяноста',
	d:'девяноста',
	v:'девяносто',
	t:'девяноста',
	p:'девяноста',
};
lx['сто']={
	chr:2,
	i:'сто',
	r:'ста',
	d:'ста',
	v:'сто',
	t:'ста',
	p:'ста',
};
lx['двести']={
	chr:2,
	i:'двести',
	r:'двухсот',
	d:'двумстам',
	v:'двести',
	t:'двумястами',
	p:'двухстах',
};
lx['триста']={
	chr:2,
	i:'триста',
	r:'трёхсот',
	d:'трёмстам',
	v:'триста',
	t:'тремястами',
	p:'трёхстах',
};
lx['четыреста']={
	chr:2,
	i:'четыреста',
	r:'четырёхсот',
	d:'четырёмстам',
	v:'четыреста',
	t:'четырьмястами',
	p:'четырёхстах',
};
lx['пятьсот']={
	chr:2,
	i:'пятьсот',
	r:'пятисот',
	d:'пятистам',
	v:'пятьсот',
	t:'пятьюстами',
	p:'пятистах',
};
lx['шестьсот']={
	chr:2,
	i:'шестьсот',
	r:'шестисот',
	d:'шестистам',
	v:'шестьсот',
	t:'шестьюстами',
	p:'шестистах',
};
lx['семьсот']={
	chr:2,
	i:'семьсот',
	r:'семисот',
	d:'семистам',
	v:'семисот',
	t:'семьюстами',
	p:'семистах',
};
lx['восемьсот']={
	chr:2,
	i:'восемьсот',
	r:'восьмисот',
	d:'восьмистам',
	v:'восемьсот',
	t:'восемьюстами',
	p:'восьмистах',
};
lx['девятьсот']={
	chr:2,
	i:'девятьсот',
	r:'девятисот',
	d:'девятистам',
	v:'девятьсот',
	t:'девятьюстами',
	p:'девятистах',
};
lx['тысяча']={
	chr:2,
	i:'тысяча',
	r:'тысячи',
	d:'тысяче',
	v:'тысячу',
	t:'тысячей',
	p:'тысяче',
};
lx['тысячи']={
	chr:2,
	i:'тысячи',
	r:'тысяч',
	d:'тысячам',
	v:'тысячи',
	t:'тысячами',
	p:'тысячах',
};
lx['миллион']={
	chr:2,
	i:'миллион',
	r:'миллиона',
	d:'миллиону',
	v:'миллион',
	t:'миллионом',
	p:'миллионе',
};
lx['миллионы']={
	chr:2,
	i:'миллионы',
	r:'миллионов',
	d:'миллионам',
	v:'миллионы',
	t:'миллионами',
	p:'миллионах',
};
lx['миллиард']={
	chr:2,
	i:'миллиард',
	r:'миллиарда',
	d:'миллиарду',
	v:'миллиард',
	t:'миллиардом',
	p:'миллиарде',
};
lx['миллиарды']={
	chr:2,
	i:'миллиарды',
	r:'миллиардов',
	d:'миллиардам',
	v:'миллиарды',
	t:'миллиардами',
	p:'миллиардах',
};
lx['двое']={
	chr:2,
	i:'двое',
	r:'двоих',
	d:'двоим',
	v:'двое',
	t:'двоими',
	p:'двоих',
};
lx['трое']={
	chr:2,
	i:'трое',
	r:'троих',
	d:'троим',
	v:'трое',
	t:'троими',
	p:'троих',
};
lx['четверо']={
	chr:2,
	i:'четверо',
	r:'четверых',
	d:'четверым',
	v:'четверо',
	t:'четверыми',
	p:'четверых',
};
lx['пятеро']={
	chr:2,
	i:'пятеро',
	r:'пятерых',
	d:'пятерым',
	v:'пятеро',
	t:'пятерыми',
	p:'пятерых',
}; 
lx['шестеро']={
	chr:2,
	i:'шестеро',
	r:'шестерых',
	d:'шестерым',
	v:'шестеро',
	t:'шестерыми',
	p:'шестерых',
};
lx['семеро']={
	chr:2,
	i:'семеро',
	r:'семерых',
	d:'семерым',
	v:'семеро',
	t:'семерыми',
	p:'семерых',
};
lx['восьмеро']={
	chr:2,
	i:'восьмеро',
	r:'восьмерых',
	d:'восьмерым',
	v:'восьмеро',
	t:'восьмерыми',
	p:'восьмерых',
};
lx['девятеро']={
	chr:2,
	i:'девятеро',
	r:'девятерых',
	d:'девятерым',
	v:'девятеро',
	t:'девятерыми',
	p:'девятерых',
};
lx['десятеро']={
	chr:2,
	i:'десятеро',
	r:'десятерых',
	d:'десятерым',
	v:'десятеро',
	t:'десятерыми',
	p:'десятерых',
};
//http://pastebin.com/Dpv8pQWW - Любовь Ерышова
//http://pastebin.com/jJ8CWxd0 - Екатерина Трегубова
//+Николай Авдеев
'use strict';
//Движок от В14

//a - объект с параметрами. Так сказать, питонический подход.
//slag - массив со слагаемыми в виде строк. Наверное, можно и числа, но лучше не надо.
//minx - точка минимума					//Если одно из них не указано, попросту не спрашиваем
//miny - значение в точке минимума		//
//maxx - точка максимума				//
//maxy - значение в точке максимума		//
//cnst - принудительно указать константу. Если 0 - то ясно, не упоминать.
//prnz - начало промежутка				//
//prkz - конец промежутка				//Если одного нет, то луч. Если обоих, то вся ОДЗ
//prnb - открытое начало промежутка				
//prkb - открытый конец промежутка				
//chet - чётная функция
//nech - нечётная функция

function fn_promezh(a){
	if(a.prnz)
		a.prnz=a.prnz.ts().plusminus();
	if(a.prkz)
		a.prkz=a.prkz.ts().plusminus();
	//Если границ промежутка нет, то это числовая прямая.
	if(a.prnz==undefined && a.prkz==undefined)
		return {
			nazv:'',
			text:'$(-\\infty;\\infty)$',
		}
	
	if(a.prnz==undefined && a.prkb)
		return{
			nazv:'открытый луч',
			text:'$(-\\infty;'+a.prkz.ts()+')$',
		}
	
	if(a.prkz==undefined && a.prnb)
		return{
			nazv:'открытый луч',
			text:'$('+a.prnz.ts()+';\\infty)$',
		}
	
	if(a.prnz==undefined)
		return{
			nazv:'луч',
			text:'$(-\\infty;'+a.prkz.ts()+']$',
		}
	
	if(a.prkz==undefined)
		return{
			nazv:'луч',
			text:'$['+a.prnz.ts()+';\\infty)$',
		}
	
	if(a.prkb&&a.prkz)
		return{
			nazv:'интервал',
			text:'$('+a.prnz.ts()+';'+a.prkz.ts()+')$',
		}
	
	if(a.prkb)
		return{
			nazv:'полуинтервал',
			text:'$['+a.prnz.ts()+';'+a.prkz.ts()+')$',
		}
	
	if(a.prnb)
		return{
			nazv:'полуинтервал',
			text:'$('+a.prnz.ts()+';'+a.prkz.ts()+']$',
		}
	
	return{
		nazv:'отрезок',
		text:'$['+a.prnz.ts()+';'+a.prkz.ts()+']$',
	}
}

function fn_na(a){
	var b=fn_promezh(a);
	if(!b.nazv)
		return '';
	return ' на '+lx[b.nazv].pe+' '+b.text;
}

function fn_formul(a){
	var txt=[];
	var otv=[];
	if(a.minx!=undefined){
		txt.push('точка минимума');
		otv.push(a.minx);
	}
	if(a.maxx!=undefined){
		txt.push('точка максимума');
		otv.push(a.maxx);
	}
	if(a.miny!=undefined){
		txt.push('наименьшее значение');
		otv.push(a.miny);
	}
	if(a.maxy!=undefined){
		txt.push('наибольшее значение');
		otv.push(a.maxy);
	}
	var vpr=[txt,otv].T().iz();
	return {
		txt: (om.otvnaydite.iz().toZagl()+' '+lx[vpr[0]].ve+' функции $y = '+a.slag.slag()+'$'+fn_na(a)).plusminus(),
		ver: vpr[1].plusminus(),
	}
}

function fn_maxminxObmen(a){
	//Меняем местами минимум и максимум
	var buf=a.minx;
	a.minx=a.maxx;
	a.maxx=buf;
}

function fn_maxminxMinus(a){
	a.maxx=fn_minus(a.maxx);
	a.minx=fn_minus(a.minx);
}

function fn_promezhMinus(a){
	//Меняем местами границы интервала и дописываем минус
	var buf=a.prnz;
	a.prnz=fn_minus(a.prkz);
	a.prkz=fn_minus(buf);

	buf=a.prnb;
	a.prnb=a.prkb;
	a.prkb=buf;
}

function fn_maxminyMinusObmen(a){
	//Меняем местами наибольшее и наименьшее значения
	var buf=a.miny;
	a.miny=fn_minus(a.maxy);
	a.maxy=fn_minus(buf);
}

function fn_minus(b){
	if(b)
		return '-'+b.ts();
	return b;
}

function fn_plusminus(a){
	if(sl1()){
		//Меняем местами минимум и максимум
		fn_maxminxObmen(a);
		//Меняем местами наибольшее и наименьшее значения
		fn_maxminyMinusObmen(a);
		a.slag=a.slag.addPrefix('-');
	}
}

function fn_const(a){
	if( (a.cnst!=0) && (!a.maxy||a.maxy.isNumber) && (!a.miny||a.miny.isNumber) )	{
		if(a.cnst==undefined)
			a.cnst=sl(-99,99);
		if(a.cnst.isNumber){
			a.slag.push(a.cnst);
			if(a.maxy!=undefined)
				a.maxy+=a.cnst;
			if(a.miny!=undefined)
				a.miny+=a.cnst;
		}
	}
}

function fn_chet(a){
	if(sl1()){
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
	}
}

function fn_nech(a){
	if(sl1()){
		fn_maxminxObmen(a);
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
		fn_maxminyMinusObmen(a);
	}
}

function fn_zadan(a){
	if(a.nech)
		fn_nech(a);
	else if(a.chet)
		fn_chet(a);
	fn_const(a);
	fn_plusminus(a);
	return fn_formul(a);
}

//А это - неудачная, тупиковая ветка, но она таки используется

function fn_txt(nai,f,n,k,nb,kb){
	return (
		om.otvnaydite.iz().toZagl()+' '+nai+' функции $y = '+f+'$ на промежутке $'+(nb?'(':'[')+n+';'+k+(kb?')':']')+'$.'
	).plusminus();
}	

'use strict';
//Блок из функций, которые обеспечивают движок расчётных задач
//{{

function svVel(a){
/*Массив a состоит из элементов-объектов следующей структуры:
	vel: название величины
	rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	zna: значение величины
	nmn: размерность величины. Опять же, если не указано - лесом.
	nah: можно ли требовать найти величину
	pre: префикс, то есть то, что пишется перед названием величины
	utv: альтернативное величине утвердительное высказывание
	vpr: альтернативный вопрос
	vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
*/
	var b=a.slice();
	b.shuffle();
	for(;!b[0].nah;b.shuffle());
	var rez='';//Сюда будет записан результат
	var c=b[0];
	for(var i1=b.length-1;i1>0;i1--)
		b[i1]=nazvVel(b[i1]);
	
	b.splice(0,1);
	var d=sluchch(1,[b.length,3].minE());
	var f=[c.zna];//В этом массиве будут фразы.
	f[1]=voprVel(c,sosiskaVel(b.splice(0,d)));
	for(;b.length;){
		var st=b.splice(0,1);
		var sk=sosiskaVel(b.splice(0,sluchch(2)));
		f.push((om.utochn.iz()+st+(sk?om.utochn2.iz()+sk:'')+'. ').plusminus().toZagl());
	}
	return f;
}

function nazvVel(a){
	if(a.utv)
		return a.utv;
	if(!a.rod)
		a.rod=0;
	
	var rez=(
		a.vel+' '+
		(a.bkv?
			'$'+a.bkv+'=':
			[om.ravno,om.sostavl].iz()[a.rod]+' '
		)+
		(a.pre?
			a.pre:
			''
		)+
		a.zna+
		(a.nmn?
			(a.bkv?
			'~':
			' '
			)
			+a.nmn:
			''
		)+
		(a.bkv?
			'$':
			''
		)
	);
//	console.log(rez);
	return rez;
}

function sosiskaVel(a){
	if(!a.length)
		return '';

	for(var rez=''+a.splice(0,1);a.length;)
		rez+=om.utochn2.iz()+a.splice(0,1);

	return rez;
}

function voprVel(a,t1){
	var rez='';
	t1=t1.trim();
	t1=t1?', если '+t1:'';
	a.rod=a.rod?a.rod:0;
	if(a.vpr){
		rez=a.vpr.toZagl()+t1+'? '+
		(
		!!a.nmn?
		['ответ',otvdayte.iz()].shuffle().join(' ').toZagl()+' в '+a.nmn+'.':
		''		
		);
		return rez;
	}
	var bkv=(' $'+a.bkv+'$').esli(a.bkv);
	var rez=[
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+t1+'? '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'.'.esli(a.nmn.posl()!='.')+' ':
				''
			)
		,
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].i[a.rod]+' в '+a.nmn:
				''
			)+
			t1+'? '
		,
			'Сколько '+(a.nmn+' ').esli(a.nmn)+om.sostavl[a.rod]+' '+a.vel+bkv+t1+'? '
		,
	];
	if(a.vin==1)
		a.vin=a.vel;
	
	if(a.vin){
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].v[a.rod]+'в '+a.nmn:
				''
			)
			+t1+'. '
		);
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+t1+'. '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'. ':
				''
			)
		);
	}
	return rez.iz();
}

//}}
'use_strict';

window.latbukv=["A","B","C","D","F","G","H","J","L","M","N","P","R","S","T","Q","U","W","X","Y","Z"];
window.rusbukv=["А","Б","В","Г","Д","Е","Ё","Ж","И","Й","К","Л","М","Н","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"];

window.moneta=['орёл','решка'];

window.razy=['ни разу','один раз','дважды','трижды','четырежды','пятикратно','шестикратно','семикратно','восьмикратно','девятикратно','десятикратно'];

window.kachestva={};
window.kachestva.ie=['безопасность','комфорт','функциональность','качество','внешний вид','простота ремонта','надёжность','гарантийный срок','скорость запуска','настраиваемость'];

window.tovary={};
window.tovary.ie=['автомобиль'	,'кофеварка'	,'чайник'	,'ноутбук'		,'бензопила'	,'СВЧ-печь'		,'велосипед'	,'садовый насос'	];
window.tovary.rm=['автомобилей'	,'кофеварок'	,'чайников'	,'ноутбуков'	,'бензопил'		,'СВЧ-печей'	,'велосипедов'	,'садовых насосов'	];

window.dlina={};
window.dlina.m= [/*7467.6, 			*/	1066.8,		185.2,			1852,				1609.34,				201.16		];
window.dlina.pm=[/*'русских милях',	*/	'вёрстах',	'кабельтовах',	'морских милях',	'американских милях',	'фурлонгах'	];
window.dlina.ie=[/*'русская миля',	*/	'верста',	'кабельтов',	'морская миля',		'американская миля',	'фурлонг'	];
window.dlina.rm=[/*'русских миль',	*/	'вёрст',	'кабельтовых',	'морских миль',		'американских миль',	'фурлонгов'	];

window.imenaj={};
window.imenaj.ie=['Анастасия','Юлия','Елена','Ольга','Яна','Олеся','Кристина','Вероника','Элеонора','Дарья','Мария','Екатерина','Софья','Наталия','Надежда','Александра'];

window.otchestvaj={};
window.otchestvaj.ie=['','Ивановна','Петровна','Фёдоровна','Васильевна','Анатольевна','Николаевна','Сергеевна','Игоревна','Михайловна','Владимировна','Олеговна','Степановна','Юрьевна','Александровна','Алексеевна','','','','']

window.profesj={};
window.profesj.ie=['суровая воронежская хакерша','','программистка','веб-дизайнер','аспирантка','скромный библиотекарь','блондинка','студентка','школьница','комсомолка, спортсменка, отличница и, наконец, просто красавица','']

window.deistviaj=['купила','получила в наследство','получила в подарок','нашла','приобрела','раздобыла'];

window.transportm={};
window.transportm.ie=['"Запорожец"'	,'"Москвич"'	,'автомобиль'	,'грузовик'	,'велосипед'	,'доисторический омнибус','автобус'];
window.transportm.r2=['"Запорожца"'	,'"Москвича"'	,'автомобиля'	,'грузовика','велосипеда'	,'доисторических омнибуса','автобуса'];
window.transportm.re=['"Запорожца"'	,'"Москвича"'	,'автомобиля'	,'грузовика','велосипеда'	,'доисторического омнибуса','автобуса'];
window.transportm.te=['"Запорожцем"','"Москвичом"','автомобилем','грузовиком','велосипедом','доисторическим омнибусом','автобусом'];

window.pifagtr=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];

window.mesiacy={};
window.mesiacy.re=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
window.mesiacy.dni=[31,28,31,30,31,30,31,31,30,31,30,31];

window.valuta={};
window.valuta.re=['доллара','евро','фунта стерлингов'];

var om={};
om.eda={};
om.eda.ie=['сырок'	,'шоколадка'	,'яблоко'	,'груша'	,'упаковка сока'	,'бутерброд'	,'бутылка газировки'	,'батон'	,'буханка хлеба'	];
om.eda.re=['сырка'	,'шоколадки'	,'яблока'	,'груши'	,'упаковки сока'	,'бутерброда'	,'бутылки газировки'	,'батона'	,'буханки хлеба'	];
om.eda.ve=['сырок'	,'шоколадку'	,'яблоко'	,'грушу'	,'упаковку сока'	,'бутерброд'	,'бутылку газировки'	,'батон'	,'буханку хлеба'	];
om.eda.rm=['сырков'	,'шоколадок'	,'яблок'	,'груш'		,'упаковок сока'	,'бутербродов'	,'бутылок газировки'	,'батонов'	,'буханок хлеба'	];

om.korabli={};
om.korabli.ie=['корабль'	,'круизный лайнер'	,'прогулочное судно'	,'теплоход'		,'пароход'	,'атомоход'		];
om.korabli.pe=['корабле'	,'круизном лайнере'	,'прогулочном судне'	,'теплоходе'	,'пароходе'	,'атомоходе'	];

om.meltov={};
om.meltov.ie=['фонарик'		,'флакон шампуня'	,'флэшка'	,'компакт-диск'		,'сувенир'		,'матрёшка'	,'магнит на холодильник'	,'сборник тестов для подготовки к ЕГЭ'		,'тетрадь'	,'учебник'		,'цветочный горшок'		];
om.meltov.im=['фонарики'	,'флаконы шампуня'	,'флэшки'	,'компакт-диски'	,'сувениры'		,'матрёшки'	,'магниты на холодильник'	,'сборники тестов для подготовки к ЕГЭ'		,'тетради'	,'учебники'		,'цветочные горшки'		];
om.meltov.re=['фонарика'	,'флакона шампуня'	,'флэшки'	,'компакт-диска'	,'сувенира'		,'матрёшки'	,'магнита на холодильник'	,'сборника тестов для подготовки к ЕГЭ'		,'тетради'	,'учебника'		,'цветочных горшка'		];
om.meltov.ve=['фонарик'		,'флакон шампуня'	,'флэшку'	,'компакт-диск'		,'сувенир'		,'матрёшку'	,'магнит на холодильник'	,'сборник тестов для подготовки к ЕГЭ'		,'тетрадь'	,'учебник'		,'цветочный горшок'		];
om.meltov.rm=['фонариков'	,'флаконов шампуня'	,'флэшек'	,'компакт-дисков'	,'сувениров'	,'матрёшек'	,'магнитов на холодильник'	,'сборников тестов для подготовки к ЕГЭ'	,'тетрадей'	,'учебников'	,'цветочных горшков'	];

om.sroki={};
om.sroki.re=['недели'	,'декады'	,'месяца'	];
om.sroki.ve=['неделю'	,'декаду'	,'месяц'	];
om.sroki.rm=['недель'	,'декад'	,'месяцев'	];

om.uchrezhd={};
om.uchrezhd.ie=['офис'	,'канцелярия'	,'секретариат'	,'министерство'	,'ведомство'	,'Рособрнадзор'	,'Минобрнауки'	];
om.uchrezhd.ve=['офис'	,'канцелярию'	,'секретариат'	,'министерство'	,'ведомство'	,'Рособрнадзор'	,'Минобрнауки'	];
om.uchrezhd.pe=['офисе'	,'канцелярии'	,'секретариате'	,'министерстве'	,'ведомстве'	,'Рособрнадзоре','Минобрнауки'	];

om.denned={};
om.denned.ie=		['воскресенье'	,'понедельник'	,'вторник'	,'среда'	,'четверг'	,'пятница'	,'суббота'	];
om.denned.ve=		['воскресенье'	,'понедельник'	,'вторник'	,'среду'	,'четверг'	,'пятницу'	,'субботу'	];
om.denned.pg=[];
om.denned.pg['в']=	['в'			,'в'			,'во'		,'в'		,'в'		,'в'		,'в'		];

om.igrkosti=[];
om.igrkosti[2]=[0,0,1,2,3,4,5,6,5,4,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
om.igrkosti[3]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
(function() {
	for(var i1=1;i1<=6;i1++)
		for(var i2=1;i2<=6;i2++)
			for(var i3=1;i3<=6;i3++)
				om.igrkosti[3][i1+i2+i3]++;
})();

om.strany={};
om.strany.ie=['Россия'	,'Белоруссия'	,'Китай'	,'ЮАР'	,'Эквадор'	,'Венесуэла'	,'Куба'	,'Австралия'	,'Австрия'	,'Бельгия'	,'Англия'	,'Германия'	,'Польша'	,'Сербия'	,'Чехия'	,'Словакия'	,'Словения'	,'Израиль'	,'Бразилия'	,'Мексика'	];
om.strany.re=['России'	,'Белоруссии'	,'Китая'	,'ЮАР'	,'Эквадора'	,'Венесуэлы'	,'Кубы'	,'Австралии'	,'Австрии'	,'Бельгии'	,'Англии'	,'Германии'	,'Польши'	,'Сербии'	,'Чехии'	,'Словакии'	,'Словении'	,'Израиля'	,'Бразилии'	,'Мексики'	];

om.sportparn={};
om.sportparn.ie=['шахматы'	,'вольная борьба'	,'настольный теннис'	,'бадминтон'	,'шашки'	];
om.sportparn.pe=['шахматам'	,'вольной борьбе'	,'настольному теннису'	,'бадминтону'	,'шашкам'	];


om.sport={};
om.sport.ie=['гимнастика'	,'вольная борьба'	,'лёгкая атлетика'	,'тяжёлая атлетика'	];
om.sport.pe=['гимнастике'	,'вольной борьбе'	,'лёгкой атлетике'	,'тяжёлой атлетике'	];

om.izdsteklo={};
om.izdsteklo.rm=['витрин','оконных рам','аквариумов','книжных полок','террариумов'];

om.znamenat=[2,4,5,8,10,20,25,100,200];

om.zhidkost={};
om.zhidkost.re=['воды','ртути','жидкости','раствора','бензина','керосина','метилового спирта','газировки','уксуса','нефти'];

om.ravno=['равен','равна','равно','равны'];
om.sostavl=['составляет','составляет','составляет','составляют'];
om.vyrazh=['выраженный','выраженная','выраженное','выраженные'];
om.utochn=['','','','','','при этом ','известно, что '];
om.utochn2=[', при этом ',', а ',', '];

om.goroda=['Воронеж','Москва','Санкт-Петербург','Казань','Сочи','Семилуки','Хабаровск','Магадан','Красноярск'];

om.porchisl={};
om.porchisl[1]={};
om.porchisl[1].i=['первый','первая','первое','первые'];
om.porchisl[2]={};
om.porchisl[2].i=['второй','вторая','второе','вторые'];
om.porchisl[3]={};
om.porchisl[3].i=['третий','третья','третье','третьи'];
om.porchisl[4]={};
om.porchisl[4].i=['четвёртый','четвёртая','четвёртое','четвёртые'];
om.porchisl[5]={};
om.porchisl[5].i=['пятый','пятая','пятое','пятые'];
om.porchisl[6]={};
om.porchisl[6].i=['шестой','шестая','шестое','шестые'];
om.porchisl[7]={};
om.porchisl[7].i=['седьмой','седьмая','седьмое','седьмые'];
om.porchisl[8]={};
om.porchisl[8].i=['восьмой','восьмая','восьмое','восьмые'];
om.porchisl[9]={};
om.porchisl[9].i=['девятый','девятая','девятое','девятые'];
om.porchisl[10]={};
om.porchisl[10].i=['деcятый','деcятая','деcятое','деcятые'];
om.porchisl[11]={};
om.porchisl[11].i=['одиннадцатый','одиннадцатая','одиннадцатое','одиннадцатые'];
om.porchisl[12]={};
om.porchisl[12].i=['двенадцатый','двенадцатая','двенадцатое','двенадцатые'];
om.porchisl[13]={};
om.porchisl[13].i=['тринадцатый','тринадцатая','тринадцатое','тринадцатые'];
om.porchisl[14]={};
om.porchisl[14].i=['четырнадцатый','четырнадцатая','четырнадцатое','четырнадцатые'];
om.porchisl[15]={};
om.porchisl[15].i=['пятнадцатый','пятнадцатая','пятнадцатое','пятнадцатые'];
om.porchisl[16]={};
om.porchisl[16].i=['шестнадцатый','шестнадцатая','шестнадцатое','шестнадцатые'];
om.porchisl[17]={};
om.porchisl[17].i=['семнадцатый','семнадцатая','семнадцатое','семнадцатые'];
om.porchisl[18]={};
om.porchisl[18].i=['восемнадцатый','восемнадцатая','восемнадцатое','восемнадцатые'];
om.porchisl[19]={};
om.porchisl[19].i=['девятнадцатый','девятнадцатая','девятнадцатое','девятнадцатые'];
om.porchisl[20]={};
om.porchisl[20].i=['двадцатый','двадцатая','двадцатое','двадцатые'];

om.otvdayte=['выразите','дайте','приведите','запишите'];
om.otvnaydite=['найдите','определите','вычислите'];

om.metally={};
om.metally.re=['меди','алюминия','чугуна','железа','стали','никеля','хрома'];


om.mesiacy=window.mesiacy;
om.tovary=window.tovary;
om.rusbukv=window.rusbukv;
om.latbukv=window.latbukv;
om.imenaj=window.imenaj;
om.transportm=window.transportm;
om.pifagtr=window.pifagtr;

om.toplivo=['топливо','бензин','дизель','газ','керосин','солярка'];
om.mezhgortrans=['автобус','поезд'];
om.naspunkt=['пункт','населённый пункт','город','городок','ПГТ','деревня','село','хутор','посёлок','инноград','наукоград'];
om.stroymat=['пенобетон','бетон','брус','шлак','песок','щебень','гранит','известняк','песчаник','камень','гравий'];
om.izmergruz=['тонна','кубометр'];
om.stroenmal=['гараж','дом','дача','магазин'];

om.edizm={};
om.edizm.dlina=[
	['метр',1],
	['километр',1000],
	['дециметр',0.1],
	['сантиметр',0.01],
	['миллиметр',0.001],
];
'use strict';
if(!_4ege){
(function(){
//Константы наборов
var nabor_mat='#nabor&nZad=14&adres=../zdn/mat/&name=';
var nabor_mat2014='';
var nabor_tri='#nabor&nZad=4&adres=../zdn/tri/&name=tri&prefix=E&kat=';
var nabor_rus2014='#nabor&nZad=6&adres=../zdn/rus2014/&name=rus2014&prefix=G&kat=';
var nabor_inf2014='#nabor&nZad=1&adres=../zdn/inf/&name=inf2014&prefix=A&kat=';
var nabor_istpereg='#nabor&nZad=5&adres=../zdn/istpereg/&name=istpereg&kat=';

document.write('<div id="menucenter">');
document.write('<ul class="pureCssMenu pureCssMenum">');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="../doc/index.html" target="_blank"><span>На главную</span></a></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>'+(egeok?'Возможности':'Оболочки')+'</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/sluch.html'+strNabor+'" target="_blank">Случайное задание</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/pechmat.html'+strNabor+'" target="_blank">Тесты на печать</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/polnmat.html'+strNabor+'" target="_blank">Полный тест</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/otladka.html" target="_blank">Режим отладки шаблона</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Предметы</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');

function predmet(str,nazv){'use_strict';
	document.write('	<li class="pureCssMenui0"><a class="pureCssMenui0" href="'+str+'" target="_blank">'+nazv+'</a></li>');
};
predmet(nabor_mat2014,'Математика: ЕГЭ-2014');
predmet(nabor_mat,'Математика: ЕГЭ-2013');
predmet(nabor_tri,'Тригонометрия: формулы');
predmet(nabor_istpereg,'История: даты');
predmet(nabor_rus2014,'Русский язык, ЕГЭ: часть');
predmet(nabor_inf2014,'Информатика, ЕГЭ: начало');

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Документация</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/oprosy.html" target="_blank">Опросы и голосования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/license.html" target="_blank">Лицензия</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/razrab.html" target="_blank">Разработчики</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/tech.html" target="_blank">Техническое</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/systreb.html" target="_blank">Системные требования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/skachat.html" target="_blank">Скачать программу</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://github.com/nickkolok/chas-ege" target="_blank">Проект на github</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/istor.html" target="_blank">История выпусков</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/koncepc2.html" target="_blank">Концепция</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/ssylki.html" target="_blank">Ссылки</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Мы ВКонтакте</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://vk.com/app3634828" target="_blank">Приложение</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://vk.com/chasege" target="_blank">Группа</a></li>');

if(izvk)
	document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="#" onclick="VK.callMethod(\'showInviteBox\')">Пригласить друзей</a></li>');

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="https://www.math.vsu.ru" target="_blank">Сайт Математического факультета ВГУ</a></li>');

document.write('</ul>');
document.write('</div>');
console.log('menu.js отработал');
})();
}else{
	document.write('<center><a href="https://www.math.vsu.ru/chas-ege/doc/index.html" target="blank">"Час ЕГЭ"</a> разработан при <a href="https://www.math.vsu.ru/" target="blank">Математическом факультете ВГУ</a>.</center>');
}
'use strict';
if(!svinta)
	document.write('<!-- Yandex.Metrika counter --><script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter22534447 = new Ya.Metrika({id:22534447, clickmap:true, trackLinks:true, accurateTrackBounce:true, trackHash:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/22534447" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->');
'use strict';
var fon='#FFFFCC';
var pan='pink';
if(egeok){//Если с сайта ege-ok.ru, меняем дизайн
	fon='white';
	pan='#DED';
}else if(izvk || _4ege){
	fon='#FFF';
	pan='#DDF';
}

document.write('<style>');
document.write('body{');
document.write('	background-color:'+fon);
document.write('}');
document.write('#panel, ul.pureCssMenu,ul.pureCssMenu ul, ul.pureCssMenu a, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover, ul.pureCssMenu li a.pureCssMenui0{');
document.write('	background-color:'+pan);
document.write('}');
document.write('ul.pureCssMenu li:hover>a, ul.pureCssMenu li a:hover, ul.pureCssMenu li a.pureCssMenui0:hover, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover {');
document.write('	background-color:'+fon);
document.write('}');
document.write('.anythingSlider .arrow span {');
document.write('	color:'+pan);
document.write('}');
document.write('#sovety, #menucenter{');
document.write("	font:15px bold 'liberation_sans';");
document.write('}');
document.write('</style>');
'use strict';

var bIE=0;
var bOpera=0;
var bApple=0;
var bGecko=0;
var strBrowser;
if (!"\v1") {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (/*@cc_on!@*/0) {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (self.opera) {
	bOpera=1;
	strBrowser='"Opera"';
}
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	strBrowser='устройств "iPhone" или "iPod"';
	bApple=1;
}
if(navigator.userAgent.match('Gecko/')){
	strBrowser='Mozilla Firefox или ему подобный';
	bGecko=1;
}


if(bIE+bOpera+bApple) {
	document.write('<center><div id="browser"><font color="red" size="5">Вероятно, Вы используете проприетарный браузер '+strBrowser+'.<br/>  Система "Час ЕГЭ" официально не предназначалась и, скорее всего, не будет предназначаться для работы в проприетарных браузерах.</font><br/>Возможно, некоторые элементы будут работать.<br/><button onclick="$(\'#browser\').remove();" >Свернуть это предупреждение</button></div><div class="predupr">Настоятельно рекомендуем Вам скачать <a href="http://mozilla-russia.org/">Firefox</a> или <a href="https://www.google.com/intl/ru/chrome/browser/">Chrome</a></div></center>');
}

'use strict';

var cashdiv=document.createElement('div');
cashdiv.style.top='-9999px';
cashdiv.style.position='absolute';
document.body.appendChild(cashdiv);
cashdiv.innerHTML='$'+'0123456789=+-e'+latbukv.soed()+'\\in'+latbukv.soed().toLowerCase()+'\\sin\\cos\\ln\\log\\lg 2$';
/*!
	AnythingSlider v1.9.2
	Original by Chris Coyier: http://css-tricks.com
	Get the latest version: https://github.com/CSS-Tricks/AnythingSlider

	To use the navigationFormatter function, you must have a function that
	accepts two paramaters, and returns a string of HTML text.

	index = integer index (1 based);
	panel = jQuery wrapped LI item this tab references
	@return = Must return a string of HTML/Text

	navigationFormatter: function(index, panel){
		return "Panel #" + index; // This would have each tab with the text 'Panel #X' where X = index
	}
*/
/*jshint browser:true, jquery:true, unused:false */
;(function($, win, doc) {
	"use strict";
	$.anythingSlider = function(el, options) {

		var base = this, o, t;

		// Wraps the ul in the necessary divs and then gives Access to jQuery element
		base.el = el;
		base.$el = $(el).addClass('anythingBase').wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');

		// Add a reverse reference to the DOM object
		base.$el.data("AnythingSlider", base);

		base.init = function(){

			// Added "o" to be used in the code instead of "base.options" which doesn't get modifed by the compiler - reduces size by ~1k
			base.options = o = $.extend({}, $.anythingSlider.defaults, options);

			base.initialized = false;
			if ($.isFunction(o.onBeforeInitialize)) { base.$el.bind('before_initialize', o.onBeforeInitialize); }
			base.$el.trigger('before_initialize', base);

			// Add "as-oldie" class to body for css purposes
			$('<!--[if lte IE 8]><script>jQuery("body").addClass("as-oldie");</script><![endif]-->').appendTo('body').remove();

			// Cache existing DOM elements for later
			// base.$el = original ul
			// for wrap - get parent() then closest in case the ul has "anythingSlider" class
			base.$wrapper = base.$el.parent().closest('div.anythingSlider').addClass('anythingSlider-' + o.theme);
			base.$outer = base.$wrapper.parent();
			base.$window = base.$el.closest('div.anythingWindow');
			base.$win = $(win);

			base.$controls = $('<div class="anythingControls"></div>');
			base.$nav = $('<ul class="thumbNav"><li><a><span></span></a></li></ul>');
			base.$startStop = $('<a href="#" class="start-stop"></a>');
			
			if (o.buildStartStop || o.buildNavigation) {
				base.$controls.appendTo( (o.appendControlsTo && $(o.appendControlsTo).length) ? $(o.appendControlsTo) : base.$wrapper);
			}
			if (o.buildNavigation) {
				base.$nav.appendTo( (o.appendNavigationTo && $(o.appendNavigationTo).length) ? $(o.appendNavigationTo) : base.$controls );
			}
			if (o.buildStartStop) {
				base.$startStop.appendTo( (o.appendStartStopTo && $(o.appendStartStopTo).length) ? $(o.appendStartStopTo) : base.$controls );
			}

			// Figure out how many sliders are on the page for indexing
			base.runTimes = $('.anythingBase').length;
			// hash tag regex - fixes issue #432
			base.regex = (o.hashTags) ? new RegExp('panel' + base.runTimes + '-(\\d+)', 'i') : null;
			if (base.runTimes === 1) { base.makeActive(); } // make the first slider on the page active

			// Set up a few defaults & get details
			base.flag    = false; // event flag to prevent multiple calls (used in control click/focusin)
			if (o.autoPlayLocked) { o.autoPlay = true; } // if autoplay is locked, start playing
			base.playing = o.autoPlay; // slideshow state; removed "startStopped" option
			base.slideshow = false; // slideshow flag needed to correctly trigger slideshow events
			base.hovered = false; // actively hovering over the slider
			base.panelSize = [];  // will contain dimensions and left position of each panel
			base.currentPage = base.targetPage = o.startPanel = parseInt(o.startPanel,10) || 1; // make sure this isn't a string
			o.changeBy = parseInt(o.changeBy,10) || 1;

			// set slider type, but keep backward compatibility with the vertical option
			t = (o.mode || 'h').toLowerCase().match(/(h|v|f)/);
			t = o.vertical ? 'v' : (t || ['h'])[0];
			o.mode = t === 'v' ? 'vertical' : t === 'f' ? 'fade' : 'horizontal';
			if (t === 'f') {
				o.showMultiple = 1; // all slides are stacked in fade mode
				o.infiniteSlides = false; // no cloned slides
			}

			base.adj = (o.infiniteSlides) ? 0 : 1; // adjust page limits for infinite or limited modes
			base.adjustMultiple = 0;
			if (o.playRtl) { base.$wrapper.addClass('rtl'); }

			// Build start/stop button
			if (o.buildStartStop) { base.buildAutoPlay(); }

			// Build forwards/backwards buttons
			if (o.buildArrows) { base.buildNextBackButtons(); }

			base.$lastPage = base.$targetPage = base.$currentPage;

			base.updateSlider();

			// Expand slider to fit parent
			if (o.expand) {
				base.$window.css({ width: '100%', height: '100%' }); // needed for Opera
				base.checkResize();
			}

			// Make sure easing function exists.
			if (!$.isFunction($.easing[o.easing])) { o.easing = "swing"; }

			// If pauseOnHover then add hover effects
			if (o.pauseOnHover) {
				base.$wrapper.hover(function() {
					if (base.playing) {
						base.$el.trigger('slideshow_paused', base);
						base.clearTimer(true);
					}
				}, function() {
					if (base.playing) {
						base.$el.trigger('slideshow_unpaused', base);
						base.startStop(base.playing, true);
					}
				});
			}

			// Hide/Show navigation & play/stop controls
			base.slideControls(false);
			base.$wrapper.bind('mouseenter mouseleave', function(e){
				// add hovered class to outer wrapper
				$(this)[e.type === 'mouseenter' ? 'addClass' : 'removeClass']('anythingSlider-hovered');
				base.hovered = (e.type === 'mouseenter') ? true : false;
				base.slideControls(base.hovered);
			});

			// Add keyboard navigation
			$(doc).keyup(function(e){
				// Stop arrow keys from working when focused on form items
				if (o.enableKeyboard && base.$wrapper.hasClass('activeSlider') && !e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
					if (o.mode !== 'vertical' && (e.which === 38 || e.which === 40)) { return; }
					switch (e.which) {
						case 39: case 40: // right & down arrow
							base.goForward();
							break;
						case 37: case 38: // left & up arrow
							base.goBack();
							break;
					}
				}
			});

			// If a hash can not be used to trigger the plugin, then go to start panel - see issue #432
			base.currentPage = ((o.hashTags) ? base.gotoHash() : '') || o.startPanel || 1;
			base.gotoPage(base.currentPage, false, null, -1);

			// Binds events
			var triggers = "slideshow_resized slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
			$.each("onSliderResize onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(i,f){
				if ($.isFunction(o[f])){
					base.$el.bind(triggers[i], o[f]);
				}
			});
			if ($.isFunction(o.onSlideComplete)){
				// Added setTimeout (zero time) to ensure animation is complete... see this bug report: http://bugs.jquery.com/ticket/7157
				base.$el.bind('slide_complete', function(){
					setTimeout(function(){ o.onSlideComplete(base); }, 0);
					return false;
				});
			}
			base.initialized = true;
			base.$el.trigger('initialized', base);

			// trigger the slideshow
			base.startStop(o.autoPlay);

		};

		// called during initialization & to update the slider if a panel is added or deleted
		base.updateSlider = function(){
			// needed for updating the slider
			base.$el.children('.cloned').remove();
			base.navTextVisible = base.$nav.find('span:first').css('visibility') !== 'hidden';
			base.$nav.empty();
			// set currentPage to 1 in case it was zero - occurs when adding slides after removing them all
			base.currentPage = base.currentPage || 1;

			base.$items = base.$el.children();
			base.pages = base.$items.length;
			base.dir = (o.mode === 'vertical') ? 'top' : 'left';
			o.showMultiple = parseInt(o.showMultiple, 10) || 1; // only integers allowed
			o.navigationSize = (o.navigationSize === false) ? 0 : parseInt(o.navigationSize,10) || 0;

			// Fix tabbing through the page, but don't change the view if the link is in view (showMultiple = true)
			base.$items.find('a').unbind('focus.AnythingSlider').bind('focus.AnythingSlider', function(e){
				var panel = $(this).closest('.panel'),
					indx = base.$items.index(panel) + base.adj; // index can be -1 in nested sliders - issue #208
				base.$items.find('.focusedLink').removeClass('focusedLink');
				$(this).addClass('focusedLink');
				base.$window.scrollLeft(0).scrollTop(0);
				if ( ( indx !== -1 && (indx >= base.currentPage + o.showMultiple || indx < base.currentPage) ) ) {
					base.gotoPage(indx);
					e.preventDefault();
				}
			});
			if (o.showMultiple > 1) {
				if (o.showMultiple > base.pages) { o.showMultiple = base.pages; }
				base.adjustMultiple = (o.infiniteSlides && base.pages > 1) ? 0 : o.showMultiple - 1;
			}

			// Hide navigation & player if there is only one page
			base.$controls
				.add(base.$nav)
				.add(base.$startStop)
				.add(base.$forward)
				.add(base.$back)[(base.pages <= 1) ? 'hide' : 'show']();
			if (base.pages > 1) {
				// Build/update navigation tabs
				base.buildNavigation();
			}

			// Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
			// This supports the "infinite" scrolling, also ensures any cloned elements don't duplicate an ID
			// Moved removeAttr before addClass otherwise IE7 ignores the addClass: http://bugs.jquery.com/ticket/9871
			if (o.mode !== 'fade' && o.infiniteSlides && base.pages > 1) {
				base.$el.prepend( base.$items.filter(':last').clone().addClass('cloned') );
				// Add support for multiple sliders shown at the same time
				if (o.showMultiple > 1) {
					base.$el.append( base.$items.filter(':lt(' + o.showMultiple + ')').clone().addClass('cloned multiple') );
				} else {
					base.$el.append( base.$items.filter(':first').clone().addClass('cloned') );
				}
				base.$el.find('.cloned').each(function(){
					// disable all focusable elements in cloned panels to prevent shifting the panels by tabbing
					$(this).find('a,input,textarea,select,button,area,form').attr({ disabled : 'disabled', name : '' });
					$(this).find('[id]')[ $.fn.addBack ? 'addBack' : 'andSelf' ]().removeAttr('id');
				});
			}

			// We just added two items, time to re-cache the list, then get the dimensions of each panel
			base.$items = base.$el.addClass(o.mode).children().addClass('panel');
			base.setDimensions();

			// Set the dimensions of each panel
			if (o.resizeContents) {
				base.$items.css('width', base.width);
				base.$wrapper
					.css('width', base.getDim(base.currentPage)[0])
					.add(base.$items).css('height', base.height);
			} else {
				base.$win.load(function(){
					// set dimensions after all images load
					base.setDimensions();
					// make sure the outer wrapper is set properly
					t = base.getDim(base.currentPage);
					base.$wrapper.css({ width: t[0], height: t[1] });
					base.setCurrentPage(base.currentPage, false);
				});
			}

			if (base.currentPage > base.pages) {
				base.currentPage = base.pages;
			}
			base.setCurrentPage(base.currentPage, false);
			base.$nav.find('a').eq(base.currentPage - 1).addClass('cur'); // update current selection

			if (o.mode === 'fade') {
				t = base.$items.eq(base.currentPage-1);
				if (o.resumeOnVisible) {
					// prevent display: none;
					t.css({ opacity: 1 }).siblings().css({ opacity: 0 });
				} else {
					// allow display: none; - resets video
					base.$items.css('opacity',1);
					t.fadeIn(0).siblings().fadeOut(0);
				}
			}

		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			if (o.buildNavigation && (base.pages > 1)) {
				var a, c, i, t, $li;
				base.$items.filter(':not(.cloned)').each(function(j){
					$li = $('<li/>');
					i = j + 1;
					c = (i === 1 ? ' first' : '') + (i === base.pages ? ' last' : '');
					a = '<a class="panel' + i + ( base.navTextVisible ? '"' : ' ' + o.tooltipClass + '" title="@"' ) + ' href="#"><span>@</span></a>';
					// If a formatter function is present, use it
					if ($.isFunction(o.navigationFormatter)) {
						t = o.navigationFormatter(i, $(this));
						if (typeof(t) === "string") {
							$li.html(a.replace(/@/g,t));
						} else {
							$li = $('<li/>', t);
						}
					} else {
						$li.html(a.replace(/@/g,i));
					}
					$li
					.appendTo(base.$nav)
					.addClass(c)
					.data('index', i);
				});
				base.$nav.children('li').bind(o.clickControls, function(e) {
					if (!base.flag && o.enableNavigation) {
						// prevent running functions twice (once for click, second time for focusin)
						base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
						base.gotoPage( $(this).data('index') );
					}
					e.preventDefault();
				});

				// Add navigation tab scrolling - use !! in case someone sets the size to zero
				if (!!o.navigationSize && o.navigationSize < base.pages) {
					if (!base.$controls.find('.anythingNavWindow').length){
						base.$nav
							.before('<ul><li class="prev"><a href="#"><span>' + o.backText + '</span></a></li></ul>')
							.after('<ul><li class="next"><a href="#"><span>' + o.forwardText + '</span></a></li></ul>')
							.wrap('<div class="anythingNavWindow"></div>');
					}
					// include half of the left position to include extra width from themes like tabs-light and tabs-dark (still not perfect)
					base.navWidths = base.$nav.find('li').map(function(){
						return $(this).outerWidth(true) + Math.ceil(parseInt($(this).find('span').css('left'),10)/2 || 0);
					}).get();
					base.navLeft = base.currentPage;
					// add 25 pixels (old IE needs more than 5) to make sure the tabs don't wrap to the next line
					base.$nav.width( base.navWidth( 1, base.pages + 1 ) + 25 );
					base.$controls.find('.anythingNavWindow')
						.width( base.navWidth( 1, o.navigationSize + 1 ) ).end()
						.find('.prev,.next').bind(o.clickControls, function(e) {
							if (!base.flag) {
								base.flag = true; setTimeout(function(){ base.flag = false; }, 200);
								base.navWindow( base.navLeft + o.navigationSize * ( $(this).is('.prev') ? -1 : 1 ) );
							}
							e.preventDefault();
						});
				}

			}
		};

		base.navWidth = function(x,y){
			var i, s = Math.min(x,y),
				e = Math.max(x,y),
				w = 0;
			for (i = s; i < e; i++) {
				w += base.navWidths[i-1] || 0;
			}
			return w;
		};

		base.navWindow = function(n){
			if (!!o.navigationSize && o.navigationSize < base.pages && base.navWidths) {
				var p = base.pages - o.navigationSize + 1;
				n = (n <= 1) ? 1 : (n > 1 && n < p) ? n : p;
				if (n !== base.navLeft) {
					base.$controls.find('.anythingNavWindow').animate(
						{ scrollLeft: base.navWidth(1, n), width: base.navWidth(n, n + o.navigationSize) },
						{ queue: false, duration: o.animationTime });
					base.navLeft = n;
				}
			}
		};

		// Creates the Forward/Backward buttons
		base.buildNextBackButtons = function() {
			base.$forward = $('<span class="arrow forward"><a href="#"><span>' + o.forwardText + '</span></a></span>');
			base.$back = $('<span class="arrow back"><a href="#"><span>' + o.backText + '</span></a></span>');

			// Bind to the forward and back buttons
			base.$back.bind(o.clickBackArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goBack();
				}
				e.preventDefault();
			});
			base.$forward.bind(o.clickForwardArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goForward();
				}
				e.preventDefault();
			});
			// using tab to get to arrow links will show they have focus (outline is disabled in css)
			base.$back.add(base.$forward).find('a').bind('focusin focusout',function(){
				$(this).toggleClass('hover');
			});

			// Append elements to page
			base.$back.appendTo( (o.appendBackTo && $(o.appendBackTo).length) ? $(o.appendBackTo) : base.$wrapper );
			base.$forward.appendTo( (o.appendForwardTo && $(o.appendForwardTo).length) ? $(o.appendForwardTo) : base.$wrapper );

			base.arrowWidth = base.$forward.width(); // assuming the left & right arrows are the same width - used for toggle
			base.arrowRight = parseInt(base.$forward.css('right'), 10);
			base.arrowLeft = parseInt(base.$back.css('left'), 10);

		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){
			base.$startStop
				.html('<span>' + (base.playing ? o.stopText : o.startText) + '</span>')
				.bind(o.clickSlideshow, function(e) {
					if (o.enableStartStop) {
						base.startStop(!base.playing);
						base.makeActive();
						if (base.playing && !o.autoPlayDelayed) {
							base.goForward(true, o.playRtl);
						}
					}
					e.preventDefault();
				})
				// show button has focus while tabbing
				.bind('focusin focusout',function(){
					$(this).toggleClass('hover');
				});
		};

		// Adjust slider dimensions on parent element resize
		base.checkResize = function(stopTimer){
			// checking document visibility - 
			var vis = !!(doc.hidden || doc.webkitHidden || doc.mozHidden || doc.msHidden);
			clearTimeout(base.resizeTimer);
			base.resizeTimer = setTimeout(function(){
				var w = base.$outer.width(),
					h = base.$outer[0].tagName === "BODY" ? base.$win.height() : base.$outer.height();
				// base.width = width of one panel, so multiply by # of panels; outerPad is padding added for arrows.
				// ignore changes if window hidden
				if (!vis && (base.lastDim[0] !== w || base.lastDim[1] !== h)) {
					
					base.setDimensions(); // adjust panel sizes
					
					//callback for slider resize
					base.$el.trigger('slideshow_resized', base);
					
					// make sure page is lined up (use -1 animation time, so we can differeniate it from when animationTime = 0)
					base.gotoPage(base.currentPage, base.playing, null, -1);
					
				}
				if (typeof(stopTimer) === 'undefined'){ base.checkResize(); }
				
				// increase time if page is hidden; but don't stop it completely
			}, vis ? 2000 : 500);
		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){

			// reset element width & height
			base.$wrapper.find('.anythingWindow, .anythingBase, .panel')[ $.fn.addBack ? 'addBack' : 'andSelf' ]().css({ width: '', height: '' });
			base.width = base.$el.width();
			base.height = base.$el.height();
			base.outerPad = [ base.$wrapper.innerWidth() - base.$wrapper.width(), base.$wrapper.innerHeight() - base.$wrapper.height() ];
			var w, h, c, t, edge = 0,
				fullsize = { width: '100%', height: '100%' },
				// determine panel width
				pw = (o.showMultiple > 1 && o.mode === 'horizontal') ? base.width || base.$window.width()/o.showMultiple : base.$window.width(),
				ph = (o.showMultiple > 1 && o.mode === 'vertical') ? base.height/o.showMultiple || base.$window.height()/o.showMultiple : base.$window.height();
			if (o.expand){
				base.lastDim = [ base.$outer.width(), base.$outer.height() ];
				w = base.lastDim[0] - base.outerPad[0];
				h = base.lastDim[1] - base.outerPad[1];
				base.$wrapper.add(base.$window).css({ width: w, height: h });
				base.height = h = (o.showMultiple > 1 && o.mode === 'vertical') ? ph : h;
				base.width = pw = (o.showMultiple > 1 && o.mode === 'horizontal') ? w/o.showMultiple : w;
				base.$items.css({ width: pw, height: ph });
			}
			base.$items.each(function(i){
				t = $(this);
				c = t.children();
				if (o.resizeContents){
					// resize panel
					w = base.width;
					h = base.height;
					t.css({ width: w, height: h });
					if (c.length) {
						if (c[0].tagName === "EMBED") { c.attr(fullsize); } // needed for IE7; also c.length > 1 in IE7
						if (c[0].tagName === "OBJECT") { c.find('embed').attr(fullsize); }
						// resize panel contents, if solitary (wrapped content or solitary image)
						if (c.length === 1){ c.css(fullsize); }
					}
				} else {
					// get panel width & height and save it
					if (o.mode === 'vertical') {
						w = t.css('display','inline-block').width();
						t.css('display','');
					} else {
						w = t.width() || base.width; // if image hasn't finished loading, width will be zero, so set it to base width instead
					}
					if (c.length === 1 && w >= pw){
						w = (c.width() >= pw) ? pw : c.width(); // get width of solitary child
						c.css('max-width', w);   // set max width for all children
					}
					t.css({ width: w, height: '' }); // set width of panel
					h = (c.length === 1 ? c.outerHeight(true) : t.height()); // get height after setting width
					if (h <= base.outerPad[1]) { h = base.height; } // if height less than the outside padding, then set it to the preset height
					t.css('height', h);
				}
				base.panelSize[i] = [w,h,edge];
				edge += (o.mode === 'vertical') ? h : w;
			});
			// Set total width of slider
			base.$el.css((o.mode === 'vertical' ? 'height' : 'width'), o.mode === 'fade' ? base.width : edge );
		};

		// get dimension of multiple panels, as needed
		base.getDim = function(page){
			var t, i, w = base.width, h = base.height;
			if (base.pages < 1 || isNaN(page)) { return [ w, h ]; } // prevent errors when base.panelSize is empty
			page = (o.infiniteSlides && base.pages > 1) ? page : page - 1;
			i = base.panelSize[page];
			if (i) {
				w = i[0] || w;
				h = i[1] || h;
			}
			if (o.showMultiple > 1) {
				for (i = 1; i < o.showMultiple; i++) {
					t = page + i;
					if (o.mode === 'vertical') {
						w = Math.max(w, base.panelSize[t][0]);
						h += base.panelSize[t][1];
					} else {
						w += base.panelSize[t][0];
						h = Math.max(h, base.panelSize[t][1]);
					}
				}
			}
			return [w,h];
		};

		base.goForward = function(autoplay, rtl) {
			// targetPage changes before animation so if rapidly changing pages, it will have the correct current page
			base.gotoPage(base[ o.allowRapidChange ? 'targetPage' : 'currentPage'] + o.changeBy * (rtl ? -1 : 1), autoplay);
		};

		base.goBack = function(autoplay) {
			base.gotoPage(base[ o.allowRapidChange ? 'targetPage' : 'currentPage'] - o.changeBy, autoplay);
		};

		base.gotoPage = function(page, autoplay, callback, time) {
			if (autoplay !== true) {
				autoplay = false;
				base.startStop(false);
				base.makeActive();
			}
			// check if page is an id or class name
			if (/^[#|.]/.test(page) && $(page).length) {
				page = $(page).closest('.panel').index() + base.adj;
			}

			// rewind effect occurs here when changeBy > 1
			if (o.changeBy !== 1){
				var adj = base.pages - base.adjustMultiple;
				if (page < 1) {
					page = o.stopAtEnd ? 1 : ( o.infiniteSlides ? base.pages + page : ( o.showMultiple > 1 - page ? 1 : adj ) );
				}
				if (page > base.pages) {
					page = o.stopAtEnd ? base.pages : ( o.showMultiple > 1 - page ? 1 : page -= adj );
				} else if (page >= adj) {
					// show multiple adjustments
					page = adj;
				}
			}

			if (base.pages <= 1) { return; } // prevents animation
			base.$lastPage = base.$currentPage;
			if (typeof(page) !== "number") {
				page = parseInt(page,10) || o.startPanel;
				base.setCurrentPage(page);
			}

			// pause YouTube videos before scrolling or prevent change if playing
			if (autoplay && o.isVideoPlaying(base)) { return; }
			if (o.stopAtEnd && !o.infiniteSlides && page > base.pages - o.showMultiple) { page = base.pages - o.showMultiple + 1; } // fixes #515
			base.exactPage = page;
			if (page > base.pages + 1 - base.adj) { page = (!o.infiniteSlides && !o.stopAtEnd) ? 1 : base.pages; }
			if (page < base.adj ) { page = (!o.infiniteSlides && !o.stopAtEnd) ? base.pages : 1; }
			if (!o.infiniteSlides) { base.exactPage = page; } // exact page used by the fx extension
			base.currentPage = ( page > base.pages ) ? base.pages : ( page < 1 ) ? 1 : base.currentPage;
			base.$currentPage = base.$items.eq(base.currentPage - base.adj);
			base.targetPage = (page === 0) ? base.pages : (page > base.pages) ? 1 : page;
			base.$targetPage = base.$items.eq(base.targetPage - base.adj);
			time = typeof time !== 'undefined' ? time : o.animationTime;
			// don't trigger events when time < 0 - to prevent FX from firing multiple times on page resize
			if (time >= 0) { base.$el.trigger('slide_init', base); }
			// toggle arrows/controls only if there is time to see it - fix issue #317
			if (time > 0) { base.slideControls(true); }

			// Set visual
			if (o.buildNavigation){
				base.setNavigation(base.targetPage);
			}

			// When autoplay isn't passed, we stop the timer
			if (autoplay !== true) { autoplay = false; }
			// Stop the slider when we reach the last page, if the option stopAtEnd is set to true
			if (!autoplay || (o.stopAtEnd && page === base.pages)) { base.startStop(false); }

			if (time >= 0) { base.$el.trigger('slide_begin', base); }

			// delay starting slide animation
			setTimeout(function(d){
				var t, p, empty = true;
				if (o.allowRapidChange) {
					base.$wrapper.add(base.$el).add(base.$items).stop(true, true);
				}
				// resize slider if content size varies
				if (!o.resizeContents) {
					// animating the wrapper resize before the window prevents flickering in Firefox
					// don't animate the dimension if it hasn't changed - fix for issue #264
					p = base.getDim(page); d = {};
					// prevent animating a dimension to zero
					if (base.$wrapper.width() !== p[0]) { d.width = p[0] || base.width; empty = false; }
					if (base.$wrapper.height() !== p[1]) { d.height = p[1] || base.height; empty = false; }
					if (!empty) {
						base.$wrapper.filter(':not(:animated)').animate(d, { queue: false, duration: (time < 0 ? 0 : time), easing: o.easing });
					}
				}

				if (o.mode === 'fade') {
					if (base.$lastPage[0] !== base.$targetPage[0]) {
						base.fadeIt( base.$lastPage, 0, time );
						base.fadeIt( base.$targetPage, 1, time, function(){ base.endAnimation(page, callback, time); });
					} else {
						base.endAnimation(page, callback, time);
					}
				} else {
					d = {};
					d[base.dir] = -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2];
					// resize width of base element (ul) if vertical & width of content varies
					if (o.mode === 'vertical' && !o.resizeContents) { d.width = p[0]; }
					// Animate Slider
					base.$el.filter(':not(:animated)').animate(
						d, { queue: false, duration: time < 0 ? 0 : time, easing: o.easing, complete: function(){ base.endAnimation(page, callback, time); } }
					);
				}
			}, parseInt(o.delayBeforeAnimate, 10) || 0);
		};

		base.endAnimation = function(page, callback, time){
			if (page === 0) {
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[base.pages][2]);
				page = base.pages;
			} else if (page > base.pages) {
				// reset back to start position
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[1][2]);
				page = 1;
			}
			base.exactPage = page;
			base.setCurrentPage(page, false);

			if (o.mode === 'fade') {
				// make sure non current panels are hidden (rapid slide changes)
				base.fadeIt( base.$items.not(':eq(' + (page - base.adj) + ')'), 0, 0);
			}

			if (!base.hovered) { base.slideControls(false); }

			if (o.hashTags) { base.setHash(page); }

			if (time >= 0) { base.$el.trigger('slide_complete', base); }
			// callback from external slide control: $('#slider').anythingSlider(4, function(slider){ })
			if (typeof callback === 'function') { callback(base); }

			// Continue slideshow after a delay
			if (o.autoPlayLocked && !base.playing) {
				setTimeout(function(){
					base.startStop(true);
				// subtract out slide delay as the slideshow waits that additional time.
				}, o.resumeDelay - (o.autoPlayDelayed ? o.delay : 0));
			}
		};

		base.fadeIt = function(el, toOpacity, time, callback){
			var t = time < 0 ? 0 : time;
			if (o.resumeOnVisible) {
				el.filter(':not(:animated)').fadeTo(t, toOpacity, callback);
			} else {
				el.filter(':not(:animated)')[ toOpacity === 0 ? 'fadeOut' : 'fadeIn' ](t, callback);
			}
		};

		base.setCurrentPage = function(page, move) {
			page = parseInt(page, 10);

			if (base.pages < 1 || page === 0 || isNaN(page)) { return; }
			if (page > base.pages + 1 - base.adj) { page = base.pages - base.adj; }
			if (page < base.adj ) { page = 1; }

			// hide/show arrows based on infinite scroll mode
			if (o.buildArrows && !o.infiniteSlides && o.stopAtEnd){
				base.$forward[ page === base.pages - base.adjustMultiple ? 'addClass' : 'removeClass']('disabled');
				base.$back[ page === 1 ? 'addClass' : 'removeClass']('disabled');
				if (page === base.pages && base.playing) { base.startStop(); }
			}

			// Only change left if move does not equal false
			if (!move) {
				var d = base.getDim(page);
				base.$wrapper
					.css({ width: d[0], height: d[1] })
					.add(base.$window).scrollLeft(0).scrollTop(0); // reset in case tabbing changed this scrollLeft - probably overly redundant
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2] );
			}

			// Update local variable
			base.currentPage = page;
			base.$currentPage = base.$items.removeClass('activePage').eq(page - base.adj).addClass('activePage');

			if (o.buildNavigation){
				base.setNavigation(page);
			}

		};

		base.setNavigation = function(page){
			base.$nav
				.find('.cur').removeClass('cur').end()
				.find('a').eq(page - 1).addClass('cur');
		};

		base.makeActive = function(){
			// Set current slider as active so keyboard navigation works properly
			if (!base.$wrapper.hasClass('activeSlider')){
				$('.activeSlider').removeClass('activeSlider');
				base.$wrapper.addClass('activeSlider');
			}
		};

		// This method tries to find a hash that matches an ID and panel-X
		// If either found, it tries to find a matching item
		// If that is found as well, then it returns the page number
		base.gotoHash = function(){
			var h = win.location.hash,
				i = h.indexOf('&'),
				n = h.match(base.regex);
			// test for "/#/" or "/#!/" used by the jquery address plugin - $('#/') breaks jQuery
			if (n === null && !/^#&/.test(h) && !/#!?\//.test(h) && !/\=/.test(h)) {
				// #quote2&panel1-3&panel3-3
				h = h.substring(0, (i >= 0 ? i : h.length));
				// ensure the element is in the same slider
				n = ($(h).length && $(h).closest('.anythingBase')[0] === base.el) ? base.$items.index($(h).closest('.panel')) + base.adj : null;
			} else if (n !== null) {
				// #&panel1-3&panel3-3
				n = (o.hashTags) ? parseInt(n[1],10) : null;
			}
			return n;
		};

		base.setHash = function(n){
			var s = 'panel' + base.runTimes + '-',
				h = win.location.hash;
			if ( typeof h !== 'undefined' ) {
				win.location.hash = (h.indexOf(s) > 0) ? h.replace(base.regex, s + n) : h + "&" + s + n;
			}
		};

		// Slide controls (nav and play/stop button up or down)
		base.slideControls = function(toggle){
			var dir = (toggle) ? 'slideDown' : 'slideUp',
				t1 = (toggle) ? 0 : o.animationTime,
				t2 = (toggle) ? o.animationTime : 0,
				op = (toggle) ? 1 : 0,
				sign = (toggle) ? 0 : 1; // 0 = visible, 1 = hidden
			if (o.toggleControls) {
				base.$controls.stop(true,true).delay(t1)[dir](o.animationTime/2).delay(t2);
			}
			if (o.buildArrows && o.toggleArrows) {
				if (!base.hovered && base.playing) { sign = 1; op = 0; } // don't animate arrows during slideshow
				base.$forward.stop(true,true).delay(t1).animate({ right: base.arrowRight + (sign * base.arrowWidth), opacity: op }, o.animationTime/2);
				base.$back.stop(true,true).delay(t1).animate({ left: base.arrowLeft + (sign * base.arrowWidth), opacity: op }, o.animationTime/2);
			}
		};

		base.clearTimer = function(paused){
			// Clear the timer only if it is set
			if (base.timer) {
				win.clearInterval(base.timer);
				if (!paused && base.slideshow) {
					base.$el.trigger('slideshow_stop', base);
					base.slideshow = false;
				}
			}
		};

		// Pass startStop(false) to stop and startStop(true) to play
		base.startStop = function(playing, paused) {
			if (playing !== true) { playing = false; }  // Default if not supplied is false
			base.playing = playing;

			if (playing && !paused) {
				base.$el.trigger('slideshow_start', base);
				base.slideshow = true;
			}

			// Toggle playing and text
			if (o.buildStartStop) {
				base.$startStop.toggleClass('playing', playing).find('span').html( playing ? o.stopText : o.startText );
				// add button text to title attribute if it is hidden by text-indent
				if ( base.$startStop.find('span').css('visibility') === "hidden" ) {
					base.$startStop.addClass(o.tooltipClass).attr( 'title', playing ? o.stopText : o.startText );
				}
			}

			// Pause slideshow while video is playing
			if (playing){
				base.clearTimer(true); // Just in case this was triggered twice in a row
				base.timer = win.setInterval(function() {
					if ( !!(doc.hidden || doc.webkitHidden || doc.mozHidden || doc.msHidden) ) {
						// stop slideshow if the page isn't visible (issue #463)
						if (!o.autoPlayLocked) {
							base.startStop();
						}
					} else if ( !o.isVideoPlaying(base) ) {
						// prevent autoplay if video is playing
						base.goForward(true, o.playRtl);
					} else if (!o.resumeOnVideoEnd) {
						// stop slideshow if resume if false
						base.startStop();
					}
				}, o.delay);
			} else {
				base.clearTimer();
			}
		};

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		// Appearance
		theme               : "default", // Theme name, add the css stylesheet manually
		mode                : "horiz",   // Set mode to "horizontal", "vertical" or "fade" (only first letter needed); replaces vertical option
		expand              : false,     // If true, the entire slider will expand to fit the parent element
		resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
		showMultiple        : false,     // Set this value to a number and it will show that many slides at once
		easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI

		buildArrows         : true,      // If true, builds the forwards and backwards buttons
		buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
		buildStartStop      : true,      // ** If true, builds the start/stop button

/*
		// commented out as this will reduce the size of the minified version
		appendForwardTo     : null,      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendBackTo        : null,      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null
*/

		toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
		toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times

		startText           : "Start",   // Start button text
		stopText            : "Stop",    // Stop button text
		forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
		backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
		tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)

		// Function
		enableArrows        : true,      // if false, arrows will be visible, but not clickable.
		enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
		enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
		enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.

		// Navigation
		startPanel          : 1,         // This sets the initial panel
		changeBy            : 1,         // Amount to go forward or back when changing panels.
		hashTags            : true,      // Should links change the hashtag in the URL?
		infiniteSlides      : true,      // if false, the slider will not wrap & not clone any panels
		navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
		navigationSize      : false,     // Set this to the maximum number of visible navigation tabs; false to disable

		// Slideshow options
		autoPlay            : false,     // If true, the slideshow will start running; replaces "startStopped" option
		autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
		autoPlayDelayed     : false,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
		pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
		stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
		playRtl             : false,     // If true, the slideshow will move right-to-left

		// Times
		delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
		resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
		animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
		delayBeforeAnimate  : 0,         // How long to pause slide animation before going to the desired slide (used if you want your "out" FX to show).

/*
		// Callbacks - commented out to reduce size of the minified version - they still work
		onSliderResize      : function(e, slider) {}, // Callback when slider resizes
		onBeforeInitialize  : function(e, slider) {}, // Callback before the plugin initializes
		onInitialized       : function(e, slider) {}, // Callback when the plugin finished initializing
		onShowStart         : function(e, slider) {}, // Callback on slideshow start
		onShowStop          : function(e, slider) {}, // Callback after slideshow stops
		onShowPause         : function(e, slider) {}, // Callback when slideshow pauses
		onShowUnpause       : function(e, slider) {}, // Callback when slideshow unpauses - may not trigger properly if user clicks on any controls
		onSlideInit         : function(e, slider) {}, // Callback when slide initiates, before control animation
		onSlideBegin        : function(e, slider) {}, // Callback before slide animates
		onSlideComplete     : function(slider) {},    // Callback when slide completes - no event variable!
*/

		// Interactivity
		clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
		clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
		clickControls       : "click focusin", // Events used to activate navigation control functionality
		clickSlideshow      : "click",         // Event used to activate slideshow play/stop button
		allowRapidChange    : false,           // If true, allow rapid changing of the active pane, instead of ignoring activity during animation

		// Video
		resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
		resumeOnVisible     : true,      // If true the video will resume playing, if previously paused; if false, the video remains paused.
		isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension

		// deprecated - use the video extension wmode option now
		// addWmodeToObject : "opaque"   // If your slider has a video supported by the extension, the script will automatically add a wmode parameter with this setting

	};

	$.fn.anythingSlider = function(options, callback) {

		return this.each(function(){
			var page, anySlide = $(this).data('AnythingSlider');

			// initialize the slider but prevent multiple initializations
			if ((typeof(options)).match('object|undefined')){
				if (!anySlide) {
					(new $.anythingSlider(this, options));
				} else {
					anySlide.updateSlider();
				}
			// If options is a number, process as an external link to page #: $(element).anythingSlider(#)
			} else if (/\d/.test(options) && !isNaN(options) && anySlide) {
				page = (typeof(options) === "number") ? options : parseInt($.trim(options),10); // accepts "  2  "
				// ignore out of bound pages
				if ( page >= 1 && page <= anySlide.pages ) {
					anySlide.gotoPage(page, false, callback); // page #, autoplay, one time callback
				}
			// Accept id or class name
			} else if (/^[#|.]/.test(options) && $(options).length) {
				anySlide.gotoPage(options, false, callback);
			}
		});
	};

})(jQuery, window, document);
'use strict';
window.sovety=[
'Это - экспериментальная, тестовая версия программы.<br/>В ней могут быть ошибки и неполадки.',
'Все замечания и предложения отправляйте<br/>на адрес nickkolok@mail.ru',
'Программа "Час ЕГЭ" корректно работает<br/>только в <a href="../doc/systreb.html" target="_blank">поддерживаемых браузерах</a>.',
'В тренажёре иногда используются статистические данные,<br/>например, о погоде или ценах. Эти данные являются<br/>автоматически сгенерированными, а <b>не</b> реальными.',
'Одна из разработчиц "Час ЕГЭ", Настя Червинская, срочно и <br/>бесплатно отдаёт котят в хорошие руки. Связаться с ней<br/> можно <a href="https://vk.com/kitten112007" target="_blank">ВКонтакте</a> или по телефону 8 (951) 5519607',
//'6.12.2013 в 15-00 в ауд. 430 Главного корпуса ВГУ состоится<br/>бесплатная лекция проф. Глушко, главы экзаменационной <br/>комиссии по математике,  на тему "Решение задач С5".',
'Математический факультет ВГУ - это <br/>высококвалифицированный профессорско-преподавательский <br/> состав и увлекательная студенческая жизнь.',
'Математический факультет ВГУ - это <br/>отличная профессиональная подготовка <br/>для работы в различных сферах деятельности.',
'Математический факультет ВГУ - это <br/>увлекательная студенческая жизнь и весёлый,<br/>доброжелательный, жизнерадостный коллектив.',
'Если Вам близка математика, Вы хотите стать специалистом, <br/>владеющим современными информационными технологиями и<br/> технологиями математического моделирования<br/>– ждем Вас на математическом факультете!',
'Вы можете <a href="../doc/oprosy.html"  target="blank">проголосовать</a> за то, <br/>что будет добавлено в "Час ЕГЭ"<br/>в ближайшем еженедельном выпуске.',
'"Час ЕГЭ" содержит задания ЕГЭ по математике от B1 до B15 - <br/>в соответствии с новыми стандартами 2014 года.',
'Набор заданий тренажёра "Час ЕГЭ" по математике <br/>основан на <a href="http://mathege.ru/" target="_blank">Открытом банке заданий</a>,<br/>но не повторяет его в точности.',
//'13 октября, в воскресенье, в 10:00, Математический<br/>факультет проводит день открытых дверей<br/>в Главном корпусе ВГУ (Университетская пл., 1)',
].shuffle();
function informer(){
	var i;
	document.write('<div id="inf">');
	document.write('<ul id="sovety">');
	for(i=0;i<window.sovety.length;i++){
		document.write('<li><div class="lisov">');
		document.write(window.sovety[i]);
		document.write('</div></li>');
	}
	document.write('</ul>');
	document.write('</div>');
	$(function(){'use strict';
		$('#sovety').anythingSlider({
			forwardText         : "&gt;",
			backText         	: "&lt;",
			hashTags			:false,
//			expand				:true,
			startPanel			:1,
			theme				:'minimalist-square',
			buildNavigation		:false,
			buildStartStop		:false,
			resizeContents  	:false,
			enableKeyboard		:false,
			autoPlay			:true,
			delay				:10000,
		});
	});
}
informer();
'use strict';
/*
Атрибуты (HTML5-data-)
* data-jstorage-id - идентификатор элемента в jStorage. Обязателен!
* data-jstorage-ne - не отслеживать (через пробел)
* 	zn - значение
* 	vi - видимость
* 	ih - innerHTML
*/

/*
Attributes (HTML5-data-)
* data-jstorage-id - identifier to link the element in jStorage with. Necessary!
* data-jstorage-ne - do not track (divided by space)
* 	zn - value
* 	vi - visibility
* 	ih - innerHTML
*/

//Загрузить данные
//Load data
$.jStorage.zagrData=function(){
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		return;
	[].slice.call(document.querySelectorAll('*[data-jstorage-id]'),0).map(
		function(th){'use strict';
			try{
				var stor=storedData[th.getJStorageId()];
				if(stor){
					var ne=th.getAttribute('data-jstorage-ne');
					ne=ne?ne:'';
					if(!ne.match('zn')){
						th.checked=stor.checked;
						th.value=stor.value;
					}
					if(!ne.match('ih'))
						th.innerHTML=stor.innerHTML;
					if(!ne.match('vi'))
						th.style.display=stor.style.display;
				}
			}catch(e){
				console.log(th,' - ошибка в jStorage.zapomni');
				console.log(th,' - error in jStorage.zapomni');
			}
		}
	);
};

//Сохранить данные
//Save data
$.jStorage.sohrData=function(){
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		storedData={};
	[].slice.call(document.querySelectorAll('*[data-jstorage-id]'),0).map(
		function(th){'use strict';
			try{
				var jstid=th.getJStorageId();
				var stor=storedData[jstid];
				if(!stor){
					storedData[jstid]={};
					stor=storedData[jstid];
				}
				var ne=th.getAttribute('data-jstorage-ne');
				ne=ne?ne:'';
				if(!ne.match('zn')){
					stor.checked=th.checked;
					stor.value=th.value;
				}
				if(!ne.match('ih'))
					stor.innerHTML=th.innerHTML;
				if(!stor.style)
					stor.style={};
				if(!ne.match('vi'))
					stor.style.display=th.style.display;
			}catch(e){
				console.log(th,' - ошибка в jStorage.zapomni');
				console.log(th,' - error in jStorage.zapomni');
			}
		}
	);
	$.jStorage.set('data-jstorage',storedData)
};

HTMLElement.prototype.getJStorageId=function(){
	return this.getAttribute('data-jstorage-id');
}

//Объявили свой метод у HTMLElement.prototype - сделаем его неперечислимым
//Since we have created a new method in HTMLElement.prototype , we should make the method unenumerable
Object.defineProperty(HTMLElement.prototype, "getJStorageId", { enumerable: false });
