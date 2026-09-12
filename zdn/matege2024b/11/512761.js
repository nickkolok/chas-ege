(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Генерируем множители, чтобы объём в литрах был целым числом
		// a = 10*x, b = 10*y, c = 10*z => V = (10x * 10y * 10z) / 1000 = x*y*z литров
		let x = sl(2, 10, 1);
		let y = sl(2, 10, 1);
		let z = sl(2, 10, 1);
		
		let a = 10 * x;
		let b = 10 * y;
		let c = 10 * z;
		let volumeLiters = x * y * z;

		let paint1 = function (ct) {
			ct.translate(120, 60);
			ct.scale(20, 20);
			ct.lineWidth = 2 / 20;
			
			// Масштабируем размеры для отрисовки, чтобы параллелепипед выглядел пропорционально
			// и вписывался в канву (максимальная сторона будет около 12 единиц, как в исходном кубе)
			let maxVal = Math.max(a, b, c);
			let k = 12 / maxVal;
			let w = a * k;
			let h = b * k;
			let d = c * k / 2.5;

			ct.drawParallelepiped({
				width: w,
				height: h,
				depth: d,
				angle: 40,
				strokeStyle: om.secondaryBrandColors,
			}, [0, 3, 4], false, [0.5, 0.2]);
		};

		NAtask.setTask({
			text: 'Аквариум имеет форму прямоугольного параллелепипеда с размерами $' + a + '$ см $\\times$ $' + b + '$ см $\\times$ $' + c + '$ см. Сколько литров составляет объём аквариума? В одном литре 1000 кубических сантиметров.',
			answers: volumeLiters,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=512761
