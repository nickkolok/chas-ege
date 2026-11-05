(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Масса однородного тела пропорциональна объёму, а объём шара - кубу
		// диаметра: m2 = m1 * (d2 / d1)^3. У ФИПИ (7CF072, 461A02, 09A429 и дубли)
		// диаметры от 2 до 7 см, масса первого шара - c * d1^3 при c от 2 до 7
		// (81 = 3 * 3^3, 448 = 7 * 4^3, 875 = 7 * 5^3), так что обе массы целые;
		// массы - до 875 граммов. Тройку (d1, d2, c) выбираем из подходящих,
		// а не перебором: так все сочетания выпадают одинаково часто.
		let variants = [];
		for (let d1 = 2; d1 <= 7; d1++) {
			for (let d2 = 2; d2 <= 7; d2++) {
				for (let c = 2; c <= 7; c++) {
					if (d1 !== d2 && c * d1 * d1 * d1 <= 1000 && c * d2 * d2 * d2 <= 1000) {
						variants.push([d1, d2, c]);
					}
				}
			}
		}
		let variant = variants.iz();
		let d1 = variant[0];
		let d2 = variant[1];
		let c = variant[2];
		let m1 = c * d1 * d1 * d1;
		let m2 = c * d2 * d2 * d2;

		let gramWord = function (n) {
			if (n % 10 === 1 && n % 100 !== 11) {
				return 'грамм';
			}
			if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
				return 'грамма';
			}
			return 'граммов';
		};

		let analys = 'Шары сделаны из одного материала, поэтому их массы относятся так же, как объёмы. ' +
			'Объём шара диаметром $d$ равен $\\frac{\\pi d^3}{6}$, то есть пропорционален кубу диаметра. Значит, ' +
			'$m_2 = m_1 \\cdot \\left(\\frac{d_2}{d_1}\\right)^3 = ' + m1 + ' \\cdot \\left(\\frac{' + d2 + '}{' + d1 + '}\\right)^3 = ' +
			m1 + ' \\cdot \\frac{' + d2 * d2 * d2 + '}{' + d1 * d1 * d1 + '} = ' + m2 + '$ г.';

		NAtask.setTask({
			text: 'Однородный шар диаметром $' + d1 + '$ см весит $' + m1 + '$ ' + gramWord(m1) + '. ' +
				'Сколько граммов весит шар диаметром $' + d2 + '$ см, изготовленный из того же материала?',
			answers: m2,
			analys: analys,
			authors: ['chas-ege-ellariya'],
		});

		// Чертёж, как у ФИПИ: два шара, у каждого - экватор (передняя дуга
		// сплошная, задняя пунктирная) и пунктирный диаметр через центр.
		// Радиусы пропорциональны диаметрам из условия.
		let paint = function (ct) {
			let w = ct.canvas.width;
			let h = ct.canvas.height;
			let gap = 30;
			let margin = 12;
			let scale = Math.min((w - 2 * margin - gap) / (d1 + d2), (h - 2 * margin) / Math.max(d1, d2));
			let r1 = scale * d1 / 2;
			let r2 = scale * d2 / 2;
			let left = (w - 2 * r1 - gap - 2 * r2) / 2;
			let cy = h / 2;

			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.fillStyle = ct.strokeStyle;

			let drawBall = function (cx, r) {
				let ry = 0.3 * r;
				ct.drawEllipse(cx, cy, r, r);
				ct.drawEllipse(cx, cy, r, ry, 0, 0, Math.PI);
				ct.setLineDash([6, 4]);
				ct.drawEllipse(cx, cy, r, ry, 0, Math.PI, 2 * Math.PI);
				// Диаметр в плоскости экватора, через центр шара
				let angle = 0.65 * Math.PI;
				let dx = r * Math.cos(angle);
				let dy = ry * Math.sin(angle);
				ct.drawLine(cx + dx, cy + dy, cx - dx, cy - dy);
				ct.setLineDash([]);
				ct.fillKrug(cx, cy, 2.5);
			};

			drawBall(left + r1, r1);
			drawBall(left + 2 * r1 + gap + r2, r2);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 220,
			paint: paint,
		});
	}, 1000);
})();
//8188018
//Открытый банк заданий 7CF072, 461A02, 09A429 и дубли
//chas-ege-ellariya
