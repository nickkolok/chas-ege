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
						// Тела склеены по основаниям: основание пирамиды совпадает
			// с верхним основанием призмы, зазора нет
			let bottomVerts = [];
			let topVerts = [];
			for (let i = 0; i < n; i++) {
				bottomVerts.push(basePoint(i, 0));
				topVerts.push(basePoint(i, -prismH));
			}
			let pyBaseVerts = topVerts;
			let apex = { x: 0, y: -prismH - pyramidH };

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


			// Призма: боковые рёбра и нижнее основание.
			// Общее основание (стык призмы и пирамиды): видимые рёбра рисуем,
			// невидимые - нет, как обещает условие задачи
			for (let i = 0; i < n; i++) {
				let j = (i + 1) % n;
				if (isFrontVertex(i)) {
					ct.drawLine(bottomVerts[i].x, bottomVerts[i].y, topVerts[i].x, topVerts[i].y);
				}
				if (isFrontEdge(i)) {
					ct.drawLine(bottomVerts[i].x, bottomVerts[i].y, bottomVerts[j].x, bottomVerts[j].y);
					ct.drawLine(topVerts[i].x, topVerts[i].y, topVerts[j].x, topVerts[j].y);
				}
			}

			// Пирамида: боковые рёбра и видимые рёбра основания
			for (let i = 0; i < n; i++) {
				let j = (i + 1) % n;
				if (isFrontVertex(i)) {
					ct.drawLine(pyBaseVerts[i].x, pyBaseVerts[i].y, apex.x, apex.y);
				}
				if (isFrontEdge(i)) {
					ct.drawLine(pyBaseVerts[i].x, pyBaseVerts[i].y, pyBaseVerts[j].x, pyBaseVerts[j].y);
				}
			}
		};

		NAtask.setTask({
			text: v.text + ' ' + ['Сколько граней', 'Сколько рёбер'][rand] +
				' у получившегося многогранника (невидимые рёбра на рисунке не изображены)?',
			answers: answers[rand],
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
