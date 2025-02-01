'use strict';

//перевод числа x из системы с основанием sysBefore в систему с основанием sysAfter
function intoAnotherSystem(x,sysBefore,sysAfter) {
// TODO: А нет ли готовой функции?
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

try {

	global. intoAnotherSystem = module.exports. intoAnotherSystem = intoAnotherSystem ;
	global. parseLogic = module.exports. parseLogic = parseLogic ;
	global. findA = module.exports. findA = findA ;
	global. findB = module.exports. findB = findB ;
	global. printLogic = module.exports. printLogic = printLogic ;
	global. genLogFunc = module.exports. genLogFunc = genLogFunc ;
	global. genMask = module.exports. genMask = genMask ;
	global. genWrongWordForMask = module.exports. genWrongWordForMask = genWrongWordForMask ;
	global. genWordForMask = module.exports. genWordForMask = genWordForMask ;
	global. genAlg = module.exports. genAlg = genAlg ;
	global. algInText = module.exports. algInText = algInText ;
	global. genWordForAlg = module.exports. genWordForAlg = genWordForAlg ;
	global. genWrongWordForAlg = module.exports. genWrongWordForAlg = genWrongWordForAlg ;
	global. printLogicRus = module.exports. printLogicRus = printLogicRus ;
} catch (e) {
}
