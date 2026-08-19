(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}

		function f1(x) {
			return k * x + b;
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 10);
		let minX = maxX - sl(8, 10);

		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 4, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			Y[i] = Y[i - 1] + sl(2, 10).pm();
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push(i);
			}
		}
		let variantsOfK = [];
		let variantsOfB = [];
		for (let i = 0; i < extremum.length; i++) {
			let step = sl(minX + 1, maxX - 1).pm();
			let stepY = (0.5, 2, 0.5).pm();
			variantsOfK.push((stepY / step).okrugldo(0.01));
			variantsOfB.push((f(extremum[i]) - variantsOfK[i] * extremum[i]).okrugldo(0.01));
		}
		genAssertNonempty(variantsOfK, 'Пусто');
		let points1, points2;
		let xk, yk;
		let k;
		let b;
		for (let i = 0; i < variantsOfK.length; i++) {
			if (variantsOfK[i].abs() != Infinity) {
				k = variantsOfK[i];
				b = variantsOfB[i];
				points1 = intPoints(f1, {
					minX: -9.5,
					maxX: extremum[i] - 0.5,
					minY: -6.5,
					maxY: 6.5
				});
				points2 = intPoints(f1, {
					minX: extremum[i] + 0.5,
					maxX: maxX,
					minY: -6.5,
					maxY: 6.5
				});
				if (points1.length < 1 || points2.length < 1) {
					k = undefined;
				} else {
					xk = extremum[i];
					yk = f(extremum[i]);
					break;
				}
			}
		}
		genAssert(k != undefined || k.abs() != 1, 'Не нашлось коэффициентов');
		genAssert(yk.abs() > 1, 'Слишком близко к оси Ох');
		if (xk == 0)
			xk += (sl(0.4, 0.7, 0.1)).pm();
		let letter;
		do {
			letter = slLetter();
		} while (['x', 'y'].includes(letter));
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

			ct.scale(20, -20);
			ct.lineWidth = 0.15;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});

			ct.lineWidth = 0.13;
			graph9AdrawFunction(ct, f1, {
				minX: -10,
				maxX: 10,
				minY: -8,
				maxY: 8,
				step: 0.01
			});

			ct.fillStyle = "green";
			graph9AmarkCircles(ct, points1, 1, 0.15);
			graph9AmarkCircles(ct, points2, 1, 0.15);

			ct.strokeStyle = 'green';
			ct.lineWidth = 0.08;
			ct.setLineDash([0.5, 0.2]);
			if (yk > 0)
				ct.drawLine(xk, yk, xk, 0);
			else
				ct.drawLine(xk, 0, xk, yk);
			graph9AmarkCircles(ct, [
				[xk, 0]
			], 2, 0.15);

			ct.font = "15px liberation_sans";
			ct.scale(1 / 20, -1 / 20);
			if (yk > 0)
				ct.fillText(letter, 20 * xk + 10, 16);
			else
				ct.fillText(letter, 20 * xk + 10, -10);
		};
		NAtask.setTask({
			text: 'На рисунке изображены график функции $y = f(x)$ и касательная к нему в точке с абсциссой $' + letter +
				'$. ' +
				'Найдите значение производной функции $f(x)$ в точке $' + letter + '$.',
			answers: k.ts(),
			analys: 'Значение производной в точке касания равно угловому коэффициенту касательной <br>' +
				'$y=' + (k.ts(1) + ' x+' + b.ts(1)).plusminus() + '$',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
// 27506 510384 510403 9051 9627 505145 505166 517153 520489 
// 520509 549322 630091 9057 9059 9065 9067 9069 9071 9073 9077 
// 9081 9085 9089 9097 9109 9113 9115 9121 9123 9129 9133 9141 
// 9143 9145 9149 9161 9163 9167 9169 9171 9183 9193 9195 9199 
// 9205 9211 9215 9217 9219 9225 9237 9241 9249 9257 9261 9273 
// 9275 9283 9285 9289 9293 9295 9297 9303 9305 9307 9315 9321 
// 9325 9329 9331 9335 9337 9343 9345 9353 9355 9357 9361 9375 
// 9381 9383 9391 9393 9409 9413 9417 9425 9429 9431 9435 9445 
// 9447 9453 9455 9463 9467 9469 9473 9479 9483 9487 9489 9491 
// 9497 9501 9505 9519 9527 9533 9537 9549 9553 9565 9569 9573 
// 9585 9591 9595 9597 9607 9609 9611 9613 9615 9617 9619 9621 
// 9623 9625 9631 9635
