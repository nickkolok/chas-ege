//из числа делает массив 0 и 1 с количеством элементов k
function make2Array(ch,k)
{
	var x=[];
	for (var i=0; i<k; i++) {
		t=ch % 2;
		ch = Math.floor(ch / 2);
		x.push(t);
	}
	return x;
}

//преобразует логическое выражение в выражение, доступное для вычисления
function parseLogic(exp)
{
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

function findA(exp,t)
{
	var i=t-1;
	if (exp[t-1]==')') {
		var k = 1;
		while (k>0){
			i--;
			if (exp[i]==')')
				k++;
			if (exp[i]=='(')
				k--;
		}
	}
	else
		i=i-3;
	if (exp[i-1]=='!')
		i--;
	return i;
}

function findB(exp,t)
{
	var i=t+1;
	if (exp[i]=='!')
		i++;
	if (exp[t+1]=='(') {
		var k = 1;
		while (k>0){
			i++;
			if (exp[i]=='(')
				k++;
			if (exp[i]==')')
				k--;
		}
	}
	else
		i = i+3;
	return i;
}

/*&#172; - отрицание
&#8594; - стрелка направо
&#8743; - Логическая и
&#8744; - Логическая иили
&#8801; - Идентичный, тождество*/
function printLogic(exp)
{
	exp=exp.replace(/\|\|/g,'&#8744;');
	exp=exp.replace(/\&\&/g,'&#8743;');
	exp=exp.replace(/\~/g,'&#8801;');
	exp=exp.replace(/\>/g,'&#8594;');
	exp=exp.replace(/\!/g,'&#172;');
	var re = /x\[(\d)\]/g;
	exp = exp.replace(re, function(str,a) { return 'X'+(Number(a)+1) });

	return exp;
}

//генерирует логическую функцию
function genLogFunc(k)
{
	var t=0;
	var f='';
	for (var i=0;i<k;i++) {
		var d3=sl1();
		if (d3&&i!=0) {
			f=f+'(';
			t++;
		}
		var d1=sl1();
		if (d1){
			f=f+'!';
		}
		f=f+'x['+i+']';
		if (i!=k-1)	{
			var d4=sl1();
			if (d4&&t>0)
			{
				f=f+')';
				t--;
			}
			var d2=sl1();
			var d2=sluchch(3);
			switch (d2) {
				case 0: 
					f='('+f+')';
					f=f+'>';
					break
				case 1: 
					f=f+'||';
					break
				case 2: 
					f=f+'&&';
					break
				case 3: 
					f='('+f+')'+'~'+'(';
					t++;
					break
			}
		}
	}
	for (var i=0; i<t; i++)
		f=f+')';
	return f;
}

//Дан фрагмент таблицы истинности выражения F (см. таблицу). Какое выражение соответствует F?
(function(){'use strict';
var k = sluchch(2,4);//количество переменных
var f = [];//массив функций
for (var j=0; j<4; j++)
	f[j] = genLogFunc(k);

var func = new Function("x","return "+parseLogic(f[0]));

var ch=[];//массив значений переменных
var x=[];
for (var j=0; j<3; j++) {
	ch.push(slKrome(ch,Math.pow(2,k)-1));
	x[j]=make2Array(ch[j],k);
}

var res = [];//массив значений функции
for (var j=0; j<3; j++)
	res[j]=func(x[j]);

//проверка, нет ли функции с такой же таблицей истинности
for (var i=1; i<4; i++) {
	var flag = true;
	var func1= new Function("x","return "+parseLogic(f[i]));
	var res1=[];
	while (flag==true){
		for (var j=0; j<3; j++) {
			res1[j]=func1(x[j]);
		}
		flag=equalAr(res1,res);
		if (flag)
			f[i]=genLogFunc(k);
	}
}

//заполнение таблицы
var table = '';
for (var i=0; i<k; i++)
	table=table+'<td>'+'<b>'+'X'+(i+1)+'</td>';
table = '<tr>'+table+'<td>'+'<b>'+'F'+'</td>'+'</tr>';
for (var j=0; j<3; j++){
	table = table+'<tr>';	
	for (var i=0; i<k; i++)
		table=table+'<td>'+x[j][i]+'</td>';
	table=table+'<td>'+Number(res[j])+'</td>';
	table = table+'</tr>';
}
table = '<table border="1">'+table+'</table>';

window.vopr.txt='Дан фрагмент таблицы истинности выражения F (см. таблицу). Какое выражение соответствует F?'
	+'<br/>'+table;//Добавляем пустую строку между вопросом и вариантами ответа

for (var i=0; i<4; i++) 
	f[i]=printLogic(f[i]);

window.vopr.ver=[
f[0]
];
window.vopr.nev=[];
for (var i=1; i<4; i++) {
	window.vopr.nev.push(f[i]);
}
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
