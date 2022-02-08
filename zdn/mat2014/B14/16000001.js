(function(){'use strict';

var d = sl(1,20);
var n = sl(4,12);
var a1 = sl(1,32);
var an = a1+d*(n-1);

var S = (a1+an)*n/2;

/*
1) Робинзон Крузо делает частокол из 180 кольев,
* ежедневно мастеря на одно и то же же количество кольев больше, чем в предыдущий.
* Известно, что за первый и последний день в сумме Робинзон соорудил 120 кольев.
* Определите, за сколько дней Робинзон сделал весь частокол.
*/

var daynumber = slKrome(2, n/2);

var daynames = [
	'первый и последний',
	'второй и предпоследний',
	ordinalNumber(daynumber,'i',0)+' и '+ordinalNumber(n+1-daynumber,'i',0),
].iz();

chas2.task.setCountableTask(
	[
		{
			utv: 'ежедневно <replace1/> мастерил на одно и то же количество кольев больше, чем в предыдущий'
		},
		{
			utv: 'частокол состоит из ' + chislitlx(S,'кол','v'),
			nah: 1,
			zna: S,
			vpr: 'сколько всего кольев в заборе',
		},
		{
			utv: 'за '+daynames+' день в сумме <replace1/> соорудил ' + chislitlx(a1+an,'кол','v'),
			nah: 1,
			zna: a1+an,
			vpr: 'сколько кольев соорудил <replace1/> за '+daynames+' день в сумме',
		},
		{
			utv: '<replace1/> сделал весь частокол за ' + chislitlx(n,'день','v'),
			nah: 1,
			zna: n,
			vpr: 'за сколько дней <replace1/> сделал весь частокол',
		},
	]
);

//TODO: открыток/поздравлений/приглашений/конвертов
//TODO: нормальный механизм для последовательных замен

window.vopr.txt = window.vopr.txt.replace('<replace1/>', 'Робинзон Крузо');
window.vopr.txt = window.vopr.txt.replace('<replace1/>', 'он');
window.vopr.txt = window.vopr.txt.replace('<replace1/>', 'Робинзон');
window.vopr.txt = window.vopr.txt.replace('<replace1/>', 'он');

})();
// РешуЕГЭ https://math-ege.sdamgia.ru/problem?id=99585
// Николай Авдеев
