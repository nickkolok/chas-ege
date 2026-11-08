(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let a = sl(10, 50);
		let letters = latbukv.slice(0, 4).concat(`O`);

		let rect = new Rectangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 10, 50),
			},
			supplementary: {
				calculateDiagonals: true
			}
		});

		genAssert(rect.lengthDiagonalAC.isAlmostInteger(), 'Диагональ не целая');
		
		let side = [[['AB', 'CD'].iz(), rect.lengthAB], [['BC', 'AD'].iz(), rect.lengthBC]].iz();
		let diagonal = [[['BO', 'DO'].iz(), 'AC'],[['AO', 'CO'].iz(), 'BD']].iz();

		rect.connectVerticesInConnectionMatrix([
			[0, 2],
			[1, 3]
		]);

		let points = autoScale(rect.vertices.concat({
			x: 0,
			y: 0
		}));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rect.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: ` Диагонали $AC$ и $BD$ прямоугольника $ABCD$ пересекаются в точке $O$, $${diagonal[0]} = ${0.5*rect.lengthDiagonalAC}$, $${side[0]} = ${side[1]}$. Найдите $${diagonal[1]}$.`,
			answers: rect.lengthDiagonalAC,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=356927
