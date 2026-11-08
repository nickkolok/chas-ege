(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '520513';
		let preference = ['squareHouse', 'rectangleHouse', 'squareAviary'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let B = sl(20, 45);
		let A = sl(B + 5, B + 20);
		let C = sl(5, Math.min(15, Math.floor(B / 2)));
		let D = sl(4, Math.min(12, Math.floor(B / 2)));

		let answers = [
			A * B - C * C,
			A * B - C * D,
			A * B - C * C,
		];

		let analys = [
			`Площадь участка равна $${A}\\cdot${B}=${A * B}$ м$^2$. Площадь дома равна $${C}^2=${C * C}$ м$^2$. Поэтому площадь оставшейся части участка равна $${A * B}-${C * C}=${answers[0]}$ м$^2$.`,
			`Площадь участка равна $${A}\\cdot${B}=${A * B}$ м$^2$. Площадь дома равна $${C}\\cdot${D}=${C * D}$ м$^2$. Поэтому площадь оставшейся части участка равна $${A * B}-${C * D}=${answers[1]}$ м$^2$.`,
			`Площадь участка равна $${A}\\cdot${B}=${A * B}$ м$^2$. Площадь вольера равна $${C}^2=${C * C}$ м$^2$. Поэтому площадь оставшейся части участка равна $${A * B}-${C * C}=${answers[2]}$ м$^2$.`,
		][rand];

		NAtask.setTask({
			text: `Дачный участок имеет форму прямоугольника, стороны которого равны ${chislitlx(A, 'метр')} и ${chislitlx(B, 'метр')}. `,
			questions: [
				[{
					text: `Дом, расположенный на участке, имеет на плане форму квадрата со стороной ${chislitlx(C, 'метр')}. Найдите площадь оставшейся части участка, не занятой домом`,
					answers: answers[0],
				}, {
					text: `Дом, расположенный на участке, на плане также имеет форму прямоугольника, стороны которого равны ${chislitlx(C, 'метр')} и ${chislitlx(D, 'метр')}. Найдите площадь оставшейся части участка, не занятой домом`,
					answers: answers[1],
				}, {
					text: `Хозяин отгородил на участке квадратный вольер со стороной ${chislitlx(C, 'метр')} (см. рис.). Найдите площадь оставшейся части участка`,
					answers: answers[2],
				}][rand]
			],
			postquestion: `. Ответ дайте в квадратных метрах.`,
			analys: analys,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: function (ct) {
				let left = 60;
				let right = 340;
				let top = 90;
				let bottom = 310;

				ct.strokeStyle = om.primaryBrandColors[0];
				ct.lineWidth = 2;

				ct.drawLine(left, top, right, top);
				ct.drawLine(right, top, right, bottom);
				ct.drawLine(right, bottom, left, bottom);
				ct.drawLine(left, bottom, left, top);

				if (rand === 0) {
					let size = 75;
					let houseLeft = 190;
					let houseTop = 165;

					ct.strokeRect(houseLeft, houseTop, size, size);
				}

				if (rand === 1) {
					let houseLeft = 180;
					let houseTop = 165;
					let houseWidth = 100;
					let houseHeight = 65;

					ct.strokeRect(houseLeft, houseTop, houseWidth, houseHeight);
				}

				if (rand === 2) {
					let k = Math.min((right - left) / A, (bottom - top) / B);
					let squareSize = C * k;

					ct.drawLine(left, bottom - squareSize, left + squareSize, bottom - squareSize);
					ct.drawLine(left + squareSize, bottom - squareSize, left + squareSize, bottom);
				}

				ct.fillStyle = om.secondaryBrandColors[0];
				ct.font = '16px liberation_sans';

				ct.textAlign = 'center';
				ct.textBaseline = 'alphabetic';
				ct.fillText(A, (left + right) / 2, top - 12);

				ct.textAlign = 'right';
				ct.textBaseline = 'middle';
				ct.fillText(B, left - 12, (top + bottom) / 2);

				if (rand === 0) {
					let size = 75;
					let houseLeft = 190;
					let houseTop = 165;

					ct.textAlign = 'center';
					ct.textBaseline = 'alphabetic';
					ct.fillText(C, houseLeft + size / 2, houseTop - 8);

					ct.textAlign = 'right';
					ct.textBaseline = 'middle';
					ct.fillText(C, houseLeft - 8, houseTop + size / 2);
				}

				if (rand === 1) {
					ct.textAlign = 'center';
					ct.textBaseline = 'alphabetic';
					ct.fillText(C, 180 + 100 / 2, 165 - 8);

					ct.textAlign = 'right';
					ct.textBaseline = 'middle';
					ct.fillText(D, 180 - 8, 165 + 65 / 2);
				}

				if (rand === 2) {
					let k = Math.min((right - left) / A, (bottom - top) / B);
					let squareSize = C * k;

					ct.textAlign = 'center';
					ct.textBaseline = 'top';
					ct.fillText(C, left + squareSize / 2, bottom + 10);
				}
			},
		});
	}, 20000);
})();

// https://mathb-ege.sdamgia.ru/problem?id=520513
