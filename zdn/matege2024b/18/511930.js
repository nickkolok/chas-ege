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

		// Формируем точки для координатной оси:
		// 1) Засечки с подписями для целых чисел
		let tickPoints = [];
		for (let tick = -4; tick <= 4; tick++) {
			tickPoints.push({
				value: tick,
				label: tick.toString(),
				mark: 'line',
				labelPos: 'underAxis',
			});
		}
		// 2) Точки m и n с подписями
		let mPoint = {
			value: m,
			label: 'm',
			mark: 'dot',
			labelPos: 'overAxis',
		};
		let nPoint = {
			value: n,
			label: 'n',
			mark: 'dot',
			labelPos: 'overAxis',
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 100,
			paint: function (ct) {
				coordAxis_drawAuto(ct, {
					points: tickPoints.concat([mPoint, nPoint]),
					width: 400,
					height: 100,
					margin: 20,
				});
			},
		});
	}, 20000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=511930
