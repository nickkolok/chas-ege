(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513823';
		let preference = ['withoutABCD', 'withABCD'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let length = sl(1, 10);
		let width = sl(1, 10);
		let height = 6 * sl(1, 5);
		let volume = length * width * (height / 6);

		let paint1 = function (ct) {
			// Класс из lib/figure.js: три взаимно перпендикулярных ребра из вершины 0
			let pyramid = new RectangularPyramidWithRightAngledTriangleAtBase({
				height: height,
				sideA: length,
				sideB: width
			});

			// Косоугольная проекция 3D -> 2D
			let angle = Math.PI / 6;
			let vertices2D = pyramid.verticesOfFigure.map(p => ({
				x: p.x - p.z * Math.cos(angle) * 0.7,
				y: -(p.y - p.z * Math.sin(angle) * 0.7)
			}));

			// Центрирование и автомасштаб по габаритам фигуры
			let xs = vertices2D.map(p => p.x);
			let ys = vertices2D.map(p => p.y);
			let minX = Math.min.apply(null, xs);
			let maxX = Math.max.apply(null, xs);
			let minY = Math.min.apply(null, ys);
			let maxY = Math.max.apply(null, ys);
			let w = (maxX - minX) || 1;
			let h = (maxY - minY) || 1;
			let scale = Math.min(280 / w, 280 / h, 40);
			let cx = (minX + maxX) / 2;
			let cy = (minY + maxY) / 2;

			ct.translate(200 - scale * cx, 200 - scale * cy);
			ct.scale(scale, scale);
			ct.lineWidth = 2 / scale;
			ct.strokeStyle = om.secondaryBrandColors[0] || om.secondaryBrandColors;

			let dotted = [4 / scale, 3 / scale];

			// Вершина 0 (прямой угол) находится за гранью 1-2-3:
			// рёбра из неё — пунктиром, рёбра передней грани — сплошными
			let drawMatrix = [
				[dotted],          // 1-0 — невидимое
				[dotted, 1],       // 2-0 — невидимое, 2-1 — видимое
				[dotted, 1, 1]     // 3-0 — невидимое, 3-1 и 3-2 — видимые
			];

			ct.drawFigure(vertices2D, drawMatrix);

			// Маркер прямого угла при вершине 0
			let v0 = vertices2D[0];
			let v1 = vertices2D[1];
			let v2 = vertices2D[2];
			let len1 = Math.hypot(v1.x - v0.x, v1.y - v0.y);
			let len2 = Math.hypot(v2.x - v0.x, v2.y - v0.y);
			let s = 12 / scale;
			if (len1 > 0 && len2 > 0) {
				let vec1 = { x: (v1.x - v0.x) / len1 * s, y: (v1.y - v0.y) / len1 * s };
				let vec2 = { x: (v2.x - v0.x) / len2 * s, y: (v2.y - v0.y) / len2 * s };
				ct.beginPath();
				ct.moveTo(v0.x + vec1.x, v0.y + vec1.y);
				ct.lineTo(v0.x + vec1.x + vec2.x, v0.y + vec1.y + vec2.y);
				ct.lineTo(v0.x + vec2.x, v0.y + vec2.y);
				ct.stroke();
			}

			// Подписи вершин для варианта withABCD (смещение наружу от центра фигуры)
			if (rand === 1) {
				ct.fillStyle = 'black';
				ct.font = (14 / scale) + 'px liberation_sans';
				ct.textAlign = 'center';
				ct.textBaseline = 'middle';

				let labels = ['A', 'B', 'C', 'D'];
				let off = 16 / scale;
				for (let i = 0; i < 4; i++) {
					let dx = vertices2D[i].x - cx;
					let dy = vertices2D[i].y - cy;
					let d = Math.hypot(dx, dy) || 1;
					ct.fillText(labels[i], vertices2D[i].x + dx / d * off, vertices2D[i].y + dy / d * off);
				}
			}
		};

		NAtask.setTask({
			text: 'В треугольной пирамиде ' + ['три', '$ABCD$'][rand] + ' ребра' + [' ', ' $AB$, $AC$ и $AD$ '][rand] + 'взаимно перпендикулярны' +
			[', а их длины равны $' + length + '$, $' + width + '$ и $' + height + '$', ''][rand] + '. Найдите объём этой пирамиды'+['.', ', если $AB=' + length + '$, $AC=' + width + '$ и $AD=' + height + '$.'][rand],
			answers: volume,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513823
