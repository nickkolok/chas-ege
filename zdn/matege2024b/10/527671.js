(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '527671';
		let preference = ['find_post', 'find_slide'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// H — высота горки
		// h — высота центрального столба
		let H = sl(2, 4, 0.1);
		let h = H / 2;

		NAtask.setTask({
			text: 'Вертикальный столб подпирает детскую горку посередине. ',
			questions: [{
				// find_post
				text: 'Найдите высоту горки, если высота этого столба равна $' +
					h + '$ м. Ответ дайте в метрах',
				answers: H,
			}, {
				// find_slide
				text: 'Найдите высоту этого столба, если высота горки равна $' +
					H + '$ м. Ответ дайте в метрах',
				answers: h,
			}, ][rand],
			postquestion: '.',
			preference: preference,
		});

		NAtask.modifiers.allDecimalsToStandard();

		// =====================================================
		// РИСУНОК
		// Постоянная схема как в прототипе ФИПИ
		// =====================================================

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 190,
			paint: function(ct) {
				let primaryColor = om.primaryBrandColors[0];
				let secondaryColor = om.secondaryBrandColors[0];

				// Вершины большого прямоугольного треугольника
				let leftX = 35;
				let groundY = 150;

				let rightX = 245;
				let topY = 30;

				// =================================================
				// ОСНОВНАЯ ГОРКА
				// =================================================

				ct.strokeStyle = primaryColor;
				ct.fillStyle = primaryColor;
				ct.lineWidth = 2.5;

				// Основание
				ct.drawLine(
					leftX,
					groundY,
					rightX,
					groundY
				);

				// Правая вертикальная сторона — высота h
				ct.drawLine(
					rightX,
					groundY,
					rightX,
					topY
				);

				// Наклонная горка
				ct.drawLine(
					leftX,
					groundY,
					rightX,
					topY
				);

				// =================================================
				// ЦЕНТРАЛЬНЫЙ СТОЛБ
				// =================================================

				// Точка столба находится посередине
				// наклонного отрезка
				let middleX = (leftX + rightX) / 2;
				let middleY = (groundY + topY) / 2;

				ct.drawLine(
					middleX,
					groundY,
					middleX,
					middleY
				);

				// =================================================
				// СТРЕЛКА НАПРАВЛЕНИЯ ГОРКИ
				// =================================================

				// Стрелка идёт параллельно наклонной стороне
				// и направлена вниз-влево, как в прототипе.
				let arrowStartX = 190;
				let arrowStartY = 40;

				let arrowEndX = 85;
				let arrowEndY = 100;

				ct.drawLine(
					arrowStartX,
					arrowStartY,
					arrowEndX,
					arrowEndY
				);

				ct.drawArrow(
					arrowStartX,
					arrowStartY,
					arrowEndX,
					arrowEndY
				);

				// =================================================
				// БУКВЕННЫЕ ОБОЗНАЧЕНИЯ
				// =================================================

				ct.fillStyle = secondaryColor;
				ct.font = 'italic 20px serif';

				// l — высота центрального столба
				ct.textAlign = 'left';

				ct.fillText(
					'l',
					middleX + 10, (middleY + groundY) / 2 + 5
				);

				// h — полная высота горки
				ct.fillText(
					'h',
					rightX + 10, (topY + groundY) / 2 + 5
				);
			},
		});

	}, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=527671
