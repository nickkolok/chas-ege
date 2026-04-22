(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '511762';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let town = ['посёлке', 'городке', 'районе'].iz();
		let letter = window.latbukv.iz();
		let houseCount = sl(10, 30);
		let minHeight = sl(3, 10);
		let maxHeight = sl(minHeight + 5, 30);

		let correct = [
			`В ${town} нет жилого дома высотой ${minHeight - 1} метра.`,
			`Высота любого жилого дома в ${town} не меньше ${minHeight - 2} метров.`,
			`Максимальная высота меньше ${maxHeight} метров.`,
			`Минимальная высота превышает ${minHeight - 1} метр.`
		];
		let wrong = [
			`В ${town} есть жилой дом высотой ${maxHeight} метров.`,
			`Разница в высоте любых двух домов больше ${maxHeight - minHeight + 5} метров.`,
			`Существует дом высотой ${minHeight - 2} метра.`,
			`Максимальная высота равна ${maxHeight} метрам.`,
		];

		NAtask.setTask({
			text: `В ${town} ${letter} всего ${houseCount} жилых домов. Высота каждого дома меньше ${maxHeight} метров, но не меньше ${minHeight} метров. Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=511762
