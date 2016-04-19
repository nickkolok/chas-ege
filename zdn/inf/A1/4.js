//Даны 4 числа, они записаны с использованием различных систем счисления. Укажите среди этих чисел то, в двоичной записи которого содержится <ровно k единиц/нулей>/<наибольшее/наименьшее количество единиц/нулей>. Если таких чисел несколько, укажите наибольшее из них.
(function(){'use strict';
var systems = [8, 10, 16];
var chisla = [];
var sys = [];
var variants2=['единиц', 'значащих нулей'];
var usl2=variants2.iz();
var kx = [];
for (var i = 0; i < 4; i++) {
	var x = sluchch(10,1000);
	var m = systems.iz();
	sys.push(m);
	var y = intoAnotherSystem(x,10,m);
	var x2 =  intoAnotherSystem(x,10,2);
	if (usl2 == 'единиц')
		kx.push(String(x2).split('1').length-1);
	else
		kx.push(String(x2).split('0').length-1);
	chisla.push(y);
}
var k = kx.iz();
var variants1=['ровно '+String(k), 'наибольшее количество', 'наименьшее количество'];
var usl1=variants1.iz();
var answer = '0';
if (usl1 == 'ровно '+k)
	answer = chisla[kx.indexOf(k)];
else if (usl1 == 'наибольшее количество')
	answer = chisla[kx.max()+1];
else
	answer = chisla[kx.min()+1];

window.vopr.txt='Даны 4 числа, они записаны с использованием различных систем счисления. Укажите среди этих чисел то, в двоичной записи которого содержится '+usl1+' '+usl2+'. Если таких чисел несколько, укажите наибольшее из них.'
	+'<br/>';//Добавляем пустую строку между вопросом и вариантами ответа

window.vopr.ver=[
	answer+'<sub>'+sys[chisla.indexOf(answer)]+'</sub>'
];

sys.splice(chisla.indexOf(answer), 1);
chisla.splice(chisla.indexOf(answer), 1);

var wrongAnswers = [];
for (var i = 0; i < 3; i++) {
	wrongAnswers[i]=chisla[i]+'<sub>'+sys[i]+'</sub>';
}
window.vopr.nev=wrongAnswers;
window.vopr.rsh='';

AtoB();//Техническая функция, её удалять не надо

})();
//Анастасия Червинская
