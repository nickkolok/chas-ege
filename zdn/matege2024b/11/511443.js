(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '511443';
		let preference = ['bigger', 'smaller'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let bigger = rand === 0;

		// Кратности - словами, как у ФИПИ (3A0E06, 5F3B21, 850DF9, FA5AD0, 0B53AE,
		// 5BAF16, 6A8E45, D324CE, CC863D): «в полтора раза», «в два раза», «вдвое»,
		// «в два с половиной раза», «втрое», «в четыре раза»
		let multiplier = [
			{ k: 1.5, words: ['в полтора раза'] },
			{ k: 2, words: ['в два раза', 'вдвое'] },
			{ k: 2.5, words: ['в два с половиной раза'] },
			{ k: 3, words: ['в три раза', 'втрое'] },
			{ k: 4, words: ['в четыре раза', 'вчетверо'] },
		].iz();
		let k = multiplier.k;
		let k2 = k * k;

		// Уровень воды у ФИПИ - от 10 до 90 см, кратен 10
		let h = 10 * sl(1, 9);
		// Объём воды не меняется: pi * r^2 * h = pi * (k r)^2 * x, поэтому
		// в широком сосуде уровень в k^2 раз ниже, в узком - в k^2 раз выше
		let answer = bigger ? h / k2 : h * k2;
		genAssertAlmostInteger(answer, 'Новый уровень воды должен быть целым');
		answer = Math.round(answer);
		// Сосуды правдоподобного размера: у ФИПИ новый уровень не выше 90 см
		genAssert(answer <= 100, 'Новый уровень воды не должен превышать 100 см');

		let kTex = String(k).replace('.', '{,}');
		let analys = 'Объём воды при переливании не меняется. Объём цилиндра равен $\\pi r^2 h$. ' +
			'Радиус основания второго сосуда в $' + kTex + '$ раза ' + (bigger ? 'больше' : 'меньше') +
			', поэтому площадь его основания в $' + kTex + '^2 = ' + String(k2).replace('.', '{,}') + '$ раза ' + (bigger ? 'больше' : 'меньше') +
			', а уровень воды во столько же раз ' + (bigger ? 'ниже' : 'выше') + ': $' + h + (bigger ? ' : ' : ' \\cdot ') +
			String(k2).replace('.', '{,}') + ' = ' + answer + '$ см.';

		let paintCylinder = function (ct) {
			let w = 400;
			let hCanvas = 300;
			let e = 0.25; // сплюснутость эллипсов оснований
			let gap = 50;
			let arrowSpace = 40; // место справа от первого сосуда под стрелку h

			// Оба сосуда одной высоты - с запасом над уровнем воды в каждом
			let vesselH = 1.25 * Math.max(h, answer);
			// Радиус большего из сосудов - около трети его высоты
			let rBig = 0.35 * vesselH;
			let r1 = bigger ? rBig / k : rBig;
			let r2 = bigger ? rBig : rBig / k;

			let scale = Math.min(
				(w - 40 - gap - arrowSpace) / (2 * r1 + 2 * r2),
				(hCanvas - 40) / (vesselH + 2 * e * rBig)
			);
			let R1 = r1 * scale, R2 = r2 * scale, HV = vesselH * scale;
			let totalW = 2 * R1 + arrowSpace + gap + 2 * R2;
			let cx1 = (w - totalW) / 2 + R1;
			let cx2 = cx1 + R1 + arrowSpace + gap + R2;
			let bottomY = (hCanvas + HV) / 2;
			let topY = bottomY - HV;
			let waterY = bottomY - h * scale;

			let edgeColor = om.secondaryBrandColors.iz();
			let liquidColor = om.transparentBrandColors.iz();
			ct.lineWidth = 2;
			ct.strokeStyle = edgeColor;

			let drawVessel = function (cx, R) {
				let ry = e * R;
				ct.drawEllipse(cx, topY, R, ry);
				ct.drawLine(cx - R, topY, cx - R, bottomY);
				ct.drawLine(cx + R, topY, cx + R, bottomY);
				// Дно: передняя дуга сплошная, задняя пунктирная
				ct.drawEllipse(cx, bottomY, R, ry, 0, 0, Math.PI);
				ct.setLineDash([6, 4]);
				ct.drawEllipse(cx, bottomY, R, ry, 0, Math.PI, 2 * Math.PI);
				ct.setLineDash([]);
			};

			// Вода в первом сосуде заливается одним контуром, чтобы полупрозрачный
			// цвет нигде не накладывался сам на себя (приём из 514063)
			let ry1 = e * R1;
			ct.beginPath();
			ct.moveTo(cx1 - R1, waterY);
			ct.lineTo(cx1 - R1, bottomY);
			ct.ellipse(cx1, bottomY, R1, ry1, 0, Math.PI, 0, true);
			ct.lineTo(cx1 + R1, waterY);
			ct.ellipse(cx1, waterY, R1, ry1, 0, 0, Math.PI, true);
			ct.closePath();
			ct.fillStyle = liquidColor;
			ct.fill();

			drawVessel(cx1, R1);
			drawVessel(cx2, R2);

			// Поверхность воды: передняя дуга сплошная, задняя пунктирная
			ct.drawEllipse(cx1, waterY, R1, ry1, 0, 0, Math.PI);
			ct.setLineDash([6, 4]);
			ct.drawEllipse(cx1, waterY, R1, ry1, 0, Math.PI, 2 * Math.PI);
			ct.setLineDash([]);

			// Двунаправленная стрелка h: от поверхности воды до дна
			let arrowX = cx1 + R1 + 18;
			ct.drawArrow(arrowX, bottomY, arrowX, waterY);
			ct.drawArrow(arrowX, waterY, arrowX, bottomY);
			ct.fillStyle = edgeColor;
			ct.font = 'italic 20px serif';
			ct.fillText('h', arrowX + 6, (waterY + bottomY) / 2 + 7);
		};

		NAtask.setTask({
			text: 'Вода в сосуде цилиндрической формы находится на уровне $h = ' + h + '$ см. ' +
				'На каком уровне окажется вода, если её перелить в другой цилиндрический сосуд, ' +
				'у которого радиус основания ' + multiplier.words.iz() + ' ' + (bigger ? 'больше' : 'меньше') +
				', чем у данного? Ответ дайте в сантиметрах.',
			answers: answer,
			analys: analys,
			authors: ['chas-ege-selena', 'Zer00Player'],
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paintCylinder,
		});
	}, 1000);
})();
//511443
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/problem?id=511443
