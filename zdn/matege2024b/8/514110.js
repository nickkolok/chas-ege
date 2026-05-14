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
		let econ = sl(15, total);
		let eng = sl(total - econ + 1, total);
		let minBoth = econ + eng - total;
		let maxBoth = Math.min(econ, eng);

		let correct = [
			`Хотя бы ${chislitlx(minBoth, 'студент')} из этой группы сдали зачёты и по ${subject[0]}, и по ${subject[1]}.`,
			`Не более ${chislitlx(maxBoth, 'студент')} из этой группы сдали зачёты и по ${subject[0]}, и по ${subject[1]}.`,
			`Минимальное число сдавших оба зачёта — ${chislitlx(minBoth, 'студент')}.`,
			`Максимальное число сдавших оба зачёта — ${chislitlx(maxBoth, 'студент')}.`
		];
		let wrong = [
			`В этой группе найдётся ${chislitlx(total - Math.min(econ, eng), 'студент')}, не сдавших ни одного из этих двух зачётов.`,
			`В этой группе найдётся ${chislitlx(econ, 'студент')}, которые не сдали зачёта по ${subject[1]}, но сдали зачёт по ${subject[0]}.`,
			`Все студенты сдали оба зачёта.`,
			`Ни один студент не сдал оба зачёта.`
		];

		NAtask.setTask({
			text: `В группе учится  ${chislitlx(total, 'студент')}, из них ${chislitlx(econ, 'человек')} сдали зачёт по ${subject[0]} и ${chislitlx(eng, 'человек')} сдали зачёт по ${subject[1]}. Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=514110
