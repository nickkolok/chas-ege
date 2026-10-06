(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9, 1);
		let b = slKrome(a, 2, 9, 1);
		let c = sl(2, 9, 1);
		let V = a * b * c;
		let S = 2 * (a * b + b * c + a * c);

		let paint1 = function (ct) {
			let angle = Math.PI / 6;
			
			// Вычисляем реальные размеры параллелепипеда на экране
			let parallelepipedWidth = a + b * Math.cos(angle);
			let parallelepipedHeight = c + b / 2;
			
			// Масштабируем размеры для хорошей видимости на canvas 400x400
			let scale = 25;
			let scaledWidth = parallelepipedWidth * scale;
			let scaledHeight = parallelepipedHeight * scale;
			
			// Вычисляем смещение для центрирования
			let offsetX = (400 - scaledWidth) / 2;
			let offsetY = (400 - scaledHeight) / 2;
			
			ct.save();
			ct.translate(offsetX, offsetY);
			ct.scale(scale, scale);
			
			// Используем встроенную функцию drawParallelepiped из canvas.js
			ct.drawParallelepiped({
				width: a,
				height: c,
				depth: b,
				angle: angle,
				strokeStyle: om.secondaryBrandColors.iz()
			});
			
			ct.restore();
		};

		NAtask.setTask({
			text: 'Два ребра прямоугольного параллелепипеда равны $' + a + '$ и $' + b + '$, а объём параллелепипеда равен $' + V + '$. Найдите площадь поверхности этого параллелепипеда.',
			answers: S,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=515838
