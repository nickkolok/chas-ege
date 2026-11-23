(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '6713';
		let preference = ['height', 'diagonal'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let side = sl(5, 85);
		let a = sl(5, 110);

		const trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthBC: side,
				lengthCD: slKrome(a, 5, 110),
				lengthDA: side,
			},
			supplementary: {
				calculateDiagonals: true,
				calculateHeights: true,
			}
		});

		if (rand == 1) {
			genAssertAlmostInteger(trp.lengthDiagonalAC, 'Диагональ не целая');
		} else {
			genAssertAlmostInteger(trp.lengthHeightACD, 'Высота не целая');
		}

		if (rand == 1) {
			trp.connectVerticesInConnectionMatrix([
				[
					[0, 2],
					[1, 3]
				].iz()
			]);
		}

		let points = autoScale(trp.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, trp.connectionMatrix);
		};

		NAtask.setTask({
			text: `Основания равнобедренной трапеции равны $${trp.lengthAB}$ и $${trp.lengthCD}$, боковая сторона равна $${trp.lengthBC}$. Найдите `,
			questions: [
				[{
					text: `высоту`,
					answers: trp.lengthHeightACD,
				}, {
					text: `длину диагонали`,
					answers: trp.lengthDiagonalAC,
				}][rand]
			],
			postquestion: ` трапеции.`,
			authors: ['Александра Суматохина'],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=6713
// https://base.mathege.ru/clones/?position=16&parent=6718
