(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	// Ветку выбираем до retryWhileError: иначе при каждой неудачной попытке она
	// перевыбиралась бы, и «найти радиус» (его реже отбраковывают) выпадало бы
	// примерно в 56% задач вместо 50%
	let key = '509661';
	let preference = ['findRadius', 'findHeight'];
	let rand = getSelectedPreferenceFromList(key, preference);

	retryWhileError(function () {

		// Данные - в тех же пределах, что у ФИПИ. Радиус ищут (34E2FF) при высоте
		// от 3 до 9 и радиусе от 3 до 9 (высота бывает и меньше радиуса: «64pi, h = 3»).
		// Высоту ищут (C4C408, B7E3BA) при радиусе от 1 до 3 и высоте до 18
		// («6pi, r = 1», «24pi, r = 2»).
		let r, h;
		if (rand === 0) {
			r = sl(2, 10);
			h = sl(3, 10);
		} else {
			r = sl(1, 5);
			h = sl(2, 20);
		}
		let cone = new Cone({ radius: r, height: h });

		// Объём обязан быть целым числом pi: V = pi * r^2 * h / 3
		genAssert((r * r * h) % 3 === 0, 'Объём конуса не является целым числом pi');
		let V_pi = r * r * h / 3;
		genAssert(Math.abs(cone.volume - V_pi * Math.PI) < 1e-6, 'Объём должен совпасть с вычисленным через класс Cone');

		let paint1 = function (ctx) {
			let w = 340;
			let hCanvas = 300;

			// Чертёж пропорционален условию, пока высота отличается от радиуса
			// не более чем втрое; у более вытянутых (например, «r = 1, h = 18»)
			// и более плоских конусов отношение на чертеже ограничено 3 : 1 и 1 : 3,
			// иначе получилась бы нечитаемая игла или блин (md/task_geometry.md).
			let ratio = Math.min(Math.max(cone.height / cone.radius, 1 / 3), 3);
			let Rx = Math.min(140, 210 / ratio);
			let H = Rx * ratio;
			// Сплюснутость эллипса основания не больше половины отношения высоты
			// к радиусу: вершина остаётся вне эллипса, и образующие касаются его
			let ry = Rx * Math.min(0.3, 0.5 * ratio);
			let cx = w / 2;
			let baseY = (hCanvas + H - ry) / 2;
			let apexY = baseY - H;

			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			// Точки касания образующих с эллипсом основания: параметр t = -alpha
			// (справа) и PI + alpha (слева), sin(alpha) = ry / H. Видимая дуга
			// основания - между ними через передний край, остальное - пунктиром.
			let alpha = Math.asin(ry / H);
			let tx = Rx * Math.cos(alpha);
			let ty = -ry * Math.sin(alpha);
			ctx.setLineDash([7, 5]);
			ctx.drawEllipse(cx, baseY, Rx, ry, 0, Math.PI + alpha, 2 * Math.PI - alpha);
			ctx.setLineDash([]);
			ctx.drawEllipse(cx, baseY, Rx, ry, 0, -alpha, Math.PI + alpha);

			// Контурные образующие
			ctx.drawLine(cx - tx, baseY + ty, cx, apexY);
			ctx.drawLine(cx + tx, baseY + ty, cx, apexY);

			// Высота - пунктиром
			ctx.setLineDash([7, 5]);
			ctx.drawLine(cx, apexY, cx, baseY);

			// Радиус к отмеченной точке на ближней (видимой) половине основания
			let t = Math.PI * 0.3;
			let px = cx + Rx * Math.cos(t);
			let py = baseY + ry * Math.sin(t);
			ctx.drawLine(cx, baseY, px, py);
			ctx.setLineDash([]);

			// Образующая до отмеченной точки лежит на видимой боковой поверхности
			ctx.drawLine(cx, apexY, px, py);
			ctx.fillStyle = ctx.strokeStyle;
			ctx.fillKrug(px, py, 3);
		};

		let text;
		let answer;
		let analys = 'Объём конуса равен $V=\\frac{1}{3}\\pi r^2 h$, где $r$ — радиус основания, $h$ — высота. ';
		if (rand === 0) {
			// даны объём и высота, найти радиус (34E2FF)
			text = 'Объём конуса равен $' + V_pi + '\\pi$, а его высота равна $' + h + '$. Найдите радиус основания конуса.';
			answer = r;
			analys += 'Отсюда $r^2=\\frac{3V}{\\pi h}=\\frac{3\\cdot ' + V_pi + '}{' + h + '}=' + r * r + '$, значит, $r=' + r + '$.';
		} else {
			// даны объём и радиус, найти высоту (C4C408, B7E3BA)
			text = 'Объём конуса равен $' + V_pi + '\\pi$, а радиус его основания равен $' + r + '$. ' +
				['Найдите высоту конуса.', 'Найдите длину высоты этого конуса.'].iz();
			answer = h;
			analys += 'Отсюда $h=\\frac{3V}{\\pi r^2}=\\frac{3\\cdot ' + V_pi + '}{' + r + '^2}=' + h + '$.';
		}

		NAtask.setTask({
			text: text,
			answers: answer,
			analys: analys,
			authors: ['chas-ege-selena', 'Zer00Player'],
			// Список списков - как в соседних шаблонах папки
			preference: [preference],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 340,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//509661
//chas-ege-selena, Zer00Player
// https://mathb-ege.sdamgia.ru/problem?id=509661
// https://mathb-ege.sdamgia.ru/problem?id=506339
