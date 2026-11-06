(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '16506923';
		let preference = ['findHeight', 'findPressure'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let offset = 20 * sl(-2, 2);
		let anchors = [760, 680, 600, 520, 440, 400, 360, 320, 280, 240, 200].map(value => value + offset);
		let points = [];
		for (let i = 0; i < anchors.length - 1; i++) {
		    points.push([i, anchors[i]], [i + 0.5, (anchors[i] + anchors[i + 1]) / 2]);
		}
		points.push([10, anchors[10]]);
		let selected = points[sl(1, points.length - 2)];
		NAtask.setTask({
		    text: 'На графике изображена зависимость атмосферного давления от высоты над уровнем моря. ' +
		        'На горизонтальной оси отмечена высота в километрах, на вертикальной — давление в миллиметрах ртутного столба. ' +
		        (variant ? 'Чему равно атмосферное давление на высоте ' + selected[0].ts() + ' км? Ответ дайте в миллиметрах ртутного столба.' :
		            'На какой высоте атмосферное давление равно ' + selected[1] + ' мм рт. ст.? Ответ дайте в километрах.'),
		    answers: selected[variant ? 1 : 0], preference,
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [points], width: '700px', height: '460px',
		    options: {axes: {xaxis: {min: 0, max: 10, tickInterval: 0.5}, yaxis: {min: 0, max: 800, tickInterval: 20}},
		        seriesDefaults: {showMarker: false}},
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.70: FBE02B, FA08E1
// 3.71: CED1AE
// 3.72: 6CDDF0, 742408, C8FD02, EA040C, 0E47BC, F1B31D, E78E16, C3FF28, DF36D1, 4ACAC1, 5D626B, C6B03E
// 3.73: CEE895
// 3.74: 4D88F5, 19F40C, 828072, 25E1BB, 1D0D10, D854A4, C545CE, 98F499, 31C964, EDB549, 1C95FF, 291622, 050BAD, 780C9E
// 3.75: 0E17A8
