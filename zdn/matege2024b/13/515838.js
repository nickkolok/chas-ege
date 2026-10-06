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
			ct.save();
			
			// Центрируем начало координат
			ct.translate(200, 200);
			
			// Масштабируем для хорошей видимости (canvas 400x400)
			let maxDim = Math.max(a, b, c);
			let scale = 100 / maxDim;
			ct.scale(scale, scale);
			
			// Создаём параллелепипед для получения параметров
			let parallelepiped = new Parallelepiped({
				width: a,
				height: c,
				depth: b
			});
			
			// Используем старую проверенную функцию drawParallelepiped
			ct.drawParallelepiped({
				width: a,
				height: c,
				depth: b,
				angle: Math.PI / 6,
				strokeStyle: om.secondaryBrandColors.iz(),
				scale: 1
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
