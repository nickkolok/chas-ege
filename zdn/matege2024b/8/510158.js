(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '510158';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;

		let dogName = sklonlxkand(['Шарик', 'Бобик', 'Рекс', 'Дружок', 'Рыжик', 'Полкан', 'Буран', 'Мухтар', 'Каштан', 'Бим'].iz());
		let animal = sklonlxkand(['кошка', 'ящерица', 'птичка', 'белка','сорока','ласка'].iz());

		let correct = [
			`Если ${dogName.ie} молчит, значит, ${animal.ie} по забору не идёт.`,
			`Если по забору пойдёт белая ${animal.ie}, ${dogName.ie} будет лаять.`,
			`Любая ${animal.ie}, идущая по забору, вызывает лай ${dogName.re}.`,
			`Отсутствие лая означает отсутствие ${animal.re} на заборе.`
		];
		let wrong = [
			`Если ${dogName.ie} не лает, значит, по забору идёт ${animal.ie}.`,
			`Если по забору идёт чёрная ${animal.ie}, ${dogName.ie} не лает.`,
			`${dogName.ie} может лаять без причины.`,
			`${animal.ie.toZagl()} всегда проходит мимо без реакции ${dogName.re}.`
		];


		NAtask.setTask({
			text: `Когда какая-нибудь ${animal.ie} идёт по забору, пёс ${dogName.ie}, живущий в будке возле дома, обязательно лает. Выберите утверждения, которые ` + (rand ? 'неверны' : 'верны') +
				` при приведённом условии. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510158
