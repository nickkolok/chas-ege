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

		let relation = sl(3, 100);
		let preference1 = ['tea', 'balls', 'birds'];
		let preference2 = ['minority', 'majority'];
		let majority = getSelectedPreferenceFromList(key, preference2);
		let answers = (majority ? relation - 1 : 1) / relation;
		genAssertZ1000(answers);
		relation--;

		let objects = [
			[`черным`, `зелёным`, `красным`, `белым`, `жёлтым`],
			om.trickyColors, 
			['курица', 'гусь', 'индюк', 'перепел', 'утка', 'цесарка', 'страус']
		][variant].iz(2);
		
		if (variant == 1)
			objects = objects.map(elem => elem.slice(0, -2));
		if (variant == 2)
			objects = sklonlxkand(objects);
		let selected = majority ? 0 : 1;

		NAtask.setTask({
			questions: [
				[{
					text: `В коробке вперемешку лежат чайные пакетики с ${objects[0]} и ${objects[1]}
						чаем, одинаковые на вид, причём пакетиков с ${objects[0]} чаем в ${chislitlx(relation, 'раз')}
						больше, чем пакетиков с ${objects[1]}. Найдите вероятность того, что случайно
						выбранный из этой коробки пакетик окажется пакетиком с ${objects[selected]} чаем.`,
					answers,
				}, {
					text: `В ящике находятся ${objects[0]}ые и ${objects[1]}ые шары, причём ${objects[0]}ых в ${chislitlx(relation, 'раз')}
						больше, чем ${objects[1]}ых. Из ящика случайным образом достали один шар.
						Найдите вероятность того, что он будет ${objects[selected]}ым.`,
					answers,
				}, {
					text: `На птицеферме есть только ${objects[0].im} и ${objects[1].im}, причём ${objects[0].rm} в ${chislitlx(relation, 'раз')} больше,
						чем ${objects[1].rm}. Найдите вероятность того, что случайно выбранная на этой
						ферме птица окажется ${objects[selected].te}.`,
					answers,
				}][variant]
			],
			authors: ['Суматохина Александра'], preference: [preference1, preference2],
		});
	}, 100);
})();

// 509755 510110 511866 527387 527430 527451
// 510109 510111 510113
// 510896 511923 511943
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.91: FBF164, 0A894E, C546FE
// 5.92: FA27E6, 1D5F8F
// 5.103: C3E952, 823297, DA4C41, AE9FFC, 6A58FE, 7E2FC1, E406E3, 634E6B, BEB1D7, 1901C5, A00C8C
// 5.119: D257B9, EE68AE, 9B2F60
