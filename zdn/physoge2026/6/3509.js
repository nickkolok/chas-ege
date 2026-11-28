(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// График проекции скорости: разгон — равномерное движение — торможение.
		let vmax = sl(2, 8, 1) * 5;   // скорость на равномерном участке, м/с
		let tr = sl(1, 2, 1);         // время разгона
		let du = sl(2, 4, 1);         // время равномерного движения
		let tf = sl(1, 2, 1);         // время торможения
		let t1 = tr, t2 = tr + du, t3 = tr + du + tf;

		// Путь при равномерном движении — площадь прямоугольника под горизонтальным участком.
		let path = vmax * du;

		NAtask.setTask({
			text: 'На рисунке представлен график зависимости проекции $\\upsilon_x$ скорости тела, ' +
				'движущегося вдоль оси Ox, от времени t. Какой путь прошло тело, двигаясь равномерно? ' +
				'Ответ запишите в метрах.',
			answers: path,
			analys: 'Равномерному движению отвечает горизонтальный участок графика: тело двигалось ' +
				'со скоростью $' + vmax + '$ м/с в течение $' + du + '$ с (от ' + t1 + ' до ' + t2 + ' с). ' +
				'Путь при равномерном движении равен $$s = \\upsilon_x \\cdot t = ' + vmax + ' \\cdot ' + du + ' = ' + path + ' \\text{ м}.$$',
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 320,
			height: 240,
			paint: function (ct) {
				let ox = 45, oy = 195, kx = 30;
				let vAxisMax = Math.ceil(vmax / 10) * 10;
				let ky = 160 / vAxisMax;
				function px(t) { return ox + t * kx; }
				function py(v) { return oy - v * ky; }
				ct.strokeStyle = 'black';
				ct.fillStyle = 'black';
				ct.lineWidth = 1;
				ct.font = '13px serif';
				// сетка
				ct.setLineDash([3, 3]);
				for (let t = 1; t <= t3; t++) ct.drawLine(px(t), oy, px(t), py(vAxisMax));
				for (let v = 10; v <= vAxisMax; v += 10) ct.drawLine(ox, py(v), px(t3), py(v));
				ct.setLineDash([]);
				// оси
				ct.lineWidth = 1.5;
				ct.drawArrow(ox, oy, px(t3) + 18, oy);
				ct.drawArrow(ox, oy, ox, py(vAxisMax) - 12);
				ct.lineWidth = 1;
				// оцифровка t
				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				for (let t = 1; t <= t3; t++) {
					ct.drawLine(px(t), oy - 3, px(t), oy + 3);
					ct.fillText('' + t, px(t), oy + 5);
				}
				// оцифровка v
				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				for (let v = 10; v <= vAxisMax; v += 10) {
					ct.drawLine(ox - 3, py(v), ox + 3, py(v));
					ct.fillText('' + v, ox - 6, py(v));
				}
				ct.fillText('0', ox - 6, oy + 10);
				// график
				ct.lineWidth = 2;
				let pts = [[0, 0], [t1, vmax], [t2, vmax], [t3, 0]];
				for (let i = 0; i < pts.length - 1; i++)
					ct.drawLine(px(pts[i][0]), py(pts[i][1]), px(pts[i + 1][0]), py(pts[i + 1][1]));
				ct.lineWidth = 1;
				// подписи осей
				ct.textAlign = 'left';
				ct.textBaseline = 'top';
				ct.fillText('υx, м/с', 4, 4);
				ct.fillText('t, с', px(t3) + 6, oy + 18);
			},
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3509
// ФИПИ 18D7F2
