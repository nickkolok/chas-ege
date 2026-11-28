(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3515';
		// masses — диаграмма масс (одинаковый объём), ФИПИ E8733D;
		// densities — диаграмма плотностей (одинаковая масса), ФИПИ 45A8A5.
		let preference = ['masses', 'densities'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let isMasses = rand === 0;

		let r = sl(2, 4, 1);          // искомое отношение
		let base = sl(1, 3, 1);       // значение первого столбца
		let bar1 = base;
		let bar2 = base * r;

		let ylabel = isMasses ? 'm, кг' : 'ρ, г/см³';
		let text = isMasses
			? 'На рисунке приведена столбчатая диаграмма. На ней представлены значения масс двух сплошных тел, ' +
				'имеющих одинаковый объём. Во сколько раз плотность вещества первого тела меньше ' +
				'плотности вещества второго тела?'
			: 'На рисунке приведена столбчатая диаграмма. На ней представлены значения плотности веществ, ' +
				'из которых сделаны два сплошных тела с одинаковой массой. Определите отношение объёма тела 1 к объёму тела 2.';
		let analys = isMasses
			? 'При одинаковом объёме плотность пропорциональна массе: $\\rho = \\frac{m}{V}$. ' +
				'Поэтому $\\frac{\\rho_2}{\\rho_1} = \\frac{m_2}{m_1} = \\frac{' + bar2 + '}{' + bar1 + '} = ' + r + '$. ' +
				'Плотность вещества первого тела меньше плотности вещества второго в ' + r + ' раз.'
			: 'При одинаковой массе объём обратно пропорционален плотности: $V = \\frac{m}{\\rho}$. ' +
				'Поэтому $\\frac{V_1}{V_2} = \\frac{\\rho_2}{\\rho_1} = \\frac{' + bar2 + '}{' + bar1 + '} = ' + r + '$.';

		NAtask.setTask({
			text: text,
			answers: r,
			analys: analys,
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 250,
			paint: function (ct) {
				let ox = 55, oy = 205, bw = 55;
				let x1 = ox + 25, x2 = ox + 115;
				let ky = 160 / bar2;
				ct.strokeStyle = 'black';
				ct.fillStyle = 'black';
				ct.lineWidth = 1;
				ct.font = '13px serif';
				// пунктирная сетка
				ct.setLineDash([3, 3]);
				for (let k = 1; k <= r; k++) {
					let y = oy - k * base * ky;
					ct.drawLine(ox, y, ox + 200, y);
				}
				ct.setLineDash([]);
				// оси со стрелками
				ct.lineWidth = 1.5;
				ct.drawArrow(ox, oy, ox + 210, oy);
				ct.drawArrow(ox, oy, ox, oy - 185);
				ct.lineWidth = 1;
				// засечки и оцифровка вертикальной оси
				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				for (let k = 1; k <= r; k++) {
					let val = k * base, y = oy - val * ky;
					ct.drawLine(ox - 3, y, ox + 3, y);
					ct.fillText('' + val, ox - 6, y);
				}
				ct.fillText('0', ox - 6, oy + 10);
				// столбцы
				ct.fillStyle = '#bbbbbb';
				ct.fillRect(x1, oy - bar1 * ky, bw, bar1 * ky);
				ct.fillRect(x2, oy - bar2 * ky, bw, bar2 * ky);
				ct.strokeStyle = 'black';
				ct.strokeRect(x1, oy - bar1 * ky, bw, bar1 * ky);
				ct.strokeRect(x2, oy - bar2 * ky, bw, bar2 * ky);
				// подписи столбцов
				ct.fillStyle = 'black';
				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				ct.fillText('1', x1 + bw / 2, oy + 6);
				ct.fillText('2', x2 + bw / 2, oy + 6);
				// подпись вертикальной оси
				ct.textAlign = 'left';
				ct.textBaseline = 'top';
				ct.fillText(ylabel, 4, 4);
			},
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3515
// ФИПИ E8733D 45A8A5
