(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '13093404';
		let preference = ['givenTorque', 'startMoving'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let factor = sl(1, 2);
		let values = [0, 20, 40, 60, 80, 100, 120, 140, 120, 100, 80, 60, 40].map(value => value * factor);
		let first = sl(1, 6);
		let target = values[first];
		NAtask.setTask({
		    text: 'На графике показана зависимость крутящего момента автомобильного двигателя от числа оборотов в минуту. ' +
		        'По горизонтали отмечено число оборотов в минуту, по вертикали — крутящий момент в Н·м. ' +
		        (variant ? 'Чтобы автомобиль начал движение, крутящий момент должен быть не меньше ' + target + ' Н·м. ' : '') +
		        'Какое наименьшее число оборотов в минуту должен поддерживать водитель, ' +
		        (variant ? 'чтобы автомобиль начал движение?' : 'чтобы крутящий момент был не меньше ' + target + ' Н·м?'),
		    answers: 500 * first, preference,
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [values.map((value, i) => [500 * i, value])], width: '720px', height: '400px',
		    options: {axes: {xaxis: {min: 0, max: 6000, tickInterval: 500}, yaxis: {min: 0, max: 300, tickInterval: 20}},
		        seriesDefaults: {showMarker: false}},
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.82: C7CA1C
// 3.83: C2DB05, 8B773C
