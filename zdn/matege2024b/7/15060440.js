(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '15060440';
	let preference = ['coefficientSigns', 'slope', 'derivative'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let signs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
	let slopes = [[-3, 1], [-2, 1], [-1, 2], [-1, 4], [1, 2], [3, 5], [3, 2], [2, 1]];
	let graphs = signs.map(([slopeSign, interceptSign]) => {
		let [rise, run] = variant === 0 ? [slopeSign * sl(1, 2), 1] : slopes.splice(sl(0, slopes.length - 1), 1)[0];
		let intercept = interceptSign * sl(1, 2);
		let solution = variant === 0
			? '$k' + (rise > 0 ? '>0' : '<0') + ',\\quad b' + (intercept > 0 ? '>0' : '<0') + '$'
			: '$' + (rise / run).ts() + '$';
		return {rise, run, intercept, solution};
	}).shuffle();
	let questions = [
		'знаками коэффициентов $k$ и $b$',
		'угловыми коэффициентами прямых',
		'значениями производной этих функций в точке $x=1$',
	];
	NAtask.setCorrespondenceTask({
		text: 'На рисунке изображены графики функций вида $y=kx+b$. Установите соответствие между графиками и ' + questions[variant] + '.',
		leftHeader: 'ГРАФИКИ',
		left: graphs.map((graph, i) => ({expr: 'График ' + (i + 1), solution: graph.solution})),
		rightHeader: 'КОЭФФИЦИЕНТЫ ИЛИ ИХ ХАРАКТЕРИСТИКИ',
		right: graphs.map(graph => graph.solution),
		postText: 'Запишите номера ответов в порядке, в котором перечислены графики в таблице.',
		preference,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: function (ctx) {
			graphs.forEach(({rise, run, intercept}, i) => {
				ctx.save();
				ctx.translate(i % 2 * 200, Math.floor(i / 2) * 200);
				ctx.beginPath();
				ctx.rect(0, 0, 196, 196);
				ctx.clip();
				ctx.fillText('График ' + (i + 1), 5, 13);
				ctx.drawCoordinatePlane(196, 196, {hor: 1, ver: 1}, {x1: '1', y1: '1'}, 16);
				ctx.scale(16, -16);
				ctx.lineWidth = 0.12;
				let f = x => rise * x / run + intercept;
				ctx.drawLine(-6, f(-6), 7, f(7));
				if (variant !== 0) {
					let x = Math.abs(intercept + rise) <= 5 ? run : -run;
					ctx.drawFilledCircle(0, intercept, 0.17);
					ctx.drawFilledCircle(x, f(x), 0.17);
				}
				ctx.restore();
			});
		},
	});
})();
// E5CDD8, 01368C, 93F147, 3C4512, E1468E, 503325, EC6753, 6EC10A, 31BD61, 58D036, AA8701, 00965D, A85667, BB81BE, 903584, 140DBE, EE0497, BF609E, A7AAA1, 0BDC5A, 706C98, 217FBC, F449BC, 89DAD7, 0FC521
