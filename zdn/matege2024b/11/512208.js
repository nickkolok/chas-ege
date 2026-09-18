(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let r1, h1, r2, h2, V1, V2, ratio;
		let attempts = 0;
		do {
			r1 = sl(2, 9);
			h1 = sl(1, 9);
			r2 = sl(2, 9);
			h2 = sl(1, 9);
			V1 = r1 * r1 * h1;
			V2 = r2 * r2 * h2;
			ratio = V2 / V1;
			attempts++;
			genAssert(attempts < 5000, 'Не удалось подобрать параметры цилиндров');
		} while (V2 <= V1 || ratio % 1 !== 0 || ratio > 36);

		let paint1 = function (ct) {
			let scale = 13;
			let baseY = 250;
			let xs = [150, 410];
			let rs = [r1, r2];
			let hs = [h1, h2];
			let colors = [om.secondaryBrandColors.iz(), om.primaryBrandColors.iz()];
			ct.lineWidth = 2;
			for (let i = 0; i < 2; i++) {
				let x = xs[i];
				let rPix = rs[i] * scale;
				let hPix = hs[i] * scale;
				let ry = rPix * 0.3;
				let topY = baseY - hPix;
				ct.strokeStyle = colors[i];
				ct.drawLine(x - rPix, baseY, x - rPix, topY);
				ct.drawLine(x + rPix, baseY, x + rPix, topY);
				ct.drawEllipse(x, topY, rPix, ry);
				ct.drawEllipse(x, baseY, rPix, ry, 0, 0, Math.PI);
				ct.setLineDash([5, 4]);
				ct.drawEllipse(x, baseY, rPix, ry, 0, Math.PI, 2 * Math.PI);
				ct.setLineDash([]);
			}
		};

		NAtask.setTask({
			text: 'Даны два цилиндра. Радиус основания и высота первого цилиндра равны соответственно $' + r1 + '$ и $' + h1 + '$, а второго — $' + r2 + '$ и $' + h2 + '$. Во сколько раз объём второго цилиндра больше объёма первого цилиндра?',
			answers: ratio,
			analys: 'Объём цилиндра вычисляется по формуле $V=\\pi r^{2}h$. '
				+ 'Объём первого цилиндра равен $V_1=\\pi\\cdot ' + r1 + '^2\\cdot ' + h1 + '=' + V1 + '\\pi$. '
				+ 'Объём второго цилиндра равен $V_2=\\pi\\cdot ' + r2 + '^2\\cdot ' + h2 + '=' + V2 + '\\pi$. '
				+ 'Находим отношение объёмов: $\\frac{V_2}{V_1}=\\frac{' + V2 + '\\pi}{' + V1 + '\\pi}=' + ratio + '$.',
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 560,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=512208
