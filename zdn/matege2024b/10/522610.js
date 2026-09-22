(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let borderSide = sl(25, 40, 5); // длина общей границы участков, м
		let widthSide = sl(15, 30, 5); // ширина участка (перпендикулярно границе), м
		let pondArea = 2 * sl(30, 80, 5); // площадь пруда, кв. м (чётная)

		let plotArea = borderSide * widthSide;
		let pondHalfArea = pondArea / 2;
		let result = plotArea - pondHalfArea;

		let pondRadius = Math.sqrt(pondArea / Math.PI);
		genAssert(pondRadius < borderSide / 2, 'пруд не помещается вдоль общей границы');
		genAssert(pondRadius < widthSide, 'пруд не помещается поперёк участка');

		let canvasWidth = 400;
		let canvasHeight = 300;

		let paint = function (ctx) {
			ctx.translate(canvasWidth / 2, canvasHeight / 2);
			ctx.scale(1, -1);

			let scale = Math.min((canvasWidth - 80) / (2 * widthSide), (canvasHeight - 80) / borderSide);
			let halfW = widthSide * scale;
			let halfH = borderSide / 2 * scale;
			let r = pondRadius * scale;

			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors[0];
			ctx.strokeRect(-halfW, -halfH, 2 * halfW, 2 * halfH);
			ctx.drawLine(0, -halfH, 0, -r);
			ctx.drawLine(0, r, 0, halfH);

			ctx.fillStyle = om.transparentBrandColors[0];
			ctx.fillKrug(0, 0, r);

			ctx.setLineDash([6, 4]);
			ctx.drawLine(0, -r, 0, r);
			ctx.setLineDash([]);

			ctx.drawCircle(0, 0, r);
		};

		NAtask.setTask({
			text: 'Два садовода, имеющие прямоугольные участки размерами $' + widthSide + '$ м и $' + borderSide +
				'$ м с общей границей, договорились и сделали общий круглый пруд площадью $' + pondArea +
				'$ квадратных метров (см. рисунок), причём граница участков проходит точно через центр пруда. ' +
				'Какова площадь (в квадратных метрах) оставшейся части участка каждого садовода?',
			analys: 'Граница участков проходит через центр пруда, поэтому делит пруд на две равные части. ' +
				'На каждый участок приходится половина пруда площадью $' + pondHalfArea + '$ квадратных метров. ' +
				'Площадь каждого участка равна $' + widthSide + '\\cdot' + borderSide + '=' + plotArea + '$ квадратных метров. ' +
				'Значит, площадь оставшейся части участка каждого садовода равна $' + plotArea + '-' + pondHalfArea +
				'=' + result + '$ квадратных метров.',
			answers: result,
			authors: ['chas-ege-selena'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: canvasWidth,
			height: canvasHeight,
			paint: paint,
		});
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=522610
