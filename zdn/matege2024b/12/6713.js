(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "6713";
		let preference = ['height', 'diagonal'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let side = sl(5, 20);
		let a = sl(5, 20)

		const trp = new Trapezoid({
			lengths: {
				lengthAB: a,
				lengthBC: side,
				lengthCD: slKrome(a, 5, 20),
				lengthDA: side,
			},
			supplementary: {
				calculateDiagonals: true,
				calculateHeights: true,
			}
		});

		if (rand == 1) {
			genAssert(trp.lengthDiagonalAC.isAlmostInteger(), 'Диагональ не целая');
		} else {
			genAssert(trp.lengthHeightACD.isAlmostInteger(), 'Высота не целая');
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
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

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
