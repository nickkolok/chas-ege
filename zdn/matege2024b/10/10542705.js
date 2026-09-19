(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Пифагоровы тройки: (расстояние между зданиями, перепад высот, длина транспортёра)
		let triples = [
			{ x: 3, y: 4, L: 5 },		{ x: 4, y: 3, L: 5 },
			{ x: 5, y: 12, L: 13 },		{ x: 12, y: 5, L: 13 },
			{ x: 6, y: 8, L: 10 },		{ x: 8, y: 6, L: 10 },
			{ x: 8, y: 15, L: 17 },		{ x: 15, y: 8, L: 17 },
			{ x: 9, y: 12, L: 15 },		{ x: 12, y: 9, L: 15 },
			{ x: 15, y: 20, L: 25 },	{ x: 20, y: 15, L: 25 },
			{ x: 7, y: 24, L: 25 },		{ x: 24, y: 7, L: 25 },
			{ x: 10, y: 24, L: 26 },	{ x: 24, y: 10, L: 26 },
			{ x: 20, y: 21, L: 29 },	{ x: 21, y: 20, L: 29 },
		];

		let triple = triples.iz();
		let x = triple.x;
		let y = triple.y;
		let L = triple.L;

		let minH = sl(1, 20 - y);
		let maxH = minH + y;

		let h1 = minH;
		let h2 = maxH;

		if (sl(0, 1)) {
			let temp = h1;
			h1 = h2;
			h2 = temp;
		}

		NAtask.setTask({
			text: 'Между зданиями завода и склада, находящимися друг от друга на расстоянии ' + x + ' м, ' +
				'для подачи материалов и готовых изделий установлен уличный автоматический транспортёр. ' +
				'Края креплений транспортёра находятся на высоте ' + h1 + ' м и ' + h2 + ' м от земли. ' +
				'Найдите длину транспортёра. Ответ дайте в метрах.',
			answers: L,
		});

		// Чертёж: две стены со штриховкой, линия земли и транспортёр под вопросом
		let paint1 = function (ct) {
			let w = 320;
			let h = 280;
			let hatch = 10;                // длина штриха стены
			let marginX = hatch + 10;      // боковые отступы под штриховку
			let marginTop = 26;
			let marginBottom = 16;

			// единый масштаб: чертёж пропорционален числам из условия
			let scale = Math.min((w - 2 * marginX) / x, (h - marginTop - marginBottom) / Math.max(h1, h2));

			let figureW = x * scale;
			let ox = (w - figureW) / 2;    // низ левой стены
			let tx = ox + figureW;         // низ правой стены
			let oy = h - marginBottom;     // линия земли
			let ly = oy - h1 * scale;      // верх левой стены
			let ry = oy - h2 * scale;      // верх правой стены

			ct.lineWidth = 2;
			ct.drawLine(ox, oy, ox, ly);   // левая стена
			ct.drawLine(tx, oy, tx, ry);   // правая стена
			ct.drawLine(ox, oy, tx, oy);   // земля
			ct.drawLine(ox, ly, tx, ry);   // транспортёр

			// штриховка стен с внешних сторон
			ct.lineWidth = 1;
			let step = 12;
			for (let yy = ly + 4; yy + hatch < oy; yy += step) {
				ct.drawLine(ox, yy, ox - hatch, yy + hatch);
			}
			for (let yy = ry + 4; yy + hatch < oy; yy += step) {
				ct.drawLine(tx, yy, tx + hatch, yy + hatch);
			}

			// знак вопроса над серединой транспортёра
			ct.font = 'italic 20px serif';
			ct.textAlign = 'center';
			ct.fillText('?', (ox + tx) / 2, (ly + ry) / 2 - 10);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 320,
			height: 280,
			paint: paint1,
		});
	}, 20000);
})();
