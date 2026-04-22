(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510158';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let dogName = ['Шарик', 'Бобик', 'Рекс', 'Дружок', 'Рыжик', 'Полкан', 'Буран', 'Мухтар', 'Каштан', 'Бим'].iz();
		let animal = ['кошка', 'ящерица', 'лиса', 'птичка', 'мышь'].iz();

		let correct = [
			`Если ${dogName} молчит, значит, ${animal} по забору не идёт.`,
			`Если по забору пойдёт белая ${animal}, ${dogName} будет лаять.`,
			`Любая ${animal}, идущая по забору, вызывает лай ${dogName}а.`,
			`Отсутствие лая означает отсутствие ${animal} на заборе.`
		];
		let wrong = [
			`Если ${dogName} не лает, значит, по забору идёт ${animal}.`,
			`Если по забору идёт чёрная ${animal}, ${dogName} не лает.`,
			`${dogName} может лаять без причины.`,
			`${animal.toZagl()} всегда проходит мимо без реакции ${dogName}а.`
		];


		NAtask.setTask({
			text: `Когда какая-нибудь ${animal} идёт по забору, пёс ${dogName}, живущий в будке возле дома, обязательно лает. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при приведённом условии. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510158
