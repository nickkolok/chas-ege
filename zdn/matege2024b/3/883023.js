(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '883023';
		let preference = ['fanTime', 'firstTemperature'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let fan = sl(5, 8);
		let initial = 10 * sl(1, 2);
		let values = Array.from({length: 13}, (_, i) => i <= fan ? initial + 10 * i : initial + 10 * fan - 10 * (1 + (i - fan) % 3));
		let first = sl(1, fan - 1);
		let target = values[first];
		NAtask.setTask({
		    text: 'На графике показано изменение температуры двигателя после запуска. По горизонтали указано время в минутах, ' +
		        'по вертикали — температура в градусах Цельсия. При достижении определённой температуры включается вентилятор, ' +
		        'после чего двигатель начинает охлаждаться. ' + (variant ?
		            'Через какое наименьшее количество минут температура двигателя будет равна ' + target + ' градусам Цельсия?' :
		            'Сколько минут прошло от запуска двигателя до первого включения вентилятора?'),
		    answers: variant ? first : fan, preference,
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [values.map((value, i) => [i, value])], width: '700px', height: '380px',
		    options: {axes: {xaxis: {min: 0, max: 12, tickInterval: 1}, yaxis: {min: 0, max: 120, tickInterval: 10}},
		        seriesDefaults: {showMarker: false}},
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.76: 883023
// 3.84: 87DF19
