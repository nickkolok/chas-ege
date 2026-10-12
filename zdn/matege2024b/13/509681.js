(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '509681';
		let preference = ['volume', 'surface'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Отношение радиусов k = R / r: у ФИПИ (148474, BE0C42, 68DF40) от 2 до 9,
		// например, «радиусами 9 и 1». Больший радиус - не более 12, как у ФИПИ.
		let k = sl(2, 9);
		let r2 = sl(1, Math.floor(12 / k));
		let r1 = k * r2;

		// Стереометрическая модель: используем класс Sphere из lib/figure.js
		let sphereBig   = new Sphere(r1);
		let sphereSmall = new Sphere(r2);

		let nominative = rand === 0 ? 'объём' : 'площадь поверхности';
		let genitive   = rand === 0 ? 'объёма' : 'площади поверхности';

		// Отношение - степень k: считаем его целым числом, а не делением дробных
		// геттеров класса (так в ответ не попадает погрешность вроде 26.999999999999996)
		let answer = rand === 0 ? k * k * k : k * k;
		genAssert(Math.abs(answer - (rand === 0
			? sphereBig.volume / sphereSmall.volume
			: sphereBig.surfaceArea / sphereSmall.surfaceArea)) < 1e-6, 'Отношение должно совпасть с вычисленным через класс Sphere');

		let power = rand === 0 ? 3 : 2;
		let formula = rand === 0 ? 'V = \\frac{4}{3}\\pi R^3' : 'S = 4\\pi R^2';
		let letter = rand === 0 ? 'V' : 'S';

		NAtask.setTask({
			// Обе формулировки ФИПИ: «...меньшего шара?» (148474) и «...меньшего?» (BE0C42)
			text: 'Даны два шара с радиусами $' + sphereBig.radius + '$ и $' + sphereSmall.radius +
				'$. Во сколько раз ' + nominative + ' большего шара больше ' + genitive + ' меньшего' +
				[' шара', ''].iz() + '?',
			answers: answer,
			analys: (rand === 0 ? 'Объём шара радиуса $R$ равен' : 'Площадь поверхности шара радиуса $R$ равна') + ' $' + formula +
				'$, то есть ' + (rand === 0 ? 'пропорционален кубу' : 'пропорциональна квадрату') + ' радиуса. ' +
				'Радиус большего шара в $' + sphereBig.radius + ' : ' + sphereSmall.radius + ' = ' + k +
				'$ ' + (k <= 4 ? 'раза' : 'раз') + ' больше радиуса меньшего, поэтому $\\frac{' + letter + '_1}{' + letter + '_2} = ' +
				k + '^' + power + ' = ' + answer + '$.',
			authors: ['chas-ege-selena', 'Zer00Player'],
			// Список списков - как в соседних шаблонах папки
			preference: [preference],
		});

		// Иллюстрация: два шара, размеры на canvas пропорциональны радиусам из условия
		let scale = 75 / sphereBig.radius; // px на единицу радиуса: большой шар -> 75 px
		let margin = 10;
		let gap = 25;
		let Rpx = sphereBig.radius * scale;
		let rpx = sphereSmall.radius * scale;
		let width  = Math.ceil(2 * margin + 2 * Rpx + gap + 2 * rpx);
		let height = Math.ceil(2 * margin + 2 * Rpx);
		let cx1 = margin + Rpx;
		let cx2 = cx1 + Rpx + gap + rpx;
		let cy  = height / 2;

		let paint = function(ct) {
			ct.lineWidth = 2;
			// Цвета выбираем один раз: оба шара должны выглядеть одинаково
			let fillColor = om.transparentBrandColors.iz();
			let strokeColor = om.secondaryBrandColors.iz();

			let drawSphere = function(cx, cy, rp) {
				// У малого шара при k = 7...9 радиус около 8 px: штрих [7, 5] длиннее
				// его экватора, и пунктир превращается в обрывки - уменьшаем штрих
				let dash = rp >= 30 ? [7, 5] : [Math.max(2, rp / 4), Math.max(1.5, rp / 6)];
				// Тело шара заливаем полупрозрачным брендовым цветом, контур -
				// вторым брендовым: чёрных линий на чертеже быть не должно
				// (замечание «покрасить»).
				ct.fillStyle = fillColor;
				ct.beginPath();
				ct.arc(cx, cy, rp, 0, 2 * Math.PI);
				ct.fill();
				ct.closePath();
				ct.strokeStyle = strokeColor;

				// контур шара (большой круг)
				ct.beginPath();
				ct.arc(cx, cy, rp, 0, 2 * Math.PI);
				ct.stroke();
				ct.closePath();

				// Экватор: ближняя к зрителю половина сплошная, дальняя - пунктиром
				// (замечание «задняя полуокружность должна быть пунктиром»).
				// Штрих [7, 5] - тот же, что у невидимых рёбер в соседних шаблонах
				// (у малого шара - уменьшенный, см. dash).
				ct.setLineDash(dash);
				ct.beginPath();
				ct.ellipse(cx, cy, rp, 0.3 * rp, 0, Math.PI, 2 * Math.PI);
				ct.stroke();
				ct.closePath();
				ct.setLineDash([]);
				ct.beginPath();
				ct.ellipse(cx, cy, rp, 0.3 * rp, 0, 0, Math.PI);
				ct.stroke();
				ct.closePath();

				// радиус (пунктиром) — наглядно показывает масштаб шара
				ct.beginPath();
				ct.setLineDash(dash);
				ct.moveTo(cx, cy);
				ct.lineTo(cx + rp, cy);
				ct.stroke();
				ct.closePath();
				ct.setLineDash([]);
			};

			drawSphere(cx1, cy, Rpx);
			drawSphere(cx2, cy, rpx);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: width,
			height: height,
			paint: paint,
		});
	}, 1000);
})();
//509681
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/problem?id=509681
