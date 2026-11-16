(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9);
		let b = sl(2, 9);
		let c = sl(2, 12);

		let box = new Parallelepiped({ width: a, depth: b, height: c });
		let V = box.volume;
		let S = box.surfaceArea;

		let canvasSize = 400;

		// Чертёж — библиотечный drawParallelepiped, как в аналоге 515838.
		let paint = function(ctx) {
			ctx.translate(120, 60);
			ctx.scale(20, 20);
			ctx.lineWidth = 2 / 20;

			let maxDim = Math.max(a, b, c);
			let scale = 8 / maxDim;
			let drawA = a * scale;
			let drawB = b * scale;
			let drawC = c * scale;

			ctx.drawParallelepiped({
				width: drawA,
				height: drawC,
				depth: drawB,
				angle: 30,
				strokeStyle: om.secondaryBrandColors.iz(),
			}, [0, 3, 4], false, [0.5, 0.2]);
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
			width: canvasSize,
			height: canvasSize,
			paint: paint,
		});
	}, 100000);
})();
//506379
/* СдамГИА: 506379 (аналоги по тому же прототипу, симлинками НЕ оформлены: 506519 510012 510207 510227 510247 510267 515838 515858) */
