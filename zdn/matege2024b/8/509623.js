(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '509623';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;
		
		
		let website =['Одноклассники','ВКонтакте','Дзен'].iz(2);
		let total = sl(25, 50);
		let ok = sl(Math.ceil(total * 0.6), total - 2);
		let vk = sl(5, total - 2);
		let minBoth = Math.max(0, ok + vk - total);
		let maxBoth = Math.min(ok, vk);

		let correct = [
			`В этой компании найдётся хотя бы ${minBoth} человек, пользующихся обеими сетями.`,
			`Не более ${maxBoth} человек из этой компании пользуются обеими сетями.`,
			`Минимальное число пользователей обеих сетей — ${minBoth}.`,
			`Число, не пользующихся ни одной сетью, не превышает ${total - Math.max(ok, vk)}.`
		];
		let wrong = [
			`В этой компании найдётся ${total - ok} человек, которые не пользуются ни сетью «${website[0]}», ни сетью «${website[1]}».`,
			`Не найдётся ни одного человека, пользующегося только сетью «${website[0]}».`,
			`Все пользователи «${website[1]}» также используют «${website[0]}».`,
			`Ни один человек не использует обе сети.`
		];

		NAtask.setTask({
			text: `В компании из ${total} человек ${ok} пользуются социальной сетью «${website[0]}», а ${vk} — социальной сетью «${website[1]}». Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') +
			` при указанных условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509623
