(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let letters = latbukv.slice(0, 4);

		let diag1 = sl(1, 2) * 100;
		let diag2 = sl(2.5, 3, 0.1) * 100;

		let r = slKrome(0.5, 0.2, 0.8, 0.1);

		let points = [{
			x: -diag1 * r,
			y: 0
		}, {
			x: 0,
			y: -diag2 / 2
		}, {
			x: diag1 * (1 - r),
			y: 0
		}, {
			x: 0,
			y: diag2 / 2
		}];
		
		let angleA = (2*Math.atan((diag2 / 2) / (diag1 * r))*180/Math.PI).ceil();
		let angleC = (2*Math.atan((diag2 / 2) / (diag1 * (1-r)))*180/Math.PI).ceil();

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.lineWidth = 2;

			ctx.drawFigure(points, [
				[1],
				[0, 1],
				[1, 0, 1]
			]);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[1].x, points[1].y, 7);
			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[3].x, points[3].y, 7);

			ctx.strokeInMiddleOfSegment(points[2].x, points[2].y, points[3].x, points[3].y, 7, 2);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 7, 2);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x + (i == 0? -15: 0), -elem.y + ((i == 1) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В выпуклом четырёхугольнике ABCD известно, что что $AB = DA$ , $BC = CD$ , $\\angle A = ${angleA}^\\circ$, $\\angle C = ${angleC}^\\circ$. Найдите угол $${['B', 'D'].iz()}$. Ответ дайте в градусах.`,
			answers: 0.5*(360 - angleA - angleC),
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=&parent=6563
