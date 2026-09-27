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
		let labelShadow = [t.shadow + ' м', '?', t.shadow + ' м'][rand];
		let labelDistance = [t.distance + ' м', t.distance + ' м', '?'][rand];
		let labelPerson = t.person.ts() + ' м';

		NAtask.modifiers.addCanvasIllustration({
			width: 620,
			height: 320,
			paint: function(ctx) {
				let width = 620;
				let height = 320;

				let primaryColor = om.primaryBrandColors[0];
				let secondaryColor = om.secondaryBrandColors[0];

				// =====================================================
				// ПОЛЯ И РАБОЧАЯ ОБЛАСТЬ
				// =====================================================

				// Основная геометрия начинается здесь
				let columnX = 80;
				let groundY = 230;

				// Границы, за которые не должна выходить геометрия
				let topLimit = 20;
				let rightLimit = width - 55;

				// personDimX должен находиться на 5 px правее конца тени
				let personDimGap = 5;

				// Поэтому конец тени должен закончиться раньше rightLimit
				let maxShadowEndX = rightLimit - personDimGap;

				// =====================================================
				// ЕДИНЫЙ МАСШТАБ ВСЕЙ ГЕОМЕТРИИ
				// =====================================================

				let totalLength = t.distance + t.shadow;

				// Ограничение масштаба по горизонтали
				let kHorizontal =
					(maxShadowEndX - columnX) / totalLength;

				// Ограничение масштаба по вертикали
				let kVertical =
					(groundY - topLimit) / t.column;

				// Единый масштаб:
				// 1 метр = k пикселей
				let k = Math.min(
					kHorizontal,
					kVertical
				);

				// =====================================================
				// КООРДИНАТЫ ФИЗИЧЕСКИХ ВЕЛИЧИН
				// =====================================================

				let columnHeightPx = t.column * k;
				let distancePx = t.distance * k;
				let shadowPx = t.shadow * k;
				let personHeightPx = t.person * k;

				let columnTopY =
					groundY - columnHeightPx;

				let personX =
					columnX + distancePx;

				let shadowEndX =
					personX + shadowPx;

				let personHeadY =
					groundY - personHeightPx;

				// Размер роста всегда ровно на 5 px
				// правее конца тени
				let personDimX =
					shadowEndX + personDimGap;

				// =====================================================
				// ЗАЩИТА ОТ ВЫХОДА ЗА ХОЛСТ
				// =====================================================

				genAssert(
					columnTopY >= topLimit,
					'Рисунок вышел за верхнюю границу холста'
				);

				genAssert(
					shadowEndX <= maxShadowEndX,
					'Конец тени вышел за правую границу холста'
				);

				genAssert(
					personDimX <= rightLimit,
					'Размерная линия роста вышла за правую границу холста'
				);

				genAssert(
					personHeadY >= columnTopY &&
					personHeadY <= groundY,
					'Некорректное положение человека'
				);

				// =====================================================
				// ОСНОВНАЯ ГЕОМЕТРИЯ
				// =====================================================

				ctx.strokeStyle = primaryColor;
				ctx.fillStyle = primaryColor;
				ctx.lineWidth = 2;

				// Столб
				ctx.drawLine(
					columnX,
					columnTopY,
					columnX,
					groundY
				);

				// Земля
				ctx.drawLine(
					columnX,
					groundY,
					shadowEndX,
					groundY
				);

				// =====================================================
				// ЛУЧ СВЕТА
				// =====================================================

				ctx.setLineDash([7, 5]);

				// Фонарь -> голова -> конец тени
				ctx.drawLine(
					columnX,
					columnTopY,
					shadowEndX,
					groundY
				);

				// Горизонтальный пунктир от головы
				// до размерной линии роста
				ctx.drawLine(
					personX,
					personHeadY,
					personDimX,
					personHeadY
				);

				ctx.setLineDash([]);

				// =====================================================
				// ЧЕЛОВЕК
				// Все части пропорциональны его реальной высоте
				// =====================================================

				// Радиус головы — доля общей высоты
				let headR = personHeightPx * 0.07;

				// Ограничиваем только от экстремально маленького
				// или огромного отображения
				headR = Math.max(
					2.5,
					Math.min(headR, 7)
				);

				// Центр головы немного ниже верхней точки роста,
				// чтобы верх головы совпадал с personHeadY
				let headCenterY =
					personHeadY + headR;

				ctx.fillKrug(
					personX,
					headCenterY,
					headR
				);

				// Шея начинается под головой
				let neckTopY =
					headCenterY + headR;

				// Плечи
				let shoulderY =
					personHeadY + personHeightPx * 0.20;

				// Таз
				let hipY =
					personHeadY + personHeightPx * 0.62;

				// Полуширина плеч
				let shoulderHalfWidth =
					personHeightPx * 0.10;

				// Размах стоп
				let footHalfWidth =
					personHeightPx * 0.07;

				// -------------------------
				// Шея
				// -------------------------

				ctx.drawLine(
					personX,
					neckTopY,
					personX,
					shoulderY
				);

				// -------------------------
				// Туловище
				// -------------------------

				ctx.drawLine(
					personX,
					shoulderY,
					personX,
					hipY
				);

				// -------------------------
				// Руки
				// -------------------------

				let handY =
					personHeadY + personHeightPx * 0.46;

				ctx.drawLine(
					personX,
					shoulderY,
					personX - shoulderHalfWidth,
					handY
				);

				ctx.drawLine(
					personX,
					shoulderY,
					personX + shoulderHalfWidth,
					handY
				);

				// -------------------------
				// Ноги
				// -------------------------

				ctx.drawLine(
					personX,
					hipY,
					personX - footHalfWidth,
					groundY
				);

				ctx.drawLine(
					personX,
					hipY,
					personX + footHalfWidth,
					groundY
				);

				// =====================================================
				// РАЗМЕРНЫЕ ЛИНИИ
				// =====================================================

				ctx.strokeStyle = secondaryColor;
				ctx.fillStyle = secondaryColor;
				ctx.lineWidth = 1.5;
				ctx.font = '16px liberation_sans';

				// =====================================================
				// ВЫСОТА СТОЛБА
				// =====================================================

				let columnDimX =
					columnX - 25;

				ctx.drawLine(
					columnDimX,
					columnTopY,
					columnDimX,
					groundY
				);

				ctx.drawArrow(
					columnDimX,
					groundY,
					columnDimX,
					columnTopY
				);

				ctx.drawArrow(
					columnDimX,
					columnTopY,
					columnDimX,
					groundY
				);

				// Засечки
				ctx.drawLine(
					columnDimX - 6,
					columnTopY,
					columnX,
					columnTopY
				);

				ctx.drawLine(
					columnDimX - 6,
					groundY,
					columnX,
					groundY
				);

				ctx.textAlign = 'right';

				ctx.fillText(
					labelColumn,
					columnDimX - 6, (columnTopY + groundY) / 2 + 5
				);

				// =====================================================
				// РОСТ ЧЕЛОВЕКА
				// =====================================================

				// Всегда на 5 px правее конца тени
				ctx.drawLine(
					personDimX,
					personHeadY,
					personDimX,
					groundY
				);

				ctx.drawArrow(
					personDimX,
					groundY,
					personDimX,
					personHeadY
				);

				ctx.drawArrow(
					personDimX,
					personHeadY,
					personDimX,
					groundY
				);

				ctx.textAlign = 'left';

				ctx.fillText(
					labelPerson,
					personDimX + 7, (personHeadY + groundY) / 2 + 5
				);

				// =====================================================
				// ГОРИЗОНТАЛЬНЫЕ РАЗМЕРЫ
				// =====================================================

				let dimY =
					groundY + 20;

				// Засечки
				ctx.drawLine(
					columnX,
					groundY,
					columnX,
					dimY + 5
				);

				ctx.drawLine(
					personX,
					groundY,
					personX,
					dimY + 5
				);

				ctx.drawLine(
					shadowEndX,
					groundY,
					shadowEndX,
					dimY + 5
				);

				// =====================================================
				// РАССТОЯНИЕ ДО ЧЕЛОВЕКА
				// =====================================================

				ctx.drawLine(
					columnX,
					dimY,
					personX,
					dimY
				);

				ctx.drawArrow(
					columnX,
					dimY,
					personX,
					dimY
				);

				ctx.drawArrow(
					personX,
					dimY,
					columnX,
					dimY
				);

				ctx.textAlign = 'center';

				ctx.fillText(
					labelDistance, (columnX + personX) / 2,
					dimY + 21
				);

				// =====================================================
				// ДЛИНА ТЕНИ
				// =====================================================

				ctx.drawLine(
					personX,
					dimY,
					shadowEndX,
					dimY
				);

				ctx.drawArrow(
					personX,
					dimY,
					shadowEndX,
					dimY
				);

				ctx.drawArrow(
					shadowEndX,
					dimY,
					personX,
					dimY
				);

				ctx.fillText(
					labelShadow, (personX + shadowEndX) / 2,
					dimY + 21
				);

				ctx.textAlign = 'left';

				// =====================================================
				// ФИНАЛЬНАЯ ПРОВЕРКА ВЕРТИКАЛЬНЫХ ГРАНИЦ
				// =====================================================

				genAssert(
					dimY + 25 < height,
					'Нижние размеры вышли за пределы холста'
				);
			},
		});
	}, 20000);
})();
//https://ege.sdamgia.ru/test?likes=529653
