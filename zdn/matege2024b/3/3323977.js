(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '3323977';
		let preferenceEvent = ['kvn', 'relay', 'hammer'];
		let preferenceQuestion = ['place', 'result'];
		let event = getSelectedPreferenceFromList(key, preferenceEvent);
		let question = getSelectedPreferenceFromList(key, preferenceQuestion);
		let names = event === 2 ? ['Лаптев', 'Минаков', 'Иванов', 'Арнюк', 'Авдиенко'] : ['Топчан', 'Шумы', 'АТОМ', 'Лёлек и Болек', 'Прорыв'];
		let results = names.map(() => Array.from({length: 4}, () => event === 2 ? (sl1() ? sl(35, 70) : 0) : sl(1, 10)));
		let scores = results.map(row => event === 2 ? row.maxE() : row.sum());
		genAssert(scores.every(value => value > 0) && !scores.hasDubl(), 'Лучшие результаты должны быть ненулевыми и различными');
		let target = sl(0, names.length - 1);
		let ordered = scores.slice().sortNumeric().reverse();
		let rank = sl(1, names.length);
		let header = [[event === 2 ? 'Спортсмен' : 'Команда', '1', '2', '3', '4'].tr('th')];
		let table = header.concat(results.map((row, i) => [names[i]].concat(row.map(value => value || '—')).tr())).join('').toTable();
		let rules = event === 2 ? 'Места распределяются по результату лучшей попытки: чем дальше метнул спортсмен, тем лучше. Прочерк означает неудачную попытку.' :
		    'Для каждой команды баллы по всем конкурсам суммируются. Выше место у команды с большей суммой баллов.';
		let ask = question === 0 ? (event === 2 ? 'Какое место занял спортсмен ' + names[target] : 'Какое место заняла команда «' + names[target] + '»') + '?' :
		    (event === 2 ? 'Каков результат лучшей попытки (в метрах) спортсмена, занявшего ' + rank + '-е место?' :
		        'Сколько в сумме баллов у команды-победителя?');
		NAtask.setTask({
		    text: 'Результаты ' + ['игры КВН', 'школьных эстафет', 'соревнований по метанию молота'][event] + ' представлены в таблице.' +
		        table + rules + ' ' + ask,
		    answers: question === 0 ? ordered.indexOf(scores[target]) + 1 : ordered[event === 2 ? rank - 1 : 0],
		    preference: [preferenceEvent, preferenceQuestion],
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.33: 32B849, 125AF7, 2B44F7, 888FFE, F7FD07, F70A7A, AEF791
// 3.34: 169F42
// 3.35: 3A430F, 3D3194
// 3.36: E2A3B1, 73FCC4
// 3.37: 73A69E
// 3.38: D24510
// 3.39: 4B345B, CFBB75
// 3.40: 1E7105, B5F97E, 9CA6CC
// 3.41: 0B800F
// 3.42: 8368B7
// 3.43: 6901A3
// 3.44: 17A3E5
// 3.45: F3451F
// 3.46: 4CA1C6
// 3.47: 707E0D
// 3.48: D5261B
// 3.49: 9D611B
// 3.50: 1E89DE
