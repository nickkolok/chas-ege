(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '512208';
		let preference1 = ['secondBigger', 'firstBigger'];
		let rand = getSelectedPreferenceFromList(key, preference1);

		let rA, hA, rB, hB, VA, VB;
		let attempts = 0;
		do {
			rA = sl(2, 9);
			hA = sl(1, 9);
			rB = sl(2, 9);
			hB = sl(1, 9);
			VA = rA * rA * hA;
			VB = rB * rB * hB;
			attempts++;
			genAssert(attempts < 5000, 'Не удалось подобрать параметры цилиндров');
		} while (VA === VB || (VB % VA !== 0 && VA % VB !== 0) || Math.max(VA, VB) / Math.min(VA, VB) > 36);

		let bigV = Math.max(VA, VB);
		let smallV = Math.min(VA, VB);
		let ratio = bigV / smallV;

		let bigR, bigH, smallR, smallH;
		if (VA === bigV) {
			bigR = rA; bigH = hA; smallR = rB; smallH = hB;
		} else {
			bigR = rB; bigH = hB; smallR = rA; smallH = hA;
		}

		let r1, h1, r2, h2, V1, V2, questionText, ratioFormula;
		if (rand === 0) {
			r1 = smallR; h1 = smallH; V1 = smallV;
			r2 = bigR; h2 = bigH; V2 = bigV;
			questionText = 'Во сколько раз объём второго цилиндра больше объёма первого цилиндра?';
			ratioFormula = '\\frac{V_2}{V_1}=\\frac{' + V2 + '\\pi}{' + V1 + '\\pi}=' + ratio;
		} else {
			r1 = bigR; h1 = bigH; V1 = bigV;
			r2 = smallR; h2 = smallH; V2 = smallV;
			questionText = 'Во сколько раз объём первого цилиндра больше объёма второго цилиндра?';
			ratioFormula = '\\frac{V_1}{V_2}=\\frac{' + V1 + '\\pi}{' + V2 + '\\pi}=' + ratio;
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
			analys: 'Объём цилиндра вычисляется по формуле $V=\\pi r^{2}h$. '
				+ 'Объём первого цилиндра равен $V_1=\\pi\\cdot ' + r1 + '^2\\cdot ' + h1 + '=' + V1 + '\\pi$. '
				+ 'Объём второго цилиндра равен $V_2=\\pi\\cdot ' + r2 + '^2\\cdot ' + h2 + '=' + V2 + '\\pi$. '
				+ 'Находим отношение объёмов: $' + ratioFormula + '$.',
			preference: [preference1],
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
