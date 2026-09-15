(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let A, a2, ans10, H;
		do {
			A = sl(10, 30, 1) * 10;
			a2 = sl(10, 40, 1) * 5;
			ans10 = sl(10, 200, 1);
			if ((ans10 * A) % a2 === 0) {
				H = (ans10 * A) / a2;
				if (H >= 50 && H <= 250) {
					break;
				}
			}
		} while (true);

		let a = a2 / 10;
		let ans = ans10 / 10;

		let aStr = String(a).replace('.', ',');

		// Статичная иллюстрация: правильная четырёхугольная пирамида,
		// невидимые рёбра (левое и заднее рёбра основания, заднее боковое) — пунктиром
		let paint1 = function (ct) {
			ct.translate(12, 72);
			ct.scale(20, -20);
			ct.lineWidth = 2 / 20;
			ct.drawRightPyramid4({
				edge: 5,
				height: 6.5,
			}, [1, 3, 6], [5 / 20, 2 / 20]);
		};

		NAtask.setTask({
			text: 'Пирамида ' + ['Хефрена','Снофру','Хеопса'].iz() + ' имеет форму правильной четырехугольной пирамиды, сторона основания которой равна $' + A + '$ м, а высота — $' + H + '$ м. Сторона основания точной музейной копии этой пирамиды равна $' + aStr + 
			'$ см. Найдите высоту музейной копии. Ответ дайте в сантиметрах.',
			answers: ans,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 220,
			height: 190,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=510709
