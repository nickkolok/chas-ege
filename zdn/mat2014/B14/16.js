(function(){'use strict';

var totalDays = sl(4, 50);
var knownDay1 = sl(1, totalDays);
var knownDay2 = slKrome(knownDay1, 1, totalDays);

var commonDifference = sl(1,10);
var initialQuantity = sl(1,20);

var quantity1 = initialQuantity + commonDifference * (knownDay1 - 1);
var quantity2 = initialQuantity + commonDifference * (knownDay2 - 1);

var totalQuantity = initialQuantity + commonDifference * (totalDays - 1);


/*
Вере надо подписать 640 открыток.
Ежедневно она подписывает на одно и то же количество открыток больше по сравнению с предыдущим днем.
Известно, что за первый день Вера подписала 10 открыток.
Определите, сколько открыток было подписано за четвертый день, если вся работа была выполнена за 16 дней.
*/

var name = sklonlxkand(om.imenaj.ie.iz());

var needs = [
	'надо',
	'нужно',
	'необходимо',
	'требуется',
	'поручено',
].iz();

chas2.task.setCountableTask(
	[
		{
			utv: name.de + ' ' + needs + ' подписать ' + chislitM(totalQuantity,'открытку','открытки','открыток'),
			nah: 1,
			zna: totalQuantity,
			vpr: 'сколько всего открыток ' + needs + ' подписать ' + name.de,
		},
		{utv: 'ежедневно <replace1/> подписывает на одно и то же количество открыток больше по сравнению с предыдущим днём'},
		{
			utv: 'за ' + knownDay1 + '-й день <replace1/> подписала ' + chislitM(quantity1,'открытку','открытки','открыток'),
			nah: 1,
			zna: quantity1,
			vpr: 'сколько открыток было подписано за ' + knownDay1 + '-й день',
		},
		{
			utv: 'за ' + knownDay2 + '-й день <replace1/> подписала ' + chislitM(quantity2,'открытку','открытки','открыток'),
			nah: 1,
			zna: quantity2,
			vpr: 'сколько открыток было подписано за ' + knownDay2 + '-й день',
		},
		{
			utv: 'вся работа была выполнена за ' + chislitlx(totalDays,'день'),
			nah: 1,
			zna: totalDays,
			vpr: 'за сколько дней была выполнена вся работа',
		},
	]
);

//TODO: открыток/поздравлений/приглашений/конвертов
//TODO: нормальный механизм для последовательных замен

window.vopr.txt = window.vopr.txt.replace('<replace1/>', name.ie);
window.vopr.txt = window.vopr.txt.replace('<replace1/>', 'она');
window.vopr.txt = window.vopr.txt.replace('<replace1/>', name.ie);

})();
// РешуЕГЭ https://math-ege.sdamgia.ru/problem?id=99585
// Николай Авдеев
