(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	// Два прототипа ФИПИ с одним решением: шестиугольная пирамида (E34BD8 и
	// дубли: «Сторона основания правильной шестиугольной пирамиды равна a,
	// боковое ребро равно l») и треугольная (F71F02 и дубли: «Стороны основания
	// правильной треугольной пирамиды равны a, а боковые рёбра равны l»).
	// Ветку выбираем до retryWhileError, чтобы отбраковка не меняла её частоту.
	let key = '514225';
	let preference = ['hexagonal', 'triangular'];
	let triangular = getSelectedPreferenceFromList(key, preference) === 1;
	let n = triangular ? 3 : 6;

	retryWhileError(function () {
		// Боковая грань - равнобедренный треугольник: половина стороны основания,
		// апофема и боковое ребро образуют пифагорову тройку. Перебираем все тройки
		// (и кратные примитивным) с гипотенузой до 101: так достижимы все наборы
		// ФИПИ, включая 20, 99, 101 и 11, 60, 61. Пирамида существует, только если
		// боковое ребро длиннее радиуса описанной окружности основания:
		// R = a у шестиугольника и R = a / sqrt(3) у треугольника.
		// Шестиугольная: высота H >= 0,35a не даёт пирамиде сплющиться в блин
		// (у самой плоской из ФИПИ, 16 и 17, H : a = 0,36), площадь - до 12000:
		// у ФИПИ наибольший ответ 11880 (40 и 101), а без этого ограничения 62%
		// ответов превышали 5000 (до 18720).
		// Треугольная: у ФИПИ пирамиды площе (8 и 5, 16 и 10: H : a = 0,24),
		// поэтому H >= 0,2a; ответы у ФИПИ - до 1260, берём до 3000.
		let triples = [];
		for (let halfBase = 1; halfBase <= 50; halfBase++) {
			for (let apothem = 1; apothem <= 100; apothem++) {
				let edge = Math.sqrt(halfBase * halfBase + apothem * apothem);
				if (edge <= 101 && edge.isAlmostInteger()) {
					edge = Math.round(edge);
					let a2 = 4 * halfBase * halfBase;
					let h2 = edge * edge - (triangular ? a2 / 3 : a2);
					let area = n * halfBase * apothem;
					let fits = triangular ?
						h2 >= 0.2 * 0.2 * a2 && area <= 3000 :
						h2 >= 0.35 * 0.35 * a2 && area <= 12000;
					if (fits) {
						triples.push({ halfBase: halfBase, apothem: apothem, edge: edge });
					}
				}
			}
		}

		let t = triples.iz();
		let a = t.halfBase * 2;  // сторона основания
		let l = t.edge;          // боковое ребро
		let apothem = t.apothem; // целая по построению: берём из тройки, а не из геттера

		// Высота пирамиды: H = sqrt(l^2 - R^2)
		let H = Math.sqrt(l * l - (triangular ? a * a / 3 : a * a));
		if (!triangular) {
			genAssert(H > 15, 'Слишком маленькая высота');
		}

		// Площадь боковой поверхности: n граней по a * apothem / 2
		let S_bok = n * a * apothem / 2;

		let text = triangular ?
			'Стороны основания правильной треугольной пирамиды равны $' + a +
				'$, а боковые рёбра равны $' + l +
				'$. Найдите площадь боковой поверхности этой пирамиды.' :
			'Сторона основания правильной шестиугольной пирамиды равна $' + a +
				'$, боковое ребро равно $' + l +
				'$. Найдите площадь боковой поверхности этой пирамиды.';
		let analys = 'Апофема правильной пирамиды — высота боковой грани. Боковая грань — равнобедренный треугольник ' +
			'с боковыми сторонами $' + l + '$ и основанием $' + a + '$, поэтому апофема — катет прямоугольного треугольника ' +
			'с гипотенузой $' + l + '$ (боковым ребром) и другим катетом $' + t.halfBase +
			'$ (половиной стороны основания): $\\sqrt{' + l + '^2-' + t.halfBase + '^2}=\\sqrt{' + (l * l - t.halfBase * t.halfBase) +
			'}=' + apothem + '$. Площадь боковой поверхности равна половине произведения периметра основания ' +
			'на апофему: $S=\\frac{1}{2}\\cdot' + (n * a) + '\\cdot' + apothem + '=' + S_bok + '$.';

		// Пирамида для иллюстрации пропорциональна условию (класс из lib/figure.js).
		// Сторону основания берём единичной: autoScale() начинает с масштаба 5
		// и отбраковывает фигуру, если она уже на старте не помещается в холст.
		// Плоские треугольные пирамиды ФИПИ (8 и 5, 16 и 10: H : a = 0,24) на
		// пропорциональном чертеже превращаются в нечитаемый клин, поэтому их
		// рисуем схематически, с высотой не меньше 0,6 стороны (как 27087 рисует
		// схематически слишком высокие пирамиды)
		let drawHeight = triangular ? Math.max(H / a, 0.6) : H / a;
		let drawPyramid = new RegularPyramid({
			height: drawHeight,
			baseSide: 1,
			numberSide: n,
		});
		let vertices = drawPyramid.verticesOfFigure;

		// Камера как в соседних шаблонах папки: вид спереди-сверху, лёгкий поворот вбок,
		// чтобы шестиугольник основания читался, а не сплющивался в симметричную «палатку»
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,
			// У плоских пирамид (у ФИПИ H : a до 0,36) при взгляде под углом PI/7
			// вершина проецировалась ниже задних вершин основания, и пирамида
			// читалась как плоский шестиугольник - для них смотрим положе
			rotationX: -Math.PI / 2 + Math.min(Math.PI / 7, Math.atan(0.75 * drawHeight)),
			rotationY: 0,
			// У треугольной пирамиды, как у ФИПИ (F71F02), к наблюдателю обращено
			// боковое ребро: видны две боковые грани
			rotationZ: triangular ? 5 * Math.PI / 12 : Math.PI / 12,
		};
		autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
			startX: -160,
			finishX: 160,
			startY: -140,
			finishY: 140,
			maxScale: 200,
		});
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));
		// Центрируем проекцию на холсте
		let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
		let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
		points2D = points2D.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY }));

		// Видимость граней - facesVisibility() из lib/figure.js;
		// ребро пунктирно, когда невидимы обе смежные грани (dashHiddenEdges()).
		let faces = [[...Array(n).keys()]];
		for (let i = 0; i < n; i++) {
			faces.push([i, (i + 1) % n, n]);
		}
		let visibility = facesVisibility(vertices, points2D, faces);
		let matrix = dashHiddenEdges(drawPyramid.connectionMatrix, faces, visibility, [7, 5]);

		let paint1 = function (ct) {
			ct.translate(200, 175);
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.drawFigure(points2D, matrix);
		};

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: S_bok,
			authors: ['Zer00Player', 'chas-ege-selena', 'chas-ege-ellariya'],
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 350,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//514225
//Открытый банк заданий E34BD8 и дубли; F71F02 и дубли (треугольная пирамида)
//Zer00Player, chas-ege-selena, chas-ege-ellariya
//https://mathb-ege.sdamgia.ru/problem?id=514225
