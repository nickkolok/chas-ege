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

		function pointOnEdge(point1, point2, ratio) {
			return {
				x: point1.x + (point2.x - point1.x) * ratio,
				y: point1.y + (point2.y - point1.y) * ratio,
				z: point1.z + (point2.z - point1.z) * ratio
			};
		}

		function getPrismVertices(prism) {
			let bottom = findVerticesOfRegularPolygon(
				prism.radiusOfCircumscribedCircle,
				prism.numberSide,
				-prism.height / 2
			);

			return bottom.concat([
				{
					x: bottom[2].x,
					y: bottom[2].y,
					z: prism.height / 2
				},
				{
					x: bottom[0].x,
					y: bottom[0].y,
					z: prism.height / 2
				},
				{
					x: bottom[1].x,
					y: bottom[1].y,
					z: prism.height / 2
				}
			]);
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
			let vertices = getPrismVertices(figure);

			return {
				figure: figure,
				vertices: vertices,
				section: [
					pointOnEdge(vertices[0], vertices[1], 0.45),
					pointOnEdge(vertices[0], vertices[2], 0.45),
					pointOnEdge(vertices[4], vertices[3], 0.45),
					pointOnEdge(vertices[4], vertices[5], 0.45)
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

			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.lineWidth = 2;
			ct.drawFigure(
				vertices2D,
				figureData.figure.connectionMatrix
			);

			ct.drawSection(
				section2D.map(point => [point.x, point.y]),
				om.transparentBrandColors.iz()
			);

			ct.strokeStyle = om.primaryBrandColors[0];
			ct.lineWidth = 2;

			for (let i = 0; i < section2D.length; i++) {
				let next = (i + 1) % section2D.length;
				ct.drawLine(
					section2D[i].x,
					section2D[i].y,
					section2D[next].x,
					section2D[next].y
				);
			}

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
				' у получившегося многогранника с ' + sizeWords[size] + ' числом вершин?',
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
