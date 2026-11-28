(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const uniqueCount = sl(3, 4);
		const uniqueValues = arrayOfUniqueValues(uniqueCount, 1, 9);
		const xValues = uniqueValues.flatMap(value => Array(sl(2, 5)).fill(value)).shuffle();
		const n = xValues.length;
		const denominator = [10, 20, 50].filter(value => value >= n).iz();
		const cuts = [0].concat(arrayOfUniqueValues(n - 1, 1, denominator - 1).sortNumeric(), denominator);
		const weights = cuts.slice(1).map((value, i) => value - cuts[i]).shuffle();
		const probs = weights.map(weight => weight / denominator);
		const positions = [];
		for (const y of [80, 160, 240, 320]) {
			for (const x of [60, 130, 200, 270, 340]) {
				positions.push([x, y]);
			}
		}
		const coords = positions.iz(n);
		const targetX = uniqueValues.iz();
		const terms = probs.filter((probability, i) => xValues[i] === targetX);
		const probTarget = terms.sum();
		genAssertZ1000(probTarget);
		NAtask.setTask({
			text: 'На диаграмме Эйлера схематически показан случайный опыт $S$. Точками изображены все элементарные события. ' +
				'Около каждой точки указано значение случайной величины $X$ и вероятность этого элементарного события. ' +
				'Найдите вероятность события $\\{X=' + targetX + '\\}$.',
			answers: probTarget,
			analys: 'Событию $\\{X=' + targetX + '\\}$ благоприятствуют исходы со значением случайной величины ' + targetX +
				'. Сложим их вероятности: $P(X=' + targetX + ')=' + terms.map(value => value.ts()).join('+') + '=' + probTarget.ts() + '$.',
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function(ctx) {
				ctx.save();
				ctx.strokeStyle = 'black';
				ctx.fillStyle = 'black';
				ctx.lineWidth = 1;
				ctx.strokeRect(20, 20, ctx.canvas.width - 40, ctx.canvas.height - 40);
				ctx.font = '18px liberation_sans';
				ctx.textAlign = 'center';
				ctx.fillText('S', ctx.canvas.width - 40, 45);
				coords.forEach(([x, y], i) => {
					ctx.drawFilledCircle(x, y, 3.6);
					ctx.font = 'bold 16px liberation_sans';
					ctx.fillText(xValues[i].ts(), x, y - 8);
					ctx.font = '13px liberation_sans';
					ctx.fillText(probs[i].ts(), x, y + 18);
				});
				ctx.restore();
			},
		});
	}, 1000);
})();
// 509533
