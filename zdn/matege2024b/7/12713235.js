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
// ФИПИ 7.23: C1FD13
// ФИПИ 7.24: 22BB86
// ФИПИ 7.25: 668C5D
// ФИПИ 7.26: C0B0CF
// ФИПИ 7.27: C77447
// ФИПИ 7.28: 17F78A
// ФИПИ 7.29: D5A41D
// ФИПИ 7.30: E918D9
// ФИПИ 7.31: 778561
// ФИПИ 7.32: 6C63BC
// ФИПИ 7.33: 7792B5
// ФИПИ 7.34: E351D0
// ФИПИ 7.35: 1472E1
// ФИПИ 7.36: 186ED4
// ФИПИ 7.37: B0AF3D
// ФИПИ 7.38: 121BCE
// ФИПИ 7.39: 0A236B
// ФИПИ 7.40: 5F9CCB
// ФИПИ 7.41: 855789
// ФИПИ 7.42: 4A4FB8
// ФИПИ 7.43: BFCF7F
// ФИПИ 7.44: 153964
// ФИПИ 7.45: 55EB95
// ФИПИ 7.46: A8D3B7
// ФИПИ 7.47: 2F3CA6
// ФИПИ 7.48: E64B8E
// ФИПИ 7.49: AFA0BD
// ФИПИ 7.50: B3F9ED
// ФИПИ 7.51: 493C49, 7B2B96
// ФИПИ 7.52: BA6CC5, FADB90
// ФИПИ 7.53: 7DE5E0
