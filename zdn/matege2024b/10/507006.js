(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '507006';
		let preference = [
			'findRoom',
			'findCorridor',
			'findKitchen',
			'findBathroom',
			'findKitchenTwoRooms1',
			'findSecondRoom',
			'findFirstRoom',
			'findKitchenTwoRooms2',
		];
		let rand = getSelectedPreferenceFromList(key, preference);

		let topH = sl(6, 10) * 0.5;
		let bottomH = sl(2, 4) * 0.5;
		let bathW = sl(2, 4) * 0.5;
		let kitchenW = sl(5, 8) * 0.5;

		let roomW = sl(7, 12) * 0.5;

		let room1W = sl(7, 11) * 0.5;
		let room2W = sl(7, 11) * 0.5;

		let totalWidthOne = kitchenW + roomW;
		let corridorLengthOne = totalWidthOne - bathW;

		let totalWidthTwo = kitchenW + room1W + room2W;
		let corridorLengthTwo = totalWidthTwo - bathW;

		genAssert(corridorLengthOne > kitchenW, 'Коридор должен иметь корректную длину');
		genAssert(corridorLengthTwo > room1W, 'Коридор должен иметь корректную длину');

		let answers = [
			roomW * topH,
			corridorLengthOne * bottomH,
			kitchenW * topH,
			bathW * bottomH,
			kitchenW * topH,
			room2W * topH,
			room1W * topH,
			kitchenW * topH,
		];

		let analys = [
			`Общая длина квартиры равна $${bathW}+${corridorLengthOne}=${totalWidthOne}$ м. Тогда длина комнаты равна $${totalWidthOne}−${kitchenW}=${roomW}$ м. Площадь комнаты равна $${roomW}\\cdot${topH}=${answers[0]}$ м$^2$.`,

			`Общая длина квартиры равна $${kitchenW}+${roomW}=${totalWidthOne}$ м. Длина коридора равна $${totalWidthOne}−${bathW}=${corridorLengthOne}$ м. Площадь коридора равна $${corridorLengthOne}\\cdot${bottomH}=${answers[1]}$ м$^2$.`,

			`Общая длина квартиры равна $${bathW}+${corridorLengthOne}=${totalWidthOne}$ м. Длина кухни равна $${totalWidthOne}−${roomW}=${kitchenW}$ м. Площадь кухни равна $${kitchenW}\\cdot${topH}=${answers[2]}$ м$^2$.`,

			`Общая длина квартиры равна $${kitchenW}+${roomW}=${totalWidthOne}$ м. Ширина санузла равна $${totalWidthOne}−${corridorLengthOne}=${bathW}$ м. Площадь санузла равна $${bathW}\\cdot${bottomH}=${answers[3]}$ м$^2$.`,

			`Общая длина квартиры равна $${bathW}+${corridorLengthTwo}=${totalWidthTwo}$ м. Длина кухни равна $${totalWidthTwo}−${room1W}−${room2W}=${kitchenW}$ м. Площадь кухни равна $${kitchenW}\\cdot${topH}=${answers[4]}$ м$^2$.`,

			`Общая длина квартиры равна $${bathW}+${corridorLengthTwo}=${totalWidthTwo}$ м. Длина второй комнаты равна $${totalWidthTwo}−${kitchenW}−${room1W}=${room2W}$ м. Площадь второй комнаты равна $${room2W}\\cdot${topH}=${answers[5]}$ м$^2$.`,

			`Общая длина квартиры равна $${bathW}+${corridorLengthTwo}=${totalWidthTwo}$ м. Длина первой комнаты равна $${totalWidthTwo}−${kitchenW}−${room2W}=${room1W}$ м. Площадь первой комнаты равна $${room1W}\\cdot${topH}=${answers[6]}$ м$^2$.`,

			`Общая длина квартиры равна $${bathW}+${corridorLengthTwo}=${totalWidthTwo}$ м. Длина кухни равна $${totalWidthTwo}−${room1W}−${room2W}=${kitchenW}$ м. Площадь кухни равна $${kitchenW}\\cdot${topH}=${answers[7]}$ м$^2$.`,
		][rand];

		NAtask.setTask({
			text: `Квартира состоит из ${rand < 4 ? 'комнаты' : 'двух комнат'}, кухни, коридора и санузла (см. чертёж). `,
			questions: [
				[{
					text: `Кухня имеет размеры ${kitchenW} м × ${topH} м, санузел – ${bathW} м × ${bottomH} м, длина коридора ${corridorLengthOne} м. Найдите площадь комнаты`,
					answers: answers[0],
				}, {
					text: `Кухня имеет размеры ${kitchenW} м × ${topH} м, санузел – ${bathW} м × ${bottomH} м, длина комнаты ${roomW} м. Найдите площадь коридора`,
					answers: answers[1],
				}, {
					text: `Комната имеет размеры ${roomW} м × ${topH} м, санузел – ${bathW} м × ${bottomH} м, длина коридора ${corridorLengthOne} м. Найдите площадь кухни`,
					answers: answers[2],
				}, {
					text: `Комната имеет размеры ${roomW} м × ${topH} м, коридор – ${bottomH} м × ${corridorLengthOne} м, длина кухни ${kitchenW} м. Найдите площадь санузла`,
					answers: answers[3],
				}, {
					text: `Первая комната имеет размеры ${topH} м × ${room1W} м, вторая – ${topH} м × ${room2W} м, санузел имеет размеры ${bathW} м × ${bottomH} м, длина коридора ${corridorLengthTwo} м. Найдите площадь кухни`,
					answers: answers[4],
				}, {
					text: `Кухня имеет размеры ${topH} м × ${kitchenW} м, первая комната – ${topH} м × ${room1W} м, санузел имеет размеры ${bathW} м × ${bottomH} м, длина коридора ${corridorLengthTwo} м. Найдите площадь второй комнаты`,
					answers: answers[5],
				}, {
					text: `Кухня имеет размеры ${topH} м × ${kitchenW} м, вторая комната – ${topH} м × ${room2W} м, санузел имеет размеры ${bathW} м × ${bottomH} м, длина коридора ${corridorLengthTwo} м. Найдите площадь первой комнаты`,
					answers: answers[6],
				}, {
					text: `Первая комната имеет размеры ${topH} м × ${room1W} м, вторая – ${topH} м × ${room2W} м, санузел имеет размеры ${bathW} м × ${bottomH} м, длина коридора ${corridorLengthTwo} м. Найдите площадь кухни`,
					answers: answers[7],
				}][rand]
			],
			postquestion: ` (в квадратных метрах).`,
			analys: analys,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let left = 45;
				let right = 355;
				let top = 100;
				let bottom = 290;

				let isTwoRooms = rand >= 4;

				let totalW = isTwoRooms ? totalWidthTwo : totalWidthOne;
				let totalH = topH + bottomH;

				let k = Math.min((right - left) / totalW, (bottom - top) / totalH);

				let drawW = totalW * k;
				let drawH = totalH * k;

				let x0 = (400 - drawW) / 2;
				let y0 = (400 - drawH) / 2;

				let ySplit = y0 + topH * k;
				let xBath = x0 + bathW * k;
				let xKitchen = x0 + kitchenW * k;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				ct.strokeRect(x0, y0, drawW, drawH);
				ct.drawLine(x0, ySplit, x0 + drawW, ySplit);
				ct.drawLine(xBath, ySplit, xBath, y0 + drawH);
				ct.drawLine(xKitchen, y0, xKitchen, ySplit);

				if (isTwoRooms) {
					let xRoom1 = xKitchen + room1W * k;
					ct.drawLine(xRoom1, y0, xRoom1, ySplit);
				}

				ct.fillStyle = om.secondaryBrandColors[0];
				ct.font = '15px liberation_sans';
				ct.textAlign = 'center';
				ct.textBaseline = 'middle';

				ct.fillText('кухня', x0 + kitchenW * k / 2, y0 + topH * k / 2);

				if (!isTwoRooms) {
					ct.fillText('комната', xKitchen + roomW * k / 2, y0 + topH * k / 2);
				} else {
					let xRoom1 = xKitchen + room1W * k;

					ct.fillText('1-я', xKitchen + room1W * k / 2, y0 + topH * k / 2 - 9);
					ct.fillText('комната', xKitchen + room1W * k / 2, y0 + topH * k / 2 + 9);

					ct.fillText('2-я', xRoom1 + room2W * k / 2, y0 + topH * k / 2 - 9);
					ct.fillText('комната', xRoom1 + room2W * k / 2, y0 + topH * k / 2 + 9);
				}

				ct.fillText('с/у', x0 + bathW * k / 2, ySplit + bottomH * k / 2);
				ct.fillText('коридор', xBath + (drawW - bathW * k) / 2, ySplit + bottomH * k / 2);

				ct.font = '14px liberation_sans';

				ct.textAlign = 'center';
				ct.textBaseline = 'alphabetic';

				ct.fillText(kitchenW, x0 + kitchenW * k / 2, y0 - 8);

				if (!isTwoRooms) {
					ct.fillText(roomW, xKitchen + roomW * k / 2, y0 - 8);
				} else {
					let xRoom1 = xKitchen + room1W * k;

					ct.fillText(room1W, xKitchen + room1W * k / 2, y0 - 8);
					ct.fillText(room2W, xRoom1 + room2W * k / 2, y0 - 8);
				}

				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(topH, x0 - 8, y0 + topH * k / 2);
				ct.fillText(bottomH, x0 - 8, ySplit + bottomH * k / 2);

				ct.textAlign = 'center';
				ct.textBaseline = 'top';
				ct.fillText(bathW, x0 + bathW * k / 2, y0 + drawH + 8);
				ct.fillText(isTwoRooms ? corridorLengthTwo : corridorLengthOne, xBath + (drawW - bathW * k) / 2, y0 + drawH + 8);
			},
		});
	}, 20000);
})();

// https://mathb-ege.sdamgia.ru/problem?id=507006
