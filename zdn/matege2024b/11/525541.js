(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "525541";
		let preferenceSolid = ['cube', 'tetrahedron', 'prism'];
		let preferenceQuestion = ['ribs', 'vertices', 'facets'];
		let preferenceSize = ['larger', 'smaller'];

		let solidIndex = getSelectedPreferenceFromList(key, preferenceSolid);
		let questionIndex = getSelectedPreferenceFromList(key, preferenceQuestion);
		let sizeIndex = getSelectedPreferenceFromList(key, preferenceSize);

		let solid = preferenceSolid[solidIndex];
		let question = preferenceQuestion[questionIndex];
		let size = preferenceSize[sizeIndex];
		let letters = ['A', 'B', 'C'];

		let solidNames = {
			cube: 'куб',
			tetrahedron: 'тетраэдр',
			prism: 'правильную треугольную призму'
		};

		let questionWords = {
			ribs: 'рёбер',
			vertices: 'вершин',
			facets: 'граней'
		};

		let sizeWords = {
			larger: 'бо́льшим',
			smaller: 'меньшим'
		};
		// У ФИПИ многогранники сравниваются не только по числу вершин, но и по
		// числу граней или рёбер (0DC057, 96B43A, E9D7FC, 41B6C2 ...). Во всех трёх
		// телах у одной и той же части больше и вершин, и рёбер, и граней, так что
		// ответ от выбора признака не зависит
		let criterionWords = {
			ribs: 'рёбер',
			vertices: 'вершин',
			facets: 'граней'
		};
		// Признак сравнения - не тот, о котором спрашивают («Сколько вершин ...
		// с меньшим числом вершин?» у ФИПИ не бывает)
		let criterion = ['ribs', 'vertices', 'facets'].filter((c) => c !== question).iz();

		let data = {
			cube: {
				larger: {
					ribs: 15,
					vertices: 10,
					facets: 7
				},
				smaller: {
					ribs: 9,
					vertices: 6,
					facets: 5
				}
			},
			tetrahedron: {
				larger: {
					ribs: 9,
					vertices: 6,
					facets: 5
				},
				smaller: {
					ribs: 6,
					vertices: 4,
					facets: 4
				}
			},
			prism: {
				larger: {
					ribs: 12,
					vertices: 8,
					facets: 6
				},
				smaller: {
					ribs: 9,
					vertices: 6,
					facets: 5
				}
			}
		};

		['ribs', 'vertices', 'facets'].forEach(function (c) {
			genAssert(data[solid].larger[c] > data[solid].smaller[c], 'Части должны различаться по каждому признаку');
		});

		function pointOnEdge(point1, point2, ratio) {
			return {
				x: point1.x + (point2.x - point1.x) * ratio,
				y: point1.y + (point2.y - point1.y) * ratio,
				z: point1.z + (point2.z - point1.z) * ratio
			};
		}

		function getFigureData() {
			if (solid === 'cube') {
				let figure = new Cube(4);
				let vertices = figure.verticesOfFigure;

				return {
					figure: figure,
					vertices: vertices,
					section: [
						pointOnEdge(vertices[0], vertices[1], 0.45),
						pointOnEdge(vertices[0], vertices[3], 0.45),
						pointOnEdge(vertices[5], vertices[4], 0.45),
						pointOnEdge(vertices[5], vertices[6], 0.45)
					]
				};
			}

			if (solid === 'tetrahedron') {
				let figure = new RegularPyramid({
					height: 4,
					baseSide: 4,
					numberSide: 3
				});
				let vertices = figure.verticesOfFigure;
				let apex = vertices[3];

				return {
					figure: figure,
					vertices: vertices,
					section: [
						pointOnEdge(apex, vertices[0], 0.55),
						pointOnEdge(apex, vertices[1], 0.55),
						pointOnEdge(apex, vertices[2], 0.55)
					]
				};
			}

			let figure = new RegularPrism({
				height: 4,
				baseSide: 4,
				numberSide: 3
			});
			// Вершины берём из библиотеки: verticesOfFigure и connectionMatrix
			// согласованы (верхняя вершина 3 + i стоит точно над нижней i, #3478),
			// локальная копия с повёрнутым верхним основанием больше не нужна.
			let vertices = figure.verticesOfFigure;

			return {
				figure: figure,
				vertices: vertices,
				section: [
					pointOnEdge(vertices[0], vertices[1], 0.45),
					pointOnEdge(vertices[0], vertices[2], 0.45),
					pointOnEdge(vertices[3], vertices[5], 0.45),
					pointOnEdge(vertices[3], vertices[4], 0.45)
				]
			};
		}

		let figureData = getFigureData();

		let paint1 = function (ct) {
			let camera = {
				x: 0,
				y: 0,
				z: 0,
				scale: 50,
				rotationX: -Math.PI / 2 + Math.PI / 11,
				rotationY: 0,
				rotationZ: Math.PI / 10,
			};

			let vertices2D = figureData.vertices.map(point =>
				project3DTo2D(point, camera)
			);

			let section2D = figureData.section.map(point =>
				project3DTo2D(point, camera)
			);

			let allPoints = vertices2D.concat(section2D);
			let minX = Math.min(...allPoints.map(point => point.x));
			let maxX = Math.max(...allPoints.map(point => point.x));
			let minY = Math.min(...allPoints.map(point => point.y));
			let maxY = Math.max(...allPoints.map(point => point.y));

			let offsetX = 150 - (minX + maxX) / 2;
			let offsetY = 150 - (minY + maxY) / 2;

			ct.save();
			ct.translate(offsetX, offsetY);

			// Видимость рёбер. Проекция ортогональная, поэтому направление на
			// наблюдателя - градиент глубины в project3DTo2D (при rotationY = 0).
			// Грани многогранника находим как опорные плоскости, проходящие через
			// три его вершины; грань видна, если её внешняя нормаль смотрит на
			// наблюдателя. Ребро (и отрезок сечения) видно, если лежит в видимой
			// грани, иначе рисуется пунктиром - без этого каркас куба читается двояко
			let view = {
				x: -Math.sin(camera.rotationX) * Math.sin(camera.rotationZ),
				y: -Math.sin(camera.rotationX) * Math.cos(camera.rotationZ),
				z: Math.cos(camera.rotationX),
			};
			let vs = figureData.vertices;
			let sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
			let dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
			let cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
			let centroid = {
				x: vs.reduce((t, v) => t + v.x, 0) / vs.length,
				y: vs.reduce((t, v) => t + v.y, 0) / vs.length,
				z: vs.reduce((t, v) => t + v.z, 0) / vs.length,
			};
			let faces = [];
			for (let i = 0; i < vs.length; i++) {
				for (let j = i + 1; j < vs.length; j++) {
					for (let k = j + 1; k < vs.length; k++) {
						let n = cross(sub(vs[j], vs[i]), sub(vs[k], vs[i]));
						let len = Math.sqrt(dot(n, n));
						if (len < 1e-9) {
							continue;
						}
						n = { x: n.x / len, y: n.y / len, z: n.z / len };
						if (dot(n, sub(centroid, vs[i])) > 0) {
							n = { x: -n.x, y: -n.y, z: -n.z };
						}
						if (vs.every((v) => dot(n, sub(v, vs[i])) < 1e-6)) {
							faces.push({ n: n, d: dot(n, vs[i]), front: dot(n, view) > 1e-6 });
						}
					}
				}
			}
			let isVisible = function (p, q) {
				return faces.some((f) => f.front && Math.abs(dot(f.n, p) - f.d) < 1e-6 && Math.abs(dot(f.n, q) - f.d) < 1e-6);
			};
			let dash = [6, 4];
			let matrix = figureData.figure.connectionMatrix.map(function (row, i) {
				return row.map(function (connected, j) {
					return connected && !isVisible(vs[i + 1], vs[j]) ? dash : connected;
				});
			});

			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.lineWidth = 2;
			ct.drawFigure(vertices2D, matrix);

			ct.drawSection(
				section2D.map(point => [point.x, point.y]),
				om.transparentBrandColors.iz()
			);

			ct.strokeStyle = om.primaryBrandColors[0];
			ct.lineWidth = 2;

			for (let i = 0; i < section2D.length; i++) {
				let next = (i + 1) % section2D.length;
				ct.setLineDash(isVisible(figureData.section[i], figureData.section[next]) ? [] : dash);
				ct.drawLine(
					section2D[i].x,
					section2D[i].y,
					section2D[next].x,
					section2D[next].y
				);
			}
			ct.setLineDash([]);

			ct.fillStyle = 'black';
			ct.font = "20px liberation_sans";

			for (let i = 0; i < 3; i++) {
				ct.drawFilledCircle(
					section2D[i].x,
					section2D[i].y,
					4
				);

				ct.fillText(
					letters[i],
					section2D[i].x + 8,
					section2D[i].y - 8
				);
			}

			ct.restore();
		};

		NAtask.setTask({
			text: 'Плоскость, проходящая через точки A, B и C (см. рисунок), ' +
				'разбивает ' + solidNames[solid] + ' на два многогранника. ' +
				'Сколько ' + questionWords[question] +
				' у получившегося многогранника с ' + sizeWords[size] + ' числом ' + criterionWords[criterion] + '?',
			answers: data[solid][size][question],
			preference: [
				preferenceSolid,
				preferenceQuestion,
				preferenceSize
			],
		});

		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=525541 (куб)
// https://mathb-ege.sdamgia.ru/problem?id=514887 (тетраэдр)
// https://mathb-ege.sdamgia.ru/problem?id=506396 (призма)
