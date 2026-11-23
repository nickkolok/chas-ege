(function() { 'use strict'; retryWhileError(function() {
	/* На рисунке изображено дерево случайного опыта. Найдите вероятность события B. */

	let [SA, SAB, SNAB] = arrayOfUniqueValues(3, 0.05, 0.95, 0.05);
	let [SNA, SANB, SNANB] = [SA, SAB, SNAB].map(prob => 1 - prob);

	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]

	let paint = function (ctx) {
		ctx.save();
			ctx.translateToCenter();
			ctx.translate(0, 70);
			let unit = 20;
			ctx.save();
			ctx.scale(unit, -unit);
			ctx.lineWidth = 0.1;

			//SA
			ctx.drawLine(0, 10, -5, 4);
			//SNA
			ctx.drawLine(0, 10, 5, 4);
			//SNAB
			ctx.drawLine(5, 4, 3, -1);
			//SNANB
			ctx.drawLine(5, 4, 7, -1);
			//SAB
			ctx.drawLine(-5, 4, -7, -1);
			//SANB
			ctx.drawLine(-5, 4, -3, -1);

			ctx.restore();
			ctx.font = '18px liberation_sans';
			ctx.lineWidth = 1;

			ctx.save();
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			[
				[0, -10, -5, -4, SA, 5, -4],
				[-5, -4, -7, 1, SAB, -3, 1],
				[-5, -4, -3, 1, SANB, -7, 1],
				[0, -10, 5, -4, SNA, -5, -4],
				[5, -4, 3, 1, SNAB, 7, 1],
				[5, -4, 7, 1, SNANB, 3, 1],
			].forEach(([x1, y1, x2, y2, probability, insideX, insideY]) => {
				let start = { x: x1 * unit, y: y1 * unit };
				let end = { x: x2 * unit, y: y2 * unit };
				let [x, y] = coordinatesMiddleOfSegment(start.x, start.y, end.x, end.y);
				let label = labelPositionOutsideSegment({ x, y }, start, end, { x: insideX * unit, y: insideY * unit }, 20);
				ctx.fillText(probability.ts(), label.x, label.y);
			});
			ctx.restore();

			//S
			ctx.fillText('S', 0, -10.2* unit);

			//A
			ctx.drawLine(5.2* unit, -4.8 * unit, 5.9* unit, -4.8 * unit);
			ctx.fillText('A', 5* unit + 5, -4* unit);
			ctx.fillText('A', -5* unit - 15, -4* unit);

			//B
			ctx.drawLine(7.6* unit, 1.2 * unit, 6.9* unit, 1.2 * unit);
			ctx.fillText('B', 7* unit, 1* unit +20);
			ctx.fillText('B', 3* unit, 1* unit +20);

			ctx.drawLine(-2.4* unit, 1.2 * unit, -3.1* unit, 1.2 * unit);
			ctx.fillText('B', -7* unit, 1* unit +20);
			ctx.fillText('B', -3* unit, 1* unit +20);
		ctx.restore();
	};

	NAtask.setTask({
		text:
			'На рисунке изображено дерево случайного опыта. ' + the_orderToFind.toZagl() +' вероятность события ',
		questions: [{
			text: '$B$',
			answers: SA*SAB+SNA*SNAB,
		},{
			text: '$\\overline{B}$',
			answers: SA*SANB+SNA*SNANB,
		}
			],
		postquestion: '.',
		authors: ['Александра Суматохина'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
	NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint,
		});
}, 2000);})();
//10886518
//Открытый банк заданий A61D76
