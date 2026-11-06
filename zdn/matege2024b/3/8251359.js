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
		let values = Array.from({length: count}, () => 10 * sl(1, 15));
		let extremum = question ? values.minE() : values.maxE();
		genAssert(values.filter(value => value === extremum).length === 1, 'Экстремум должен быть единственным');
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
		            yaxis: {min: 0, max: 160, tickInterval: 10},
		        },
		        seriesDefaults: {renderer: $.jqplot.BarRenderer, rendererOptions: {barWidth: 17}},
		    },
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.29: 7DE7DF
// 3.30: CB860B
// 3.31: C2BB83
// 3.32: 8DF5A1
