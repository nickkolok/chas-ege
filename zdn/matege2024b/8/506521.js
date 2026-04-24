(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506521';
		let preference = ['findTrue', 'findFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let nCorrect = sl(1, 3);
		let nWrong = 4 - nCorrect;
		let heavyAnimal = sklonlxkand(['буйвол', 'слон', 'жираф', 'бегемот', 'гиппопотам', 'носорог'].iz());
		let mediumAnimal = sklonlxkand(['лев', 'медведь', 'тигр', 'волк', 'пантера', 'барсук',].iz(2));
		let lightAnimal = sklonlxkand(['рысь', 'лиса', 'кошка', 'фламинго', 'выдра', 'тушканчик',].iz());

		let correct = [
			`${heavyAnimal.ie.toZagl()} самый тяжёлый из всех этих животных.`,
			`${lightAnimal.ie.toZagl()} легче ${heavyAnimal.re}.`,
			`${heavyAnimal.ie.toZagl()} тяжелее ${mediumAnimal[0].re}, а ${mediumAnimal[0].ie} тяжелее ${lightAnimal.re}.`,
			`${mediumAnimal[1].ie.toZagl()} и ${lightAnimal.ie} оба легче ${heavyAnimal.re}.`
		];
		let wrong = [
			`${lightAnimal.ie.toZagl()} легче ${mediumAnimal[1].re}.`,
			`${mediumAnimal[1].ie.toZagl()} тяжелее ${mediumAnimal[0].re}.`,
			`${mediumAnimal[0].ie.toZagl()} легче ${mediumAnimal[1].re}.`,
			`${mediumAnimal[0].ie.toZagl()} самый тяжёлый.`
		];

		NAtask.setTask({
			text: `При взвешивании животных в зоопарке выяснилось, что ${heavyAnimal.ie} тяжелее ${mediumAnimal[0].re}, ${mediumAnimal[1].ie} легче ${heavyAnimal.re}, а ${lightAnimal.ie} легче ${mediumAnimal[0].re}. Выберите утверждения, которые ` +
				(rand ? 'неверны' : 'верны') + `. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. Если ответов несколько, записывайте их номера в порядке возрастания.`,
			answers: rand ? wrong : correct,
			wrongAnswers: rand ? correct : wrong,
			preference: preference,
		});
		AtoB2(nCorrect, nWrong);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506521
