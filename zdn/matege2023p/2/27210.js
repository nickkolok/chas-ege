(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '27210';
		let preferenceQuestion = ['объём', 'площадь поверхности'];
		let question = preferenceQuestion[getSelectedPreferenceFromList(key, preferenceQuestion)];
		// Формулировка Открытого банка (27210) или ФИПИ («Деталь имеет форму…», ЕГЭ-база, задание 11)
		let preferenceWording = ['многогранник', 'деталь'];
		let wording = preferenceWording[getSelectedPreferenceFromList(key, preferenceWording)];

		// Нижний параллелепипед a × d × (H − c), на нём в заднем левом углу
		// верхний параллелепипед w × e × c; H — общая высота.
		let a = sl(3, 7);
		let d = sl(3, 7);
		let w = sl(2, a - 1);
		let e = sl(2, d - 1);
		let c = sl(2, 6);
		let H = c + sl(1, 4);
		// Координаты ступеньки: они же — концы подписываемых рёбер
		let yStep = d - e;
		let zStep = H - c;
		// Глубина рисуется под углом depthAngle с сокращением depthScale,
		// поэтому заднее ребро сдвинуто вправо на depthScale·cos(depthAngle)·e
		// относительно переднего ребра верхнего параллелепипеда
		let depthScale = 0.6;
		let depthAngle = Math.PI / 4;
		// Полная высота H подписана у заднего пунктирного ребра, как в прототипе.
		// Это ребро должно лежать внутри передней грани верхнего параллелепипеда
		// с запасом на подпись: иначе H читается как длина его правого ребра (а это c)
		genAssert(w - depthScale * Math.cos(depthAngle) * e >= 1.1, 'подпись высоты у правого ребра верхнего параллелепипеда');
		// Середина заднего ребра (там подпись H) должна быть внутри передней грани
		// верхнего параллелепипеда, а не на шве с нижним: иначе H читается как длина
		// передней кромки нижнего параллелепипеда
		genAssert(H / 2 + depthScale * Math.sin(depthAngle) * e - zStep >= 0.5, 'подпись высоты на шве параллелепипедов');
		// и ниже верхнего ребра этой грани: иначе H читается как длина этого ребра (а это w)
		genAssert(H / 2 - depthScale * Math.sin(depthAngle) * e >= 0.5, 'подпись высоты на верхнем ребре верхнего параллелепипеда');

		let polyhedron = new RectilinearSolid([
			[0, 0, 0, a, d, zStep],
			[0, yStep, zStep, w, d, H],
		]);

		let paint1 = function (ct) {
			ct.drawRectilinearSolid(polyhedron, {
				depthScale: depthScale,
				depthAngle: depthAngle,
				labels: [
					{ from: [0, yStep, H], to: [0, d, H], text: e },
					{ from: [0, d, H], to: [w, d, H], text: w },
					{ from: [0, yStep, zStep], to: [0, yStep, H], text: c },
					{ from: [0, d, 0], to: [0, d, H], text: H, direction: [1, 0] },
					{ from: [0, 0, 0], to: [a, 0, 0], text: a },
					{ from: [a, 0, 0], to: [a, d, 0], text: d },
				],
			});
		};

		let answer = question === 'объём' ? polyhedron.volume() : polyhedron.surfaceArea();

		// Решение: многогранник — нижний параллелепипед a × d × (H − c) и верхний w × e × c
		let analys = 'Многогранник составлен из двух прямоугольных параллелепипедов: ' +
			'нижнего с рёбрами $' + a + '$, $' + d + '$ и $' + H + '-' + c + '=' + zStep + '$ ' +
			'и верхнего с рёбрами $' + w + '$, $' + e + '$ и $' + c + '$. ';
		let lowerVolume = a * d * zStep;
		let upperVolume = w * e * c;
		let lowerArea = 2 * (a * d + a * zStep + d * zStep);
		let upperArea = 2 * (w * e + w * c + e * c);
		let contactArea = 2 * w * e;
		if (question === 'объём') {
			genAssert(lowerVolume + upperVolume === answer, 'решение расходится с ответом');
			analys += 'Объём многогранника равен сумме их объёмов: ' +
				'$' + a + '\\cdot' + d + '\\cdot' + zStep + '+' + w + '\\cdot' + e + '\\cdot' + c + '=' +
				lowerVolume + '+' + upperVolume + '=' + answer + '$.';
		} else {
			genAssert(lowerArea + upperArea - contactArea === answer, 'решение расходится с ответом');
			analys += 'Площадь поверхности многогранника равна сумме площадей поверхностей параллелепипедов ' +
				'без двух прямоугольников $' + w + '\\times' + e + '$, которыми они соприкасаются: ' +
				'$2\\cdot(' + a + '\\cdot' + d + '+' + a + '\\cdot' + zStep + '+' + d + '\\cdot' + zStep + ')+' +
				'2\\cdot(' + w + '\\cdot' + e + '+' + w + '\\cdot' + c + '+' + e + '\\cdot' + c + ')-' +
				'2\\cdot' + w + '\\cdot' + e + '=' +
				lowerArea + '+' + upperArea + '-' + contactArea + '=' + answer + '$.';
		}

		let text = wording === 'многогранник' ?
			'Найдите ' + question + ' многогранника, изображённого на рисунке (все двугранные углы прямые).' :
			'Деталь имеет форму изображённого на рисунке многогранника (все двугранные углы прямые). ' +
			'Числа на рисунке обозначают длины рёбер в сантиметрах. ' +
			'Найдите ' + question + ' этой детали. ' +
			'Ответ дайте в ' + (question === 'объём' ? 'кубических' : 'квадратных') + ' сантиметрах.';

		NAtask.setTask({
			text: text,
			answers: answer,
			analys: analys,
			preference: [preferenceQuestion, preferenceWording],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
// 27210 25871 25875 25873 25877 25879 (объём)
// 25881 25883 25885 25887 25889 (площадь поверхности)
// https://math-ege.sdamgia.ru/problem?id=27210
