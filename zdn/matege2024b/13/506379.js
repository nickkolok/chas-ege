(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9);
		let b = slKrome(a, 2, 9);
		let c = sl(2, 12);

		let V = a * b * c;
		let S = 2 * (a * b + a * c + b * c);

		let paint = function(ctx) {
			let W = 400;
			ctx.translate(W / 2, W / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;

			// Передняя (ближняя) грань — квадрат; задняя смещена вправо-вверх, как на скриншоте.
			let hw = 70, hh = 70, ox = 40, oy = 20, sx = 55, sy = 55;
			let fTL = [-ox - hw,  oy - hh];
			let fTR = [-ox + hw,  oy - hh];
			let fBL = [-ox - hw,  oy + hh];
			let fBR = [-ox + hw,  oy + hh];
			let bTL = [fTL[0] + sx, fTL[1] - sy];
			let bTR = [fTR[0] + sx, fTR[1] - sy];
			let bBL = [fBL[0] + sx, fBL[1] - sy];
			let bBR = [fBR[0] + sx, fBR[1] - sy];

			let line = function(p, q) {
				ctx.beginPath();
				ctx.moveTo(p[0], p[1]);
				ctx.lineTo(q[0], q[1]);
				ctx.stroke();
			};

			// Видимые рёбра (сплошные)
			line(fTL, fTR); line(fTR, fBR); line(fBR, fBL); line(fBL, fTL); // передняя грань
			line(fTL, bTL); line(fTR, bTR); line(fBR, bBR);                 // уходящие вглубь
			line(bTL, bTR); line(bTR, bBR);                                 // верхнее и правое задние

			// Невидимые рёбра (пунктир)
			ctx.setLineDash([5, 4]);
			line(bTL, bBL); line(bBL, bBR); line(fBL, bBL);
			ctx.setLineDash([]);
		};

		NAtask.setTask({
			text: 'Два ребра прямоугольного параллелепипеда равны ' + a + ' и ' + b +
				', а объём параллелепипеда равен ' + V +
				'. Найдите площадь поверхности этого параллелепипеда.',
			answers: S,
			analys: 'Объём прямоугольного параллелепипеда равен произведению его рёбер: $V = a b c$, ' +
				'откуда третье ребро $c = V / (a b) = ' + V + ' / ' + (a * b) + ' = ' + c + '$. ' +
				'Площадь поверхности $S = 2(ab + ac + bc) = 2(' + (a * b) + ' + ' + (a * c) + ' + ' + (b * c) + ') = ' + S + '$.',
			authors: ['Надежда'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	}, 100000);
})();
//506379
/* СдамГИА: 506379 506519 510012 510207 510227 510247 510267 515838 515858 */
