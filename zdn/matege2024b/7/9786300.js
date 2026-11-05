(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let graphs = [[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([aSign, cSign]) => {
		let a = aSign * sl(1, 2) / 2;
		let b = sl(-2, 2);
		let c = cSign * sl(1, 3);
		let solution = '$a' + (a > 0 ? '>0' : '<0') + ',\\quad c' + (c > 0 ? '>0' : '<0') + '$';
		return {a, b, c, solution};
	}).shuffle();
	NAtask.setCorrespondenceTask({
		text: 'На рисунке изображены графики функций вида $y=ax^2+bx+c$. Установите соответствие между графиками и знаками коэффициентов $a$ и $c$.',
		leftHeader: 'ГРАФИКИ',
		left: graphs.map((graph, i) => ({expr: 'График ' + (i + 1), solution: graph.solution})),
		rightHeader: 'ЗНАКИ КОЭФФИЦИЕНТОВ',
		right: graphs.map(graph => graph.solution),
		postText: 'Запишите номера ответов в порядке, в котором перечислены графики в таблице.',
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: function (ctx) {
			graphs.forEach(({a, b, c}, i) => {
				ctx.save();
				ctx.translate(i % 2 * 200, Math.floor(i / 2) * 200);
				ctx.beginPath();
				ctx.rect(0, 0, 196, 196);
				ctx.clip();
				ctx.fillText('График ' + (i + 1), 5, 13);
				ctx.drawCoordinatePlane(196, 196, {hor: 1, ver: 1}, {x1: '1', y1: '1'}, 16);
				ctx.scale(16, -16);
				ctx.lineWidth = 0.12;
				graph9AdrawFunction(ctx, x => a * x * x + b * x + c, {
					minX: -6, maxX: 7, minY: -6, maxY: 6, step: 0.04,
				});
				ctx.restore();
			});
		},
	});
})();
// ФИПИ 7.3: 9553BC
// ФИПИ 7.4: D9D6A0
// ФИПИ 7.5: 53EE20
// ФИПИ 7.6: A177BC
// ФИПИ 7.7: AD5801
