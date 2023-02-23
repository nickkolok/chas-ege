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
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				if (i % 2)
					Y[i] = Y[i - 1] + sl(1, 4).pm();
				else
					Y[i] = 0;
			} while (Y[i].abs() > 5);
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		let root = [];
		let rootView = [];
		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push([i, f(i)]);
			}
			if (extremum.length > 0)
				genAssert(extremum[extremum.length - 1][1].abs().round() != 0, 'Слишком непонятный экстремум');
		}
		for (let i = minX; i < maxX; i += 0.001) {
			if (f(i) * f(i - 0.001) < 0) {
				root.push(i);
				rootView.push(i.round());
				genAssert((root[root.length - 1].abs() - rootView[rootView.length - 1].abs()).abs() < 0.1);
			}
		}
		genAssert(extremum.length > 2, 'Экстремумов недостаточно');

		let maxLengthOfIncreasing = [];
		let maxLengthOfDecreasing = [];

		let interval = [minX].concat(rootView);
		interval.push(maxX);

		for (let i = 1; i < interval.length; i++) {
			let len = interval[i] - interval[i - 1];
			if (f(interval[i - 1] + len / 2) > 0)
				maxLengthOfIncreasing.push(len);
			else
				maxLengthOfDecreasing.push(len);
		}


		let condition = [['возрастания', [
			['наибольшего', maxLengthOfIncreasing.maxE()],
			['наименьшего', maxLengthOfIncreasing.minE()]
		].iz()],['убывания', [
			['наибольшего', maxLengthOfDecreasing.maxE()],
			['наименьшего', maxLengthOfDecreasing.minE()]
		].iz()]].iz();
		
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
			text: 'На рисунке изображен график производной функции $f(x)$, определенной на интервале $(' + minX + ';' +
				maxX + ')$. ' +
				'Найдите промежутки '+condition[0]+' функции $f(x)$. В ответе укажите длину '+condition[1][0]+' из них.',
			answers: condition[1][1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
/*27499 8301 8539 8545 509557 509599 8307 8309 8313 8319 8321 8325 8327 8329 
8337 8339 8349 8357 8359 8369 8375 8377 8379 8381 8383 8385 8389 8395 8401 
8403 8407 8411 8415 8421 8423 8425 8427 8429 8439 8445 8449 8453 8455 8457 
8459 8461 8463 8467 8469 8475 8477 8479 8481 8483 8485 8487 8491 8493 8495 
8499 8505 8511 8521 8525 8527 8529 8533 8535 8541 
*/
