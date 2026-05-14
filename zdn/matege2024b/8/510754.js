(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510754';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let subject = sklonlxkand(['биология', 'география', 'математика', 'физика', 'геометрия', 'информатика'].iz(2));
		let total = sl(25, 40);
		let bio = sl(15, total - 2);
		let geo = sl(10, total - 2);
		let minBoth = Math.max(0, bio + geo - total);
		let maxBoth = Math.min(bio, geo);

		let correct = [
			`Найдутся хотя бы ${minBoth} ученика из этого класса, кто посещает оба кружка.`,
			`Не найдётся ${maxBoth + 1} человек из этого класса, которые посещают оба кружка.`,
			`Минимальное число посещающих оба кружка — ${minBoth}.`,
			`Максимальное число посещающих оба кружка — ${maxBoth}.`,
			`Если все, кто ходит на ${subject[1].ve}, также ходят на биологию, то оба кружка посещают ${geo} человек.`,
			`Число, не посещающих ни один кружок, меньше или равно ${total - Math.max(bio, geo)}.`
		];
		let wrong = [
			`Если ученик из этого класса ходит на кружок по биологии, то он обязательно ходит на кружок по ${subject[1].pe}.`,
			`Каждый ученик из этого класса посещает оба кружка.`,
			`Нет ни одного ученика, посещающего оба кружка.`,
			`Все, кто ходит на ${subject[0].ve}, не ходят на ${subject[1].ve}.`,
			`Точно ${bio + geo - total} учеников посещают оба кружка.`,
		];

		NAtask.setTask({
			text: `В классе учится ${total} человек, из них ${bio} человек посещают кружок по ${subject[0].pe}, а ${geo} — кружок по ${subject[1].pe}. Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') +
				` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510754
