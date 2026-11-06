(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Высота пирамиды равна k * sqrt(3), объём (sqrt(3) / 4) * a^2 * k * sqrt(3) / 3 = a^2 * k / 4.
		// Целостность объёма обеспечивается выбором a, а не кратностью k четырём:
		// у ФИПИ (E58000) k от 2 до 9 при a = 2, 4, 6 и k = 4 при a = 3, 5,
		// а также «32 sqrt(3)» при a = 1.
		// Сторону выбираем сразу, а k - только из подходящих к ней значений: при
		// отбраковке пары (a, k) целиком a = 3 и a = 5 (подходят лишь k = 4, 8)
		// выпадали в несколько раз реже чётных сторон. Сторона 1 у ФИПИ - одна
		// задача из 14, и чертёж для неё всегда схематический (H : a от 7 до 55),
		// поэтому она в списке один раз, а остальные стороны - по два.
		let a = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6].iz();
		let k;
		if (a === 1) {
			k = [4, 8, 12, 16, 20, 24, 28, 32].iz();
		} else if (a % 2) {
			k = [4, 8].iz();
		} else {
			k = sl(2, 10);
		}
		genAssert(a * a * k % 4 === 0, 'Объём пирамиды должен быть целым');
		let V = a * a * k / 4;

		let paintPyramid = function (ct) {
			// Чертёж пропорционален условию, пока высота превышает сторону основания
			// не более чем втрое. Более высокие пирамиды (вплоть до «a = 1, H = 32 sqrt(3)»
			// из ФИПИ) рисуются схематически с отношением 3 : 1, иначе чертёж стал бы
			// нечитаемой иглой (md/task_geometry.md).
			let edge = 2;
			let height = edge * Math.min(k * Math.sqrt(3) / a, 3);
			// Угол PI/4 даёт невырожденную проекцию: задняя вершина основания
			// не лежит на боковом ребре (при PI/6 чертёж вырождался в треугольник).
			let angle = Math.PI / 4;
			// В координатах drawRightPyramid3() передняя сторона основания лежит
			// на y = -edge, вершина пирамиды - на y = apexY
			let apexY = (-edge * Math.sin(angle) - 2 * edge) / 3 + height;
			let scale = Math.min(300 / edge, 320 / (apexY + edge));
			// Отражение по Y: вершина пирамиды сверху, основание снизу
			ct.translate(200 - scale * edge / 2, 200 + scale * (apexY - edge) / 2);
			ct.scale(scale, -scale);
			ct.lineWidth = 2 / scale;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			ct.drawRightPyramid3({
				edge: edge,
				height: height,
				angle: angle,
			}, [5, 1, 2], [5 / scale, 2 / scale]); // пунктиром скрытое боковое ребро (задняя вершина - вершина)
		};

		NAtask.setTask({
			text: 'Сторона основания правильной треугольной пирамиды равна $' + a + '$, а высота пирамиды равна $' + k + '\\sqrt{3}$. Найдите объём этой пирамиды.',
			answers: V,
			analys: 'Площадь правильного треугольника со стороной $' + a + '$ равна $S = \\frac{\\sqrt{3}}{4} \\cdot ' + a + '^2$. Высота пирамиды $H = ' + k + '\\sqrt{3}$. ' +
				'Объём: $V = \\frac{1}{3} \\cdot S \\cdot H = \\frac{1}{3} \\cdot \\frac{\\sqrt{3}}{4} \\cdot ' + a +
				'^2 \\cdot ' + k + '\\sqrt{3} = \\frac{' + (a * a * k) + '}{4} = ' + V + '$.',
			authors: ['chas-ege-selena'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paintPyramid,
		});
	}, 1000);
})();
//27087
//chas-ege-selena
// https://mathb-ege.sdamgia.ru/problem?id=27087
