(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let pass = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯA'.split('').iz();
	let located = sl1();

	retryWhileError(function () {
		const zapasn = sluchch(10, 30);
		const peregorodk = sluchch(10, 30);
		const vsego = sluchch(100, 500);
		const answers = (zapasn + peregorodk) / vsego;
		genAssertZ1000(answers);

		NAtask.setTask({
			text: 'На борту самолёта ' + chislitM(zapasn, 'место', 'места', 'мест') + (located ? ' расположены' : '') + ' рядом с запасными выходами и ' + chislitM(peregorodk, 'место', 'места', 'мест') +
				(located ? ' —' : '') + ' за перегородками, разделяющими салоны.' +
				' Остальные места неудобны для пассажира высокого роста. Пассажир ' + pass +
				'. высокого роста. ' +
				'Найдите вероятность того, что на регистрации при случайном выборе места пассажиру ' + pass + '. ' +
				'достанется удобное место, если всего в самолёте ' + vsego + ' мест.',
			answers,
		});
	}, 1000);
})();
//committed by SugarHedgehog, fixed by Диана Белова
// 320190 321277 321279 321281 321283 321285 321287 321289 321291 321293 321295 321297 321299 321301 321303 321305
// 0F274F
// B7DAFB
// 91187F, 495E28
// FE8E98
// D2C8F3, ACBE97
// D8ED4A, 8EBFD5
// 99D794, 98FF4C
// B32F8B, 41F7EA
// 334D4A, F7EF69
// EF1B7C
