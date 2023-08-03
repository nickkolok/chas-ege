(function() {
	function combination(k, n) {
		return n.fct() / ((n - k).fct() * k.fct());
	}

	function declensionOfAdjectives(number, adjective) {
		adjective = sklonlxkand(adjective);
		return chislitM(number, adjective.ie, adjective.rm, adjective.rm);
	}
	retryWhileError(function() {
		let number = sl(3, 5);
		let color = ['аквамариновый', 'гранатовый', 'бежевый', 'бирюзовый',
			'бобровый', 'бордовый', 'изумрудный', 'кирпичный', 'коралловый', 'мятный',
			'небесный', 'оливковый', 'персиковый', 'песочный', 'пурпурный', 'салатовый', 'фисташковый',
		].iz(number);

		let summary = sl(10, 50, 5);
		let thing = sklonlxkand(['ластик', 'карандаш', 'шарик', 'бант', 'блокнот', 'значок', 'брелок', 'фломастер', ].iz());
		let numberThungs = [];
		let sklonThings = [];

		let sum = 0;
		for (let i = 0; i < number - 1; i++) {
			let num = sl(1, (summary / number).ceil());
			numberThungs.push([color[i], num]);
			sklonThings.push(declensionOfAdjectives(num, color[i]));
			sum += num;
		}
		genAssert((summary - sum) > 0, 'Не хватило вещей');
		numberThungs.push([color[number - 1], summary - sum]);
		sklonThings.push(declensionOfAdjectives(summary - sum, color[number - 1]));

		let question = numberThungs.iz(2);
		let m = sl(1, question[0][1]);

		let n = sl(1, question[1][1]);
		let answ = combination(m, question[0][1]) * combination(n, question[1][1]) / combination(m + n, summary);

		genAssertZ1000(answ * 100, 'Слишком много знаков после запятой');

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'В коробке ' + sklonThings.splice(0, number - 1).join(', ') + ' и ' + sklonThings[sklonThings.length - 1] +
				' ' + chislit((summary - sum), thing.ie, thing.re, thing.rm) +
				'. Случайным образом выбирают ' + chislitM((m + n), thing.ie, thing.re, thing.rm) + '.' +
				' Какова вероятность того, что окажутся выбраны ' + declensionOfAdjectives(m, question[0][0]) + ' и ' +
				declensionOfAdjectives(n, question[1][0]) + ' ' + chislit(n, thing.ie, thing.re, thing.rm) + '?',
			answers: answ,
			authors: ['Суматохина Александра'],
		});
	}, 1000);
})();
