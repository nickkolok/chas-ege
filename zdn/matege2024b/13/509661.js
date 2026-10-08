(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509661';
		let preference = ['findRadius', 'findHeight'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let cone = new Cone({
			radius: sl(3, 12),
			height: sl(3, 20),
		});
		// Чертёж обязан быть читаемым, поэтому пропорции конуса ограничены:
		// высота не меньше радиуса и не больше двух радиусов
		// (md/task_geometry.md: избегать данных, по которым не построить читаемый чертёж).
		genAssert(
			cone.height >= cone.radius && cone.height <= 2 * cone.radius,
			'Высота конуса должна быть от одного до двух радиусов, иначе чертёж нечитаем'
		);

		// Объём обязан быть целым числом π: V = πR²h/3
		genAssert((cone.volume / Math.PI).isAlmostInteger(), 'Объём конуса не является целым числом π');
		let V_pi = Math.round(cone.volume / Math.PI);

		let paint1 = function (ctx) {
			let w = 340;
			let hCanvas = 300;

			// Масштаб подбираем так, чтобы конус вписался с полями, сохраняя пропорции
			let scale = Math.min(140 / cone.radius, 210 / cone.height);
			let Rx = cone.radius * scale;
			let H = cone.height * scale;
			let ry = Rx * 0.3;
			let cx = w / 2;
			let baseY = (hCanvas + H) / 2;
			let apexY = baseY - H;

			ctx.translate(0, 0);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			// Основание: дальняя половина пунктиром, ближняя сплошной (как в 536908.js)
			ctx.setLineDash([7, 5]);
			ctx.drawEllipse(cx, baseY, Rx, ry, 0, Math.PI, 2 * Math.PI);
			ctx.setLineDash([]);
			ctx.drawEllipse(cx, baseY, Rx, ry, 0, 0, Math.PI);

			// Контурные образующие
			ctx.drawLine(cx - Rx, baseY, cx, apexY);
			ctx.drawLine(cx + Rx, baseY, cx, apexY);

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
			ctx.fillStyle = om.secondaryBrandColors.iz();
			ctx.fillKrug(px, py, 3);
		};

		let text;
		let answer;
		if (rand === 0) {
			// как в образце: даны объём и высота, найти радиус
			text = `Объём конуса равен $${V_pi}\\pi$, а его высота равна $${cone.height}$. Найдите радиус основания конуса.`;
			answer = cone.radius;
		} else {
			// перевёртыш: даны объём и радиус, найти высоту
			text = `Объём конуса равен $${V_pi}\\pi$, а радиус его основания равен $${cone.radius}$. Найдите высоту конуса.`;
			answer = cone.height;
		}

		NAtask.setTask({
			text: text,
			answers: answer,
			authors: ['chas-ege-selena'],
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
//chas-ege-selena
// https://mathb-ege.sdamgia.ru/problem?id=509661
// https://mathb-ege.sdamgia.ru/problem?id=506339
