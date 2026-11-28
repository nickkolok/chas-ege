(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Кусочно-линейный график координаты x(t); вершины в чётные моменты времени.
		let times = [0, 2, 4, 6, 8];
		let pool = [-10, 0, 10, 20, 30];
		let xs = times.map(function () { return pool.iz(); });
		genAssert(Math.max.apply(null, xs) > Math.min.apply(null, xs), 'график вырожден в горизонтальную прямую');

		let key = '3510';
		// speed — скорость на участке (ФИПИ 962AE1 163060 F2EB40);
		// displacement — модуль перемещения (B0FC45 1C66FC F3D9BF 269E46 B656C0);
		// path — путь (CCA707 CD1E01).
		let preference = ['speed', 'displacement', 'path'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let answer, text, analys;
		let head = 'На рисунке представлен график зависимости координаты от времени для тела, ' +
			'движущегося вдоль оси Ox. ';

		if (rand === 0) {
			let seg = sl(0, 3, 1);
			let t1 = times[seg], t2 = times[seg + 1];
			let speed = Math.abs(xs[seg + 1] - xs[seg]) / (t2 - t1);
			genAssert(speed > 0, 'на выбранном участке тело покоится');
			answer = speed;
			text = head + 'С какой по модулю скоростью двигалось тело в интервале времени от ' +
				t1 + ' до ' + t2 + ' с? Ответ запишите в метрах в секунду.';
			analys = 'На участке от ' + t1 + ' до ' + t2 + ' с график — прямая, движение равномерное. ' +
				'Модуль скорости равен модулю углового коэффициента: ' +
				'$$v = \\frac{|\\Delta x|}{\\Delta t} = \\frac{|' + xs[seg + 1] + ' - (' + xs[seg] + ')|}{' + (t2 - t1) + '} = ' + speed + ' \\text{ м/с}.$$';
		} else {
			let T = [4, 6, 8].iz();
			let idx = times.indexOf(T);
			let disp = Math.abs(xs[idx] - xs[0]);
			let path = 0;
			for (let i = 0; i < idx; i++) path += Math.abs(xs[i + 1] - xs[i]);
			if (rand === 1) {
				answer = disp;
				text = head + 'Чему равен модуль перемещения тела за ' + T + ' с от начала движения? Ответ запишите в метрах.';
				analys = 'Модуль перемещения равен модулю разности конечной и начальной координат: ' +
					'$$|\\Delta x| = |x(' + T + ') - x(0)| = |' + xs[idx] + ' - (' + xs[0] + ')| = ' + disp + ' \\text{ м}.$$';
			} else {
				genAssert(path > 0, 'путь равен нулю');
				answer = path;
				text = head + 'Чему равен путь тела за ' + T + ' с от начала движения? Ответ запишите в метрах.';
				analys = 'Путь равен сумме модулей приращений координаты на каждом участке: ' +
					'$$s = ' + xs.slice(0, idx + 1).map(function (v, i, a) { return i ? '|' + v + ' - (' + a[i - 1] + ')|' : ''; }).filter(Boolean).join(' + ') + ' = ' + path + ' \\text{ м}.$$';
			}
		}

		NAtask.setTask({
			text: text,
			answers: answer,
			analys: analys,
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 330,
			height: 250,
			paint: function (ct) {
				let ox = 45, kx = 32;
				let top = 20, bottom = 210, xmax = 30, xmin = -10;
				let ky = (bottom - top) / (xmax - xmin);
				function px(t) { return ox + t * kx; }
				function py(x) { return top + (xmax - x) * ky; }
				let py0 = py(0);
				ct.strokeStyle = 'black';
				ct.fillStyle = 'black';
				ct.lineWidth = 1;
				ct.font = '13px serif';
				// сетка
				ct.setLineDash([3, 3]);
				for (let t = 2; t <= 8; t += 2) ct.drawLine(px(t), top, px(t), bottom);
				for (let x = xmin; x <= xmax; x += 10) if (x !== 0) ct.drawLine(ox, py(x), px(8), py(x));
				ct.setLineDash([]);
				// оси
				ct.lineWidth = 1.5;
				ct.drawArrow(ox, py0, px(8) + 18, py0);       // ось t вдоль x=0
				ct.drawArrow(ox, bottom, ox, top - 12);        // ось x вдоль t=0
				ct.lineWidth = 1;
				// оцифровка t
				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				for (let t = 2; t <= 8; t += 2) {
					ct.drawLine(px(t), py0 - 3, px(t), py0 + 3);
					ct.fillText('' + t, px(t), py0 + 5);
				}
				// оцифровка x
				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				for (let x = xmin; x <= xmax; x += 10) if (x !== 0) {
					ct.drawLine(ox - 3, py(x), ox + 3, py(x));
					ct.fillText('' + x, ox - 6, py(x));
				}
				ct.fillText('0', ox - 6, py0 + 10);
				// график
				ct.lineWidth = 2;
				for (let i = 0; i < times.length - 1; i++)
					ct.drawLine(px(times[i]), py(xs[i]), px(times[i + 1]), py(xs[i + 1]));
				ct.lineWidth = 1;
				// подписи осей
				ct.textAlign = 'left';
				ct.textBaseline = 'top';
				ct.fillText('x, м', 4, 4);
				ct.fillText('t, с', px(8) + 6, py0 + 18);
			},
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3506
// https://github.com/nickkolok/chas-ege/issues/3510
// https://github.com/nickkolok/chas-ege/issues/3511
// ФИПИ 962AE1 163060 F2EB40 B0FC45 1C66FC F3D9BF 269E46 B656C0 CCA707 CD1E01
