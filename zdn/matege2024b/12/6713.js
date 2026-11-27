(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '6713';
		let preference = ['height', 'diagonal'];
		let rand = getSelectedPreferenceFromList(key, preference);
		// Какое основание на чертеже внизу: большее (как во всех заданиях ФИПИ) или меньшее
		let preferenceOrientation = ['biggerBaseBelow', 'biggerBaseAbove'];
		let randOrientation = getSelectedPreferenceFromList(key, preferenceOrientation);

		let side = sl(5, 85);
		let a = sl(5, 110);
		let b = slKrome(a, 5, 110);
		// AB на чертеже внизу, CD вверху; в условии основания идут в порядке a, b, как и раньше
		let [lowerBase, upperBase] = [a, b].sort((x, y) => (randOrientation == 0) ? y - x : x - y);

		const trp = new Trapezoid({
			lengths: {
				lengthAB: lowerBase,
				lengthBC: side,
				lengthCD: upperBase,
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
		// Меньшее основание не меньше 1/6 большего, иначе трапеция на чертеже похожа на треугольник;
		// в ФИПИ отношение оснований от 1/6 (16 и 96 у 9854F7) до 2/3 (62 и 92 у 403FBB)
		genAssert(Math.min(trp.lengthAB, trp.lengthCD) >= Math.max(trp.lengthAB, trp.lengthCD) / 6, 'Основания несоразмерны — трапеция похожа на треугольник');

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
			text: `Основания равнобедренной трапеции равны $${a}$ и $${b}$, боковая сторона равна $${trp.lengthBC}$. Найдите `,
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
			preference: [preference, preferenceOrientation],
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
