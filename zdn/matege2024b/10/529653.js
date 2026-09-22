(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '529653';
		let preference = ['findColumnHeight', 'findShadowLength', 'findDistance'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let triples = [];
		for (let personDm of [16, 18]) {
			for (let shadow = 1; shadow <= 10; shadow++) {
				for (let distance = 1; distance <= 12; distance++) {
					let num = personDm * (distance + shadow);
					if (num % shadow === 0) {
						let columnDm = num / shadow;
						if (columnDm % 10 === 0 && columnDm >= 30 && columnDm <= 100) {
							triples.push({
								person: personDm / 10,
								distance: distance,
								shadow: shadow,
								column: columnDm / 10,
							});
						}
					}
				}
			}
		}
		let t = triples.iz();

		let text = [
			'Человек, рост которого равен $' + t.person.ts() + '$ м, стоит на расстоянии $' + t.distance + '$ м от столба, на котором висит фонарь. При этом длина тени человека равна $' + t.shadow + '$ м. Определите высоту столба (в метрах).',
			'Фонарь висит на столбе высотой $' + t.column + '$ м. Человек, рост которого равен $' + t.person.ts() + '$ м, стоит на расстоянии $' + t.distance + '$ м от столба. Определите длину тени человека (в метрах).',
			'Фонарь висит на столбе высотой $' + t.column + '$ м. Человек, рост которого равен $' + t.person.ts() + '$ м, стоит на некотором расстоянии от столба, при этом длина его тени равна $' + t.shadow + '$ м. Найдите расстояние от человека до столба (в метрах).',
		][rand];

		let analys = 'Луч света, идущий от фонаря через голову человека, достигает земли в конце его тени. ' +
			'Прямоугольные треугольники, образованные столбом с тенью от столба до конца тени человека и человеком с его тенью, подобны, поэтому ' +
			'$' + t.column + ':' + t.person.ts() + '=' + (t.distance + t.shadow) + ':' + t.shadow + '$. ' +
			['Высота столба равна $' + t.column + '$ м.',
				'Длина тени человека равна $' + t.shadow + '$ м.',
				'Расстояние от человека до столба равно $' + t.distance + '$ м.'][rand];

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: [t.column, t.shadow, t.distance][rand],
			authors: ['chas-ege-selena'],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();

		let labelColumn = ['?', t.column + ' м', t.column + ' м'][rand];
		let labelShadow = ['тень: ' + t.shadow + ' м', '?', 'тень: ' + t.shadow + ' м'][rand];
		let labelDistance = [t.distance + ' м', t.distance + ' м', '?'][rand];
		let labelPerson = t.person.ts() + ' м';

		NAtask.modifiers.addCanvasIllustration({
			width: 620,
			height: 320,
			paint: function (ctx) {
				let width = 620;
				let height = 320;
				let left = 80;
				let right = 40;
				let top = 25;
				let bottom = 65;
				let k = Math.min((width - left - right) / (t.distance + t.shadow), (height - top - bottom) / t.column);
				let px = function (x) { return left + x * k; };
				let groundY = height - bottom;
				let py = function (y) { return groundY - y * k; };

				ctx.strokeStyle = 'black';
				ctx.fillStyle = 'black';
				ctx.lineWidth = 2;

				ctx.drawLine(px(0) - 15, groundY, px(t.distance + t.shadow) + 25, groundY);
				ctx.drawLine(px(0), groundY, px(0), py(t.column));
				ctx.fillKrug(px(0), py(t.column), 4);
				ctx.setLineDash([12, 10]);
				ctx.drawLine(px(0), py(t.column), px(t.distance + t.shadow), groundY);
				ctx.setLineDash([]);
				let headR = 5;
				ctx.fillKrug(px(t.distance), py(t.person) + headR, headR);
				ctx.drawLine(px(t.distance), py(t.person) + 2 * headR, px(t.distance), groundY - 12);
				ctx.drawLine(px(t.distance), groundY - 12, px(t.distance) - 6, groundY);
				ctx.drawLine(px(t.distance), groundY - 12, px(t.distance) + 6, groundY);
				ctx.drawLine(px(t.distance) - 7, py(t.person) + 18, px(t.distance) + 7, py(t.person) + 18);

				ctx.lineWidth = 1;
				ctx.font = '16px liberation_sans';

				let yDim = groundY + 22;
				ctx.drawLine(px(0), groundY, px(0), yDim + 8);
				ctx.drawLine(px(t.distance), groundY, px(t.distance), yDim + 8);
				ctx.drawLine(px(t.distance + t.shadow), groundY, px(t.distance + t.shadow), yDim + 8);
				ctx.drawLine(px(0), yDim, px(t.distance), yDim);
				ctx.drawArrow(px(t.distance), yDim, px(0), yDim);
				ctx.drawArrow(px(0), yDim, px(t.distance), yDim);
				ctx.drawLine(px(t.distance), yDim, px(t.distance + t.shadow), yDim);
				ctx.drawArrow(px(t.distance + t.shadow), yDim, px(t.distance), yDim);
				ctx.drawArrow(px(t.distance), yDim, px(t.distance + t.shadow), yDim);
				ctx.textAlign = 'center';
				ctx.fillText(labelDistance, (px(0) + px(t.distance)) / 2, yDim + 22);
				ctx.fillText(labelShadow, (px(t.distance) + px(t.distance + t.shadow)) / 2, yDim + 22);

				let xDimC = px(0) - 35;
				ctx.drawLine(xDimC, groundY, xDimC, py(t.column));
				ctx.drawArrow(xDimC, groundY, xDimC, py(t.column));
				ctx.drawArrow(xDimC, py(t.column), xDimC, groundY);
				ctx.drawLine(px(0), py(t.column), xDimC - 6, py(t.column));
				ctx.textAlign = 'right';
				ctx.fillText(labelColumn, xDimC - 6, (groundY + py(t.column)) / 2 + 5);

				let xDimP = px(t.distance) - 22;
				ctx.drawLine(xDimP, groundY, xDimP, py(t.person));
				ctx.drawArrow(xDimP, groundY, xDimP, py(t.person));
				ctx.drawArrow(xDimP, py(t.person), xDimP, groundY);
				ctx.drawLine(px(t.distance), py(t.person), xDimP - 6, py(t.person));
				ctx.fillText(labelPerson, xDimP - 6, (groundY + py(t.person)) / 2 + 5);
				ctx.textAlign = 'left';
			},
		});
	}, 20000);
})();
//https://ege.sdamgia.ru/test?likes=529653
