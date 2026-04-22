(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514110';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let subject = ['экономике', 'английскому языку', 'математике', 'физике', 'китайскому языку',
			'обществознанию', 'философии', 'немецкому языку', 'истории', 'биологии', 'географии'].iz(2);
		let total = sl(25, 40);
		let econ = sl(Math.ceil(total * 0.5), total);
		let eng = sl(Math.ceil(total * 0.5), total);
		let minBoth = Math.max(0, econ + eng - total);
		let maxBoth = Math.min(econ, eng);

		let correct = [
			`Хотя бы ${minBoth} студентов из этой группы сдали зачёты и по ${subject[0]}, и по ${subject[1]}.`,
			`Не более ${maxBoth} студентов из этой группы сдали зачёты и по ${subject[0]}, и по ${subject[1]}.`,
			`Минимальное число сдавших оба зачёта — ${minBoth}.`,
			`Максимальное число сдавших оба зачёта — ${maxBoth}.`
		];
		let wrong = [
			`В этой группе найдётся ${total - Math.min(econ, eng)} студентов, не сдавших ни одного из этих двух зачётов.`,
			`В этой группе найдётся ${econ} студентов, которые не сдали зачёта по ${subject[1]}, но сдали зачёт по ${subject[0]}.`,
			`Все студенты сдали оба зачёта.`,
			`Ни один студент не сдал оба зачёта.`
		];

		NAtask.setTask({
			text: `В группе учится ${total} студентов, из них ${econ} человек сдали зачёт по ${subject[0]} и ${eng} сдали зачёт по ${subject[1]}. Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514110
