(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	let key = '513803';
	let preference = ['findVolume', 'findSide'];
	let rand = getSelectedPreferenceFromList(key, preference);

	// Сторона основания a = 2m, боковое ребро SA = k*sqrt(3), тогда объём V = m*m*k — целый
	let m = sl(1, 6);
	let k = sl(1, 9);
	let a = 2 * m;
	let h = k * Math.sqrt(3);
	let V = m * m * k;
	let mm = m * m;
	let hTex = (k == 1 ? '' : k) + '\\sqrt{3}';

	let letters = ['S', 'A', 'B', 'C'];
	let pyr = letters.join('');
	let osn = letters.slice(1).join('');
	let sa = letters[0] + letters[1];

	// Чертёж ФИКСИРОВАННЫЙ: положение вершин всегда одинаковое,
	// меняются только их обозначения (variativeABC).
	// points[0] — вершина S над точкой points[1] (прямой угол при ней)
	let points = [
		{ x: -150, y: 160 },
		{ x: -150, y: -20 },
		{ x: 0, y: -120 },
		{ x: 150, y: 20 },
	];

	let text, analys, answers;
	if (rand == 0) {
		text = 'В основании пирамиды $' + pyr + '$ лежит правильный треугольник $' + osn +
			'$ со стороной ' + a + ', а боковое ребро $' + sa +
			'$ перпендикулярно основанию и равно $' + hTex + '$. Найдите объём пирамиды $' + pyr + '$.';
		analys = 'Площадь правильного треугольника со стороной $a=' + a + '$ равна $\\frac{\\sqrt{3}}{4}a^2=' +
			mm + '\\sqrt{3}$. Ребро $' + sa +
			'$ перпендикулярно основанию, значит, оно является высотой пирамиды, поэтому объём равен $\\frac{1}{3}\\cdot' +
			mm + '\\sqrt{3}\\cdot' + hTex + '=' + V + '$.';
		answers = V;
	} else {
		text = 'Объём пирамиды $' + pyr + '$ равен ' + V +
			'. В основании пирамиды лежит правильный треугольник $' + osn +
			'$, а боковое ребро $' + sa + '$ перпендикулярно основанию и равно $' + hTex +
			'$. Найдите сторону основания.';
		analys = 'Высота пирамиды — ребро $' + sa + '$, поэтому площадь основания равна $\\frac{3\\cdot' + V + '}{' + hTex +
			'}=' + mm + '\\sqrt{3}$. Площадь правильного треугольника со стороной $a$ равна $\\frac{\\sqrt{3}}{4}a^2$, откуда $a=' +
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

	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: function (ctx) {
			ctx.translate(200, 200);
			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors[0];
			ctx.lineWidth = 2;

			// Невидимое заднее ребро основания (от вершины с прямым углом к дальней) — пунктиром
			ctx.setLineDash([5, 3]);
			ctx.drawLine(points[1].x, points[1].y, points[3].x, points[3].y);
			ctx.setLineDash([]);

			// Остальные рёбра — сплошные
			ctx.drawLine(points[0].x, points[0].y, points[1].x, points[1].y); // боковое, перпендикулярное основанию
			ctx.drawLine(points[0].x, points[0].y, points[2].x, points[2].y); // боковое к нижней вершине
			ctx.drawLine(points[0].x, points[0].y, points[3].x, points[3].y); // боковое к дальней вершине
			ctx.drawLine(points[1].x, points[1].y, points[2].x, points[2].y); // ребро основания
			ctx.drawLine(points[2].x, points[2].y, points[3].x, points[3].y); // ребро основания

			// прямой угол при нижней левой вершине
			ctx.arcBetweenSegments([
				points[0].x, points[0].y,
				points[1].x, points[1].y,
				points[2].x, points[2].y,
			], 14, true);

			ctx.scale(1, -1);
			ctx.font = '20px liberation_sans';
			let offs = [
				[-24, -8],
				[-24, 22],
				[-4, 26],
				[12, 6],
			];
			points.forEach(function (p, i) {
				ctx.fillText(letters[i], p.x + offs[i][0], -p.y + offs[i][1]);
			});
		},
	});
})();
//https://mathb-ege.sdamgia.ru/problem?id=513803
//chas-ege-selena
