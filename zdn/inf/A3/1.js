//Дан фрагмент таблицы истинности выражения F (см. таблицу). Какое выражение соответствует F?
(function(){'use strict';
var k = sluchch(2,4);//количество переменных
var f = [];//массив функций
for (var j=0; j<4; j++) {
	var flag = true;
	while (flag) {
		var f1 = genLogFunc(k);
		flag = f.hasElem(f1);
		if (!flag) 
			f.push(f1);
	}
}

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
	var res1=[];
	while (flag){
		var func1= new Function("x","return "+parseLogic(f[i]));
		for (var j=0; j<3; j++)
			res1[j]=func1(x[j]);
		flag=equalAr(res1,res);
		if (flag) {
			f[i]=genLogFunc(k);
		}
	}
}

//заполнение таблицы
var table = '';
for (var i=0; i<k; i++)
	table=table+('X'+(i+1)).vTag('b','').vTag('td','');
table = (table+'F'.vTag('b','').vTag('td','')).vTag('tr','');
for (var j=0; j<3; j++){
	table = table+'<tr>';
	for (var i=0; i<k; i++)
		table=table+String(x[j][i]).vTag('td','');
	table=table+String(Number(res[j])).vTag('td','');
	table = table+'</tr>';
}
table = table.vTag('table','border="1"');

window.vopr.txt='Дан фрагмент таблицы истинности выражения F (см. таблицу). Какое выражение соответствует F?'
	+'<br/>'+table+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа

for (var i=0; i<4; i++) 
	f[i]=printLogic(f[i]);

window.vopr.ver=f.splice(0,1);
window.vopr.nev=f;
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
