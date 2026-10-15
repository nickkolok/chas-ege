(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '513037';
		let preference = ['faces', 'edges']; // спрашиваем про грани или про рёбра
		let rand = getSelectedPreferenceFromList(key, preference);

		// ФИПИ (11 №123-128): треугольная призма, куб, шестиугольная призма;
		// пятиугольная - расширение. prismHeight и pyramidHeight - только для чертежа
		// (в долях стороны основания); у куба высота призмы равна ребру.
		let variants = [
			{
				text: 'К правильной треугольной призме со стороной основания, равной 1, приклеили правильную треугольную пирамиду со стороной основания, равной 1, так, что основания совпали.',
				baseSides: 3,
				turn: Math.PI / 2 + 0.25, // поворот для чертежа: к зрителю обращено боковое ребро
				prismName: 'треугольной призмы',
				pyramidName: 'треугольной пирамиды',
				prismHeight: 1.1,
				pyramidHeight: 0.8,
			},
			{
				text: 'К кубу с ребром, равным 1, приклеили правильную четырёхугольную пирамиду со стороной основания, равной 1, так, что квадратные грани совпали.',
				baseSides: 4,
				turn: 1.215, // поворот для чертежа
				prismName: 'куба',
				pyramidName: 'четырёхугольной пирамиды',
				prismHeight: 1,
				pyramidHeight: 0.7,
			},
			{
				text: 'К правильной пятиугольной призме со стороной основания, равной 1, приклеили правильную пятиугольную пирамиду со стороной основания, равной 1, так, что основания совпали.',
				baseSides: 5,
				turn: 0.63, // поворот для чертежа
				prismName: 'пятиугольной призмы',
				pyramidName: 'пятиугольной пирамиды',
				prismHeight: 1.3,
				pyramidHeight: 0.9,
			},
			{
				text: 'К правильной шестиугольной призме со стороной основания, равной 1, приклеили правильную шестиугольную пирамиду со стороной основания, равной 1, так, что основания совпали.',
				baseSides: 6,
				turn: 0.525, // поворот для чертежа
				prismName: 'шестиугольной призмы',
				pyramidName: 'шестиугольной пирамиды',
				prismHeight: 1.4,
				pyramidHeight: 1,
			},
		];

		let v = variants.iz();
		let n = v.baseSides;

		// У n-угольной призмы n+2 грани и 3n рёбер,
		// у n-угольной пирамиды n+1 грань и 2n рёбер.
		// При склеивании по n-угольнику исчезают 2 грани,
		// а n рёбер призмы и n рёбер пирамиды совпадают:
		// граней: (n+2)+(n+1)-2 = 2n+1, рёбер: 3n+2n-n = 4n
		let answers = [2 * n + 1, 4 * n];
		let analys = [
			'У ' + v.prismName + ' $' + (n + 2) + '$ граней, у ' + v.pyramidName + ' $' + (n + 1) + '$ ' +
				(n + 1 === 4 ? 'грани' : 'граней') + '. При склеивании совпавшие ' + (n === 4 ? 'квадратные грани' : 'основания') +
				' оказываются внутри многогранника и гранями быть перестают, а все остальные грани сохраняются ' +
				'(боковые грани пирамиды и призмы не лежат в одной плоскости). Граней: $' + (n + 2) + ' + ' + (n + 1) + ' - 2 = ' + answers[0] + '$.',
			'У ' + v.prismName + ' $' + 3 * n + '$ рёбер, у ' + v.pyramidName + ' $' + 2 * n + '$ рёбер. ' +
				'При склеивании $' + n + '$ рёбер основания пирамиды совпадают с $' + n + '$ рёбрами ' +
				(n === 4 ? 'грани куба' : 'основания призмы') + ' и считаются один раз. Рёбер: $' + 3 * n + ' + ' + 2 * n + ' - ' + n + ' = ' + answers[1] + '$.',
		][rand];

		// Многогранник в пространстве: нижнее основание призмы (вершины 0...n-1),
		// верхнее (n...2n-1), вершина пирамиды (2n). Сторона основания - 1.
		let R = 0.5 / Math.sin(Math.PI / n);
		let vertices = [];
		for (let z of [0, v.prismHeight]) {
			for (let i = 0; i < n; i++) {
				let a = 2 * Math.PI * i / n;
				vertices.push({ x: R * Math.cos(a), y: R * Math.sin(a), z: z - v.prismHeight / 2 });
			}
		}
		vertices.push({ x: 0, y: 0, z: v.prismHeight / 2 + v.pyramidHeight });
		let faces = [[]];
		for (let i = 0; i < n; i++) {
			let j = (i + 1) % n;
			faces[0].push(i); // нижнее основание призмы
			faces.push([i, j, n + j, n + i]); // боковая грань призмы
			faces.push([n + i, n + j, 2 * n]); // боковая грань пирамиды
		}
		// Верхнее основание призмы склеено с основанием пирамиды - это не грань

		// Вид спереди-сверху; поворот вокруг оси выбран так, чтобы ни одна
		// боковая грань не смотрела на зрителя ребром и у треугольной призмы
		// была видна третья (задняя) боковая грань - иначе выходил плоский «домик».
		// Для куба, пятиугольной и шестиугольной призм turn подобран перебором:
		// видны хотя бы две боковые грани призмы, каждая видимая грань повёрнута
		// к зрителю под углом с косинусом не меньше 0,27 (было 0,04 у куба,
		// 0,1 у шестиугольной), ни одна вершина не проецируется на чужое ребро, а
		// сходящиеся в вершине рёбра не ложатся на одну прямую (было 3,5° у куба:
		// ребро пирамиды продолжало ребро куба, у шестиугольной - излом-«щепка»)
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,
			rotationX: -Math.PI / 2 + Math.PI / 7,
			rotationY: 0,
			rotationZ: Math.PI / 2 + v.turn,
		};
		autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
			startX: -160,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 400,
		});
		let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));
		// Центрируем проекцию на холсте
		let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
		let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
		points2D = points2D.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY }));

		// Видимость граней - по знаку ориентированной площади проекции при обходе,
		// согласованном с внешней нормалью (приём из zdn/matege2024b/13/513823.js)
		let centroid = { x: 0, y: 0, z: 0 };
		vertices.forEach(function (p) {
			centroid.x += p.x / vertices.length;
			centroid.y += p.y / vertices.length;
			centroid.z += p.z / vertices.length;
		});
		let facesVisible = faces.map(function (f) {
			let p0 = vertices[f[0]], p1 = vertices[f[1]], p2 = vertices[f[2]];
			let u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
			let w = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
			let nrm = { x: u.y * w.z - u.z * w.y, y: u.z * w.x - u.x * w.z, z: u.x * w.y - u.y * w.x };
			let fc = { x: 0, y: 0, z: 0 };
			f.forEach(function (i) {
				fc.x += vertices[i].x / f.length;
				fc.y += vertices[i].y / f.length;
				fc.z += vertices[i].z / f.length;
			});
			let orient = (nrm.x * (fc.x - centroid.x) + nrm.y * (fc.y - centroid.y) + nrm.z * (fc.z - centroid.z)) < 0 ? -1 : 1;
			let q0 = points2D[f[0]], q1 = points2D[f[1]], q2 = points2D[f[2]];
			return orient * ((q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y)) > 0;
		});
		// Рёбра многогранника - стороны граней; ребро рисуется, если видна хотя бы
		// одна из смежных граней. Невидимые рёбра не изображаются (как в условии).
		let visibleEdges = {};
		faces.forEach(function (f, k) {
			for (let i = 0; i < f.length; i++) {
				let a = f[i], b = f[(i + 1) % f.length];
				let id = Math.min(a, b) + '-' + Math.max(a, b);
				visibleEdges[id] = visibleEdges[id] || facesVisible[k];
			}
		});

		let paint1 = function (ct) {
			ct.translate(200, 200);
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			Object.keys(visibleEdges).forEach(function (id) {
				if (visibleEdges[id]) {
					let ends = id.split('-').map(Number);
					ct.drawLine(points2D[ends[0]].x, points2D[ends[0]].y, points2D[ends[1]].x, points2D[ends[1]].y);
				}
			});
		};

		NAtask.setTask({
			text: v.text + ' ' + ['Сколько граней', 'Сколько рёбер'][rand] +
				' у получившегося многогранника (невидимые рёбра на рисунке не изображены)?',
			answers: answers[rand],
			analys: analys,
			authors: ['chas-ege-selena', 'Zer00Player'],
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//513037
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/test?likes=513037
