(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '243800';
		let preferenceQuestion = ['minimum', 'maximum', 'coldestMonth', 'warmestMonth'];
		let preferencePeriod = ['wholeYear', 'secondHalf', 'summer', 'interval'];
		let preferenceChart = ['bars', 'line'];
		let question = getSelectedPreferenceFromList(key, preferenceQuestion);
		let period = getSelectedPreferenceFromList(key, preferencePeriod);
		let chart = getSelectedPreferenceFromList(key, preferenceChart);
		let values = [-6, -4, 2, 8, 14, 18, 22, 20, 14, 8, 2, -4].map(value => value + 2 * sl(-2, 2));
		let left = [0, 6, 5, sl(0, 8)][period];
		let right = [11, 11, 7, sl(left + 1, 11)][period];
		let selected = values.slice(left, right + 1);
		let extremum = question % 2 ? selected.maxE() : selected.minE();
		if (question >= 2) {
		    genAssert(selected.filter(value => value === extremum).length === 1, 'Номер месяца должен определяться однозначно');
		}
		let answer = question < 2 ? extremum : left + selected.indexOf(extremum) + 1;
		let periodText = ['за весь год', 'во второй половине года', 'летом (июнь, июль, август)',
		    'в период с месяца № ' + (left + 1) + ' по месяц № ' + (right + 1) + ' включительно'][period];
		let questions = [
		    'Определите наименьшую среднемесячную температуру ',
		    'Определите наибольшую среднемесячную температуру ',
		    'В каком месяце среднемесячная температура была наименьшей ',
		    'В каком месяце среднемесячная температура была наибольшей ',
		];
		NAtask.setTask({
		    text: 'На ' + ['диаграмме', 'графике'][chart] + ' показана среднемесячная температура воздуха в городе за каждый месяц одного года. ' +
		        'По горизонтали указаны номера месяцев, по вертикали — температура в градусах Цельсия. ' +
		        questions[question] + periodText + (question < 2 ? '. ' : '? ') +
		        (question < 2 ? 'Ответ дайте в градусах Цельсия.' : 'В ответе запишите номер месяца.'),
		    answers: answer,
		    preference: [preferenceQuestion, preferencePeriod, preferenceChart],
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [values.map((value, index) => [index + 1, value])],
		    width: '720px', height: '400px',
		    options: {
		        axes: {
		            xaxis: {min: 0.5, max: 12.5, ticks: [[0.5, '']].concat(Array.from({length: 12}, (_, i) => [i + 1, '' + (i + 1)]), [[12.5, '']])},
		            yaxis: {min: -12, max: 30, tickInterval: 2},
		        },
		        seriesDefaults: chart === 0 ? {renderer: $.jqplot.BarRenderer, fillToZero: true, shadow: false, rendererOptions: {barWidth: 24}} : {showMarker: true},
		    },
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.1: AB001E
// 3.2: 934757
// 3.3: B3CD74
// 3.4: 62C0CB
// 3.5: 758772
// 3.6: 7ADFF4
// 3.7: 4451E6
// 3.8: F0333A
// 3.9: B454C9
// 3.10: 089465
// 3.11: 861025
// 3.12: 4841F2
// 3.13: 57C844
// 3.14: 54985F
// 3.15: 6CADBE
// 3.16: FE7F7B
// 3.17: A3B674
// 3.18: DDE1C8
// 3.19: 392903
// 3.20: 85AD6F
// 3.21: 4FD698
// 3.22: 5B60CD
// 3.23: 642E87
// 3.24: 165E07
// 3.25: 239270
// 3.26: 50DE07
// 3.27: F47C7B
// 3.28: 243800
// 3.131: 06117F
