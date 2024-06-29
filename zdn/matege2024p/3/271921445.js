(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);

			let stroke = [4, 5];

			let matrixConnections = {
				0: [1, [3, stroke], 5],
				2: [1, [3, stroke],
					[7, stroke]
				],
				4: [
					[3, stroke],
					[5, stroke],
					[11, stroke],
				],
				6: [1, [7, stroke], 9],
				8: [5, [11, stroke], 13],
				10: [
					[7, stroke], 9, 15
				],
				12: [
					[11, stroke], 13, 20
				],
				14: [9, 15, 22],
				17: [16, [18, stroke], 22],
				19: [
					[16, stroke],
					[18, stroke],
					[20, stroke]
				],
				21: [13, 16, 20],
				23: [15, [18, stroke], 22],
			};

			let par1 = new Parallelepiped({
				depth: sl(10, 20),
				height: sl(5, 20),
				width: sl(5, 20),
			});

			let par2 = new Parallelepiped({
				depth: par1.depth,
				height: sl(5, 20),
				width: slKrome(par1.width, 5, 20),
			});

			let par3 = new Parallelepiped({
				depth: par1.depth,
				height: slKrome(par2.height, 3, par2.height - 2),
				width: slKrome(par2.width, 3, par2.width - 2),
			});

			let deltaX = par1.width * sl(-0.5, 0.5, 0.1);

			let vertex3D = par1.verticesOfFigure.concat(par2.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
					x: deltaX,
					y: 0,
					z: -0.5 * (par1.height + par2.height),
				})))
				.concat(par3.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
					x: deltaX,
					y: 0,
					z: -0.5 * (par1.height + par2.height) - 0.5 * (par2.height - par3.height),
				})));

			vertex3D = vertex3D.map((elem) => shiftCoordinate3D(elem, {
				x: 0,
				y: 0,
				z: 0.5 * par2.height,
			}));

			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 1,

				rotationX: -Math.PI / 2 + Math.PI / 14,
				rotationY: 0,
				rotationZ: Math.PI / sl(10, 14),
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

			genAssert(distanceFromPointToSegment(point2D[16], point2D[5], point2D[4]) > 10);
			genAssert(distanceFromPointToSegment(point2D[16], point2D[8], point2D[11]) > 10);
			genAssert(distanceFromPointToSegment(point2D[17], point2D[6], point2D[7]) > 10);
			genAssert(distanceFromPointToSegment(point2D[14], point2D[17], point2D[18]) > 10);

			genAssert([point2D[1], point2D[2]].mt_rasst() > 20);
			genAssert([point2D[5], point2D[8]].mt_rasst() > 20);
			genAssert([point2D[6], point2D[9]].mt_rasst() > 20);


			genAssert((point2D[17].x - point2D[3].x).abs() > 10);
			genAssert((point2D[7].x - point2D[9].x).abs() > 10);
			genAssert((point2D[8].x - point2D[4].x).abs() > 10);
			genAssert((point2D[7].x - point2D[17].x).abs() > 10);
			genAssert((point2D[12].x - point2D[21].x).abs() > 10);
			genAssert((point2D[22].x - point2D[19].x).abs() > 10);
			genAssert((point2D[14].y - point2D[19].y).abs() > 10);
			genAssert((point2D[16].y - point2D[11].y).abs() > 10);
			genAssert((point2D[6].y - point2D[2].y).abs() > 10);

			genAssert((point2D[13].x - point2D[21].x).abs() > 40);

			genAssert((0.5 * (par2.width - par3.width)).isZ());

			let rand = sl1();

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
				ctx.strokeStyle = om.secondaryBrandColors;
				ctx.drawFigureVer2(point2D, matrixConnections);

				let point;

				switch (true) {
				case (point2D[2].x > point2D[9].x && point2D[2].x > point2D[6].x && point2D[2].x > point2D[10].x):
					ctx.drawLine(point2D[2].x, point2D[2].y, point2D[7].x, point2D[7].y);
					ctx.drawLine(point2D[6].x, point2D[6].y, point2D[7].x, point2D[7].y);
					ctx.drawLine(point2D[10].x, point2D[10].y, point2D[7].x, point2D[7].y);
					break;
				case (point2D[2].x < point2D[9].x):
					point = [point2D[2], point2D[7], point2D[9], point2D[6]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[2].x, point2D[2].y, point.x, point.y);
					break;
				case (point2D[2].x >= point2D[9].x && point2D[2].x <= point2D[10].x):
					point = [point2D[2], point2D[7], point2D[9], point2D[10]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[2].x, point2D[2].y, point.x, point.y);
					break;
				}

				switch (true) {
				case (point2D[4].x < point2D[8].x):
					ctx.drawLine(point2D[5].x, point2D[5].y, point2D[4].x, point2D[4].y);
					point = [point2D[4], point2D[11], point2D[8], point2D[13]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[4].x, point2D[4].y, point.x, point.y);
					break;
				case (point2D[5].x < point2D[8].x):
					point = [point2D[4], point2D[5], point2D[8], point2D[13]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[5].x, point2D[5].y, point.x, point.y);
					break;
				}

				switch (true) {
				case (point2D[19].x < point2D[17].x):
					ctx.drawLine(point2D[19].x, point2D[19].y, point2D[16].x, point2D[16].y);
					point = [point2D[18], point2D[19], point2D[17], point2D[22]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[19].x, point2D[19].y, point.x, point.y);
					ctx.drawLine(point2D[19].x, point2D[19].y, point2D[20].x, point2D[20].y);
					break;
				case (point2D[19].x > point2D[17].x):
					point = [point2D[16], point2D[19], point2D[17], point2D[22]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[16].x, point2D[16].y, point.x, point.y);
					point = [point2D[20], point2D[19], point2D[23], point2D[22]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[20].x, point2D[20].y, point.x, point.y);
					break;
				}


				ctx.font = "20px liberation_sans";
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[6].x, point2D[6].y, par1.height, 5, 20);
				ctx.signSegmentInMiddle(point2D[9].x, point2D[9].y, point2D[14].x, point2D[14].y, par2.height, 5, 20);
				ctx.signSegmentInMiddle(point2D[16].x, point2D[16].y, point2D[21].x, point2D[21].y, par3.height, 5, 20);
				ctx.signSegmentInMiddle(point2D[0].x, point2D[0].y, point2D[1].x, point2D[1].y, par1.width, 18, 20);
				ctx.signSegmentInMiddle(point2D[13].x, point2D[13].y, point2D[21].x, point2D[21].y, 0.5 * (par2.width - par3.width), 18, 20);
				ctx.signSegmentInMiddle(point2D[22].x, point2D[22].y, point2D[14].x, point2D[14].y, 0.5 * (par2.width - par3.width), 18, 20);
				ctx.signSegmentInMiddle(point2D[16].x, point2D[16].y, point2D[17].x, point2D[17].y, par3.width, 18, 20);
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[2].x, point2D[2].y, par1.depth, 10, 20);
			};
			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
					answers: [par1.surfaceArea - [2 * par2.baseArea, 2 * par1.baseArea].minE() + par2.surfaceArea + 2 * par3.height * par3.depth - 2 * par3.height * par3.width, par1.volume + par2.volume - par3.volume][rand],
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		10000);

})();
//27192144
