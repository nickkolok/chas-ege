'use strict';
Array.prototype.shuffle = function(b){
/**Перемешивает массив случайным образом. Если b, то ещё и рекурсивно на один уровень.*/
	var i = this.length, j, t;
	while(i)
	{
		j=((i--)*Math.random() ).floor();
		t=b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		this[i]=this[j];
		this[j]=t;
	}
	return this;
};//за основу взят пример с tigir.com

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

Array.prototype.umnObj=//Depracated
Array.prototype.production=function(){
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
	if(f){
		for(i=this.length;i;i--)
			if(this[i]<=this[m])
				m=i;
	}else
		for(i=this.length;i;i--)
			if(this[i]<this[m])
				m=i;
	return m;
}

Array.prototype.max=function(f){
/**Индекс максимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f){
		for(i=this.length;i;i--){
			if(this[i]>=this[m]){
				m=i;
			}
		}
	}else{
		for(i=this.length;i;i--){
			if(this[i]>this[m]){
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

Array.prototype.pushIf=function(element, condition){
/**Добавляет в массив element, если выполнено condition.*/
	if(condition){
		this.push(element);
	}
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
Каждый следующий элемент массива отличается от предыдущего не менее, чем на minD и не более, чем maxD, с шагом shag*/
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

Array.prototype.slag0=function(){
/**Перемешивает массив в случайном порядке и радостно соединяет плюсиками, выбрасывая нули.*/
	return this.filter(function(el){
		if(!el){
			// Любое "ложное" значение, будь то численный нуль,
			// пустая строка или какой-нибудь undefined, пропускается
			return false;
		}
		if(el.trim){
			el = el.trim();
		}
		return el !== '0' && el !=='+0' && el !== '-0';
	}).slag();
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

Array.prototype.hasElemStrict=function(a){
/**Определяет, есть ли в массиве заданный элемент - строго, с точностью до совпадения типов*/
	return this.some(function(p1){
		return p1===a;
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

Array.prototype.hasDubl=function(){
/**Есть ли в массиве дублирующиеся элементы*/
	if(this===[])
		return 0;
	var a=this.slice().sort();
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			return 1;
	return 0;
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

Array.prototype.allStrToNum=function(){
/**Все строки, встречающиеся в массиве, превратить в числа (если получится).
Исходный массив не изменяет.*/
	return this.slice().map(function(elem){
		if(elem.isNumber)
			return elem;
		if(elem.isArray)
			return elem.allStrToNum();
		if(elem.isString)
			return elem.toNumberExt();
		return 0;
	});
}

Array.prototype.isLNez=function(){
/**Является ли система строк матрицы линейно независимой.*/
	var len=this.length;
	if(len<this[0].length){
		return this.T().isLNez();
	}
	if(len==this[0].length){
		return !!this.det();
	}
	for(var i=0;i<len;i++){
		var buf=this.slice();
		buf.splice(i,1);
		if(buf.isLNez())
			return 1;
	}
	return 0;
}

Array.prototype.testSLU=function(a,b,tochnost){
/**Является ли данный вектор решением СЛУ с матрицей a и столбцом свободных членов b
с точностью tochnost (всё-таки с float-ами фактически работаем).*/
	if(tochnost===undefined){
		tochnost=1e-5;
	}
	var len=a.length;
	if(!b){
		b=generateMatrix(len,1,0,0);
	}

	b=b.allStrToNum();
	a=a.allStrToNum();

	for(var i=0;i<len;i++){
		if( Math.abs( objUmn( [a[i]], this )[0][0]
			- b[i][0] ) > tochnost ){
			return 0;
		}
	}
	return 1;
}

Array.prototype.rk=function(){
/**Ранг матрицы. Функция-обёртка над rang_mat*/
	return rang_mat(this);
}

Array.prototype.isFSR=function(a){
/**Является ли данная матрица, в которой векторы - столбцы, ФСР для СЛОУ с матрицей a.*/
	var t=this.T();
	var len=t.length;

	a=a.allStrToNum();
	t=t.allStrToNum();

	if(!t.isLNez())
		return 0;
	if(a[0].length-a.rk() != len)
		return 0;

	for(var i=0;i<len;i++){
		if(![t[i]].T().testSLU(a))
			return 0;
	}
	return 1;
}

Array.prototype.isNullVect=function(){
/**Является ли вектор нулевым*/
	var len=this.length;
	for(var i=0;i<len;i++)
		if(this[i])
			return 0;
	return 1;
}

Array.prototype.hasNullVect=function(){
/**Есть ли в матрице нулевые векторы - строки или столбцы?*/
	var len=this.length;
	for(var i=0;i<len;i++)
		if(this[i].isNullVect())
			return 1;
	var th=this.T();
	len=th.length;
	for(var i=0;i<len;i++)
		if(th[i].isNullVect())
			return 1;
	return 0;
}

Array.prototype.copyAr=function() {
/**Если массив содержит вложенные, slice не подходит*/
	var ar = [];
	for (var i=0; i<this.length; i++){
		if (Array.isArray(this[i])){
			ar[i] = this[i].copyAr();
		}
		else {
			ar[i] = this[i];
		}
	}
	return ar;
}

Array.prototype.equalAr=function(x1) {
/**Возвращает, равны ли this и x1*/
	var f=true;
	if (x1.length==this.length){
		var i=0;
		while (i<x1.length && f) {
			f=f&&(x1[i]==this[i]);
			i++;
		}
		return(f);
	}
	else return false;
}

Array.prototype.reverseElems=function(recursive){
	return this.map(function(p1){
		return recursive && p1.reverseElems ? p1.reverseElems(1) : p1.reverse();
	});
}

Array.prototype.hasCommon=function(arr){
/**Имеет ли данный массив и arr общие элементы?*/
	var len=arr.length;
	for(var i=0; i<len; i++)
		if(this.hasElem(arr[i]))
			return 1;
		return 0;
}

Array.prototype.delEmpty=function(){
/**Удалить из массива пустые строки и undefined*/
	var len=this.length;
	for(var i=0;i<len;i++){
		if(this[i]===undefined || this[i]==""){
			this.splice(i,1);
			len--;
			i--;
		}
	}
}

Array.prototype.trimStrings=function(){
/**Для каждой строки-элемента массива вызвать .trim()*/
	var len=this.length;
	for(var i=0;i<len;i++){
		this[i]=this[i].trim();
	}
}

Array.prototype.replaceStrings=function(p1,p2){
/**Для каждой строки-элемента массива вызвать .replace(p1,p2)*/
	var len=this.length;
	for(var i=0;i<len;i++){
		this[i]=this[i].replace(p1,p2);
	}
}

Array.prototype.delDublByProp=function(prop){
/**Удаление элементов массива, у которых свойства из массива строк prop совпадают с ранее рассмотренными.*/
	var rez=this.slice();
	rez=rez.sortBy(prop);
	var len=rez.length;
	var p=prop.length;
	for(var i=1;i<len;i++){
		if(!compareObjects(rez[i-1],rez[i],prop)){
			rez.splice(i,1);
			len--;
			i--;
		}
	}
	return rez;
}

Array.prototype.sortNumeric=function(){
/**Сортировка численного массива.*/
	return this.sort(function(a,b){
		return a-b;
	});
}

Array.prototype.sortNumericArr=function(){
/**Сортировка массива числовых массивов по первому элементу.*/
	return this.sort(function(a,b){
		return a[0]-b[0];
	});
}

Array.prototype.sortBy=function(prop){
/**Сортировка элементов массива по списку свойств prop, где prop - массив строк.*/
	return this.sort(function(a,b){
		return compareObjects(a,b,prop);
	});

}

Array.prototype.getVariety=function(prop){
/**Возвращает массив значений выбранного свойства элементов-объектов исходного массива.*/
	var len=this.length;
	var rez=[];
	for(var i=0;i<len;i++){
		if(this[i][prop]!==undefined){
			if(this[i][prop].isArray){
				rez=rez.concat(this[i][prop]);
			}else{
				rez.push(this[i][prop]);
			}
		}
	}
	return rez.sortDelDubl();
}

Array.prototype.permuteCyclic = function (repeat) {
/** Циклическая перестановка массива*/
/** [1,2,3,4].permuteCyclic(1)==>[4,1,2,3]*/
	repeat %= this.length;

	//Handling negative permutations
	repeat += this.length * (repeat < 0);

	let tail = this.splice(this.length - repeat);
	this.splice(0, 0, ...tail);

	return this;
}

Array.prototype.shuffleJoin = function (separator){
	/** Перемешивает и соединяет массив*/
	separator = separator || '';
	return this.shuffle().join(separator);
}

Array.prototype.addToGlobal('docsArray',1);
