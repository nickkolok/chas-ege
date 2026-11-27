(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '509780';
		let preference = ['area', 'side', 'base'];

		let rand = getSelectedPreferenceFromList(key, preference);

		let trp = new Trapezoid({
			lengths: {
				lengthAB: sl(10, 15),
				lengthCD: sl(2, 5),
			},
			height: sl(2, 5),
			angles: {
				angle: {
					angleD: 150,
				},
				angleInDegree: true,
			},
		});

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);

		};

		NAtask.setTask({
			text: ``,
			questions: [
				[{
					text: `Основания трапеции равны $${[trp.lengthAB, trp.lengthCD].shuffleJoin('$ и $')}$, боковая сторона, равная $${trp.lengthDA}$, образует с одним из оснований трапеции угол $${trp.angleDInDegrees.round()}^\\circ$. Найдите площадь трапеции.`,
					answers: trp.area(),
				}, {
					text: `Основания трапеции равны $${[trp.lengthAB, trp.lengthCD].shuffleJoin('$ и $')}$, площадь трапеции равна $${trp.area()}$. Найдите боковую сторону, которая образует с одним из оснований трапеции угол $${trp.angleDInDegrees.round()}^\\circ$.`,
					answers: trp.lengthDA,
				}, {
					text: `Одно из оснований трапеции равно $${trp.lengthAB}$, боковая сторона, равная $${trp.lengthDA}$, образует с одним из оснований трапеции угол $${trp.angleDInDegrees.round()}^\\circ$, площадь трапеции равна $${trp.area()}$. Найдите второе основание.`,
					answers: trp.lengthCD,
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509780
