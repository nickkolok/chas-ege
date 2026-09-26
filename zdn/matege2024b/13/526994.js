(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Первый катет чётный - тогда объём заведомо целый
		let a = sl(2, 8) * 2;
		// Ограничиваем отношение размеров, чтобы чертёж был читаемым
		let b = sl(Math.max(3, Math.ceil(a / 3)), Math.min(16, 3 * a));
		let h = sl(Math.max(2, Math.ceil(Math.max(a, b) / 3)), Math.min(12, 3 * Math.min(a, b)));

		let S = a * b / 2;
		let V = S * h;

		let paint1 = function(ctx) {
			let factor = 0.5;
			let angle = Math.PI / 4;
			let proj = function(p) {
				return {
					x: p[0] + factor * Math.cos(angle) * p[1],
					y: p[2] + factor * Math.sin(angle) * p[1],
				};
			};

			// Основание - прямоугольный треугольник с прямым углом во второй вершине
			let points = [
				[0, 0, 0], [a, 0, 0], [a, b, 0],
				[0, 0, h], [a, 0, h], [a, b, h],
			].map(proj);

			let xs = points.map((p) => p.x);
			let ys = points.map((p) => p.y);
			let centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
			let centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
			let scale = Math.min(360 / (Math.max(...xs) - Math.min(...xs)), 360 / (Math.max(...ys) - Math.min(...ys)));

			ctx.translate(200, 200);
			ctx.scale(scale, -scale);
			ctx.translate(-centerX, -centerY);

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2 / scale;

			// Видимые рёбра
			[
				[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [5, 3],
			].forEach((e) => ctx.drawLine(points[e[0]].x, points[e[0]].y, points[e[1]].x, points[e[1]].y));

			// Скрытая гипотенуза основания
			ctx.setLineDash([6 / scale, 4 / scale]);
			ctx.drawLine(points[0].x, points[0].y, points[2].x, points[2].y);
			ctx.setLineDash([]);

			// Отметка прямого угла
			let t = 0.15 * Math.min(a, b);
			let q1 = proj([a - t, 0, 0]);
			let q2 = proj([a - t, t, 0]);
			let q3 = proj([a, t, 0]);
			ctx.drawLine(q1.x, q1.y, q2.x, q2.y);
			ctx.drawLine(q2.x, q2.y, q3.x, q3.y);
		};

		NAtask.setTask({
			text: 'В основании прямой призмы лежит прямоугольный треугольник, катеты которого равны $' +
				[a, b].shuffleJoin('$ и $') + '$. Найдите объём призмы, если её высота равна $' + h + '$.',
			analys: 'Площадь основания равна половине произведения катетов: S = (' + a + ' · ' + b + ') / 2 = ' + S +
				'. Объём призмы равен произведению площади основания на высоту: V = ' + S + ' · ' + h + ' = ' + V + '.',
			answers: V,
			authors: ['Селена'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 526994 https://mathb-ege.sdamgia.ru/problem?id=526994
