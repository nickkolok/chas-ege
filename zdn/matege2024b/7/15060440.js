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
// ФИПИ 7.8: E5CDD8
// ФИПИ 7.9: 01368C
// ФИПИ 7.10: 93F147
// ФИПИ 7.11: 3C4512
// ФИПИ 7.12: E1468E
// ФИПИ 7.13: 503325
// ФИПИ 7.14: EC6753
// ФИПИ 7.15: 6EC10A
// ФИПИ 7.16: 31BD61
// ФИПИ 7.17: 58D036
// ФИПИ 7.18: AA8701
// ФИПИ 7.19: 00965D
// ФИПИ 7.20: A85667
// ФИПИ 7.21: BB81BE
// ФИПИ 7.22: 903584
// ФИПИ 7.54: 140DBE
// ФИПИ 7.55: EE0497, BF609E
// ФИПИ 7.56: A7AAA1
// ФИПИ 7.57: 0BDC5A
// ФИПИ 7.58: 706C98
// ФИПИ 7.59: 217FBC
// ФИПИ 7.60: F449BC
// ФИПИ 7.61: 89DAD7
// ФИПИ 7.62: 0FC521
