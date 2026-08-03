(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(5, 10),
				lengthCA: sl(5, 10),
			},
		});

		genAssert(!triangle.isEquilateral(), 'Все стороны треугольника должны быть разными');
		genAssert(triangle.minAngleInDegrees() > 35, 'Треугольник имеет очень острый угол');
		
		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(autoScale(triangle.vertices), triangle.connectionMatrix);
		};

		NAtask.setTask({
			text: `В треугольнике два угла равны $${triangle.angleAInDegrees.ceil()}^{\\circ}$ и $${triangle.angleBInDegrees.ceil()}^{\\circ}$. Найдите его третий угол. Ответ дайте в градусах`,
			answers: 180 - triangle.angleAInDegrees.ceil() - triangle.angleBInDegrees.ceil(),
			authors: ['Александра Суматохина'],
		});

		NAtask.modifiers.allDecimalsToStandard(/*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//348885 349358 349500 349785 349941 350852 350973 351397 352303 352471 352547 353149 369805 369834 369863 424911 425000 425026 401640 401748 401930 402055 402692 402775 403026 403564 403666 403715 404082
