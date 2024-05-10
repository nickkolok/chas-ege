(function() {
	lx_declareClarifiedPhrase('площадь', 'полной поверхности');
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('диагональ', 'одной из боковых сторон');
	lx_declareClarifiedPhrase('диагональ', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('сторона', 'основания');
	lx_declareClarifiedPhrase('площадь', ' боковой поверхности');

	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let cyl = new Cylinder({
				radius: sl(1, 50),
				height: sl(1, 50)
			});

			let par = new Parallelepiped({
				width: 2 * cyl.radius,
				depth: 2 * cyl.radius,
				height: cyl.height
			});

			let rand1 = sl1();
			let rand2 = sl1();

			let nameCylinder = [
				['высота', cyl.height],
				[
					['площадь боковой поверхности', cyl.sideSurfaceArea],
					['объём', cyl.volume]
				].iz(), ['радиус основания', cyl.radius],
				['площадь основания', cyl.baseArea],
			].iz(3);

			let nameParal = [
				['площадь полной поверхности', par.surfaceArea],
				['объём', par.volume],
				['диагональ', par.mainDiagonal],
				['диагональ одной из боковых сторон', par.DHDiagonal],
				[
					['сторона основания', par.width],
					['диагональ основания', par.DWDiagonal]
				].iz(),
			].iz(3);

			let strok = [5, 4];

			let parForPaint = new Parallelepiped({
				width: 280,
				depth: 280,
				height: 200
			});

			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 1,

				rotationX: -Math.PI / 2 + Math.PI / 14,
				rotationY: 0,
				rotationZ: -20 * Math.PI / 19,
			};

			let point2DPar = parForPaint.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;
				ctx.translate(w / 2, h / 2);
				ctx.strokeStyle = om.secondaryBrandColors;

				ctx.lineWidth = 2;
				ctx.drawFigure(point2DPar, [
					[strok],
					[0, 1],
					[strok, 0, 1],
					[0, 0, 0, 1],
					[strok, 0, 0, 0, 1],
					[0, 1, 0, 0, 0, 1],
					[0, 0, 1, 0, 1, 0, 1, ],
				]);
				let coord1 = coordinatesMiddleOfSegment3D(point2DPar[5], point2DPar[7]);
				let coord2 = coordinatesMiddleOfSegment3D(point2DPar[1], point2DPar[2]);
				let coord3 = coordinatesMiddleOfSegment3D(point2DPar[6], point2DPar[7]);
				let coord4 = coordinatesMiddleOfSegment3D(point2DPar[0], point2DPar[3]);
				let coord5 = coordinatesMiddleOfSegment3D(point2DPar[4], point2DPar[5]);

				let radius = 140 - 2;

				//цилиндр
				ctx.strokeStyle = om.primaryBrandColors.iz();
				ctx.drawEllipse(0, coord1.y, radius, 30, 0, 0, 2 * Math.PI);
				ctx.drawLine(coord2.x, coord2.y, coord2.x, coord3.y);

				ctx.setLineDash([4, 5]);
				ctx.drawLine(coord5.x, coord5.y, coord4.x, coord4.y);
				ctx.drawEllipse(0, -coord1.y, radius, 30, 0, 0, 2 * Math.PI);
			};

			NAtask.setTask({
				text: 'Прямоугольный параллелепипед описан около цилиндра. ' + 
				[[nameParal[0][0].toZagl(), nameCylinder[0][0].toZagl()][rand1] +
					' и ' + [nameParal[1][0], nameCylinder[1][0]][rand1] + ' ' + ['параллелепипеда', 'цилиндра'][rand1] +
					' равны $' + [nameParal[0][1].pow(2).texsqrt(1), nameCylinder[0][1].texpi()][rand1] +
					'$ и $' + [nameParal[1][1].pow(2).texsqrt(1), nameCylinder[1][1].texpi()][rand1] +
					'$ соотвественно', 
					nameCylinder[0][0].toZagl() + ' которого ' + ' рав' + ['ен', 'на', 'но'][sklonlxkand(nameCylinder[0][0]).rod] + 
					' $' + nameCylinder[0][1].texpi() + '$. ' +
					nameParal[0][0].toZagl() + ' параллелепипеда ' + ' рав' + ['ен', 'на', 'но'][sklonlxkand(nameParal[0][0]).rod] +
					' $' + nameParal[0][1].pow(2).texsqrt(1) + '$'
				][rand2] + '. Найдите ',
				questions: [{
					text: [sklonlxkand(nameCylinder[2][0]).ve, sklonlxkand(nameParal[2][0]).ve][rand1],
					answers: [nameCylinder[2][1], nameParal[2][1]][rand1]
				}],
				postquestion: ' ' + ['цилиндра', 'параллелепипеда'][rand1] + '.',
			});
			NAtask.modifiers.multiplyAnswerBySqrt(13);
			NAtask.modifiers.multiplyAnswerByPI();
			NAtask.modifiers.allDecimalsToStandard(true);
			NAtask.modifiers.assertSaneDecimals();
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27041 4861 71921 71927 4863 4865 4867 4869 27177 71889 71891 71893 71895 71897 71899 71901 71903 71905 71907 71909 71911 71913 71915 71917 71919 71923 71925
