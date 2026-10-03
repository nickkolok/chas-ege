(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '509681';
		let preference = ['volume', 'surface'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let k = sl(2, 5);
		let r2 = sl(1, 10);
		let r1 = k * r2;

		// Стереометрическая модель: используем класс Sphere из lib/figure.js
		let sphereBig   = new Sphere(r1);
		let sphereSmall = new Sphere(r2);

		let nominative = rand === 0 ? 'объём' : 'площадь поверхности';
		let genitive   = rand === 0 ? 'объёма' : 'площади поверхности';

		// Ответ считаем честно через методы Sphere (гарантированно целое k^3 или k^2)
		let answer = rand === 0
			? sphereBig.volume / sphereSmall.volume
			: sphereBig.surfaceArea / sphereSmall.surfaceArea;

		NAtask.setTask({
			text: 'Даны два шара с радиусами $' + sphereBig.radius + '$ и $' + sphereSmall.radius +
				'$. Во сколько раз ' + nominative + ' большего шара больше ' + genitive + ' меньшего шара?',
			answers: answer,
			authors: ['Селена'],
		});

		// Иллюстрация: два шара, размеры на canvas пропорциональны радиусам из условия
		let scale = 75 / sphereBig.radius; // px на единицу радиуса: большой шар -> 75 px
		let margin = 10;
		let gap = 25;
		let Rpx = sphereBig.radius * scale;
		let rpx = sphereSmall.radius * scale;
		let width  = Math.ceil(2 * margin + 2 * Rpx + gap + 2 * rpx);
		let height = Math.ceil(2 * margin + 2 * Rpx);
		let cx1 = margin + Rpx;
		let cx2 = cx1 + Rpx + gap + rpx;
		let cy  = height / 2;

		let paint = function(ct) {
			ct.lineWidth = 2;

			let drawSphere = function(cx, cy, rp) {
				// контур шара (большой круг)
				ct.beginPath();
				ct.arc(cx, cy, rp, 0, 2 * Math.PI);
				ct.stroke();
				ct.closePath();

				// экватор
				ct.beginPath();
				ct.ellipse(cx, cy, rp, 0.3 * rp, 0, 0, 2 * Math.PI);
				ct.stroke();
				ct.closePath();

				// радиус (пунктиром) — наглядно показывает масштаб шара
				ct.beginPath();
				ct.setLineDash([4, 4]);
				ct.moveTo(cx, cy);
				ct.lineTo(cx + rp, cy);
				ct.stroke();
				ct.closePath();
				ct.setLineDash([]);
			};

			drawSphere(cx1, cy, Rpx);
			drawSphere(cx2, cy, rpx);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: width,
			height: height,
			paint: paint,
		});
	}, 1000);
})();
//509681
