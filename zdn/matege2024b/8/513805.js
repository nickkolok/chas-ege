(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		
		let name = ['Андрей', 'Борис', 'Виктор', 'Глеб', 'Дмитрий', 'Сергей', 'Павел', 'Олег'].iz();
		let instrNom = ['гитара', 'скрипка', 'флейта', 'балалайка', 'домра', 'виолончель'].iz();
		let instrVin = instrNom.replace('а', 'у').replace('я', 'ю');
		let instrTvor = instrNom.replace('а', 'ой').replace('я', 'ей');
		let instrRod = instrNom.replace('а', 'ы').replace('я', 'и');
		
		let activity1 = ['на концертах', 'на выступлениях', 'на соревнованиях'].iz();
		let activity2 = ['в поход', 'на рыбалку', 'в поездку', 'на дачу'].iz();
		
		let correct = [
			`Если ${name} без ${instrRod}, значит, он не ${activity2}.`,
			`Если в субботу ${name} будет выступать ${activity1}, то он в субботу будет со своей ${instrTvor}.`
		];
		
		let wrong = [
			`Каждый раз, когда ${name} берёт с собой ${instrVin}, он будет выступать ${activity1}.`,
			`В любое время, когда ${name} не ${activity2}, у него нет с собой ${instrVin}.`
		];

		NAtask.setTask({
			text: `Музыкант ${name} выступает ${activity1} только со своей ${instrTvor}. Также ${name} обязательно берёт с собой ${instrVin} ${activity2}. Выберите утверждения, которые верны при приведённых условиях. В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.`,
			answers: correct,
			wrongAnswers: wrong,
		});
		AtoB2(2, 2);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513805
