(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let edge = 3 * sl(2, 8);
	let half = edge / 2;
	let volume = edge * edge * edge / 24;

	NAtask.setTask({
		text: 'Длина ребра куба $ABCDA_1B_1C_1D_1$ равна $' + edge +
			'$. Точки $K$ и $P$ — середины рёбер $AB$ и $BC$ соответственно. Найдите объём пирамиды $B_1BKP$.',
		answers: volume,
		analys: 'Основание пирамиды — прямоугольный треугольник $BKP$ с катетами ' +
			'$BK=BP=' + half.ts() + '$. Высота пирамиды $BB_1$ равна ребру куба. ' +
			'Поэтому $V=\\frac13\\cdot\\frac12\\cdot' + half.ts() + '^2\\cdot' + edge + '=' + volume.ts() + '$.',
	});

	NAtask.modifiers.addCanvasIllustration({
		width: 330,
		height: 320,
		paint: function (ctx) {
			let size = 142;
			let angle = Math.PI / 3;
			let dx = size * Math.cos(angle);
			let dy = size / 2;
			let a = [0, 0], b = [dx, dy], c = [size + dx, dy], d = [size, 0];
			let top = ([x, y]) => [x, y + size];
			let k = [dx / 2, dy / 2];
			let p = [dx + size / 2, dy];
			let b1 = top(b);
			ctx.translate(53, 264);
			ctx.scale(1, -1);
			ctx.lineWidth = 1.5;
			ctx.drawParallelepiped({width: size, height: size, depth: size, angle, strokeStyle: '#333'}, [6, 8, 10]);

			ctx.strokeStyle = '#24578b';
			ctx.lineWidth = 2.2;
			ctx.drawLine(...b1, ...k);
			ctx.drawLine(...b1, ...p);
			ctx.setLineDash([5, 3]);
			ctx.drawLine(...b, ...b1);
			ctx.drawLine(...b, ...k);
			ctx.drawLine(...b, ...p);
			ctx.drawLine(...k, ...p);
			ctx.setLineDash([]);

			ctx.scale(1, -1);
			ctx.fillStyle = '#222';
			ctx.font = '16px liberation_sans';
			ctx.textAlign = 'center';
			[[a, 'A', -9, 19], [b, 'B', -12, -5], [c, 'C', 13, 9], [d, 'D', 6, 19],
				[top(a), 'A₁', -13, -5], [b1, 'B₁', 0, -9], [top(c), 'C₁', 9, -9], [top(d), 'D₁', 8, -9],
				[k, 'K', -11, 14], [p, 'P', 4, 17],
			].forEach(([[x, y], name, offsetX, offsetY]) => ctx.fillText(name, x + offsetX, -y + offsetY));
		},
	});
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// 07368E, DD2F43
