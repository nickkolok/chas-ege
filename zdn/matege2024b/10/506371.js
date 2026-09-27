(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '506371';

		let variants = [{
			h1: 0.7,
			h2: 1.5,
			l: 1.1
		}, {
			h1: 1.1,
			h2: 2.1,
			l: 1.6
		}, {
			h1: 1.15,
			h2: 2.15,
			l: 1.65
		}, {
			h1: 1.25,
			h2: 2.25,
			l: 1.75
		}, {
			h1: 1.05,
			h2: 2.05,
			l: 1.55
		}, {
			h1: 1.25,
			h2: 2.05,
			l: 1.65
		}, ];

		let t = variants.iz();

		NAtask.setTask({
			text: `Перила лестницы дачного дома для надёжности укреплены посередине вертикальным столбом. `,
			questions: [{
				text: `Найдите высоту $l$ этого столба, если наименьшая высота $h_1$ перил равна ${t.h1.ts()} м, а наибольшая высота $h_2$ равна ${t.h2.ts()} м`,
				answers: t.l,
			}],
			postquestion: `. Ответ дайте в метрах.`,
			analys: `Высота среднего столба является средней линией трапеции, поэтому $l=\\frac{h_1+h_2}{2}=\\frac{${t.h1.ts()}+${t.h2.ts()}}{2}=${t.l.ts()}$ м.`,
		});

		NAtask.modifiers.allDecimalsToStandard();

		let groundY = 300;
		let leftX = 65;
		let rightX = 335;
		let middleX = (leftX + rightX) / 2;

		let minTopY = 215;
		let maxTopY = 105;

		let k = (minTopY - maxTopY) / (t.h2 - t.h1);

		let h1Y = groundY - t.h1 * k;
		let h2Y = groundY - t.h2 * k;
		let lY = groundY - t.l * k;

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function(ctx) {
				let primaryColor = om.primaryBrandColors[0];
				let secondaryColor = om.secondaryBrandColors[0];

				ctx.strokeStyle = primaryColor;
				ctx.fillStyle = primaryColor;
				ctx.lineWidth = 2;

				// Земля
				ctx.drawLine(40, groundY, 365, groundY);

				// Левая стойка h1
				ctx.drawLine(leftX, groundY, leftX, h1Y);

				// Правая стойка h2
				ctx.drawLine(rightX, groundY, rightX, h2Y);

				// Наклонные перила
				ctx.drawLine(leftX, h1Y, rightX, h2Y);

				// Средний вертикальный столб
				ctx.drawLine(middleX, groundY, middleX, lY);

				// Лестница
				let stairX = 92;
				let stairY = groundY;
				let stairWidth = 34;
				let stairHeight = 20;
				let stairCount = 7;

				for (let i = 0; i < stairCount; i++) {
					ctx.drawLine(
						stairX + i * stairWidth,
						stairY - i * stairHeight,
						stairX + i * stairWidth,
						stairY - (i + 1) * stairHeight
					);

					let x2 = i === stairCount - 1 ? rightX : stairX + (i + 1) * stairWidth;

					ctx.drawLine(
						stairX + i * stairWidth,
						stairY - (i + 1) * stairHeight,
						x2,
						stairY - (i + 1) * stairHeight
					);
				}

				// Подписи
				ctx.fillStyle = secondaryColor;
				ctx.font = '16px italic liberation_sans';
				ctx.textBaseline = 'middle';

				ctx.textAlign = 'right';
				ctx.fillText('h₁', leftX - 10, (groundY + h1Y) / 2);

				ctx.textAlign = 'left';
				ctx.fillText('h₂', rightX + 10, (groundY + h2Y) / 2);

				ctx.textAlign = 'right';
				ctx.fillText('l', middleX - 8, (groundY + lY) / 2);
			},
		});
	}, 1000);
})();

// https://mathb-ege.sdamgia.ru/test?likes=506371
