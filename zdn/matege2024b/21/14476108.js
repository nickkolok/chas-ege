(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '14476108';
		let preference = ['findBoys', 'findGirls'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let boys = sl(6, 20);
		let girls = slKrome([boys], 6, 20);
		let total = girls + boys;
		let b2g = sl(2, 5);
		let g2b = (boys * b2g) / girls;

		genAssert(g2b.isAlmostInteger(), 'Девочки должны дружить с целым количеством мальчиков');

		let gender = ['мальчиков', 'девочек'][rand];

		NAtask.setTask({
			text: 'В классе ' + chislitlx(total, 'ученик', 'v$') + '. ' +
				'Каждый мальчик дружит с ' + chislitlx(b2g, 'девочка', 't$') + ', ' +
				'а каждая девочка — с ' + chislitlx(g2b, 'мальчик', 't$') + '. ' +
				'Сколько ' + gender + ' учится в этом классе?',
			answers: [boys, girls][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//14476108
//Открытый банк заданий DCE34C
//zer00player

