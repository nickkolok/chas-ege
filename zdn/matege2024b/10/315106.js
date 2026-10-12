(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '315106';
		let preference = ['findWireLength', 'findPoleHeight'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let triples = [
			{ x: 5, y: 12, L: 13 },
			{ x: 9, y: 12, L: 15 },
			{ x: 12, y: 5, L: 13 },
			{ x: 12, y: 9, L: 15 },
			{ x: 15, y: 8, L: 17 },
			{ x: 16, y: 12, L: 20 },
			{ x: 20, y: 15, L: 25 },
		];

		let triple = triples.iz();

		let distance = triple.x;
		let heightDifference = triple.y;
		let wireLength = triple.L;

		let houseHeight = sl(2, 6);
		let poleHeight = houseHeight + heightDifference;

		let answers = [
			wireLength,
			poleHeight,
		];

		let analys = [
			`Разность высот точек крепления провода равна $${poleHeight}−${houseHeight}=${heightDifference}$ м. По теореме Пифагора длина провода равна $\\sqrt{${distance}^2+${heightDifference}^2}=\\sqrt{${distance * distance}+${heightDifference * heightDifference}}=\\sqrt{${wireLength * wireLength}}=${wireLength}$ м.`,
			`Разность высот точек крепления провода равна $\\sqrt{${wireLength}^2−${distance}^2}=\\sqrt{${wireLength * wireLength}−${distance * distance}}=\\sqrt{${heightDifference * heightDifference}}=${heightDifference}$ м. Поэтому высота столба равна $${houseHeight}+${heightDifference}=${poleHeight}$ м.`,
		][rand];

		NAtask.setTask({
			text: `От столба к дому натянут провод, который крепится на высоте ${houseHeight} м от земли (см. рисунок). Расстояние от дома до столба ${distance} м. `,
			questions: [
				[{
					text: `Высота столба равна ${poleHeight} м. Найдите длину провода`,
					answers: answers[0],
				}, {
					text: `Длина провода равна ${wireLength} м. Вычислите высоту столба`,
					answers: answers[1],
				}][rand]
			],
			postquestion: `. Ответ дайте в метрах.`,
			analys: analys,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let groundY = 305;
				let poleX = 85;
				let wallX = 315;

				let topLimit = 75;
				let kHorizontal = (wallX - poleX) / distance;
				let kVertical = (groundY - topLimit) / poleHeight;
				let k = Math.min(kHorizontal, kVertical);

				let poleTopY = groundY - poleHeight * k;
				let wallAttachY = groundY - houseHeight * k;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				// Земля
				ct.drawLine(45, groundY, 355, groundY);

				// Столб
				ct.drawLine(poleX, groundY, poleX, poleTopY);

				// Стена дома
				ct.drawLine(wallX, groundY, wallX, 75);

				// Штриховка стены
				for (let y = 85; y < groundY; y += 14) {
					ct.drawLine(wallX, y, wallX + 18, y + 10);
				}

				// Провод
				ct.drawLine(poleX, poleTopY, wallX, wallAttachY);

				ct.fillStyle = om.secondaryBrandColors[0];
				ct.font = '16px liberation_sans';

				// Высота столба
				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(rand === 0 ? poleHeight : '?', poleX - 10, (poleTopY + groundY) / 2);

				// Высота крепления
				ct.textAlign = 'right';
				ct.fillText(houseHeight, wallX - 12, (wallAttachY + groundY) / 2);

				// Расстояние между домом и столбом
				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				ct.fillText(distance, (poleX + wallX) / 2, groundY + 10);

				// Длина провода
				ct.save();
				ct.translate((poleX + wallX) / 2, (poleTopY + wallAttachY) / 2);
				ct.rotate(Math.atan2(wallAttachY - poleTopY, wallX - poleX));
				ct.textAlign = 'center';
				ct.textBaseline = 'bottom';
				ct.fillText(rand === 0 ? '?' : wireLength, 0, -8);
				ct.restore();
			},
		});
	}, 20000);
})();

// https://oge.sdamgia.ru/problem?id=315106
