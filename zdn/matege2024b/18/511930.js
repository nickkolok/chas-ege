(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let layouts = [
			{
				m: -(2 + sl(1, 9) / 100),
				n: 0.8 + sl(1, 9) / 100,
				cuts: [3, 2, -2, 0],
			},
			{
				m: 2 + sl(1, 9) / 100,
				n: -(0.8 + sl(1, 9) / 100),
				cuts: [3, -3, -2, -1],
			},
			{
				m: -(0.8 + sl(1, 9) / 100),
				n: 2 + sl(1, 9) / 100,
				cuts: [-4, 2, -2, 0],
			},
			{
				m: 0.8 + sl(1, 9) / 100,
				n: -(2 + sl(1, 9) / 100),
				cuts: [-4, -3, -2, -1],
			},
		];
		let layout = layouts.iz();
		let m = layout.m;
		let n = layout.n;

		let values = [m * m - n * n, n - m, m * n, 1 / m + n];
		values.forEach((value, i) => {
			genAssert(value > layout.cuts[i] && value < layout.cuts[i] + 1,
				'Значение выражения не попало в свой отрезок');
		});
		genAssert(!layout.cuts.hasDubl(), 'Отрезки не должны повторяться');

		let segment = function (leftEnd) {
			return '[' + leftEnd + '; ' + (leftEnd + 1) + ']';
		};

		let expressions = ['m^2-n^2', 'n-m', 'mn', '\\frac{1}{m}+n'];
		let left = expressions.map((expr, i) => ({
			expr: expr,
			solution: segment(layout.cuts[i]),
		}));
		let right = layout.cuts.map(segment);

		NAtask.setCorrespondenceTask({
			text: 'На прямой отмечены числа $m$ и $n$. ' +
				'Каждому из четырёх чисел в левом столбце соответствует отрезок, которому оно принадлежит. ' +
				'Установите соответствие между числами и отрезками из правого столбца.',
			leftHeader: 'ЧИСЛА',
			left: left,
			autoLaTeXLeft: true,
			rightHeader: 'ОТРЕЗКИ',
			right: right,
			autoLaTeXRight: true,
			postText: 'Впишите в приведённую в ответе таблицу под каждой буквой соответствующий отрезку номер.',
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 70,
			paint: function (ctx) {
				let unit = 40;
				let axisY = 30;
				let toX = (value) => 160 + unit * value;

				ctx.strokeStyle = 'black';
				ctx.fillStyle = 'black';
				ctx.lineWidth = 1;
				ctx.textAlign = 'center';

				ctx.drawArrow(toX(-3) - 25, axisY, toX(4) + 25, axisY);

				ctx.font = '16px liberation_sans';
				for (let tick = -3; tick <= 4; tick++) {
					ctx.drawLine(toX(tick), axisY - 5, toX(tick), axisY + 5);
					ctx.fillText(tick < 0 ? '−' + (-tick) : '' + tick, toX(tick), axisY + 22);
				}

				ctx.font = 'italic 20px serif';
				[[m, 'm'], [n, 'n']].forEach(([value, letter]) => {
					ctx.fillKrug(toX(value), axisY, 3);
					ctx.fillText(letter, toX(value), axisY - 10);
				});
			},
		});
	}, 20000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=511930
