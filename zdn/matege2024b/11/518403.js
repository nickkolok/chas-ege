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
			let alpha = Math.PI / 9;
			let cosA = Math.cos(alpha);
			let sinA = Math.sin(alpha);

			let fieldW = 480;
			let fieldH = 260;
			let pad = 16;

			let fullX = steps * depth + width * cosA;
			let fullY = steps * height + width * sinA;
			let k = Math.min((fieldW - 2 * pad) / fullX, (fieldH - 2 * pad) / fullY);
			let ox = (fieldW - fullX * k) / 2;
			let oy = fieldH - (fieldH - fullY * k) / 2;

			let pt = function (x, y, t) {
				return [
					ox + k * (x + t * width * cosA),
					oy - k * (y + t * width * sinA),
				];
			};

			let line = function (p1, p2) {
				ct.drawLine(p1[0], p1[1], p2[0], p2[1]);
			};

			let hatchVertical = function (quad) {
				let xs = quad.map(function (p) {
					return p[0];
				});
				let xMin = Math.min.apply(null, xs);
				let xMax = Math.max.apply(null, xs);
				let stepPx = 5;
				for (let x = xMin + stepPx / 2; x < xMax; x += stepPx) {
					let ys = [];
					for (let i = 0; i < 4; i++) {
						let a = quad[i];
						let b = quad[(i + 1) % 4];
						if ((a[0] <= x && b[0] > x) || (b[0] <= x && a[0] > x)) {
							let t = (x - a[0]) / (b[0] - a[0]);
							ys.push(a[1] + t * (b[1] - a[1]));
						}
					}
					if (ys.length >= 2) {
						ys.sort(function (p, q) {
							return p - q;
						});
						ct.drawLine(x, ys[0], x, ys[ys.length - 1]);
					}
				}
			};

			ct.strokeStyle = '#000';
			ct.lineWidth = 1;
			let front = [pt(0, 0, 0)];
			let back = [pt(0, 0, 1)];
			for (let i = 0; i < steps; i++) {
				front.push(pt(i * depth, (i + 1) * height, 0), pt((i + 1) * depth, (i + 1) * height, 0));
				back.push(pt(i * depth, (i + 1) * height, 1), pt((i + 1) * depth, (i + 1) * height, 1));
			}
			for (let i = 1; i < front.length; i++)
				line(front[i - 1], front[i]);
			for (let i = 1; i < back.length; i++)
				line(back[i - 1], back[i]);
			line(front[0], back[0]);
			line(front[front.length - 1], back[back.length - 1]);
			line(pt(-0.5 * depth, 0, 0), front[0]);
			line(back[back.length - 1], pt(steps * depth + 0.5 * depth, steps * height, 1));

			ct.strokeStyle = om.secondaryBrandColors.iz();
			for (let i = 0; i < steps; i++) {
				hatchVertical([
					pt(i * depth, i * height, 0),
					pt(i * depth, (i + 1) * height, 0),
					pt(i * depth, (i + 1) * height, 1),
					pt(i * depth, i * height, 1),
				]);
			}
			for (let i = 0; i < steps - 1; i++) {
				hatchVertical([
					pt(i * depth, (i + 1) * height, 0),
					pt((i + 1) * depth, (i + 1) * height, 0),
					pt((i + 1) * depth, (i + 1) * height, 1),
					pt(i * depth, (i + 1) * height, 1),
				]);
			}
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
