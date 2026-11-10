(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '511921';

		let intDim = sl(3, 8);
		let decDim = sl(21, 49) / 10;

		let W = Math.min(intDim, decDim);
		let L = Math.max(intDim, decDim);
		let S_actual = W * L;

		let delta = sl(1, 9) / 10;
		let sign = [1, -1].iz();
		delta *= sign;

		let S_plan = Math.round((S_actual + delta) * 10) / 10;
		let diff = Math.abs(delta);

		let nouns = [
			['комната', 'комнаты'],
			['кухня', 'кухни'],
			['спальня', 'спальни'],
		];

		let chosen = nouns.iz();
		let nom = chosen[0];
		let gen = chosen[1];

		let text =
			'На плане указано, что прямоугольная ' + nom +
			' имеет площадь $' + S_plan + '$ кв.м. ' +
			'Точные измерения показали, что ширина ' + gen +
			' равна $' + W + '$ м, а длина $' + L + '$ м. ' +
			'На сколько квадратных метров площадь ' + gen +
			' отличается от площади, указанной на плане?';

		NAtask.setTask({
			text: text,
			answers: diff,
		});

		NAtask.modifiers.allDecimalsToStandard();

		// =====================================================
		// РИСУНОК
		// =====================================================

		// В прототипах встречаются два варианта:
		// 0 — на прямоугольнике указаны ширина и длина;
		// 1 — внутри прямоугольника указана площадь по плану.
		let pictureVariant = sl(0, 1);

		NAtask.modifiers.addCanvasIllustration({
			width: 280,
			height: 220,

			paint: function (ct) {
				let primaryColor = om.primaryBrandColors[0];
				let secondaryColor = om.secondaryBrandColors[0];

				// ---------------------------------------------
				// Геометрия прямоугольника
				// ---------------------------------------------

				let left = 55;
				let top = 35;

				let rectWidth = 165;
				let rectHeight = 125;

				let right = left + rectWidth;
				let bottom = top + rectHeight;

				// ---------------------------------------------
				// Прямоугольник
				// ---------------------------------------------

				ct.strokeStyle = primaryColor;
				ct.fillStyle = secondaryColor;
				ct.lineWidth = 2.5;

				ct.strokeRect(
					left,
					top,
					rectWidth,
					rectHeight
				);

				// ---------------------------------------------
				// Подписи
				// ---------------------------------------------

				ct.font = '18px liberation_sans';

				if (pictureVariant === 0) {

					// =========================================
					// ВАРИАНТ 1
					// На рисунке показаны реальные размеры
					// =========================================

					// Длина — сверху
					ct.textAlign = 'center';
					ct.textBaseline = 'bottom';

					ct.fillText(
						L.ts(),
						(left + right) / 2,
						top - 7
					);

					// Ширина — слева
					ct.textAlign = 'right';
					ct.textBaseline = 'middle';

					ct.fillText(
						W.ts(),
						left - 9,
						(top + bottom) / 2
					);

				} else {

					// =========================================
					// ВАРИАНТ 2
					// Внутри показана площадь по плану
					// =========================================

					ct.textAlign = 'center';
					ct.textBaseline = 'middle';

					ct.fillText(
						S_plan.ts(),
						(left + right) / 2,
						(top + bottom) / 2
					);
				}

				// Возвращаем стандартные настройки
				ct.textAlign = 'left';
				ct.textBaseline = 'alphabetic';
			},
		});

	}, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=511921
