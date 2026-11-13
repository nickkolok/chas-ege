(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Как у ФИПИ (98194E, BF7455, 3BD62B, 8895C8 и дубли): сторона основания
		// второго сосуда вдвое или втрое больше либо меньше. Объём воды не меняется,
		// a^2 h = (k a)^2 x, поэтому уровень меняется в k^2 раз.
		// Уровни - кратные 5 см от 5 до 200 см (у ФИПИ от 10 до 180 см)
		// Словами кратность записывается по om.multiplierWords («вдвое», «в три раза»)
		let k = [2, 3].iz();
		// Запись кратностей: словами, как у ФИПИ («в полтора раза», «вдвое»), или числом
		// («в $1{,}5$ раза», «в $2$ раза»). preference спрашиваем для каждой кратности
		// заново: если он не задан, запись каждой выбирается случайно и независимо
		let preferenceMultiplier = ['multiplierWords', 'multiplierDigits'];
		let multInWords = function () {
			return getSelectedPreferenceFromList('512461', preferenceMultiplier) === 0;
		};
		let k2 = k * k;
		let bigger = sl1();
		let levels = [];
		for (let x = 5; x <= 200; x += 5) {
			let y = bigger ? x / k2 : x * k2;
			if (y.isAlmostInteger() && y >= 5 && y <= 200) {
				levels.push(x);
			}
		}
		let h = levels.iz();
		let ans = Math.round(bigger ? h / k2 : h * k2);
		let analys = 'Объём воды при переливании не меняется. Объём призмы равен $a^2 h$, где $a$ — сторона основания. ' +
			'Сторона основания второго сосуда в ' + chislitlx(k, 'раз', '$') + ' ' + (bigger ? 'больше' : 'меньше') +
			', поэтому площадь его основания в $' + k + '^2 = ' + k2 + '$ ' + chislit(k2, 'раз', 'раза', 'раз') + ' ' +
			(bigger ? 'больше' : 'меньше') + ', а уровень воды во столько же раз ' + (bigger ? 'ниже' : 'выше') + ': $' +
			h + (bigger ? ' : ' : ' \\cdot ') + k2 + ' = ' + ans + '$ см.';

		let paint1 = function (ct) {
			let edgeColor = om.secondaryBrandColors.iz();
			let colorRand = sl1();
			let waterColor = om.transparentBrandColors[colorRand];
			let waterLineColor = om.primaryBrandColors[colorRand];

			let width = 150;
			let vesselHeight = 140;
			let depth = 65;
			let angle = Math.acos(55 / 65);
			let waterHeight = 70;
			let depthX = depth * angle.cos();
			let depthY = depth * angle.sin();

			ct.save();
			ct.translate(60, 260);
			ct.scale(1, -1);

			ct.drawSection([
				[0, 0],
				[width, 0],
				[width, waterHeight],
				[0, waterHeight],
			], waterColor);

			ct.drawSection([
				[width, 0],
				[width + depthX, depthY - 1],
				[width + depthX, depthY + waterHeight],
				[width, waterHeight],
			], waterColor);

			ct.drawSection([
				[0, waterHeight],
				[width, waterHeight],
				[width + depthX, depthY + waterHeight],
				[depthX, depthY + waterHeight],
			], waterColor);

			ct.drawParallelepiped({
				width: width,
				height: vesselHeight,
				depth: depth,
				angle: angle,
				strokeStyle: edgeColor,
			}, [6, 8, 10], false, [5, 4]);

			ct.strokeStyle = waterLineColor;
			ct.lineWidth = 2;

			ct.drawLine(0, waterHeight, width, waterHeight);
			ct.drawLine(
				width,
				waterHeight,
				width + depthX,
				waterHeight + depthY
			);

			ct.setLineDash([5, 4]);
			ct.drawLine(
				0,
				waterHeight,
				depthX,
				waterHeight + depthY
			);
			ct.drawLine(
				depthX,
				waterHeight + depthY,
				width + depthX,
				waterHeight + depthY
			);
			ct.setLineDash([]);

			let arrowX = width + depthX + 18;

			ct.strokeStyle = edgeColor;
			ct.fillStyle = edgeColor;
			ct.drawArrow(arrowX, depthY + waterHeight,arrowX, depthY);
			ct.drawArrow(arrowX, depthY, arrowX, depthY + waterHeight);

			ct.scale(1, -1);
			ct.font = 'italic 20px serif';
			ct.fillText('h', arrowX + 8, -depthY - waterHeight / 2 + 7);

			ct.restore();
		};

		NAtask.setTask({
			text: 'Вода в сосуде, имеющем форму правильной четырёхугольной призмы, находится на уровне $h = ' + h + '$ см. ' +
				'На каком уровне окажется вода, если её перелить в другой сосуд, имеющий форму правильной четырёхугольной призмы, ' +
				'у которого сторона основания ' + multiplierPhrase(k, multInWords()) + ' ' + (bigger ? 'больше' : 'меньше') +
				', чем у данного? Ответ дайте в сантиметрах.',
			answers: ans,
			analys: analys,
			preference: [preferenceMultiplier],
		});

		NAtask.modifiers.allDecimalsToStandard();

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//Селена
//https://mathb-ege.sdamgia.ru/test?likes=512461
