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
			larger: 'большим',
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

		// faces - грани в нумерации вершин библиотечной фигуры (нужны для видимости
		// рёбер), sectionEdges - рёбра [начало, конец, доля], на которых лежат
		// вершины сечения
		function getFigureData() {
			let figure, faces, sectionEdges;
			if (solid === 'cube') {
				figure = new Cube(4);
				faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
				sectionEdges = [[0, 1, 0.45], [0, 3, 0.45], [5, 4, 0.45], [5, 6, 0.45]];
			} else if (solid === 'tetrahedron') {
				figure = new RegularPyramid({ height: 4, baseSide: 4, numberSide: 3 });
				faces = [[0, 1, 2], [0, 1, 3], [1, 2, 3], [2, 0, 3]];
				sectionEdges = [[3, 0, 0.55], [3, 1, 0.55], [3, 2, 0.55]];
			} else {
				// verticesOfFigure и connectionMatrix согласованы: верхняя вершина
				// 3 + i стоит точно над нижней i (#3478)
				figure = new RegularPrism({ height: 4, baseSide: 4, numberSide: 3 });
				faces = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
				sectionEdges = [[0, 1, 0.45], [0, 2, 0.45], [3, 5, 0.45], [3, 4, 0.45]];
			}
			let vertices = figure.verticesOfFigure;
			return {
				figure: figure,
				vertices: vertices,
				faces: faces,
				sectionEdges: sectionEdges,
				section: sectionEdges.map((e) => pointOnEdge(vertices[e[0]], vertices[e[1]], e[2])),
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

			// Невидимые рёбра и отрезки сечения - пунктиром, без этого каркас куба
			// читается двояко. Отрезок сечения виден, если лежит в видимой грани
			let visibility = facesVisibility(figureData.vertices, vertices2D, figureData.faces);
			let isVisible = function (vertexIndices) {
				return isOnVisibleFace(figureData.faces, visibility, vertexIndices);
			};
			let dash = [6, 4];
			let matrix = dashHiddenEdges(figureData.figure.connectionMatrix, figureData.faces, visibility, dash);

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
				let edges = figureData.sectionEdges;
				ct.setLineDash(isVisible([edges[i][0], edges[i][1], edges[next][0], edges[next][1]]) ? [] : dash);
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
