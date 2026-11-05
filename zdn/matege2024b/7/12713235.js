(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '12713235';
	let preference = ['graphSign', 'graphExtremum', 'formulaSign', 'formulaExtremum', 'wholeLine'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let showGraph = variant < 2;
	let compareSigns = variant === 0 || variant === 2;
	let leftEnd = showGraph ? -1 : sl(0, 4);
	let rightEnd = showGraph ? 1 : leftEnd + sl(3, 6);
	let wholeLine = variant === 4;
	let root = sl(leftEnd + 0.5, rightEnd - 0.5, 0.5);
	let solutions = ['функция возрастает', 'функция убывает'].concat(compareSigns
		? ['функция всюду принимает положительные значения', 'функция всюду принимает отрицательные значения']
		: ['функция имеет точку минимума', 'функция имеет точку максимума']);
	let graphs = [1, -1].map(sign => {
		let b = sign * sl(1, 3);
		return {a: 0, b, c: -b * root};
	});
	for (let sign of [1, -1]) {
		let vertex = wholeLine ? sl(-5, 5) : sl(leftEnd + 0.5, rightEnd - 0.5, 0.5);
		let a = sign * (showGraph ? 1 : sl(1, 3));
		let height = sl(1, 3) * (compareSigns ? sign : [-1, 1].iz());
		graphs.push({a, b: -2 * a * vertex, c: a * vertex * vertex + height});
	}
	graphs.forEach((graph, i) => { graph.solution = solutions[i]; });
	graphs.shuffle();
	let interval = wholeLine ? ' на всей числовой прямой' : ` на отрезке $[${leftEnd};${rightEnd}]$`;
	NAtask.setCorrespondenceTask({
		text: 'Установите соответствие между ' + (showGraph ? 'графиками функций' : 'функциями') +
			' и характеристиками этих функций' + interval + '.',
		leftHeader: showGraph ? 'ГРАФИКИ' : 'ФУНКЦИИ',
		left: graphs.map(({a, b, c, solution}, i) => ({
			expr: showGraph ? 'График ' + (i + 1) : '$y=' + [c, b, a].mn_txt('x') + '$',
			solution,
		})),
		rightHeader: 'ХАРАКТЕРИСТИКИ',
		right: solutions,
		postText: 'Запишите номера характеристик в порядке, в котором перечислены функции.',
		preference,
	});
	if (showGraph) {
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
					ctx.setLineDash([4, 3]);
					ctx.drawLine(-16, -80, -16, 80);
					ctx.drawLine(16, -80, 16, 80);
					ctx.setLineDash([]);
					ctx.scale(16, -16);
					ctx.lineWidth = 0.12;
					graph9AdrawFunction(ctx, x => a * x * x + b * x + c, {
						minX: -5, maxX: 6, minY: -6, maxY: 6, step: 0.04,
					});
					ctx.restore();
				});
			},
		});
	}
})();
// C1FD13, 22BB86, 668C5D, C0B0CF, C77447, 17F78A, D5A41D, E918D9, 778561, 6C63BC, 7792B5, E351D0, 1472E1, 186ED4, B0AF3D, 121BCE, 0A236B, 5F9CCB, 855789, 4A4FB8, BFCF7F, 153964, 55EB95, A8D3B7, 2F3CA6, E64B8E, AFA0BD, B3F9ED, 493C49, 7B2B96, BA6CC5, FADB90, 7DE5E0
