(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);

			let stroke = [4, 2];

			let matrixConnections = {
				0: [1, [3, stroke], 5],
				2: [1, [3, stroke], 7],
				4: [
					[3, stroke], 5, 7
				],
				6: [1, 5, 7],
				8: [9, 11, 13],
				10: [
					[9, stroke],
					[11, stroke],
					[15, stroke]
				],
				12: [
					[11, stroke],
					[13, stroke],
					[15, stroke]
				],
				14: [9, 13, [15, stroke]],
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

			let vertex3D = par1.verticesOfFigure.concat(par2.verticesOfFigure);

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
			genAssert((point2D[3].y - point2D[8].y).abs() > 20);
			genAssert((point2D[3].x - point2D[8].x).abs() > 20);
			genAssert([point2D[11], point2D[3], point2D[8]].mt_is3ug(), 'Точки лежат на одной прямой');
			genAssert(distanceFromPointToSegment(point2D[3], point2D[8], point2D[11])>10, 'Рёбра слились');

			let rand = sl1();

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
				ctx.strokeStyle = om.secondaryBrandColors;
				ctx.drawFigureVer2(point2D, matrixConnections);

				let point = [point2D[13], point2D[14], point2D[11], point2D[12]].mt_coordinatesOfIntersectionOfTwoSegments();
				ctx.drawLine(point2D[11].x, point2D[11].y, point.x, point.y);
				point = [point2D[10], point2D[11], point2D[9], point2D[14]].mt_coordinatesOfIntersectionOfTwoSegments();
				ctx.drawLine(point2D[11].x, point2D[11].y, point.x, point.y);

				ctx.font = "20px liberation_sans";
				ctx.signSegmentInMiddle(point2D[2].x, point2D[2].y, point2D[7].x, point2D[7].y, par1.height, 10, 20);
				ctx.signSegmentInMiddle(point2D[8].x, point2D[8].y, point2D[13].x, point2D[13].y, par2.height, -22, 20);
				ctx.signSegmentInMiddle(point2D[8].x, point2D[8].y, point2D[9].x, point2D[9].y, par2.width, -5, 20);
				ctx.signSegmentInMiddle(point2D[0].x, point2D[0].y, point2D[1].x, point2D[1].y, par1.width, 18, 20);
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[2].x, point2D[2].y, par1.depth, 18, 20);
			};

			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] + ' многогранника, изображённого на рисунке (все двугранные углы – прямые)..',
				answers: [par1.surfaceArea + par2.surfaceArea - 4 * par2.height * par2.width, par1.volume - par2.volume][rand],
				author: ['Суматохина Александра']
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27195 25711 25713 25715 25717 25719
