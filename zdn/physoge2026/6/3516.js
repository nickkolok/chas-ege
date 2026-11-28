(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let dt = 2;                 // промежуток времени между отметками, с
		let start = 1, end = 11;    // участок, о котором спрашиваем, см
		let d = [1, 2, 5].iz();     // расстояние между соседними отметками, см (делитель 10)

		let positions = [];
		for (let x = start; x <= end; x += d) positions.push(x);
		let n = (end - start) / d;  // число промежутков между отметками 1 и 11 см
		let time = n * dt;
		let speed = (end - start) / time;

		NAtask.setTask({
			text: 'На рисунке точками показаны положения движущегося по линейке тела, ' +
				'причём положения тела отмечались через каждые ' + dt + ' с. ' +
				'С какой средней скоростью двигалось тело на участке от ' + start + ' до ' + end + ' см? ' +
				'Ответ запишите в сантиметрах в секунду.',
			answers: speed,
			analys: 'На участке от ' + start + ' до ' + end + ' см тело прошло путь $s = ' + (end - start) + '$ см. ' +
				'Между отметками ' + start + ' и ' + end + ' см укладывается ' + n + ' промежутков по ' + dt + ' с, ' +
				'то есть $t = ' + n + ' \\cdot ' + dt + ' = ' + time + '$ с. ' +
				'Средняя скорость $$v = \\frac{s}{t} = \\frac{' + (end - start) + '}{' + time + '} = ' + speed + ' \\text{ см/с}.$$',
		});
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 345,
			height: 130,
			paint: function (ct) {
				let ox = 30, kx = 24, ry = 55, rh = 20;
				function px(cm) { return ox + cm * kx; }
				ct.strokeStyle = 'black';
				ct.fillStyle = 'black';
				ct.lineWidth = 1;
				ct.font = '12px serif';
				// линейка
				ct.strokeRect(px(0), ry, 12 * kx, rh);
				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				for (let cm = 0; cm <= 12; cm++) {
					let h = (cm % 5 === 0) ? 10 : 6;
					ct.drawLine(px(cm), ry, px(cm), ry + h);
					ct.fillText('' + cm, px(cm), ry + rh + 3);
				}
				ct.textAlign = 'left';
				ct.fillText('см', px(12) + 6, ry + rh + 3);
				// отметки положения тела
				for (let i = 0; i < positions.length; i++) {
					ct.beginPath();
					ct.arc(px(positions[i]), ry - 14, 3.5, 0, 2 * Math.PI);
					ct.fill();
				}
			},
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3516
// ФИПИ 81A1C7
