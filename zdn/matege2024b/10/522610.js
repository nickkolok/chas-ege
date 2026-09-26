(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '522610';
		let triples = [
			[3, 4, 5],
			[5, 12, 13],
			[6, 8, 10],
			[8, 15, 17],
			[7, 24, 25],
			[20, 21, 29]
		];
		let t = triples.iz();
		let rand = sl1();
		let a = t[rand];
		let b = t[1 - rand];
		let c = t[2];

		let target = ['стене', 'окну'].iz();
		let question = target === 'окну' ? 'На какой высоте расположено окно?' : 'На какой высоте находится верхний конец лестницы?';

		let text = 'Пожарную лестницу длиной $' + c + '$ м приставили к ' + target + ' дома.' +
			' Нижний конец лестницы отстоит от стены на $' + a + '$ м.' +
			' ' + question + ' Ответ дайте в метрах.';

		NAtask.setTask({
			text: text,
			answers: b,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 340,
			height: 320,
			paint: function (ctx) {
				let width = 340;
				let height = 320;
				let left = 70;
				let right = 80;
				let top = 55;
				let bottom = 60;
				let k = Math.min((width - left - right) / a, (height - top - bottom) / b);
				let px = function (x) { return left + x * k; };
				let groundY = height - bottom;
				let py = function (y) { return groundY - y * k; };
				let xDim = px(a) + 34;

				ctx.strokeStyle = 'black';
				ctx.fillStyle = 'black';
				ctx.lineWidth = 2;

				// Земля и стена дома с крышей
				ctx.drawLine(px(0) - 25, groundY, xDim + 10, groundY);
				let wallTop = py(b) - 18;
				ctx.drawLine(px(a), groundY, px(a), wallTop);
				ctx.drawLine(px(a) - 16, wallTop, px(a) + 2, wallTop);
				ctx.drawLine(px(a) - 16, wallTop, px(a) + 55, wallTop - 30);

				// Лестница: несущая линия со ступеньками
				let fx = px(0);
				let fy = groundY;
				let tx = px(a);
				let ty = py(b);
				let dx = tx - fx;
				let dy = ty - fy;
				let len = Math.sqrt(dx * dx + dy * dy);
				let ux = dx / len;
				let uy = dy / len;
				let vx = -uy;
				let vy = ux;
				ctx.drawLine(fx, fy, tx, ty);
				ctx.lineWidth = 1.5;
				for (let s = 8; s < len - 4; s += 11) {
					ctx.drawLine(fx + ux * s - vx * 5, fy + uy * s - vy * 5,
						fx + ux * s + vx * 5, fy + uy * s + vy * 5);
				}

				// Подпись длины лестницы
				ctx.font = '16px liberation_sans';
				ctx.textAlign = 'right';
				ctx.fillText(c + ' м', (fx + tx) / 2 - 14, (fy + ty) / 2 + 5);

				// Горизонтальная размерная линия: расстояние от стены
				ctx.lineWidth = 1;
				let yDim = groundY + 24;
				ctx.drawLine(px(0), groundY, px(0), yDim + 8);
				ctx.drawLine(px(a), groundY, px(a), yDim + 8);
				ctx.drawLine(px(0), yDim, px(a), yDim);
				ctx.drawArrow(px(a), yDim, px(0), yDim);
				ctx.drawArrow(px(0), yDim, px(a), yDim);
				ctx.textAlign = 'center';
				ctx.fillText(a + ' м', (px(0) + px(a)) / 2, yDim + 22);

				// Вертикальная размерная линия: искомая высота
				ctx.drawLine(xDim, groundY, xDim, py(b));
				ctx.drawArrow(xDim, groundY, xDim, py(b));
				ctx.drawArrow(xDim, py(b), xDim, groundY);
				ctx.drawLine(px(a), py(b), xDim + 6, py(b));
				ctx.textAlign = 'left';
				ctx.fillText('? м', xDim + 10, (groundY + py(b)) / 2 + 5);
			},
		});
	}, 20000);
})();
