//Путешественник пришел в 0:00 на автостанцию А и обнаружил следующее расписание местной сети автобусного сообщения. Определите самое раннее время, когда путешественник может оказаться в пункте В согласного этому расписанию.
(function(){'use strict';
Date.prototype.makeTime = function() {
	var format = this.getHours()+':';
	if (this.getMinutes()<10)
		format=format+'0'+this.getMinutes();
	else
		format=format+this.getMinutes();
	return format;
};

var k = sluchch(4,5);//количество городов
var names = ['ТУЧЕВОЕ','ИВАНОВО','ОЛЕНЕВО','СЫРКОВО','ЛОМОВОЕ'].shuffle();
var C = 0;//город, из которого мы прибываем
var B = 1;//город, куда мы направляемся
var cities = [];//матрица смежности
//генерация массива смежности для городов
var table = '';
var wrongtimes = [];
for (var i=0; i<k;i++) {
	cities[i]=[];
	for (var j=0; j<k;j++) {
		if ((sluchch(1,4)>1)&&(i!=j) && (i!=C || j!=B)){
			cities[i][j]=[];
			var t1=sluchch(0,60000000);
			var t2=sluchch(t1+3600000,65000000);
			cities[i][j][0]=new Date(t1);
			cities[i][j][1]=new Date(t2);
			table = table+'<tr>'+'<td>'+names[i]+'</td>'+'<td>'+names[j]+'</td>'+'<td>'+cities[i][j][0].makeTime()+'</td>'+'<td>'+cities[i][j][1].makeTime()+'</td>'+'</tr>';
			if (j==B)
				wrongtimes.push(cities[i][j][1]);
		}
		else
			cities[i][j]=0;
	}
}
table='<table border="1"><tr><td><b>Пункт отправления</td><td><b>Пункт прибытия</td><td><b>Время отправления</td><td><b>Время прибытия</td></tr>'+table+'<table>';
//поиск кратчайшего пути
var ways = [];//список городов, в которых мы побывали
var times = [];//времена прибытия
times[0] = new Date(sluchch(0,30000000));
var minTime = new Date(2000000000);
var city = C;
var findWay = function() {
	var p = times.length-1;
	ways.push(city);
	for (var i=1; i<k;i++) {
		if (cities[city][i]!=0 && !(ways.hasElem(i))) {
			times[p+1] = new Date(0);
			if (cities[city][i][0].getHours()<times[p].getHours() ||
				cities[city][i][0].getHours()==times[p].getHours() &&
				cities[city][i][0].getMinutes()==times[p].getMinutes())
			{
				times[p+1].setDate(times[p].getDate()+1);
			}
			else
			{
				times[p+1].setDate(times[p].getDate());
			}
			times[p+1].setHours(cities[city][i][1].getHours());
			times[p+1].setMinutes(cities[city][i][1].getMinutes());
			if (i==B)
			{
				if (times[p+1]<minTime)
					minTime=times[p+1];
			}
			else {
				city = i;
				findWay();
				ways.length=ways.length-1;
				city=ways[ways.length-1];
				times.length=times.length-1;
			}
		}
	}
};
findWay();
window.vopr.txt='Путешественник пришел в '+times[0].makeTime()+' на автостанцию '+names[C]+'  и обнаружил следующее расписание местной сети автобусного сообщения. Определите самое раннее время, когда путешественник может оказаться в пункте '+names[B]+' согласно этому расписанию.'
	+'<br/>'+table;//Добавляем пустую строку между вопросом и вариантами ответа
window.vopr.ver=[
	minTime.makeTime()
];
var wrongAnswers = [];
for (var i = 0; i < wrongtimes.length; i++) {
	if (wrongtimes[i].makeTime()!=minTime.makeTime())
		wrongAnswers.push(wrongtimes[i].makeTime());
}
for (var i = wrongtimes.length-1; i < 4; i++) {
	var d =new Date(sluchch(0,60000000));
	wrongAnswers[i]=d.makeTime();
}
window.vopr.nev=wrongAnswers;
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
