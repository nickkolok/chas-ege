(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '512761';
		let preference = ['cube', 'parallelepiped'];
		let variant = getSelectedPreferenceFromList(key, preference);

		let a, b, c, volumeLiters;

		if (variant === 'cube') {
			// Куб: сторона кратна 10, чтобы объём в литрах был целым числом
			let x = sl(1, 5, 1);
			a = 10 * x;
			b = a;
			c = a;
			volumeLiters = x * x * x;
		} else {
			// Прямоугольный параллелепипед: размеры кратны 10
			let x = sl(2, 10, 1);
			let y = sl(2, 10, 1);
			let z = sl(2, 10, 1);
			a = 10 * x;
			b = 10 * y;
			c = 10 * z;
			volumeLiters = x * y * z;
		}

		let paint1 = function (ct) {
			ct.translate(120, 60);
			ct.scale(20, 20);
			ct.lineWidth = 2 / 20;
			
			// Масштабируем размеры для отрисовки, чтобы фигура вписывалась в канву
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

		let shapeText = (variant === 'cube') ? 'куба' : 'прямоугольного параллелепипеда';
		let dimensionsText = (variant === 'cube') ? 'со стороной $' + a + '$ см' : 'с размерами $' + a + '$ см $\\times$ $' + b + '$ см $\\times$ $' + c + '$ см';

		NAtask.setTask({
			text: 'Аквариум имеет форму ' + shapeText + ' ' + dimensionsText + '. Сколько литров составляет объём аквариума? В одном литре 1000 кубических сантиметров.',
			answers: volumeLiters,
			preference: preference,
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
