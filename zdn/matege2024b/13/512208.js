(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '512208';
		// Четыре родственных типа вопроса: отношение объёмов (в любую сторону)
		// и отношение площадей боковых поверхностей (в любую сторону).
		// Тип выбирается через preference, а не случайно из подошедших:
		// иначе тренажёр и ревьюер не могут заказать конкретный вариант,
		// а набор вариантов в выдаче зависит от удачи генератора.
		let preference = [
			'volumeSecondBigger',
			'volumeFirstBigger',
			'lateralAreaSecondBigger',
			'lateralAreaFirstBigger',
		];
		// getSelectedPreferenceFromList возвращает ИНДЕКС, а не название
		let chosenOption = preference[getSelectedPreferenceFromList(key, preference)];
		let isVolume = chosenOption.startsWith('volume');
		let secondBigger = chosenOption.endsWith('SecondBigger');

		// Диапазоны - по данным ФИПИ: в задачах на объём (C59471, 360E23, FF0AD7,
		// F565D3) радиусы от 2 до 9, высоты от 1 до 9; в задачах на боковую
		// поверхность (F6B2EA) радиусы до 15 и высоты до 18.
		let rMax = isVolume ? 9 : 15;
		let hMax = isVolume ? 9 : 18;
		let r1 = sl(2, rMax);
		let h1 = sl(1, hMax);
		let r2 = sl(2, rMax);
		let h2 = sl(1, hMax);
		// Цилиндр не должен вырождаться ни в «блин», ни в «иглу» (md/task_geometry.md):
		// отношение высоты к радиусу - от 0,2 до 4,5, как у самых крайних цилиндров ФИПИ
		// (9 и 2; 2 и 9; 4 и 18).
		[[r1, h1], [r2, h2]].forEach(function (rh) {
			genAssert(rh[1] >= 0.2 * rh[0] && rh[1] <= 4.5 * rh[0], 'Цилиндр не должен быть блином или иглой');
		});

		// Объём и боковая поверхность без множителя pi - целые числа:
		// V = pi * r^2 * h, S = 2 * pi * r * h. Считаем их напрямую в целых,
		// а не делением дробных геттеров класса Cylinder на Math.PI.
		let cylinder1 = new Cylinder({ radius: r1, height: h1 });
		let cylinder2 = new Cylinder({ radius: r2, height: h2 });
		let V1 = r1 * r1 * h1;
		let V2 = r2 * r2 * h2;
		let S1 = 2 * r1 * h1;
		let S2 = 2 * r2 * h2;
		genAssert(Math.abs(cylinder1.volume - V1 * Math.PI) < 1e-6 && Math.abs(cylinder2.sideSurfaceArea - S2 * Math.PI) < 1e-6,
			'Коэффициенты должны совпасть с вычисленными через класс Cylinder');

		let m1 = isVolume ? V1 : S1;
		let m2 = isVolume ? V2 : S2;
		let mBig = secondBigger ? m2 : m1;
		let mSmall = secondBigger ? m1 : m2;
		let ratio = mBig / mSmall;
		// У ФИПИ отношение бывает дробным (10,5; 4,5; 7,5), но не более одного знака
		// после запятой; наибольшее - 32
		genAssert((10 * ratio).isAlmostInteger(), 'Отношение должно иметь не более одного знака после запятой');
		genAssert(ratio >= 2 && ratio <= 36, 'Отношение должно быть от 2 до 36');

		let subjectNom = isVolume ? 'объём' : 'площадь боковой поверхности';
		let subjectGen = isVolume ? 'объёма' : 'площади боковой поверхности';
		let bigWord = secondBigger ? 'второго' : 'первого';
		let smallWord = secondBigger ? 'первого' : 'второго';
		// Обе формулировки ФИПИ: «...первого цилиндра?» (C59471) и «...первого?» (360E23)
		let questionText = 'Во сколько раз ' + subjectNom + ' ' + bigWord + ' цилиндра больше ' +
			subjectGen + ' ' + smallWord + [' цилиндра', ''].iz() + '?';

		let letter = isVolume ? 'V' : 'S';
		let iBig = secondBigger ? 2 : 1;
		let iSmall = 3 - iBig;
		let rBig = secondBigger ? r2 : r1, hBig = secondBigger ? h2 : h1;
		let rSmall = secondBigger ? r1 : r2, hSmall = secondBigger ? h1 : h2;
		let ratioFormula = isVolume ?
			'\\frac{V_' + iBig + '}{V_' + iSmall + '}=\\frac{\\pi\\cdot ' + rBig + '^2\\cdot ' + hBig + '}{\\pi\\cdot ' + rSmall + '^2\\cdot ' +
				hSmall + '}=\\frac{' + mBig + '}{' + mSmall + '}=' + ratio :
			'\\frac{S_' + iBig + '}{S_' + iSmall + '}=\\frac{2\\pi\\cdot ' + rBig + '\\cdot ' + hBig + '}{2\\pi\\cdot ' + rSmall + '\\cdot ' +
				hSmall + '}=\\frac{' + mBig / 2 + '}{' + mSmall / 2 + '}=' + ratio;
		let analys = isVolume ?
			'Объём цилиндра вычисляется по формуле $V=\\pi r^{2}h$. ' +
				'Объём первого цилиндра равен $V_1=\\pi\\cdot ' + r1 + '^2\\cdot ' + h1 + '=' + V1 + '\\pi$, ' +
				'объём второго цилиндра равен $V_2=\\pi\\cdot ' + r2 + '^2\\cdot ' + h2 + '=' + V2 + '\\pi$. ' :
			'Площадь боковой поверхности цилиндра вычисляется по формуле $S=2\\pi r h$. ' +
				'Площадь боковой поверхности первого цилиндра равна $S_1=2\\pi\\cdot ' + r1 + '\\cdot ' + h1 + '=' + S1 + '\\pi$, ' +
				'второго — $S_2=2\\pi\\cdot ' + r2 + '\\cdot ' + h2 + '=' + S2 + '\\pi$. ';
		analys += 'Находим отношение: $' + ratioFormula + '$.';

		let paint1 = function (ct) {
			let w = 560;
			let h = 300;
			let k = 0.3; // сплюснутость эллипсов оснований
			let gap = 40; // промежуток между цилиндрами, px
			let rs = [r1, r2];
			let hs = [h1, h2];
			// Общий масштаб для обоих цилиндров: пропорции сохраняются и внутри
			// каждого цилиндра, и между ними, а пара занимает весь холст
			let scale = Math.min(
				(w - 40 - gap) / (2 * r1 + 2 * r2),
				(h - 40) / (Math.max(h1 + 2 * k * r1, h2 + 2 * k * r2))
			);
			let totalW = (2 * r1 + 2 * r2) * scale + gap;
			let xs = [
				(w - totalW) / 2 + r1 * scale,
				(w - totalW) / 2 + 2 * r1 * scale + gap + r2 * scale,
			];
			let maxH = Math.max(h1 + 2 * k * r1, h2 + 2 * k * r2) * scale;
			let baseY = (h + maxH) / 2 - k * Math.max(r1, r2) * scale;
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			for (let i = 0; i < 2; i++) {
				let x = xs[i];
				let rPix = rs[i] * scale;
				let hPix = hs[i] * scale;
				let ry = rPix * k;
				let topY = baseY - hPix;
				ct.drawLine(x - rPix, baseY, x - rPix, topY);
				ct.drawLine(x + rPix, baseY, x + rPix, topY);
				ct.drawEllipse(x, topY, rPix, ry);
				ct.drawEllipse(x, baseY, rPix, ry, 0, 0, Math.PI);
				ct.setLineDash([7, 5]);
				ct.drawEllipse(x, baseY, rPix, ry, 0, Math.PI, 2 * Math.PI);
				ct.setLineDash([]);
			}
		};

		NAtask.setTask({
			text: 'Даны два цилиндра. Радиус основания и высота первого цилиндра равны соответственно $' + r1 + '$ и $' + h1 + '$, а второго — $' + r2 + '$ и $' + h2 + '$. ' + questionText,
			answers: ratio,
			authors: ['chas-ege-selena', 'Zer00Player'],
			analys: analys,
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 560,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 10000);
})();
//512208
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/test?likes=512208
