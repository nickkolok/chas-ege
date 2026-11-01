(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '506414';
		let preference = ['firstAtValue', 'lastAtValue', 'firstMaximum', 'lastMaximum', 'countAtValue', 'dryDays', 'maximumValue'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let start = sl(1, 10);
		let values = Array.from({length: 16}, () => sl(0, 14) / 2);
		let target = values[sl(0, values.length - 1)];
		let maximum = values.maxE();
		let answers = [start + values.indexOf(target), start + values.lastIndexOf(target),
		    start + values.indexOf(maximum), start + values.lastIndexOf(maximum),
		    values.sovp(target), values.sovp(0), maximum];
		let questions = [
		    'Какого числа впервые выпало ' + target.ts() + ' мм осадков?', 'Какого числа в последний раз выпало ' + target.ts() + ' мм осадков?',
		    'Какого числа впервые выпало максимальное количество осадков?', 'Какого числа в последний раз выпало максимальное количество осадков?',
		    'Сколько дней выпадало ровно ' + target.ts() + ' мм осадков?', 'Сколько дней осадков не выпадало?',
		    'Каково наибольшее суточное количество осадков? Ответ дайте в миллиметрах.',
		];
		NAtask.setTask({
		    text: 'На графике жирными точками показано суточное количество осадков, выпавших в городе с ' + start + ' по ' + (start + values.length - 1) +
		        ' октября. По горизонтали указаны числа месяца, по вертикали — количество осадков в миллиметрах. ' +
		        'Для наглядности точки соединены линиями. ' + questions[variant],
		    answers: answers[variant], preference,
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [values.map((value, i) => [start + i, value])], width: '720px', height: '380px',
		    options: {axes: {xaxis: {min: start - 0.5, max: start + values.length - 0.5,
		        ticks: [[start - 0.5, '']].concat(values.map((_, i) => [start + i, '' + (start + i)]), [[start + values.length - 0.5, '']])},
		        yaxis: {min: 0, max: 7, tickInterval: 0.5}}, seriesDefaults: {showMarker: true}},
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.117: 21A1F0
// 3.118: D71A7B
// 3.119: 983AF6
// 3.120: D1013F
// 3.121: B484BF
// 3.122: 8C3E17
// 3.123: E7B42B
// 3.137: C87E9F
// 3.138: 5CA438
// 3.139: 7F64A8
// 3.140: 872A42, 84075F
