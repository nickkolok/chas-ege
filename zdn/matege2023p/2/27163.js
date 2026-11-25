(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'большого круга');

	retryWhileError(function() {

		let radiuses = [[3, 4], [5, 12], [8, 15], [7, 24], [20, 21]].iz();
		let scale = sl(1, 5);
		radiuses = radiuses.map(radius => radius * scale);

		let radiusNew = [radiuses.veclengthSquared(), ['площадь поверхности', 'площадь большого круга']
			.iz()
		];


		let greatCircle = radiusNew[1] === 'площадь большого круга';
		let paint1 = function(ctx) {
			ctx.translate(-10, 0);
			ctx.lineWidth = 2;
			ctx.fillStyle = '#61DC9A';
			let drawScale = 100 / radiuses.maxE();
			radiuses.forEach((radius, i) => {
				let cx = 120 + 220 * i, cy = 150;
				let r = radius * drawScale, ry = r / 4;
				if (greatCircle) {
					ctx.beginPath();
					ctx.ellipse(cx, cy, r, ry, 0, 0, 2 * Math.PI);
					ctx.fill();
				} else {
					ctx.fillKrug(cx, cy, r);
				}
				ctx.drawCircle(cx, cy, r);
				ctx.drawEllipse(cx, cy, r, ry, 0, 0, Math.PI);
				ctx.setLineDash([5, 5]);
				ctx.drawEllipse(cx, cy, r, ry, 0, Math.PI, 2 * Math.PI);
				ctx.setLineDash([]);
				ctx.drawLine(cx, cy, cx + r, cy);
			});
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'Радиусы двух шаров равны $' + radiuses.join('$ и $') + '$. ' +
				'Найдите радиус шара, ' + radiusNew[1] + ' которого равна ' +
				'сумме ' + (greatCircle ? 'площадей больших кругов' :
					sklonlxkand(radiusNew[1]).rm) + ' двух данных шаров.',
			answers: radiusNew[0].sqrt(),
			authors: ['Суматохина Александра'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27163 76361 76377 76363 76365 76367 76369 76371 76373 76375 76379 76381


