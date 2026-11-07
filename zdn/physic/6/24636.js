(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '24636';
		let preference = ['resultantForce', 'velocity'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let Ax = sl(-80, 80, 1);
		genAssert(Math.abs(Ax) >= 35, "Точка A не должна быть слишком близко к вершине траектории, чтобы векторы скорости и горизонт не сливались");
		
		let Ay = 90 - 0.01 * Ax * Ax; 

		let questionText, answer;
		if (rand === 0) {
			questionText = 'равнодействующая всех сил, действующих на мяч';
			answer = '1';
		} else {
			questionText = 'скорость мяча';
			answer = '4';
		}

		let paint1 = function (ctx) {
			let w = 400;
			let h = 300;
			
			ctx.translate(w / 2, h / 2);
			ctx.scale(1, -1);

			let points = [];
			for(let x = -109; x <= 109; x += 5) {
				points.push({x: x, y: 90 - 0.01 * x * x});
			}
			
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);
			points.forEach(p => ctx.lineTo(p.x, p.y));
			ctx.stroke();

			ctx.fillStyle = om.primaryBrandColors.iz();
			ctx.fillKrug(Ax, Ay, 4);

			let len = 45;
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.lineWidth = 2.5;
			
			// 1: вниз
			ctx.drawArrow(Ax, Ay, Ax, Ay - len, true);
			// 2: вверх
			ctx.drawArrow(Ax, Ay, Ax, Ay + len, true);
			// 3: вправо
			ctx.drawArrow(Ax, Ay, Ax + len, Ay, true);
			
			// 4: касательная
			let slope = -0.02 * Ax;
			let angle = Math.atan(slope);
			let v4x = Ax + len * Math.cos(angle);
			let v4y = Ay + len * Math.sin(angle);
			ctx.drawArrow(Ax, Ay, v4x, v4y, true);

			ctx.scale(1, -1);
			ctx.font = "bold 18px liberation_sans";
			ctx.fillStyle = "black";
			
			ctx.fillText("1", Ax + 8, -(Ay - len) + 15);
			ctx.fillText("2", Ax + 8, -(Ay + len) - 5);
			ctx.fillText("3", Ax + len + 8, -Ay + 5);
			ctx.fillText("4", v4x + 8, -v4y + 5);
			ctx.fillText("A", Ax + 8, -Ay - 8);
		};

		NAtask.setTask({
			text: 'Мяч брошен под углом к горизонту (см. рисунок). Сопротивление воздуха пренебрежимо мало. ' +
				'Какому из векторов 1–4 сонаправлена ' + questionText + ' в точке $A$?',
			answers: answer,
			analys: 'На мяч действует только сила тяжести, которая направлена вертикально вниз. ' +
				'Следовательно, равнодействующая всех сил и ускорение мяча направлены вертикально вниз (вектор 1). ' +
				'Вектор скорости всегда направлен по касательной к траектории движения (вектор 4).',
			preference: preference,
		});
		
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paint1,
		});

	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=24636
