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
		genAssert(trp.lengthHeightACD >= Math.max(trp.lengthAB, trp.lengthCD) / 8, 'Слишком плоская трапеция — плохой чертёж');
		// Острый угол при основании не больше 80°, иначе трапеция на чертеже не отличается
		// от прямоугольника; в ФИПИ он от 37° до 77° (21, 57 и 82 у 668719)
		genAssert(Math.min(trp.angleAInDegrees, trp.angleDInDegrees) <= 80, 'Трапеция похожа на прямоугольник — плохой чертёж');

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
// ФИПИ 57AD4C FB94B8 5FA332 9F88F0 9854F7 00820A 7FBD08 5B2F01 403FBB D7CDBE BD9615 668719 3EBC1F 887C11 2DAB24 228422 82F024 190BD4 3116D9 227050 DA4B51 829F56 BA9BAD 9A83A2 2663CA DE76CF 3B32C4 19E7E8 96B9E4 E3F2E0 9E3C63 61866D DB2382
