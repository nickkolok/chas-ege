(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509661';

		// Генерируем радиус и высоту так, чтобы объём был целым числом при делении на 3
		let R = sl(3, 15);
		let h = sl(3, 20);

		// Если R^2 * h не делится на 3, делаем h кратным 3
		if ((R * R * h) % 3 !== 0) {
			h = sl(1, 6) * 3; // 3, 6, 9, 12, 15, 18
		}

		let V_pi = (R * R * h) / 3;

		let paint1 = function (ctx) {
			let w = 340;
			let hCanvas = 300;
			ctx.translate(w / 2, hCanvas / 2);
			ctx.scale(1, -1);
			ctx.lineWidth = 2;

			// Масштаб: чертёж пропорционален радиусу и высоте из условия
			let scale = Math.min(150 / R, 200 / h);
			let Rx = R * scale;
			let H = h * scale;
			let Ry = Math.max(Rx * 0.25, 8);

			let y0 = (Ry - H) / 2; // центр основания
			let yApex = y0 + H;    // вершина

			// видимая (передняя) половина основания — сплошная
			ctx.beginPath();
			ctx.ellipse(0, y0, Rx, Ry, 0, Math.PI, 2 * Math.PI);
			ctx.stroke();

			// скрытая (задняя) половина основания — штриховая
			ctx.beginPath();
			ctx.setLineDash([7, 5]);
			ctx.ellipse(0, y0, Rx, Ry, 0, 0, Math.PI);
			ctx.stroke();
			ctx.setLineDash([]);

			// контурные образующие
			ctx.beginPath();
			ctx.moveTo(-Rx, y0);
			ctx.lineTo(0, yApex);
			ctx.lineTo(Rx, y0);
			ctx.stroke();

			// точка на передней части окружности основания
			let t = -Math.PI / 4;
			let px = Rx * Math.cos(t);
			let py = y0 + Ry * Math.sin(t);

			// образующая до этой точки — сплошная
			ctx.beginPath();
			ctx.moveTo(0, yApex);
			ctx.lineTo(px, py);
			ctx.stroke();

			// высота и радиус — штриховые
			ctx.beginPath();
			ctx.setLineDash([7, 5]);
			ctx.moveTo(0, yApex);
			ctx.lineTo(0, y0);
			ctx.lineTo(px, py);
			ctx.stroke();
			ctx.setLineDash([]);
		};

		NAtask.setTask({
			text: `Объём конуса равен ${V_pi}π, а его высота равна ${h}. Найдите радиус основания конуса.`,
			answers: [R],
			authors: ['Селена'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 340,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509661
