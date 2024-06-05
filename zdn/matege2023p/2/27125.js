(function() {
	retryWhileError(function() {

		let cube = sl(2, 10).pow(3);
		let radiusNew = cube;
		let radiuses = [];

		while (cube > 0) {
			radiuses.push(slKrome(radiuses, 2, cube));
			cube -= radiuses[radiuses.length - 1];
		}
		genAssert(radiuses.length < 5 && radiuses.length > 1, 'radiusNew');
		console.log(radiuses);

		let radiusView = radiuses.map((elem) => elem.texcube(1));

		let paint1 = function(ctx) {
			ctx.translate(30, -40);
			ctx.lineWidth = 2;
			//шар 1
			ctx.beginPath();
			ctx.arc(100, 150, 100, 0, Math.PI * 2, true); // Внешняя окружность
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			ctx.drawLine(100, 150, 200, 150);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'Радиусы ' + ['двух', 'трёх', 'четырёх'][radiuses.length - 2] + ' шаров равны ' + ('$' + radiusView.join(
				'$, $') + '$') + '. Найдите радиус шара, объем которого равен сумме их объемов.',
			answers: Math.cbrt(radiusNew),
			authors: ['Суматохина Александра'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 250,
			paint: paint1,
		});
	}, 1000);
})();
//27125 75307 75309 75311 75313
