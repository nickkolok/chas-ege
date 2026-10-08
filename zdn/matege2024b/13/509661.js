(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509661';
		let preference = ['findRadius', 'findHeight'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let cone = new Cone({
			radius: sl(3, 15),
			height: sl(3, 20),
		});

		// Объём обязан быть целым числом π: V = πR²h/3
		genAssert((cone.volume / Math.PI).isAlmostInteger(), 'Объём конуса не является целым числом π');
		let V_pi = Math.round(cone.volume / Math.PI);

		let paint1 = function (ctx) {
			let w = 340;
			let hCanvas = 300;
			ctx.translate(w / 2, hCanvas / 2);
			ctx.scale(1, -1);
			ctx.lineWidth = 2;

			// Камера аксонометрии: окружность основания сплющивается в squash раз
			let squash = 0.3;
			let camera = {
				x: 0,
				y: 0,
				z: 0,
				rotationX: Math.acos(squash),
				rotationY: 0,
				rotationZ: 0,
				scale: Math.min(150 / cone.radius, 240 / cone.height),
			};

			let apex0 = project3DTo2D({ x: 0, y: 0, z: cone.height }, camera);
			let Rx = cone.radius * camera.scale;
			let Ry = Rx * squash;
			let y0 = (Ry - apex0.y) / 2; // центр основания по вертикали

			// Проекция точки тела на чертёж (относительно центра основания)
			let pr = function (point3D) {
				let p = project3DTo2D(point3D, camera);
				return { x: p.x, y: y0 + p.y };
			};

			let apex = pr({ x: 0, y: 0, z: cone.height });
			let center = pr({ x: 0, y: 0, z: 0 });
			let left = pr({ x: -cone.radius, y: 0, z: 0 });
			let right = pr({ x: cone.radius, y: 0, z: 0 });
			let rim = pr({
				x: cone.radius * Math.cos(-Math.PI / 4),
				y: cone.radius * Math.sin(-Math.PI / 4),
				z: 0,
			});

			// видимая (передняя) половина основания - сплошная
			ctx.beginPath();
			ctx.ellipse(center.x, center.y, Rx, Ry, 0, Math.PI, 2 * Math.PI);
			ctx.stroke();

			// скрытая (задняя) половина основания - штриховая
			ctx.beginPath();
			ctx.setLineDash([7, 5]);
			ctx.ellipse(center.x, center.y, Rx, Ry, 0, 0, Math.PI);
			ctx.stroke();
			ctx.setLineDash([]);

			// контурные образующие
			ctx.beginPath();
			ctx.moveTo(left.x, left.y);
			ctx.lineTo(apex.x, apex.y);
			ctx.lineTo(right.x, right.y);
			ctx.stroke();

			// образующая до отмеченной точки - сплошная
			ctx.beginPath();
			ctx.moveTo(apex.x, apex.y);
			ctx.lineTo(rim.x, rim.y);
			ctx.stroke();

			// высота и радиус - штриховые
			ctx.beginPath();
			ctx.setLineDash([7, 5]);
			ctx.moveTo(apex.x, apex.y);
			ctx.lineTo(center.x, center.y);
			ctx.lineTo(rim.x, rim.y);
			ctx.stroke();
			ctx.setLineDash([]);
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
			authors: ['Селена'],
			preference: preference,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 340,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509661
// https://mathb-ege.sdamgia.ru/problem?id=506339
