function printLogicRus(exp,ar) {
	exp=exp.replace(/\|\|/g,' ИЛИ ');
	exp=exp.replace(/\&\&/g,' И ');
	exp=exp.replace(/\!/g,' НЕ ');
	var re = /c\[(\d)\]/g;
	exp = exp.replace(re, function(str,a) { return ar[Number(a)]; });
	return exp;
}

(function(){'use strict';
/**Сколько записей в нижеследующем фрагменте таблицы удовлетворяют условию (турнирная таблица)*/
var k = sluchch(5,8);//количество строк в таблице
var m = sluchch(3,6);//количество странных столбцов
var allNames = ['Иванов','Петров','Сидоров','Малюков','Силин','Клеменс','Холево','Яшвили','Бергер','Численко'];
var names = allNames.iz(k);
var graphs = [];
for (var i=0; i<m; i++)
	graphs[i]=slLetter(graphs);
for (var i=0; i<m; i++)
	graphs[i]=graphs[i].toUpperCase();
var content = [];
for (var j=0; j<k; j++){
	content[j]=[];
	for (var i=0; i<m; i++){
		content[j][i]=sluchch(20);
	}
}

var table = '';
var table = 'Место'.vTag('td')+'Участник'.vTag('td');
for (var i=0; i<m; i++)
	table+=graphs[i].vTag('td');
table= table.vTag('tr');
for (var j=0; j<k; j++){
	table+='<tr>';
	table+=String(j+1).vTag('td')+names[j].vTag('td');
	for (var i=0; i<m; i++){
		table+=String(content[j][i]).vTag('td');
	}
	table+='</tr>';
}
table = table.vTag('table','border="1"');

var oper = ['<','>','>=','<='];
var c = sluchch(2,m-1);
var numb = [];
var log = genLogFunc(c,'easy');
for (var i=0; i<c; i++) {
	numb[i]=slKrome(numb,m-1);
	log=log.replace('x['+i+']','(c['+numb[i]+']'+oper[sluchch(3)]+sluchch(20)+')');
}

var usl = printLogicRus(log,graphs);
var func = new Function("c","return "+log);
var sum = 0;
for (var j=0; j<k; j++){
	sum+=func(content[j]);
}
window.vopr.txt='Сколько записей в нижеследующем фрагменте турнирной таблицы удовлетворяют условию'+
'<br/><b>'+usl+'</b><br/>'+table+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.nev=[];
for (var i=0; i<3; i++){
	window.vopr.nev.push(slKrome(window.vopr.nev.concat(sum),k));
}
window.vopr.ver=[sum];
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
