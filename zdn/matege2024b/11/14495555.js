(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = 6 * sl(1, 4); // длина ребра куба (кратна 6, чтобы ответ был целым)
		let half = a / 2;

		let letters = ['A', 'B', 'C', 'D', 'K', 'P'];
		let bottom = ['A', 'B', 'C', 'D']; // нижние вершины по циклу
		let edgeNames = ['AB', 'BC', 'CD', 'AD']; // ребро i соединяет bottom[i] и bottom[(i+1)%4]
		let edgeHidden = [1, 1, 0, 0]; // рёбра AB и BC находятся на невидимых гранях
		let corner = sl(3); // вершина, у которой берём середины выходящих рёбер
		let i1 = (corner + 3) % 4;
		let i2 = corner;
		let vrt = bottom[corner];
		let e1 = edgeNames[i1];
		let e2 = edgeNames[i2];
		let pyr = vrt + '_1' + vrt + 'KP';
		let tri = vrt + 'KP';

		let S = half * half / 2;
		let vol = S * a / 3;

		NAtask.setTask({
			text: 'Длина ребра куба $ABCDA_1B_1C_1D_1$ равна $' + a + '$. ' +
				'На рёбрах $' + e1 + '$ и $' + e2 + '$ отмечены точки $K$ и $P$ — середины рёбер соответственно. ' +
				'Найдите объём пирамиды $' + pyr + '$.',
			analys: 'Треугольник $' + tri + '$ — прямоугольный с прямым углом при вершине $' + vrt + '$ и катетами $' + vrt + 'K = ' + vrt + 'P = ' + half + '$, ' +
				'его площадь равна $' + S + '$. Высота пирамиды — перпендикулярное основанию ребро $' + vrt + vrt + '_1 = ' + a + '$. ' +
				'Значит, $V = \\frac{1}{3} \\cdot ' + S + ' \\cdot ' + a + ' = ' + vol + '.$',
			answers: vol,
		});

		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 380,
			height: 330,
			paint: function (ct) {
				let cube = new Cube(a);
				let vertices = cube.verticesOfFigure;
				let camera = {
					x: 0,
					y: 0,
					z: 0,
					scale: 180 / a,
					rotationX: -Math.PI / 2 + Math.PI / 11,
					rotationY: 0,
					rotationZ: 1.5*Math.PI -Math.PI/ 10,
				};
				let vertex2D = vertices.map(function (point) {
					return project3DTo2D(point, camera);
				});
				let minX = Math.min.apply(null, vertex2D.map(point => point.x));
				let maxX = Math.max.apply(null, vertex2D.map(point => point.x));
				let minY = Math.min.apply(null, vertex2D.map(point => point.y));
				let maxY = Math.max.apply(null, vertex2D.map(point => point.y));
				let offsetX = 190 - (minX + maxX) / 2;
				let offsetY = 165 - (minY + maxY) / 2;

				vertex2D = vertex2D.map(function (point) {
					return {
						x: point.x + offsetX,
						y: point.y + offsetY,
					};
				});

				let bottomIndices = [0, 1, 2, 3];
				let topIndices = [5, 6, 7, 4];
				let midpoint3D = function (index1, index2) {
					return {
						x: (vertices[index1].x + vertices[index2].x) / 2,
						y: (vertices[index1].y + vertices[index2].y) / 2,
						z: (vertices[index1].z + vertices[index2].z) / 2,
					};
				};
				let projectPoint = function (point) {
					let projected = project3DTo2D(point, camera);
					return {
						x: projected.x + offsetX,
						y: projected.y + offsetY,
					};
				};

				let k3D = midpoint3D(bottomIndices[i1], bottomIndices[(i1 + 1) % 4]);
				let p3D = midpoint3D(bottomIndices[i2], bottomIndices[(i2 + 1) % 4]);
				let K = projectPoint(k3D);
				let P = projectPoint(p3D);
				let top = vertex2D[topIndices[corner]];

				let connections = cube.connectionMatrix.map(function (row) {
					return row.slice();
				});
				let makeDashed = function (index1, index2) {
					let maxIndex = Math.max(index1, index2);
					let minIndex = Math.min(index1, index2);
					connections[maxIndex - 1][minIndex] = [6, 4];
				};

				makeDashed(0, 1);
				makeDashed(1, 2);
				makeDashed(1, 6);

				ct.lineWidth = 1.5;
				ct.strokeStyle = om.secondaryBrandColors.iz();
				ct.drawFigure(vertex2D, connections);

				ct.strokeStyle = om.primaryBrandColors.iz();
				let drawPyramidEdge = function (point1, point2, dashed) {
					ct.setLineDash(dashed ? [6, 4] : []);
					ct.drawLine(point1.x, point1.y, point2.x, point2.y);
					ct.setLineDash([]);
				};

				drawPyramidEdge(top, K, edgeHidden[i1]);
				drawPyramidEdge(top, P, edgeHidden[i2]);
				drawPyramidEdge(K, P, 1);

				ct.fillStyle = om.primaryBrandColors.iz();
				ct.fillKrug(K.x, K.y, 3);
				ct.fillKrug(P.x, P.y, 3);

				let center = {
					x: (minX + maxX) / 2 + offsetX,
					y: (minY + maxY) / 2 + offsetY,
				};
				let put = function (point, letter, subscript) {
					let dx = point.x < center.x ? -20 : 8;
					let dy = point.y < center.y ? -8 : 18;
					let x = point.x + dx;
					let y = point.y + dy;

					ct.font = '20px liberation_sans';
					ct.fillText(letter, x, y);
					if (subscript) {
						ct.fillText(subscript, x + 11, y + 4);
					}
				};

				for (let i = 0; i < 4; i++) {
					put(vertex2D[bottomIndices[i]], letters[i]);
					put(vertex2D[topIndices[i]], letters[i], '₁');
				}
				put(K, letters[4]);
				put(P, letters[5]);
			},
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//14495555
