(function() {
	retryWhileError(function() {

		let cube = sl(2, 10).pow(3);
		let radiusNew = cube;
		let radiuses = [];

		while (cube > 0) {
			radiuses.push(sl(1, cube));
			cube -= radiuses[radiuses.length - 1];
		}
		genAssert(radiuses.length < 5 && radiuses.length > 1, 'radiusNew');

		let radiusView = radiuses.map((elem) => elem.texcbrt(1));

		let paint1 = function(ctx) {
			ctx.translateToCenter();
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2;
			let r = 150;
			//шар 1
			ctx.drawCircle(r);

			// Экватор
			ctx.drawEllipse(0, 0, 20, r, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(0, 0, 20, r, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.setLineDash([]);
			ctx.drawLine(0, 0, 0, -r);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'Радиусы ' + ['двух', 'трёх', 'четырёх'][radiuses.length - 2] + ' шаров равны ' + ('$' + radiusView.join(
				'$, $') + '$') + '. Найдите радиус шара, объём которого равен сумме их объёмов.',
			answers: Math.cbrt(radiusNew),
			authors: ['Суматохина Александра'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27125 75307 75309 75311 75313

