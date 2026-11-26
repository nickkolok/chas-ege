(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3).concat('H');

		let key = "10877";
		let preference = ['BH_by_sin', 'CH_by_cos'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Как в ФИПИ: BC целое, синус или косинус угла A — десятичная дробь от 0,1 до 0,8
		// (sin A = 0,25, cos A = 0,7 и т. п.); катет AC при этом обычно не целый, в условие он не входит
		let BC = sl(4, 50);
		let trigA = sl(0.1, 0.8, 0.05);
		// КОСТЫЛЬ: чертёж при малом синусе (косинусе) рисуется не в масштабе.
		// Отрезок BH (в варианте с косинусом — AH) равен AB·sin²A (AB·cos²A): при 0,1 это
		// 1 % гипотенузы, около 3 пикселей, подписи B и H сливаются, треугольник почти отрезок.
		// Поэтому треугольник triangle строится только для чертежа и при значении меньше 0,25
		// рисуется так, будто оно равно 0,25 (как у 47BD49, где чертёж читается).
		// Условие и ответ берут настоящее trigA, а не triangle. Так же поступает ФИПИ:
		// у B03DFF (sin A = 0,1) картинка не в масштабе.
		let trigDrawn = Math.max(trigA, 0.25);
		let otherTrig = (1 - trigDrawn * trigDrawn).sqrt();
		let tgA = [trigDrawn / otherTrig, otherTrig / trigDrawn][rand];
		let triangle = new Triangle({
			lengths: {
				lengthCA: BC / tgA,
				lengthBC: BC,
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		triangle.addVertexToConnectionMatrix(triangle.heightCEndPoint, 'C');

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0], points[2], points[1]], 15);
			ctx.arcBetweenSegments([points[0], points[3], points[2]], 20);

			ctx.signVertices(points, letters, {above: [2]});
			ctx.scale(1, -1);
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $C$ равен $90^\\circ$, $CH$ – высота, $BC=${triangle.lengthBC}$, `,
			questions: [
				[{
					text: `$\\sin A=${trigA}$. Найдите длину отрезка $BH$.`,
					answers: BC * trigA, // BH = BC·sin A; не из triangle: он нарисован с trigDrawn
				}, {
					text: `$\\cos A=${trigA}$. Найдите высоту $CH$.`,
					answers: BC * trigA, // CH = BC·cos A; не из triangle: он нарисован с trigDrawn
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: [preference]
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10877
// ФИПИ 821603 79B01E 666B10 512EC7 6FE7EF F78F6C CA9467 B58239 FE0E85 4E9383 47BD49 C1F842 B03DFF A6B1F3 306EB7 DCDDA4 ED1CC2 35F06D C33162 3FA8F2
