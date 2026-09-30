(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let r1, h1, r2, h2;
		let V1, V2, S1, S2;
		let validOptions = [];
		let attempts = 0;

		do {
			r1 = sl(2, 9);
			h1 = sl(1, 9);
			r2 = sl(2, 9);
			h2 = sl(1, 9);
			
			V1 = r1 * r1 * h1;
			V2 = r2 * r2 * h2;
			S1 = r1 * h1;
			S2 = r2 * h2;
			
			validOptions = [];
			
			if (V2 % V1 === 0 && V2 / V1 <= 36) {
				validOptions.push('volumeSecondBigger');
			}
			if (V1 % V2 === 0 && V1 / V2 <= 36) {
				validOptions.push('volumeFirstBigger');
			}
			if (S2 % S1 === 0 && S2 / S1 <= 36) {
				validOptions.push('lateralAreaSecondBigger');
			}
			if (S1 % S2 === 0 && S1 / S2 <= 36) {
				validOptions.push('lateralAreaFirstBigger');
			}
			
			attempts++;
			genAssert(attempts < 5000, 'Не удалось подобрать параметры цилиндров');
		} while (validOptions.length === 0);

		let chosenOption = validOptions.iz();
		let questionText, ratio, ratioFormula;

		switch (chosenOption) {
			case 'volumeSecondBigger':
				questionText = 'Во сколько раз объём второго цилиндра больше объёма первого цилиндра?';
				ratio = V2 / V1;
				ratioFormula = '\\frac{V_2}{V_1}=\\frac{\\pi\\cdot ' + r2 + '^2\\cdot ' + h2 + '}{\\pi\\cdot ' + r1 + '^2\\cdot ' + h1 + '}=\\frac{' + V2 + '\\pi}{' + V1 + '\\pi}=' + ratio;
				break;
			case 'volumeFirstBigger':
				questionText = 'Во сколько раз объём первого цилиндра больше объёма второго цилиндра?';
				ratio = V1 / V2;
				ratioFormula = '\\frac{V_1}{V_2}=\\frac{\\pi\\cdot ' + r1 + '^2\\cdot ' + h1 + '}{\\pi\\cdot ' + r2 + '^2\\cdot ' + h2 + '}=\\frac{' + V1 + '\\pi}{' + V2 + '\\pi}=' + ratio;
				break;
			case 'lateralAreaSecondBigger':
				questionText = 'Во сколько раз площадь боковой поверхности второго цилиндра больше площади боковой поверхности первого цилиндра?';
				ratio = S2 / S1;
				ratioFormula = '\\frac{S_2}{S_1}=\\frac{2\\pi\\cdot ' + r2 + '\\cdot ' + h2 + '}{2\\pi\\cdot ' + r1 + '\\cdot ' + h1 + '}=\\frac{' + S2 + '}{' + S1 + '}=' + ratio;
				break;
			case 'lateralAreaFirstBigger':
				questionText = 'Во сколько раз площадь боковой поверхности первого цилиндра больше площади боковой поверхности второго цилиндра?';
				ratio = S1 / S2;
				ratioFormula = '\\frac{S_1}{S_2}=\\frac{2\\pi\\cdot ' + r1 + '\\cdot ' + h1 + '}{2\\pi\\cdot ' + r2 + '\\cdot ' + h2 + '}=\\frac{' + S1 + '}{' + S2 + '}=' + ratio;
				break;
		}

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
			text: 'Даны два цилиндра. Радиус основания и высота первого цилиндра равны соответственно $' + r1 + '$ и $' + h1 + '$, а второго — $' + r2 + '$ и $' + h2 + '$. ' + questionText,
			answers: ratio,
			analys: 'Объём цилиндра вычисляется по формуле $V=\\pi r^{2}h$. Площадь боковой поверхности цилиндра вычисляется по формуле $S=2\\pi r h$. '
				+ 'Объём первого цилиндра равен $V_1=\\pi\\cdot ' + r1 + '^2\\cdot ' + h1 + '=' + V1 + '\\pi$. '
				+ 'Объём второго цилиндра равен $V_2=\\pi\\cdot ' + r2 + '^2\\cdot ' + h2 + '=' + V2 + '\\pi$. '
				+ 'Площадь боковой поверхности первого цилиндра равна $S_1=2\\pi\\cdot ' + r1 + '\\cdot ' + h1 + '=' + (2*S1) + '\\pi$. '
				+ 'Площадь боковой поверхности второго цилиндра равна $S_2=2\\pi\\cdot ' + r2 + '\\cdot ' + h2 + '=' + (2*S2) + '\\pi$. '
				+ 'Находим отношение: $' + ratioFormula + '$.',
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
