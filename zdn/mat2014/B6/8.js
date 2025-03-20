(function() { 'use strict'; retryWhileError(function() {
	let all_sports, rus_sports, answ, is_rus;
	do {
		all_sports = sluchch(100, 900, 2);
		rus_sports = sluchch(10, all_sports - 50);
		is_rus = ['', 'не '].iz();
		answ = is_rus === '' ? (rus_sports - 1) / (all_sports - 1) : (all_sports - rus_sports) / (all_sports - 1);
	} while (answ.ts().length > 4)
	let name = om.imenaj.ie.iz();
	let game = om.sportparn.pe.iz();
	let country = om.strany.re.iz();
	NAtask.setTask({
		text: 'Перед началом первого тура чемпионата по ' + game +
		' участниц разбивают на игровые пары случайным образом ' +
		'с помощью жребия. Всего в чемпионате участвует ' + chislitlx(all_sports, 'спортсменка') +
		', среди которых ' + chislitlx(rus_sports, 'участница') + ' из ' + country + ', ' +
		'в том числе ' + name + '. Найдите вероятность того, что в первом туре ' + name +
		' будет играть с какой-либо спортсменкой ' + is_rus + 'из ' + country + '.',
	        answers: answ,
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//fixed by Aisse-258
