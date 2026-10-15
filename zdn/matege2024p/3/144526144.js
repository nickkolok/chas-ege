(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);

			let stroke = [4, 2];

			let matrixConnections = {
				0: [1, [3, stroke], 5],
				2: [1, [3, stroke], 7],
				4: [
					[3, stroke], 5, [11, stroke]
				],
				6: [1, 7, 9],
				8: [5, [11, stroke], 13],
				10: [
					[7, stroke],
					[9, stroke],
					[15, stroke]
				],
				12: [
					[11, stroke], 13, 15
				],
				14: [9, 13, 15],
			};

			let par1 = new Parallelepiped({
				depth: sl(10, 20),
				height: sl(10, 20),
				width: sl(10, 20),
			});

			let par2 = new Parallelepiped({
				depth: par1.depth,
				height: sl(5, par1.height - 4),
				width: slKrome(par1.width, 5, par1.width - 5),
			});

			let deltaWidth = par1.width - par2.width;
			let diagonal = (0.25 * deltaWidth.pow(2) + par2.height.pow(2)).sqrt();

			let vertex3D = par1.verticesOfFigure.concat(par2.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
				x: 0,
				y: 0,
				z: -0.5 * (par1.height - par2.height),
			})));

			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 1,

				rotationX: -Math.PI / 2 + Math.PI / 14,
				rotationY: 0,
				rotationZ: Math.PI / sl(12, 14),
			};

			let point2D = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

			autoScale(vertex3D, camera, point2D, {
				startX: -180,
				finishX: 160,
				startY: -160,
				finishY: 160,
				maxScale: 100,
			});

			point2D = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));
			genAssert((point2D[4].x - point2D[8].x).abs() > 20);
			genAssert((point2D[4].y - point2D[13].y).abs() > 50);
			genAssert((point2D[12].x - point2D[14].x).abs() > 40);
			genAssert([point2D[0], point2D[3], point2D[8]].mt_is3ug(), 'Точки лежат на одной прямой');

			let rand = sl1();

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
				ctx.strokeStyle = om.secondaryBrandColors;
				ctx.drawFigureVer2(point2D, matrixConnections);
				
				let point = [];
				ctx.drawLine(point2D[4].x, point2D[4].y, point.x, point.y);
				if (point2D[6].x < point2D[15].x)
					point = [point2D[10], point2D[15], point2D[6], point2D[7]].mt_coordinatesOfIntersectionOfTwoSegments();
				else
					point = [point2D[10], point2D[15], point2D[6], point2D[9]].mt_coordinatesOfIntersectionOfTwoSegments();
				ctx.drawLine(point2D[15].x, point2D[15].y, point.x, point.y);
				
				point = [point2D[12], point2D[13], point2D[4], point2D[11]].mt_coordinatesOfIntersectionOfTwoSegments();
				ctx.drawLine(point2D[4].x, point2D[4].y, point.x, point.y);

				ctx.font = "20px liberation_sans";
				ctx.signSegmentInMiddle(point2D[2].x, point2D[2].y, point2D[7].x, point2D[7].y, par1.height, 10, 20);
				ctx.signSegmentInMiddle(point2D[9].x, point2D[9].y, point2D[14].x, point2D[14].y, par2.height, -24, 20);
				ctx.signSegmentInMiddle(point2D[12].x, point2D[12].y, point2D[15].x, point2D[15].y, par2.width, -10, 20);
				ctx.signSegmentInMiddle(point2D[0].x, point2D[0].y, point2D[1].x, point2D[1].y, par1.width, 18, 20);
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[2].x, point2D[2].y, par1.depth, 18, 20);
			};

			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +	' многогранника, изображённого на рисунке.',
				answers: [par1.surfaceArea - deltaWidth * (par2.height + par2.depth) + 2 * par2.height * par2.depth + 2 *
					diagonal * par2.depth,
					par1.volume - par2.height * (par1.width - par2.width) * par2.width
				][rand],
				author: ['Суматохина Александра']
			});
			NAtask.modifiers.multiplyAnswerBySqrt(13);
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//144526144
