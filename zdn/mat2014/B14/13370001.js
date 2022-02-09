(function(){'use strict';

var totalTimes = sl(4, 20);
var knownTime1 = sl(1, totalTimes - 2);
var knownTime2 = sl(knownTime1 + 1, totalTimes);
var knownTime3 = slKrome([knownTime1,knownTime2], 1, totalTimes);

var commonDifference = -sl(1,10);
var initialQuantity = -commonDifference * totalTimes;
//var totalQuantity = -commonDifference * (totalTimes - 1) * totalTimes;
var totalQuantity = (initialQuantity-commonDifference) * totalTimes / 2;

var quantity1 = initialQuantity + commonDifference * (knownTime1 - 1);
var quantity2 = initialQuantity + commonDifference * (knownTime2 - 1);
var quantity3 = initialQuantity + commonDifference * (knownTime3 - 1);

//var totalQuantity = initialQuantity + commonDifference * totalTimes;
//totalQuantity = (initialQuantity + totalQuantity)*totalTimes/2;


/*
	Элементалистка Селенита фармит бешеных сусликов в Долине Бешеных Сусликов с помощью своего любимого заклинания "Огненный Шар".
	К величайшему разочарованию Селениты, суслики никак не желают стоят спокойно и всё время разбегаются, рассредотачиваются и мечутся из стороны в сторону,
	так что каждый последующий "Огненный Шар" выкашивает на одно и то же количество сусликов меньше, чем предыдущий.
	Известно, что knownTime1 "Огненный Шар" выкосил на (quantity1-quantity2) бешеных сусликов больше, чем knownTime2.
	Сколько экспы получит Селенита, закончив истреблять сусликов, если за каждого суслика дают XP эскпы?
	(В присутствии мага суслики не респаунятся, и их количество может только убывать).
*/


var name = sklonlxkand([
	'Селенита', 'Солана', 'Плутония', 'Нептуния', 'Адельмина', 'Сильвия', 'Олимпия',
].iz());

var magicTitleFem = sklonlxkand([
	'элементалистка', 'ведьма', 'магичка', 'мэтрэсса', 'некромантка', 'эльфийка', 'фея', 'колдунья', 'чародейка', 'волшебница',
].iz());

var XP = sl(2,9) * (10).pow(sl(0,1));

var battleCharmM = '«' +[
	'Огненный Шар', 'Ледяной Шар', 'Чёрный Инферно', 'Поцелуй Пустоты', 'Кинжал Калиостро', 'Гнев Гекатонхейров', 'Факел Фаэтона',
].iz() + '»';

var weakMonsterM = sklonlxkand([
	'суслик', 'тушканчик', 'шушпанчик', 'покусатель', /*'хорёк',*/ 'кротокрыс', 'медвенот', 'гигагусь',
].iz());



/*
NAtask.setTask({
	text: magicTitleFem.ie.toZagl()+' '+name.ie+' фармит бешеных ' + weakMonsterM.rm + ' в Долине Бешеных ' + weakMonsterM.rm.toZagl() + ' '+
		'с помощью своего любимого заклинания '+battleCharmM+'. ' +
		'К величайшему разочарованию '+name.re+', ' + weakMonsterM.im + ' никак не желают стоять спокойно и всё время разбегаются, рассредотачиваются и мечутся из стороны в сторону, ' +
		'так что каждое последующее заклинание выкашивает на одно и то же количество ' + weakMonsterM.rm + ' меньше, чем предыдущее. '+
		'Известно, что ' + ordinalNumber(knownTime1, 'i', 0) + ' '+battleCharmM+' выкосил на ' +
		chislitlx(quantity1-quantity2,weakMonsterM.ie,'v')+' больше, чем ' + ordinalNumber(knownTime2, 'i', 0) + '. '+
		'Сколько экспы получит '+name.ie+', закончив истреблять ' + weakMonsterM.rm + ', если за каждого ' + weakMonsterM.re + ' дают '+XP+' эскпы? '+
		'(В присутствии мага ' + weakMonsterM.im + ' не респаунятся, и их количество может только убывать).',
	answers: XP * totalQuantity,
});
*/

chas2.task.setCountableTask(
	[
		{
			utv: 'за каждого ' + weakMonsterM.re + ' дают '+XP+' эскпы',
		},
		{
			utv: 'всего ' + name.ie + ' кастанула '+battleCharmM+' '+chislitlx(totalTimes,'раз'),
		},
		{
			nah: 1,
			zna: XP * totalQuantity,
			vpr: 'cколько экспы получит '+name.ie+', истребив всех ' + weakMonsterM.rm,
		},
		{
			utv:
				ordinalNumber(knownTime1, 'i', 0) + ' '+battleCharmM+' выкосил на ' +
				chislitlx(quantity1-quantity2,weakMonsterM.ie,'v')+' больше, чем ' + ordinalNumber(knownTime2, 'i', 0),
		},
		{
			utv:
				ordinalNumber(knownTime3, 'i', 0) + ' '+battleCharmM+' выкосил ' +
				chislitlx(quantity3,weakMonsterM.ie,'v'),
		},
	],
	{
		preambula:
			magicTitleFem.ie.toZagl()+' '+name.ie+' фармит бешеных ' + weakMonsterM.rm + ' в Долине Бешеных ' + weakMonsterM.rm.toZagl() + ' '+
			'с помощью своего любимого заклинания '+battleCharmM+'. ' +
			'К величайшему разочарованию '+name.re+', ' + weakMonsterM.im + ' никак не желают стоять спокойно и всё время разбегаются, рассредотачиваются и мечутся из стороны в сторону, ' +
			'так что каждое последующее заклинание выкашивает на одно и то же количество ' + weakMonsterM.rm + ' меньше, чем предыдущее. ',
		conclusion:
			'(В присутствии мага ' + weakMonsterM.im + ' не респаунятся, и их количество может только убывать).',
	},
	{
		analys:
			'Разность прогрессии: ' + commonDifference + '; ' +
			'всего ' + weakMonsterM.rm + ': ' + totalQuantity +'; ' +
			'всего заклинаний: ' + totalTimes,
	}
);



})();
// РешуЕГЭ https://math-ege.sdamgia.ru/problem?id=99585
// Николай Авдеев
