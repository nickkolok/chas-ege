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
			// Масштаб для отображения (canvas 400x400, размеры от 2 до 9)
			let scale = 20;
			
			// Вычисляем размеры параллелепипеда с учётом масштаба
			let scaledWidth = a * scale;
			let scaledHeight = c * scale;
			let scaledDepth = b * scale;
			
			// Вычисляем смещение для центрирования
			// Параллелепипед имеет ширину примерно scaledWidth + scaledDepth*cos(angle)
			// и высоту scaledHeight + scaledDepth/2
			let offsetX = 200 - (scaledWidth + scaledDepth * Math.cos(Math.PI / 6)) / 2;
			let offsetY = 200 - (scaledHeight + scaledDepth / 2) / 2;
			
			ct.save();
			ct.translate(offsetX, offsetY);
			
			// Используем встроенную функцию drawParallelepiped из canvas.js
			ct.drawParallelepiped({
				width: scaledWidth,
				height: scaledHeight,
				depth: scaledDepth,
				angle: Math.PI / 6,
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
