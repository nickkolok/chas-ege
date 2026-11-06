(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(8, 10);
		let minX = maxX - sl(13, 18);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(1, 2))
			X.push(i);
		Y.push(sl(1, 4).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				if (i % 2)
					Y[i] = Y[i - 1] + sl(3, 6).pm();
				else
					Y[i] = 0;
			} while (Y[i].abs() > 5);
		}
		let spline = new Spline(X, Y);
		let extremum = [];

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push([i, f(i)]);
			}
			if (extremum.length >= 2)
				genAssert((extremum[extremum.length - 2][1] - extremum[extremum.length - 1][1]).abs() > 1,
					'Горбики слишком близко');
			if (extremum.length > 0) {
				genAssert(extremum[extremum.length - 1][1].abs().round() != 0, 'Слишком непонятный экстремум');
				genAssert(extremum[extremum.length - 1][0].round(0.1).isZ(), 'Не целый экстемум');
			}
		}
		genAssert((extremum[extremum.length - 1][1] - f(maxX)).abs() > 2, 'Слишком близко к правому концу');
		genAssert((extremum[0][1] - f(minX)).abs() > 2, 'Слишком близко к левому концу');
		genAssert(extremum.length > 2, 'Экстремумов недостаточно');


		let condition = [
			['сумму точек', extremum.T()[0].sum()],
			['количество точек', extremum.length]
		].iz();

		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ct.font = "12px liberation_sans";
			ct.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ct.drawLine(20 * minX, 5, 20 * minX, -5);
			if (maxX != 0 && maxX != 1)
				ct.fillText(maxX, 20 * maxX - 5, 15);
			if (minX != 0 && minX != 1)
				ct.fillText(minX, 20 * minX - 10, 15);
			ct.scale(20, -20);
			ct.lineWidth = 0.15;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.2);
			ct.fillStyle = "white";
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.1);

			ct.fillStyle = "blue";
		};
		NAtask.setTask({
			text: 'На рисунке изображен график функции $y=f(x)$, определенной на интервале $(' + minX + ';' + maxX +
				')$. Найдите ' + condition[0] + ' экстремума функции $f(x)$.',
			answers: condition[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
/* 27490 7327 7545 520183 520202 621768 621898 624074 624108 7331 7333 7335 
7337 7339 7341 7343 7345 7347 7349 7351 7353 7355 7357 7359 7361 7363 7365 
7367 7369 7371 7373 7375 7377 7379 7381 7383 7385 7387 7389 7391 7393 7395 
7397 7399 7401 7403 7405 7407 7409 7411 7413 7415 7417 7419 7421 7423 7425 
7427 7429 7431 7433 7435 7437 7439 7441 7443 7445 7447 7449 7451 7453 7455 
7457 7459 7461 7463 7465 7467 7469 7471 7473 7475 7477 7479 7481 7483 7485 
7487 7489 7491 7493 7495 7497 7499 7501 7503 7505 7507 7509 7511 7513 7515 
7517 7519 7521 7523 7525 7527 7529 7531 7533 7535 7537 7539 7541 7543 7547
*/
