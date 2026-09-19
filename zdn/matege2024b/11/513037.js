(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '513037';
		let preference = ['faces', 'edges']; // спрашиваем про грани или про рёбра
		let rand = getSelectedPreferenceFromList(key, preference);

		let variants = [
			{
				text: 'К правильной треугольной призме со стороной основания, равной 1, приклеили правильную треугольную пирамиду со стороной основания, равной 1, так, что основания совпали.',
				baseSides: 3,
				prismHeight: 0.6,
				pyramidHeight: 0.7,
			},
			{
				text: 'К кубу с ребром, равным 1, приклеили правильную четырёхугольную пирамиду со стороной основания, равной 1, так, что квадратные грани совпали.',
				baseSides: 4,
				prismHeight: 0.8,
				pyramidHeight: 0.6,
			},
			{
				text: 'К правильной пятиугольной призме со стороной основания, равной 1, приклеили правильную пятиугольную пирамиду со стороной основания, равной 1, так, что основания совпали.',
				baseSides: 5,
				prismHeight: 0.7,
				pyramidHeight: 0.65,
			},
			{
				text: 'К правильной шестиугольной призме со стороной основания, равной 1, приклеили правильную шестиугольную пирамиду со стороной основания, равной 1, так, что основания совпали.',
				baseSides: 6,
				prismHeight: 0.65,
				pyramidHeight: 0.7,
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

		let paint1 = function (ct) {
			let prismH = v.prismHeight;
			let pyramidH = v.pyramidHeight;
			let gap = 0.3; // зазор между призмой и пирамидой, как на рисунке-образце
			let radius = 0.8;
			let flat = 0.45; // сплющивание основания для наглядности
			let angle = 30;

			function basePoint(i, cy) {
				let a = (angle + 360 / n * i) * Math.PI / 180;
				return {
					x: radius * Math.cos(a),
					y: cy + radius * Math.sin(a) * flat,
					sin: Math.sin(a),
				};
			}

			let bottomVerts = [];
			let topVerts = [];
			let pyBaseVerts = [];
			for (let i = 0; i < n; i++) {
				bottomVerts.push(basePoint(i, 0));
				topVerts.push(basePoint(i, -prismH));
				pyBaseVerts.push(basePoint(i, -prismH - gap));
			}
			let apex = { x: 0, y: -prismH - gap - pyramidH };

			// Габаритный прямоугольник фигуры: по нему подбираем масштаб
			// и смещение, чтобы рисунок заполнял канвас и был отцентрован
			let allPoints = bottomVerts.concat(topVerts, pyBaseVerts, [apex]);
			let minX = Math.min.apply(null, allPoints.map(function (p) { return p.x; }));
			let maxX = Math.max.apply(null, allPoints.map(function (p) { return p.x; }));
			let minY = Math.min.apply(null, allPoints.map(function (p) { return p.y; }));
			let maxY = Math.max.apply(null, allPoints.map(function (p) { return p.y; }));

			let canvasSize = 400;
			let pad = 25;
			let scale = Math.min(
				(canvasSize - 2 * pad) / (maxX - minX),
				(canvasSize - 2 * pad) / (maxY - minY)
			);
			ct.translate(canvasSize / 2 - scale * (minX + maxX) / 2, canvasSize / 2 - scale * (minY + maxY) / 2);
			ct.scale(scale, scale);
			ct.lineWidth = 2 / scale;
			ct.strokeStyle = '#000';

			// Спереди то, что ближе к наблюдателю (sin > 0),
			// плюс крайние слева и справа силуэтные рёбра
			let bxMin = Math.min.apply(null, bottomVerts.map(function (p) { return p.x; }));
			let bxMax = Math.max.apply(null, bottomVerts.map(function (p) { return p.x; }));
			function isFrontVertex(i) {
				return bottomVerts[i].sin > 0 || bottomVerts[i].x === bxMin || bottomVerts[i].x === bxMax;
			}
			function isFrontEdge(i) {
				let j = (i + 1) % n;
				return (bottomVerts[i].sin + bottomVerts[j].sin) / 2 > 0;
			}
			function line(p1, p2) {
				ct.beginPath();
				ct.moveTo(p1.x, p1.y);
				ct.lineTo(p2.x, p2.y);
				ct.stroke();
			}

			// Призма: боковые рёбра и нижнее основание;
			// верхнее основание видно целиком. Невидимые рёбра не рисуем
			for (let i = 0; i < n; i++) {
				let j = (i + 1) % n;
				if (isFrontVertex(i)) {
					line(bottomVerts[i], topVerts[i]);
				}
				if (isFrontEdge(i)) {
					line(bottomVerts[i], bottomVerts[j]);
				}
				line(topVerts[i], topVerts[j]);
			}

			// Пирамида: боковые рёбра и видимые рёбра основания
			for (let i = 0; i < n; i++) {
				let j = (i + 1) % n;
				if (isFrontVertex(i)) {
					line(pyBaseVerts[i], apex);
				}
				if (isFrontEdge(i)) {
					line(pyBaseVerts[i], pyBaseVerts[j]);
				}
			}
		};

		NAtask.setTask({
			text: v.text + ' ' + ['Сколько граней', 'Сколько рёбер'][rand] +
				' у получившегося многогранника (невидимые рёбра на рисунке не изображены)?',
			answers: answers[rand],
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
