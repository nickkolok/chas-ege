(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = 6 * sl(1, 4); // длина ребра куба (кратна 6, чтобы ответ был целым)
		let half = a / 2;

		let bottom = ['A', 'B', 'C', 'D']; // нижние вершины по циклу
		let edgeNames = ['AB', 'BC', 'CD', 'AD']; // ребро i соединяет bottom[i] и bottom[(i+1)%4]
		let edgeHidden = [1, 1, 0, 0]; // грани на AB и BC невидимы (левая и задняя)
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

		NAtask.modifiers.addCanvasIllustration({
			width: 380,
			height: 330,
			paint: function (ct) {
				let p = {
					A: [70, 280], D: [250, 280], C: [310, 235], B: [130, 235],
					A1: [70, 100], D1: [250, 100], C1: [310, 55], B1: [130, 55],
				};
				let edgeVerts = {
					AB: ['A', 'B'], BC: ['B', 'C'], CD: ['C', 'D'], AD: ['A', 'D'],
				};
				let mid = function (pair) {
					return [(p[pair[0]][0] + p[pair[1]][0]) / 2, (p[pair[0]][1] + p[pair[1]][1]) / 2];
				};
				p.K = mid(edgeVerts[e1]);
				p.P = mid(edgeVerts[e2]);

				let line = function (u, v, dashed) {
					ct.setLineDash(dashed ? [6, 4] : []);
					ct.drawLine(p[u][0], p[u][1], p[v][0], p[v][1]);
					ct.setLineDash([]);
				};

				ct.lineWidth = 1.5;
				// видимые рёбра куба
				[
					['A', 'D'], ['D', 'C'], ['C', 'C1'], ['C1', 'D1'], ['D1', 'A1'],
					['A1', 'B1'], ['B1', 'C1'], ['A', 'A1'], ['D', 'D1'],
				].forEach(function (e) {
					line(e[0], e[1], 0);
				});
				// невидимые рёбра куба
				[['A', 'B'], ['B', 'C'], ['B', 'B1']].forEach(function (e) {
					line(e[0], e[1], 1);
				});

				// пирамида: отрезок к середине ребра пунктирен, если лежит на невидимой грани
				line(vrt + '1', 'K', edgeHidden[i1]);
				line(vrt + '1', 'P', edgeHidden[i2]);
				line('K', 'P', 1);

				ct.fillStyle = 'black';
				ct.fillKrug(p.K[0], p.K[1], 2);
				ct.fillKrug(p.P[0], p.P[1], 2);

				let shift = {
					A: [-18, 16], D: [4, 18], C: [10, 6], B: [-6, -8],
					A1: [-28, 4], D1: [2, -10], C1: [8, -6], B1: [-12, -10],
					K: [-16, 16], P: [4, 18],
				};
				ct.font = 'italic 20px liberation_sans';
				let put = function (name) {
					let x = p[name][0] + shift[name][0];
					let y = p[name][1] + shift[name][1];
					ct.fillText(name[0], x, y);
					if (name.length > 1) {
						ct.font = 'italic 14px liberation_sans';
						ct.fillText(name.slice(1), x + 11, y + 4);
						ct.font = 'italic 20px liberation_sans';
					}
				};
				['A', 'B', 'C', 'D', 'A1', 'B1', 'C1', 'D1', 'K', 'P'].forEach(put);
			},
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//14495555
