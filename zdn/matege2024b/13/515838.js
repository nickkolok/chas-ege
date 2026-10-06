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
			// Применяем трансформацию: смещение + масштабирование + инверсия Y
			// (0, 0) будет в точке (100, 300) пикселей, Y направлен вверх
			ct.transform(20, 0, 0, -20, 100, 300);
			ct.lineWidth = 2 / 20;
			
			// Создаём параллелепипед с заданными размерами
			let parallelepiped = new Parallelepiped({
				width: a,
				height: c,
				depth: b
			});
			
			// Используем встроенную функцию отрисовки с параметрами из класса
			ct.drawParallelepiped({
				width: parallelepiped.width,
				height: parallelepiped.height,
				depth: parallelepiped.depth,
				angle: Math.PI/6,
				strokeStyle: om.secondaryBrandColors.iz(),
			}, [0, 3, 4], false, [0.5, 0.2]);
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
