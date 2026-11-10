(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Шаг оцифровки вертикальной оси подбирается так,
		// чтобы обе прямые проходили точно через узлы сетки
		let s = [2, 4, 5].iz();
		let muPool = {
			2: [0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50],
			4: [0.10, 0.20, 0.30, 0.40, 0.50],
			5: [0.25, 0.50],
		}[s];

		// mu1 - коэффициент трения первого бруска (прямая 1, круче),
		// mu2 - второго (прямая 2)
		let i2 = sl(0, muPool.length - 2);
		let i1 = sl(i2 + 1, muPool.length - 1);
		let mu1 = muPool[i1];
		let mu2 = muPool[i2];

		let asked = sl(1, 2);
		let mu = (asked == 1) ? mu1 : mu2;
		let muOther = (asked == 1) ? mu2 : mu1;
		let F = 40 * mu; // сила трения при N = 40 Н - узел сетки

		NAtask.setTask({
			text: 'На рисунке представлен график зависимости силы трения скольжения ' +
				'от силы нормального давления для двух брусков, скользящих по поверхности стола. ' +
				'Чему равен коэффициент трения скольжения для ' +
				['первого', 'второго'][asked - 1] + ' бруска?',
			answers: mu,
			wrongAnswers: [muOther],
			analys: 'Сила трения скольжения пропорциональна силе нормального давления: $F = mu N$, ' +
				'поэтому коэффициент трения равен угловому коэффициенту соответствующей прямой на графике. ' +
				'Прямая ' + asked + ' проходит через узел сетки с координатами $(40; ' + F + ')$, значит, ' +
				'$mu = \\frac{F}{N} = \\frac{' + F + '}{40} = ' + mu + '.$',
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 340,
			height: 280,
			paint: function (ct) {
				let ox = 42, oy = 240;      // начало координат в пикселях
				let kx = 6.5, ky = 8.5;     // пикселей на единицу по N и по F
				let nMax = 40, fMax = 20;
				ct.strokeStyle = 'black';
				ct.fillStyle = 'black';
				ct.lineWidth = 1;
				ct.font = '13px serif';
				// пунктирная сетка
				ct.setLineDash([3, 3]);
				for (let n = 10; n <= nMax; n += 10)
					ct.drawLine(ox + n * kx, oy, ox + n * kx, oy - fMax * ky);
				for (let f = s; f <= fMax; f += s)
					ct.drawLine(ox, oy - f * ky, ox + nMax * kx, oy - f * ky);
				ct.setLineDash([]);
				// оси со стрелками
				ct.lineWidth = 1.5;
				ct.drawArrow(ox, oy, ox + nMax * kx + 28, oy);
				ct.drawArrow(ox, oy, ox, oy - fMax * ky - 24);
				// засечки и оцифровка
				ct.lineWidth = 1;
				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				for (let n = 10; n <= nMax; n += 10) {
					ct.drawLine(ox + n * kx, oy - 3, ox + n * kx, oy + 3);
					ct.fillText('' + n, ox + n * kx, oy + 6);
				}
				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				for (let f = s; f <= fMax; f += s) {
					ct.drawLine(ox - 3, oy - f * ky, ox + 3, oy - f * ky);
					ct.fillText('' + f, ox - 6, oy - f * ky);
				}
				ct.fillText('0', ox - 6, oy + 10);
				// подписи осей
				ct.textAlign = 'left';
				ct.textBaseline = 'top';
				ct.fillText('Fтр, Н', 4, 4);
				ct.textAlign = 'right';
				ct.fillText('N, Н', 336, oy + 6);
				// прямые 1 и 2
				ct.lineWidth = 2;
				ct.drawLine(ox, oy, ox + nMax * kx, oy - mu1 * nMax * ky);
				ct.drawLine(ox, oy, ox + nMax * kx, oy - mu2 * nMax * ky);
				ct.lineWidth = 1;
				ct.textAlign = 'left';
				ct.textBaseline = 'middle';
				ct.fillText('1', ox + nMax * kx + 6, oy - mu1 * nMax * ky - 8);
				ct.fillText('2', ox + nMax * kx + 6, oy - mu2 * nMax * ky - 2);
			},
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3512
