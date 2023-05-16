(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'большого круга');

	lx['поверхности'] = {
		rm: 'поверхностей',
	};
	
	lx['большого круга'] = {
		rm: 'больших кругов',
	};
	retryWhileError(function() {

		let radiuses = [sl(1, 20)];
		radiuses.push(slKrome(radiuses[0],1, 20));

		let radiusNew = [radiuses.reduce((a, b) => a.pow(2) + b.pow(2)),
			['площадь поверхности','площадь большого круга'].iz()
		];

		console.log(radiusNew);

		let paint1 = function(ctx) {
			ctx.translate(-10, 0);
			ctx.lineWidth = 2;
			//шар 1
			ctx.beginPath();
			ctx.arc(100, 150, 80, 0, Math.PI * 2, true); // Внешняя окружность
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.ellipse(100, 150, 20, 80, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, 150, 20, 80, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			ctx.drawLine(100, 150, 180, 150);

			//шар 2
			ctx.translate(200, 0);
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.arc(100, 150, 100, 0, Math.PI * 2, true); // Внешняя окружность
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();

			ctx.drawLine(100, 150, 200, 150);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'Радиусы двух шаров равны $' + radiuses.join('$ и $') + '$. ' +
				'Найдите радиус шара, ' + radiusNew[1] + ' которого равна ' +
				'сумме ' + sklonlxkand(radiusNew[1]).rm + ' двух данных шаров.',
			answers: radiusNew[0].sqrt(),
			authors: ['Суматохина Александра'],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(7);
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27163 76361 76377 76363 76365 76367 76369 76371 76373 76375 76379 76381
