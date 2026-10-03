(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9);
		let b = sl(2, 9);
		let c = sl(2, 12);

		let V = a * b * c;
		let S = 2 * (a * b + a * c + b * c);

		// Чертёж: пропорциональный параллелепипед, авто-вписанный в canvas.
		// Контракт вписывания (bounding box + maxScale:50) и стиль линий заимствованы из
		// zdn/matege2024p/3/245335.js (autoScale / setLineDash([5,4]) / om.secondaryBrandColors).
		// Ракурс и видимость рёбер считаем явно, чтобы попасть во фронтальную проекцию со
		// скриншота (движковый ракурс 245335 — изометрия, другой вид).
		let W = 400, H = 400, pad = 20, maxScale = 50;
		let k = 0.5, ang = Math.PI / 6;            // кавалерская проекция: глубина под 30°, коэф 0.5
		let ddx = Math.cos(ang), ddy = Math.sin(ang);
		// 3D-вершины пропорционально рёбрам: X~a (ширина), Y~b (глубина), Z~c (высота)
		// 0 fBL,1 fBR,2 fTR,3 fTL,  4 bBL,5 bBR,6 bTR,7 bTL
		let P3 = [
			[0, 0, 0], [a, 0, 0], [a, 0, c], [0, 0, c],
			[0, b, 0], [a, b, 0], [a, b, c], [0, b, c],
		];
		let proj = function(p) { return { x: p[0] + k * p[1] * ddx, y: -p[2] - k * p[1] * ddy }; };
		let pts = P3.map(proj);
		let xs = pts.map(function(p) { return p.x; });
		let ys = pts.map(function(p) { return p.y; });
		let minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs);
		let miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
		let scale = Math.min((W - 2 * pad) / (maxx - minx), (H - 2 * pad) / (maxy - miny));
		if (scale > maxScale) { scale = maxScale; }
		let cx = (minx + maxx) / 2, cy = (miny + maxy) / 2;
		let verts = pts.map(function(p) { return { x: (p.x - cx) * scale, y: (p.y - cy) * scale }; });
		let solid  = [[0,1],[1,2],[2,3],[3,0],[1,5],[2,6],[3,7],[5,6],[6,7]];
		let dashed = [[0,4],[4,5],[4,7]];          // три ребра в дальней нижней левой вершине

		let paint = function(ctx) {
			ctx.translate(W / 2, H / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			let seg = function(e) {
				ctx.beginPath();
				ctx.moveTo(verts[e[0]].x, verts[e[0]].y);
				ctx.lineTo(verts[e[1]].x, verts[e[1]].y);
				ctx.stroke();
			};
			solid.forEach(seg);
			ctx.setLineDash([5, 4]);
			dashed.forEach(seg);
			ctx.setLineDash([]);
		};

		NAtask.setTask({
			text: 'Два ребра прямоугольного параллелепипеда равны ' + a + ' и ' + b +
				', а объём параллелепипеда равен ' + V +
				'. Найдите площадь поверхности этого параллелепипеда.',
			answers: S,
			analys: 'Объём прямоугольного параллелепипеда равен произведению его измерений: $V = a b c$, ' +
				'откуда третье ребро $c = V / (a b) = ' + V + ' / ' + (a * b) + ' = ' + c + '$. ' +
				'Площадь полной поверхности $S = 2(ab + ac + bc) = 2(' + (a * b) + ' + ' + (a * c) + ' + ' + (b * c) + ') = ' + S + '$.',
			author: ['Надежда'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	}, 100000);
})();
//506379
/* СдамГИА: 506379 (аналоги по тому же прототипу, симлинками НЕ оформлены: 506519 510012 510207 510227 510247 510267 515838 515858) */
