(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let depth = sl(25, 40, 5);
		let height = sl(10, 20, 5);
		let width = sl(80, 100, 10);
		let steps = sl(4, 6);

		let answer = steps * height * width + (steps - 1) * depth * width;

		let paint = function (ct) {
			ct.fillStyle = '#fff';
			ct.fillRect(0, 0, 480, 260);

			let alpha = Math.PI / 7;
			let cosA = Math.cos(alpha);
			let sinA = Math.sin(alpha);

			let pt = function (x, z, y, ox, oy, k) {
				return [
					ox + k * (x + z * cosA),
					oy - k * (y + z * sinA),
				];
			};

			let allPoints3D = [];

			for (let i = 0; i < steps; i++) {
				allPoints3D.push([0, i * depth, i * height]);
				allPoints3D.push([width, i * depth, i * height]);
				allPoints3D.push([0, i * depth, (i + 1) * height]);
				allPoints3D.push([width, i * depth, (i + 1) * height]);
			}

			for (let i = 0; i < steps - 1; i++) {
				allPoints3D.push([0, (i + 1) * depth, (i + 1) * height]);
				allPoints3D.push([width, (i + 1) * depth, (i + 1) * height]);
			}

			let raw2D = allPoints3D.map(function (p) {
				return [
					p[0] + p[1] * cosA,
					-(p[2] + p[1] * sinA),
				];
			});

			let xs = raw2D.map(function (p) {
				return p[0];
			});
			let ys = raw2D.map(function (p) {
				return p[1];
			});

			let minX = Math.min.apply(null, xs);
			let maxX = Math.max.apply(null, xs);
			let minY = Math.min.apply(null, ys);
			let maxY = Math.max.apply(null, ys);

			let pad = 18;
			let k = Math.min(
				(480 - 2 * pad) / (maxX - minX),
				(260 - 2 * pad) / (maxY - minY)
			);

			let ox = 240 - k * (minX + maxX) / 2;
			let oy = 130 - k * (minY + maxY) / 2;

			let line = function (p1, p2) {
				ct.lineWidth = 1;
				ct.strokeStyle = '#000';
				ct.drawLine(p1[0], p1[1], p2[0], p2[1]);
			};

			let hatchVertical = function (quad) {
				let xs = quad.map(function (p) {
					return p[0];
				});

				let xMin = Math.min.apply(null, xs);
				let xMax = Math.max.apply(null, xs);
				let stepPx = 7;

				ct.strokeStyle = '#000';
				ct.lineWidth = 0.8;

				for (let x = xMin + stepPx / 2; x < xMax; x += stepPx) {
					let intersections = [];

					for (let i = 0; i < 4; i++) {
						let a = quad[i];
						let b = quad[(i + 1) % 4];

						if (
							(a[0] <= x && b[0] > x) ||
							(b[0] <= x && a[0] > x)
						) {
							let t = (x - a[0]) / (b[0] - a[0]);
							intersections.push(a[1] + t * (b[1] - a[1]));
						}
					}

					if (intersections.length >= 2) {
						intersections.sort(function (a, b) {
							return a - b;
						});

						ct.drawLine(
							x,
							intersections[0],
							x,
							intersections[intersections.length - 1]
						);
					}
				}
			};

			let hatchSlanted = function (quad) {
				let slope = -0.7;
				let stepB = 8;

				let bs = quad.map(function (p) {
					return p[1] - slope * p[0];
				});

				let bMin = Math.min.apply(null, bs);
				let bMax = Math.max.apply(null, bs);

				ct.strokeStyle = '#000';
				ct.lineWidth = 0.8;

				for (let b = bMin + stepB / 2; b < bMax; b += stepB) {
					let intersections = [];

					for (let i = 0; i < 4; i++) {
						let p1 = quad[i];
						let p2 = quad[(i + 1) % 4];
						let dx = p2[0] - p1[0];
						let dy = p2[1] - p1[1];
						let denom = dy - slope * dx;

						if (Math.abs(denom) < 1e-9)
							continue;

						let t = (slope * p1[0] + b - p1[1]) / denom;

						if (t >= 0 && t <= 1) {
							intersections.push([
								p1[0] + t * dx,
								p1[1] + t * dy,
							]);
						}
					}

					if (intersections.length >= 2) {
						intersections.sort(function (a, b) {
							return a[0] - b[0];
						});

						ct.drawLine(
							intersections[0][0],
							intersections[0][1],
							intersections[intersections.length - 1][0],
							intersections[intersections.length - 1][1]
						);
					}
				}
			};

			// Штриховка вертикальных частей ступеней.
			for (let i = 0; i < steps; i++) {
				hatchVertical([
					pt(0, i * depth, i * height, ox, oy, k),
					pt(width, i * depth, i * height, ox, oy, k),
					pt(width, i * depth, (i + 1) * height, ox, oy, k),
					pt(0, i * depth, (i + 1) * height, ox, oy, k),
				]);
			}

			// Штриховка горизонтальных частей ступеней наклонными линиями.
			for (let i = 0; i < steps - 1; i++) {
				hatchSlanted([
					pt(0, i * depth, (i + 1) * height, ox, oy, k),
					pt(width, i * depth, (i + 1) * height, ox, oy, k),
					pt(width, (i + 1) * depth, (i + 1) * height, ox, oy, k),
					pt(0, (i + 1) * depth, (i + 1) * height, ox, oy, k),
				]);
			}

			// Контуры вертикальных частей ступеней.
			for (let i = 0; i < steps; i++) {
				let a = pt(0, i * depth, i * height, ox, oy, k);
				let b = pt(width, i * depth, i * height, ox, oy, k);
				let c = pt(0, i * depth, (i + 1) * height, ox, oy, k);
				let d = pt(width, i * depth, (i + 1) * height, ox, oy, k);

				line(a, b);
				line(a, c);
				line(b, d);
				line(c, d);
			}

			// Контуры горизонтальных площадок между ступенями.
			for (let i = 0; i < steps - 1; i++) {
				let a = pt(0, i * depth, (i + 1) * height, ox, oy, k);
				let b = pt(width, i * depth, (i + 1) * height, ox, oy, k);
				let c = pt(0, (i + 1) * depth, (i + 1) * height, ox, oy, k);
				let d = pt(width, (i + 1) * depth, (i + 1) * height, ox, oy, k);

				line(a, c);
				line(b, d);
				line(c, d);
			}

			// Нижняя площадка.
			let lowerLeft = pt(0, -0.5 * depth, 0, ox, oy, k);
			let lowerRight = pt(width, -0.5 * depth, 0, ox, oy, k);
			let lowerStartLeft = pt(0, 0, 0, ox, oy, k);
			let lowerStartRight = pt(width, 0, 0, ox, oy, k);

			line(lowerLeft, lowerStartLeft);
			line(lowerRight, lowerStartRight);
			line(lowerLeft, lowerRight);

			// Верхняя площадка.
			let upperLeft = pt(0, (steps - 0.5) * depth, steps * height, ox, oy, k);
			let upperRight = pt(width, (steps - 0.5) * depth, steps * height, ox, oy, k);
			let upperStartLeft = pt(0, (steps - 1) * depth, steps * height, ox, oy, k);
			let upperStartRight = pt(width, (steps - 1) * depth, steps * height, ox, oy, k);

			line(upperStartLeft, upperLeft);
			line(upperStartRight, upperRight);
			line(upperLeft, upperRight);
		};

		NAtask.setTask({
			text: 'Несколько ступеней лестницы покрасили в тёмный цвет, как показано на рисунке (штриховкой). ' +
				'Найдите площадь окрашенной поверхности, если глубина каждой ступеньки равна $' + depth + '$ см, ' +
				'высота — $' + height + '$ см, а ширина — $' + width + '$ см. Ответ дайте в квадратных сантиметрах.',
			answers: answer,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 480,
			height: 260,
			paint: paint,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=518403
//Аналоги: 518431, 518451, 518475, 535198; ОБЗ: 2C5710 (дубликат), E4A10A
