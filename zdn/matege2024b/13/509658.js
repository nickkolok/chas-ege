(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	let key = '513803';
	let preference = ['findVolume', 'findSide'];
	let rand = getSelectedPreferenceFromList(key, preference);

	let m = sl(2, 6);
	let k = sl(3, 9);

	let figure = new RectangularPyramidWithEquilateralTriangleAtBase({
		height: k * Math.sqrt(3),
		side: 2 * m,
	});
	
	let a = figure.side;
	let V = figure.volume;
	let baseAreaCoefficient = figure.baseArea / Math.sqrt(3);
	let heightCoefficient = figure.height / Math.sqrt(3);

	let hTex = (heightCoefficient == 1 ? '' : heightCoefficient) + '\\sqrt{3}';

	let letters = ['S', 'A', 'B', 'C'];
	let pyr = letters.join('');
	let osn = letters.slice(1).join('');
	let sa = letters[0] + letters[1];

	// Порядок вершин в модели: A, B, C, S
	let vertex3D = figure.verticesOfFigure;
	let matrixPyr = figure.connectionMatrix.map(function (row) {
		return row.slice();
	});
	matrixPyr[0][0] = [5, 3];

	let camera = {
		x: 0,
		y: 0,
		z: 0,
		scale: 5,

		rotationX: -Math.PI / 2 + Math.PI / 14,
		rotationY: 0,
		rotationZ: Math.PI / 10,
	};

	let point2DPyr = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

	autoScale(vertex3D, camera, point2DPyr, {
		startX: -150,
		finishX: 150,
		startY: -150,
		finishY: 150,
		maxScale: 200,
	});

	point2DPyr = vertex3D.map((coord3D) => project3DTo2D(coord3D, camera));

	let text, analys, answers;
	if (rand == 0) {
		text = 'В основании пирамиды $' + pyr + '$ лежит правильный треугольник $' + osn +
			'$ со стороной $' + a + '$, а боковое ребро $' + sa +
			'$ перпендикулярно основанию и равно $' + hTex + '$. Найдите объём пирамиды $' + pyr + '$.';
		analys = 'Площадь правильного треугольника со стороной $a=' + a + '$ равна $\\frac{\\sqrt{3}}{4}a^2=' +
			baseAreaCoefficient + '\\sqrt{3}$. Ребро $' + sa +
			'$ перпендикулярно основанию, значит, оно является высотой пирамиды, поэтому объём равен $\\frac{1}{3}\\cdot' +
			baseAreaCoefficient + '\\sqrt{3}\\cdot' + hTex + '=' + V + '$.';
		answers = V;
	} else {
		text = 'Объём пирамиды $' + pyr + '$ равен $' + V +
			'$. В основании пирамиды лежит правильный треугольник $' + osn +
			'$, а боковое ребро $' + sa + '$ перпендикулярно основанию и равно $' + hTex +
			'$. Найдите сторону основания.';
		analys = 'Высота пирамиды — ребро $' + sa + '$, поэтому площадь основания равна $\\frac{3\\cdot' + V + '}{' + hTex +
			'}=' + baseAreaCoefficient + '\\sqrt{3}$. Площадь правильного треугольника со стороной $a$ равна $\\frac{\\sqrt{3}}{4}a^2$, откуда $a=' +
			a + '$.';
		answers = a;
	}

	NAtask.setTask({
		text: text,
		answers: answers,
		analys: analys,
		preference: [preference],
	});

	NAtask.modifiers.variativeABC(letters);
	NAtask.modifiers.allDecimalsToStandard(true);

	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: function (ctx) {
			ctx.translate(200, 200);
			ctx.strokeStyle = om.secondaryBrandColors[0];
			ctx.lineWidth = 2;

			ctx.drawFigure(point2DPyr, matrixPyr);

			// Прямой угол между SA и AB
			ctx.arcBetweenSegments([
				point2DPyr[3].x, point2DPyr[3].y,
				point2DPyr[0].x, point2DPyr[0].y,
				point2DPyr[1].x, point2DPyr[1].y,
			], 14, true);

			ctx.fillStyle = om.secondaryBrandColors[0];
			ctx.font = '20px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			let center = {
				x: point2DPyr.reduce((sum, p) => sum + p.x, 0) / point2DPyr.length,
				y: point2DPyr.reduce((sum, p) => sum + p.y, 0) / point2DPyr.length,
			};

			let vertexLetters = [letters[1], letters[2], letters[3], letters[0]];

			point2DPyr.forEach(function (p, i) {
				let dx = p.x - center.x;
				let dy = p.y - center.y;
				let length = Math.sqrt(dx * dx + dy * dy) || 1;

				ctx.fillText(vertexLetters[i], p.x + 20 * dx / length, p.y + 20 * dy / length);
			});
		},
	});
})();
//https://mathb-ege.sdamgia.ru/problem?id=513803
//chas-ege-selena
