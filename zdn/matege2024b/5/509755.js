(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';
		let key = "509755";

		let variant = getListedPreference(key, [{
			preference: 'tea',
			preferenceValue: 0,
		}, {
			preference: 'balls',
			preferenceValue: 1,

		}, {
			preference: 'birds',
			preferenceValue: 2,
		}, ], sl(0, 2));

		let relation = sl(5, 25, 5);
		let answers = 1 / relation;
		genAssertZ1000(answers);
		relation--;

		let objects = [
			[`черным`, `зелёным`, `красным`, `белым`, `жёлтым`],
			om.trickyColors, 
			['курица', 'гусь', 'индюк', 'перепел', 'утка', 'цесарка', 'струс']
		][variant].iz(2);
		
		if (variant == 1)
			objects = objects.map(elem => elem.slice(0, -2));
		if (variant == 2)
			objects = sklonlxkand(objects);

		NAtask.setTask({
			questions: [
				[{
					text: `В коробке вперемешку лежат чайные пакетики с ${objects[0]} и ${objects[1]}
						чаем, одинаковые на вид, причём пакетиков с ${objects[0]} чаем в ${relation} раза
						больше, чем пакетиков с ${objects[1]}. Найдите вероятность того, что случайно
						выбранный из этой коробки пакетик окажется пакетиком с ${objects[1]} чаем.`,
					answers,
				}, {
					text: `В ящике находятся ${objects[0]}ые и ${objects[1]}ые шары, причём ${objects[0]}ых в ${relation} раз
						больше, чем ${objects[1]}ых. Из ящика случайным образом достали один шар.
						Найдите вероятность того, что он будет ${objects[1]}ым.`,
					answers,
				}, {
					text: `На птицеферме есть только ${objects[0].im} и ${objects[1].im}, причём ${objects[0].rm} в ${relation} раза больше,
						чем ${objects[1].rm}. Найдите вероятность того, что случайно выбранная на этой
						ферме птица окажется ${objects[1].ve}.`,
					answers,
				}][variant]
			],
			authors: ['Суматохина Александра'],
		});
	}, 100);
})();

// 509755 510110 511866 527387 527430 527451
// 510109 510111 510113
// 510896 511923 511943
