(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let sum = sluchch(100, 300, 10);
	let s = sum * sluchch(2, 15);
	let v1 = sluchch(50, sum / 2);
	let v2 = sum - v1;

	let place = sklonlxkand(['пункт', 'деревня', 'город', 'село', 'область3', 'столица', 'царство', 'хутор'].iz())
	let transp = sklonlxkand([
		['автомобиль', 'грузовик', 'мотоциклист', 'автобус', 'гробик', 'шпион'].iz(), ['квадрокоптер',
			'дракон', 'вертолёт', 'Горыныч', 'колдун', 'дирижабль', 'чёрт'
		].iz(), ['парусник', 'пароход', 'паром', 'катер'].iz()
	]);
	let k = sluchch(0, transp.length - 1);
	let go, pr = '';
	switch (k) {
	case 0:
		go = 'выехали';
		if (transp[k].ie == 'гробик')
			pr = ' на колёсиках';
		break;
	case 1:
		go = 'вылетели';
		break;
	case 2:
		go = 'отплыли';
		break;
	}

	NAtask.setTask({
		text: `Из двух ${place.rm}, расстояние между которыми равно $${s}$ км, навстречу друг другу ${go} одновременно  два ${transp[k].re}${pr}.` +
			` Через сколько часов ${transp[k].im} ${pr} встретятся, если их скорости равны $${v1}$ км/ч и $${v2}$ км/ч?
`,
		answers: s / sum,
	});
})();
//Обзад 99588

