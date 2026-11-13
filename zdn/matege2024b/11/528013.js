(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '528013';
		let preference = ['cube', 'parallelepiped'];
		let variant = getSelectedPreferenceFromList(key, preference);

		let a, b, c, volumeLiters;

		if (variant === 0) {
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
			let z = x === y ? slKrome(x, 2, 10) : sl(2, 10);
			a = 10 * x;
			b = 10 * y;
			c = 10 * z;
			volumeLiters = x * y * z;
		}

		let paint1 = function (ct) {
			let angle = Math.PI / 6;
			let scale = Math.min(340 / (a + c * Math.cos(angle)), 340 / (b + c * Math.sin(angle)));
			let w = a * scale, h = b * scale, d = c * scale;
			ct.translate(30, 370);
			ct.scale(1, -1);
			ct.lineWidth = 2;

			ct.drawParallelepiped({
				width: w,
				height: h,
				depth: d,
				angle: angle,
				strokeStyle: om.secondaryBrandColors.iz(),
			}, [6, 8, 10], false, [5, 3]);
		};

		NAtask.setTask({
			text: 'Аквариум имеет форму ' + ['куба','прямоугольного параллелепипеда'][variant] + ' ' + 
			[ 'со стороной $' + a + '$ см','с размерами $' + a + '$ см $\\times$ $' + b + '$ см $\\times$ $' + c + '$ см'][variant] + 
			'. Сколько литров составляет объём аквариума? В одном литре $1000$ кубических сантиметров.',
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
// https://mathb-ege.sdamgia.ru/problem?id=528013
// 086CBA, CD8CFE, 5CEF05, 68B200, FEA675, 082588
