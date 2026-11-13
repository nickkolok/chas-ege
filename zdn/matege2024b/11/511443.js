(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	// Ветку выбираем до retryWhileError: иначе при каждой неудачной попытке она
	// перевыбиралась бы заново, и в случайном режиме чаще выпадала бы ветка,
	// которую реже отбраковывают («больше» - примерно в 61% задач вместо 50%)
	let key = '511443';
	let preference = ['bigger', 'smaller'];
	let rand = getSelectedPreferenceFromList(key, preference);
	let bigger = rand === 0;
	// Запись кратности: словами, как у ФИПИ («в полтора раза», «вдвое»), или числом
	// («в $1{,}5$ раза», «в $2$ раза»). preference спрашиваем для каждой кратности
	// заново: если он не задан, запись каждой выбирается случайно и независимо
	let preferenceMultiplier = ['multiplierWords', 'multiplierDigits'];
	let multInWords = function () {
		return getSelectedPreferenceFromList(key, preferenceMultiplier) === 0;
	};

	retryWhileError(function () {
		// Кратности - как у ФИПИ (3A0E06, 5F3B21, 850DF9, FA5AD0, 0B53AE, 5BAF16,
		// 6A8E45, D324CE, CC863D); словами они записываются по om.multiplierWords
		// («в полтора раза», «вдвое», «в два с половиной раза» и т.д.)
		let k = [1.5, 2, 2.5, 3, 4].iz();
		let k2 = k * k;

		// Объём воды не меняется: pi * r^2 * h = pi * (k r)^2 * x, поэтому
		// в широком сосуде уровень в k^2 раз ниже, в узком - в k^2 раз выше.
		// У ФИПИ уровень кратен 10 см, но тогда на весь шаблон набирается лишь
		// 13 задач, а «в два с половиной» и «в четыре раза меньше» не выпадают
		// вовсе. Поэтому уровень - любое целое число сантиметров от 5 до 95,
		// при котором новый уровень целый и не больше 100 см (у ФИПИ - до 90).
		// Уровень выбираем из подходящих, а не перебором: так каждая кратность
		// выпадает одинаково часто.
		let levels = [];
		for (let x = 5; x <= 95; x++) {
			let y = bigger ? x / k2 : x * k2;
			if (y.isAlmostInteger() && y >= 5 && y <= 100) {
				levels.push(x);
			}
		}
		genAssertNonempty(levels, 'Для этой кратности нет подходящего уровня воды');
		let h = levels.iz();
		let answer = Math.round(bigger ? h / k2 : h * k2);

		let analys = 'Объём воды при переливании не меняется. Объём цилиндра равен $\\pi r^2 h$. ' +
			'Радиус основания второго сосуда в ' + chislitlx(k, 'раз', '$') + ' ' + (bigger ? 'больше' : 'меньше') +
			', поэтому площадь его основания в $' + k + '^2 = ' + k2 + '$ ' + chislit(k2, 'раз', 'раза', 'раз') + ' ' + (bigger ? 'больше' : 'меньше') +
			', а уровень воды во столько же раз ' + (bigger ? 'ниже' : 'выше') + ': $' + h + (bigger ? ' : ' : ' \\cdot ') +
			k2 + ' = ' + answer + '$ см.';

		// Чертёж - один сосуд с уровнем воды h, как у ФИПИ (FA5AD0 и др.).
		// Второй сосуд не рисуем: его вид подсказывал бы, выше или ниже окажется вода
		let paintCylinder = function (ct) {
			let cx = 170;
			let R = 75;
			let ry = 0.25 * R; // сплюснутость эллипсов оснований
			let topY = 40;
			let bottomY = 255;
			let waterY = bottomY - 0.55 * (bottomY - topY);

			let edgeColor = om.secondaryBrandColors.iz();
			let liquidColor = om.transparentBrandColors.iz();
			ct.lineWidth = 2;
			ct.strokeStyle = edgeColor;

			// Вода заливается одним контуром, чтобы полупрозрачный цвет
			// нигде не накладывался сам на себя (приём из 514063)
			ct.beginPath();
			ct.moveTo(cx - R, waterY);
			ct.lineTo(cx - R, bottomY);
			ct.ellipse(cx, bottomY, R, ry, 0, Math.PI, 0, true);
			ct.lineTo(cx + R, waterY);
			ct.ellipse(cx, waterY, R, ry, 0, 0, Math.PI, true);
			ct.closePath();
			ct.fillStyle = liquidColor;
			ct.fill();

			// Сосуд: открытый верх, стенки; у дна и поверхности воды
			// передняя дуга сплошная, задняя пунктирная
			ct.drawEllipse(cx, topY, R, ry);
			ct.drawLine(cx - R, topY, cx - R, bottomY);
			ct.drawLine(cx + R, topY, cx + R, bottomY);
			[bottomY, waterY].forEach(function (y) {
				ct.drawEllipse(cx, y, R, ry, 0, 0, Math.PI);
				ct.setLineDash([6, 4]);
				ct.drawEllipse(cx, y, R, ry, 0, Math.PI, 2 * Math.PI);
				ct.setLineDash([]);
			});

			// Размерная стрелка h: от поверхности воды до дна
			let arrowX = cx + R + 25;
			ct.drawArrow(arrowX, bottomY, arrowX, waterY);
			ct.drawArrow(arrowX, waterY, arrowX, bottomY);
			ct.fillStyle = edgeColor;
			ct.font = 'italic 20px serif';
			ct.fillText('h', arrowX + 8, (waterY + bottomY) / 2 + 7);
		};

		NAtask.setTask({
			text: 'Вода в сосуде цилиндрической формы находится на уровне $h = ' + h + '$ см. ' +
				'На каком уровне окажется вода, если её перелить в другой цилиндрический сосуд, ' +
				'у которого радиус основания ' + multiplierPhrase(k, multInWords()) + ' ' + (bigger ? 'больше' : 'меньше') +
				', чем у данного? Ответ дайте в сантиметрах.',
			answers: answer,
			analys: analys,
			authors: ['chas-ege-selena', 'Zer00Player'],
			preference: [preference, preferenceMultiplier],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paintCylinder,
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//511443
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/problem?id=511443
