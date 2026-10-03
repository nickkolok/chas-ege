(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k_r_opts = [
			{text: 'вдвое', val: 2},
			{text: 'втрое', val: 3},
			{text: 'вчетверо', val: 4},
			{text: 'впятеро', val: 5},
		];
		let k_h_opts = [
			{text: 'в полтора раза', val: 1.5},
			{text: 'вдвое', val: 2},
			{text: 'втрое', val: 3},
			{text: 'вчетверо', val: 4},
		];

		let k_h = k_h_opts.iz();
		let k_r;
		if (k_h.val === 1.5) {
			// чтобы ответ оставался целым, ширину берём только чётными кратными
			k_r = [{text: 'вдвое', val: 2}, {text: 'вчетверо', val: 4}].iz();
		} else {
			k_r = k_r_opts.iz();
		}

		let ans = k_r.val * k_r.val * k_h.val;

		NAtask.setTask({
			text: 'Даны две кружки цилиндрической формы. Первая кружка ' + k_h.text + ' ниже второй, ' +
			      'а вторая ' + k_r.text + ' шире первой. Во сколько раз объём второй кружки больше объёма первой?',
			answers: ans,
		});

		let paint1 = function (ct) {
			// Рисуем в условных единицах (радиус первой кружки = 1), ось y направлена вверх.
			// Пропорции чертежа точно соответствуют условию: r2/r1 = k_r, h2/h1 = k_h.
			let r1 = 1;
			let h1 = 2.2;
			let r2 = r1 * k_r.val;
			let h2 = h1 * k_h.val;
			let sq = 0.28; // сплюснутость эллипсов перспективы
			let ry1 = sq * r1;
			let ry2 = sq * r2;
			let margin = 0.3;
			let gap = 0.7;

			let c1 = margin + r1;
			let c2 = c1 + r1 + 0.35 * r1 + gap + r2;
			let totalW = c2 + r2 + 0.35 * r2 + margin;
			let yTop = Math.max(h1 + ry1, h2 + ry2);
			let yBottom = -Math.max(ry1, ry2);
			let totalH = yTop - yBottom + 2 * margin;

			// автомасштабирование под размер canvas
			let s = Math.min(ct.canvas.width / totalW, ct.canvas.height / totalH);
			ct.translate((ct.canvas.width - s * totalW) / 2, (ct.canvas.height - s * totalH) / 2 + s * yTop);
			ct.scale(s, -s);
			ct.lineWidth = 2 / s;

			let drawMug = function (c, r, h, ry) {
				ct.drawEllipse(c, h, r, ry); // верхний ободок
				ct.setLineDash([6 / s, 4 / s]);
				ct.drawEllipse(c, 0, r, ry); // дно (невидимый край)
				ct.setLineDash([]);
				ct.drawLine(c - r, 0, c - r, h); // стенки
				ct.drawLine(c + r, 0, c + r, h);
				let hy = 0.55 * h; // ручка
				ct.drawEllipse(c + r, hy, 0.35 * r, 0.22 * h, 0, -Math.PI / 2, Math.PI / 2);
				ct.drawEllipse(c + r, hy, 0.18 * r, 0.11 * h, 0, -Math.PI / 2, Math.PI / 2);
			};

			drawMug(c1, r1, h1, ry1);
			drawMug(c2, r2, h2, ry2);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 380,
			height: 230,
			paint: paint1,
		});
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=510966
