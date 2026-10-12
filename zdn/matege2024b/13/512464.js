//13. Задание 13 № 512464
//Найдите объём правильной четырёхугольной пирамиды, сторона основания
//которой равна 4, а боковое ребро равно 2√11.

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);

	let a = [2, 4, 6, 8, 12].iz(); //сторона основания
	let H;
	// Объём a^2*H/3 должен быть целым: при a, не кратном 3, высота кратна 3.
	// Наборы ФИПИ (FB0748): a = 4 при H = 3 и 6; a = 6 при H = 3...8; a = 8 при H = 3.
	// Плоские пирамиды (H = 3 при a = 8) иглой не являются, а самые высокие
	// (H = 12 при a = 4) вытянуты в 1:3 - чертёж остаётся читаемым. Отношение
	// H : a держим в пределах от 3 : 8 (самая плоская пирамида ФИПИ) до 3 : 1.
	// При a = 2 высоты 9 и 12 дают иглу 1:4.5...1:6 (md/task_geometry.md), их нет.
	switch (a) {
		case 2: H = [3, 6].iz(); break;
		case 4: H = [3, 6, 9, 12].iz(); break;
		case 6: H = sl(3, 12); break;
		case 8: H = [3, 6, 9, 12].iz(); break;
		case 12: H = sl(5, 12); break;
	}

	let l2 = H * H + a * a / 2; //квадрат бокового ребра
	let lTex = l2.texsqrt(true);
	let V = a * a * H / 3;

	NAtask.setTask({
		text: [
			`Найдите объём правильной четырёхугольной пирамиды, сторона основания которой равна $${a}$, а боковое ребро равно $${lTex}$.`,
			`У правильной четырёхугольной пирамиды сторона основания равна $${a}$, а боковое ребро равно $${lTex}$. Найдите объём пирамиды.`,
		].iz(),
		answers: V,
		analys: `Высота правильной пирамиды проходит через центр основания. Диагональ квадратного основания со стороной $${a}$ равна $${a}\\sqrt{2}$, поэтому половина диагонали равна $${(a * a / 2).texsqrt(true)}$. Из прямоугольного треугольника, образованного высотой, половиной диагонали и боковым ребром, по теореме Пифагора $H=\\sqrt{\\left(${lTex}\\right)^2-\\left(${(a * a / 2).texsqrt(true)}\\right)^2}=\\sqrt{${l2}-${a * a / 2}}=${H}$. Площадь основания равна $${a * a}$, значит, объём пирамиды $V=\\frac{1}{3}\\cdot${a * a}\\cdot${H}=${V}$.`,
		authors: ['chas-ege-selena'],
	});

	// Чертёж - ортогональная проекция модели (класс RegularPyramid из lib/figure.js),
	// пропорции которой совпадают с условием. Раньше пирамиду рисовал
	// drawRightPyramid4 в косоугольной проекции: там центр основания по горизонтали
	// всего на 0,07 стороны отстоит от двух вершин, и у высоких пирамид пунктирная
	// высота сливалась с боковыми рёбрами. Здесь основание повёрнуто на arctg(1/2):
	// проекции вершин отстоят от высоты не меньше чем на 0,45 радиуса основания
	// и не меньше чем на 0,45 радиуса - друг от друга.
	let figure = new RegularPyramid({ height: H / a, baseSide: 1, numberSide: 4 });
	let vertices = figure.verticesOfFigure; // 0...3 - основание, 4 - вершина
	let camera = {
		x: 0,
		y: 0,
		z: 0,
		scale: 5,
		rotationX: -Math.PI / 2 + Math.PI / 9,
		rotationY: 0,
		rotationZ: Math.atan(0.5),
	};
	autoScale(vertices, camera, vertices.map((vertex) => project3DTo2D(vertex, camera)), {
		startX: -140,
		finishX: 140,
		startY: -130,
		finishY: 130,
		maxScale: 200,
	});
	let points2D = vertices.map((vertex) => project3DTo2D(vertex, camera));
	let shiftX = (Math.min(...points2D.map((p) => p.x)) + Math.max(...points2D.map((p) => p.x))) / 2;
	let shiftY = (Math.min(...points2D.map((p) => p.y)) + Math.max(...points2D.map((p) => p.y))) / 2;
	points2D = points2D.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY }));

	// Видимость граней - по знаку ориентированной площади проекции при обходе,
	// согласованном с внешней нормалью (приём из 513823 и 514225).
	// Ребро пунктирно, когда невидимы обе смежные грани.
	let centroid = { x: 0, y: 0, z: 0 };
	vertices.forEach(function (vertex) {
		centroid.x += vertex.x / vertices.length;
		centroid.y += vertex.y / vertices.length;
		centroid.z += vertex.z / vertices.length;
	});
	let faces = [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];
	let facesVisible = faces.map(function (face) {
		let p0 = vertices[face[0]], p1 = vertices[face[1]], p2 = vertices[face[2]];
		let u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
		let w = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
		let normal = { x: u.y * w.z - u.z * w.y, y: u.z * w.x - u.x * w.z, z: u.x * w.y - u.y * w.x };
		let fc = { x: 0, y: 0, z: 0 };
		face.forEach(function (i) {
			fc.x += vertices[i].x / face.length;
			fc.y += vertices[i].y / face.length;
			fc.z += vertices[i].z / face.length;
		});
		let orient = (normal.x * (fc.x - centroid.x) + normal.y * (fc.y - centroid.y) + normal.z * (fc.z - centroid.z)) < 0 ? -1 : 1;
		let q0 = points2D[face[0]], q1 = points2D[face[1]], q2 = points2D[face[2]];
		return orient * ((q1.x - q0.x) * (q2.y - q0.y) - (q2.x - q0.x) * (q1.y - q0.y)) > 0;
	});
	let edges = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]];
	let isHidden = function (edge) {
		return !faces.some(function (face, k) {
			return facesVisible[k] && face.includes(edge[0]) && face.includes(edge[1]);
		});
	};
	let baseCenter = {
		x: (points2D[0].x + points2D[1].x + points2D[2].x + points2D[3].x) / 4,
		y: (points2D[0].y + points2D[1].y + points2D[2].y + points2D[3].y) / 4,
	};

	NAtask.modifiers.addCanvasIllustration({
		width: 320,
		height: 300,
		paint: function (ct) {
			let color = om.secondaryBrandColors.iz();
			let dash = [7, 5];
			ct.translate(160, 150);
			ct.lineWidth = 2;
			ct.strokeStyle = color;
			edges.forEach(function (edge) {
				ct.setLineDash(isHidden(edge) ? dash : []);
				ct.drawLine(points2D[edge[0]].x, points2D[edge[0]].y, points2D[edge[1]].x, points2D[edge[1]].y);
			});
			// Диагонали основания и высота - внутри пирамиды, пунктиром
			ct.setLineDash(dash);
			ct.drawLine(points2D[0].x, points2D[0].y, points2D[2].x, points2D[2].y);
			ct.drawLine(points2D[1].x, points2D[1].y, points2D[3].x, points2D[3].y);
			ct.drawLine(points2D[4].x, points2D[4].y, baseCenter.x, baseCenter.y);
			ct.setLineDash([]);
			ct.fillStyle = color;
			ct.fillKrug(baseCenter.x, baseCenter.y, 2.5);
		},
	});
})();
//512464
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=512464
