(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const p1 = sl(1, 9) / 10;
		const q1 = sl(1, 9) / 10;
		const q2 = sl(1, 9) / 10;
		const probabilities = [p1 * q1, p1 * (1 - q1), (1 - p1) * q2, (1 - p1) * (1 - q2)];
		const probabilityB = probabilities.slice(1).sum();
		const probabilityIntersection = probabilities[1] + probabilities[2];
		const answer = probabilityIntersection / probabilityB;
		genAssertZ1000(answer);
		const vertices = [[200, 60], [100, 160], [300, 160], [60, 270], [140, 270], [260, 270], [340, 270]];
		const edges = [[0, 1, p1, 1], [0, 2, 1 - p1, -1], [1, 3, q1, 1],
			[1, 4, 1 - q1, -1], [2, 5, q2, 1], [2, 6, 1 - q2, -1]];
		NAtask.setTask({
			text: 'На рисунке показано дерево некоторого случайного эксперимента. Событию $A$ благоприятствуют ' +
				'элементарные события $a$, $b$ и $c$, а событию $B$ — события $b$, $c$ и $d$. ' +
				'Найдите $P(A|B)$ — условную вероятность события $A$ при условии $B$.',
			answers: answer,
			analys: 'Вероятности исходов равны произведениям вероятностей на соответствующих ветвях: ' +
				'$P(a)=' + probabilities[0].ts() + '$, $P(b)=' + probabilities[1].ts() + '$, $P(c)=' +
				probabilities[2].ts() + '$, $P(d)=' + probabilities[3].ts() + '$. Тогда $P(B)=' + probabilityB.ts() +
				'$, $P(A\\cap B)=' + probabilityIntersection.ts() + '$. По определению $P(A|B)=\\frac{P(A\\cap B)}{P(B)}=' + answer.ts() + '$.',
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function(ctx) {
				ctx.save();
				ctx.strokeStyle = 'black';
				ctx.fillStyle = 'black';
				ctx.lineWidth = 2;
				ctx.font = '16px liberation_sans';
				ctx.textAlign = 'center';
				edges.forEach(([from, to, probability, side]) => {
					const [x1, y1] = vertices[from];
					const [x2, y2] = vertices[to];
					ctx.drawLine(x1, y1, x2, y2);
					const middle = coordinatesMiddleOfSegment(x1, y1, x2, y2);
					const normal = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
					ctx.markSegmentWithLetter(middle[0], middle[1], normal, probability.ts(), side * 18, 50);
				});
				vertices.forEach(([x, y]) => ctx.drawFilledCircle(x, y, 4));
				const leafY = vertices[3][1];
				const eventRadiusX = 135;
				const eventRadiusY = 45;
				const eventCenterA = (vertices[3][0] + vertices[5][0]) / 2;
				const eventCenterB = (vertices[4][0] + vertices[6][0]) / 2;
				ctx.drawEllipse(eventCenterA, leafY, eventRadiusX, eventRadiusY);
				ctx.drawEllipse(eventCenterB, leafY, eventRadiusX, eventRadiusY);
				ctx.fillText('S', vertices[0][0], vertices[0][1] - 18);
				['a', 'b', 'c', 'd'].forEach((letter, i) => ctx.fillText(letter, vertices[i + 3][0], vertices[i + 3][1] + 27));
				ctx.fillText('A', eventCenterA - eventRadiusX + 5, leafY + eventRadiusY + 25);
				ctx.fillText('B', eventCenterB + eventRadiusX - 5, leafY + eventRadiusY + 25);
				ctx.restore();
			},
		});
	}, 1000);
})();
// 509342
