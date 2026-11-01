(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '263609';
		let preferenceStory = ['bitcoin', 'euro', 'australianDollar', 'schilling', 'goldDollars', 'goldRubles', 'nickel', 'tin', 'palladium', 'platinum', 'silver', 'oil', 'temperature'];
		let preferenceQuestion = ['minimum', 'maximum', 'range', 'firstMinimum', 'firstMaximum', 'lastMinimum', 'lastMaximum', 'firstAtValue', 'valueAtDate'];
		let preferencePeriod = ['wholePeriod', 'interval'];
		let story = getSelectedPreferenceFromList(key, preferenceStory);
		let question = getSelectedPreferenceFromList(key, preferenceQuestion);
		let period = getSelectedPreferenceFromList(key, preferencePeriod);
		let stories = [
		    ['курс Bitcoin', 'долларах США', 30000, 1000], ['курс евро', 'рублях', 60, 0.5],
		    ['курс австралийского доллара', 'рублях', 45, 0.5], ['курс австрийского шиллинга', 'рублях', 1, 0.1],
		    ['цена золота', 'долларах США за унцию', 250, 1], ['цена золота', 'рублях за грамм', 1000, 10],
		    ['цена никеля', 'долларах США за тонну', 10000, 100], ['цена олова', 'долларах США за тонну', 15000, 100],
		    ['цена палладия', 'рублях за грамм', 500, 10], ['цена платины', 'рублях за грамм', 1000, 10],
		    ['цена серебра', 'рублях за грамм', 20, 0.5], ['цена нефти', 'долларах США за баррель', 20, 1],
		    ['среднесуточная температура', 'градусах Цельсия', 10, 1],
		];
		let [name, units, base, step] = stories[story];
		let year = sl(2000, 2025);
		let month = sl(0, 11);
		let dates = Array.from({length: 28}, (_, i) => i + 1).filter(day => story === 12 || ![0, 6].includes(new Date(year, month, day).getDay()));
		let values = dates.map(() => +(base + step * sl(0, 12)).toFixed(3));
		let left = period ? sl(0, dates.length - 4) : 0;
		let right = period ? sl(left + 2, dates.length - 1) : dates.length - 1;
		let selected = values.slice(left, right + 1);
		let minimum = selected.minE();
		let maximum = selected.maxE();
		let targetIndex = sl(left, right);
		let targetValue = values[targetIndex];
		let answers = [minimum, maximum, +(maximum - minimum).toFixed(3),
		    dates[left + selected.indexOf(minimum)], dates[left + selected.indexOf(maximum)],
		    dates[left + selected.lastIndexOf(minimum)], dates[left + selected.lastIndexOf(maximum)],
		    dates[left + selected.indexOf(targetValue)], targetValue];
		let periodText = 'в период с ' + dates[left] + ' по ' + dates[right] + ' число включительно';
		let questions = [
		    'Найдите наименьшее значение ' + periodText + '.', 'Найдите наибольшее значение ' + periodText + '.',
		    'Найдите разность наибольшего и наименьшего значений ' + periodText + '.',
		    'Какого числа ' + periodText + ' впервые достигнуто наименьшее значение?',
		    'Какого числа ' + periodText + ' впервые достигнуто наибольшее значение?',
		    'Какого числа ' + periodText + ' в последний раз достигнуто наименьшее значение?',
		    'Какого числа ' + periodText + ' в последний раз достигнуто наибольшее значение?',
		    'Какого числа ' + periodText + ' впервые достигнуто значение ' + targetValue.ts() + '?',
		    'Каково значение ' + dates[targetIndex] + ' числа?',
		];
		NAtask.setTask({
		    text: 'На графике жирными точками показана величина «' + name + '» ' + (story === 12 ? 'за каждый день' : 'во все рабочие дни') +
		        ' с ' + dates[0] + ' по ' + dates[dates.length - 1] + ' ' + om.mesiacy.re[month] + ' ' + year + ' года. ' +
		        'По горизонтали указаны числа месяца, по вертикали — значения в ' + units + '. ' +
		        'Для наглядности точки соединены линиями. ' + questions[question] +
		        ([3, 4, 5, 6, 7].includes(question) ? '' : ' Ответ дайте в ' + units + '.'),
		    answers: answers[question], preference: [preferenceStory, preferenceQuestion, preferencePeriod],
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [values.map((value, i) => [dates[i], value])], width: '760px', height: '400px',
		    options: {axes: {xaxis: {min: dates[0] - 0.5, max: dates[dates.length - 1] + 0.5,
		        ticks: [[dates[0] - 0.5, '']].concat(dates.map(day => [day, '' + day]), [[dates[dates.length - 1] + 0.5, '']])},
		        yaxis: {min: base - step, max: base + 13 * step, tickInterval: step}}, seriesDefaults: {showMarker: true}},
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.77: E12BE3
// 3.78: 21438D
// 3.79: 5D815B
// 3.80: 2288DB
// 3.81: E4B546
// 3.85: 23FCCF
// 3.86: 57E7EB
// 3.87: 18D73D
// 3.88: 2D902B
// 3.89: FF4752
// 3.90: F24642
// 3.91: B70E0B
// 3.92: 7928EC
// 3.93: 0C8872
// 3.94: 2FD0A6
// 3.95: 070E25
// 3.96: 8D8CEF
// 3.97: 3A77D9
// 3.98: 359DFC
// 3.104: 5E4ED5
// 3.105: DC8B01
// 3.106: FDCD5C
// 3.107: D92C83
// 3.108: 4D84B1
// 3.109: BF0B87
// 3.110: F4A694
// 3.111: 0F2A60
// 3.112: E50D9D
// 3.113: 4E83A2
// 3.114: 2A40CC
// 3.115: 180167
// 3.116: 320A8A
// 3.129: 0C1A94
// 3.130: 1538DE
// 3.132: 39D0A1
// 3.133: 565739
// 3.134: 0A3E7C
// 3.135: 66FD28
// 3.136: D8385A
