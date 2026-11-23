(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '8251359';
		let preferenceQuestion = ['busiest', 'quietest'];
		let preferencePeriod = ['hours', 'days'];
		let question = getSelectedPreferenceFromList(key, preferenceQuestion);
		let period = getSelectedPreferenceFromList(key, preferencePeriod);
		let start = period ? sl(1, 10) : 0;
		let count = period ? 16 : 24;
		let visitorsStep = 10, visitorsMax = 150;
		let values = [].zapslch(0, count - 1, visitorsStep, visitorsMax, visitorsStep);
		let extremum = question ? values.minE() : values.maxE();
		genAssert(values.sovp(extremum) === 1, 'Экстремум должен быть единственным');
		NAtask.setTask({
			text: 'На диаграмме показано количество посетителей сайта ' +
				(period ? 'во все дни с ' + start + ' по ' + (start + count - 1) + ' ноября.' : 'в течение каждого часа одних суток.') +
				' По горизонтали указаны ' + (period ? 'числа месяца' : 'часы от 0 до 23') +
				', по вертикали — количество посетителей за соответствующий ' + (period ? 'день' : 'час') +
				'. Определите, ' + (period ? 'какого числа' : 'в течение какого часа') + ' на сайте побывало ' +
				(question ? 'наименьшее' : 'наибольшее') + ' количество посетителей.',
			answers: start + values.indexOf(extremum),
			preference: [preferenceQuestion, preferencePeriod],
		});
		NAtask.modifiers.addJqplot({
			dataArray: [values.map((value, i) => [start + i, value])], width: '760px', height: '380px',
			options: {
				axes: {
					xaxis: {min: start - 0.5, max: start + count - 0.5, ticks: [[start - 0.5, '']].concat(values.map((_, i) => [start + i, '' + (start + i)]), [[start + count - 0.5, '']])},
					yaxis: {min: 0, max: visitorsMax + visitorsStep, tickInterval: visitorsStep},
				},
				seriesDefaults: {renderer: $.jqplot.BarRenderer, rendererOptions: {barWidth: 17}},
			},
		});
	}, 1000);
})();
// 7DE7DF
// CB860B
// C2BB83
// 8DF5A1

