(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '514383';
		let preference = ['findS', 'findB'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let a = sl(3, 30), b = sl(3, 30), c = sl(3, 30);
		genAssert(isValidTriangle(a, b, c), 'Стороны должны образовывать треугольник');
		let triangle = new Triangle({lengths: {lengthAB: a, lengthBC: b, lengthCA: c}});
		let area = triangle.area();
		genAssertAlmostInteger(area, 'Площадь должна быть целой');
		let S = Math.round(area);
		let radius = (a * b * c).texfrac(4 * S);
		NAtask.setTask({
		    text: 'Площадь треугольника можно вычислить по формуле $S=\\frac{abc}{4R}$, где $a$, $b$ и $c$ — стороны треугольника, ' +
		        'а $R$ — радиус описанной окружности. Пользуясь этой формулой, найдите $' + ['S', 'b'][variant] +
		        '$, если $a=' + a + '$, $c=' + c + '$, $' + ['b=' + b, 'S=' + S][variant] + '$ и $R=' + radius + '$.',
		    answers: [S, b][variant], preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=514383
// ФИПИ: сопоставленные позиции категории 4 и все исходные коды.
// 4.43: A428FF, AB0EF8, 120A0D, 290D15, F64F28, 45529C, B30C97, 56A59A, 37FCEF, 5C72E7
// 4.44: 1D94DC, 02698C
// 4.45: 07D36C, 441F81
// 4.54: DC4118, 515CDD
// 4.56: 3147C0
