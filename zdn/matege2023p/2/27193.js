(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);

			let stroke = [4, 5];

			let matrixConnections = {
				0: [1, [3,stroke], 5	],
				2: [1, [3,stroke], 7],
				4: [[3,stroke], 5, 11],
				6: [1, 7, 9],
				8: [5, [11,stroke], 13],
				10: [7, 9, 15],
				12: [[11,stroke], 13, 15],
				14: [9, 13, 15],
			};

			let par1 = new Parallelepiped({
				depth: sl(10, 20),
				height: sl(5, 20),
				width: sl(10, 20),
			});

			let par2 = new Parallelepiped({
				depth: par1.depth,
				height: sl(5, 20),
				width: slKrome(par1.width, 5, par1.width - 5),
			});

			let vertex3D = par1.verticesOfFigure.concat(par2.verticesOfFigure.map((elem) => shiftCoordinate3D(elem, {
				x: 0,
				y: 0,
				z: -0.5 * (par1.height + par2.height),
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
				rotationZ: Math.PI / sl(10,14),
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
			genAssert((point2D[4].x-point2D[8].x).abs()>20);
			genAssert((point2D[4].y-point2D[13].y).abs()>50);
			genAssert((point2D[12].x-point2D[14].x).abs()>40);

			let rand = sl1();

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
				ctx.strokeStyle = om.secondaryBrandColors;
				ctx.drawFigureVer2(point2D, matrixConnections);
				
				ctx.setLineDash(stroke);
				ctx.strokeStyle = '#FFFFFF';
				if(point2D[4].x>point2D[8].x){
					ctx.drawLine(point2D[4].x, point2D[4].y, point2D[11].x, point2D[11].y);
					let point = [point2D[4], point2D[5],point2D[8], point2D[13]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[4].x+1, point2D[4].y, point.x, point.y);
				}
				else {
					let point = [point2D[4], point2D[11],point2D[8], point2D[13]].mt_coordinatesOfIntersectionOfTwoSegments();
					ctx.drawLine(point2D[11].x, point2D[11].y, point.x, point.y);
				}
				
				ctx.font = "20px liberation_sans";
				ctx.signSegmentInMiddle(point2D[2].x, point2D[2].y, point2D[7].x, point2D[7].y, par1.height, 10, 20);
				ctx.signSegmentInMiddle(point2D[10].x, point2D[10].y, point2D[15].x, point2D[15].y, par2.height, 10, 20);
				ctx.signSegmentInMiddle(point2D[12].x, point2D[12].y, point2D[15].x, point2D[15].y, par2.width, -10, 20);
				ctx.signSegmentInMiddle(point2D[0].x, point2D[0].y, point2D[1].x, point2D[1].y, par1.width, 18, 20);
				ctx.signSegmentInMiddle(point2D[1].x, point2D[1].y, point2D[2].x, point2D[2].y, par1.depth, 18, 20);
			};
			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: [par1.surfaceArea+par2.surfaceArea - 2*par2.baseArea, par1.volume+par2.volume][rand],
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27193 25671 25673 25675 25677 25679
