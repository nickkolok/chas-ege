(function() {
	retryWhileError(function() {
		'use strict';
		NAinfo.requireApiVersion(0, 2);
		let key = "509755";

		let relation = sl(3, 200);
		let preference1 = ['tea', 'balls', 'birds'];
		let preference2 = ['minority', 'majority'];
		let variant = getSelectedPreferenceFromList(key, preference1);
		let majority = getSelectedPreferenceFromList(key, preference2);
		let answers = (majority ? relation - 1 : 1) / relation;
		genAssertZ1000(answers * 10);
		relation--;

		let objects = [
			[`чёрным`, `зелёным`, `красным`, `белым`, `жёлтым`],
			om.trickyColors, 
			['курица', 'гусь', 'индюк', 'перепел', 'утка', 'цесарка', 'страус']
		][variant].iz(2);
		
		if (variant > 0)
			objects = sklonlxkand(objects);
		let container = [['ящике', 'ящика'], ['коробке', 'коробки']].iz();
		let selected = majority ? 0 : 1;

		NAtask.setTask({
			questions: [
				[{
					text: `В коробке вперемешку лежат чайные пакетики с ${objects[0]} и ${objects[1]}
						чаем, одинаковые на вид, причём пакетиков с ${objects[0]} чаем в ${chislitlx(relation, 'раз')}
						больше, чем пакетиков с ${objects[1]}. Найдите вероятность того, что случайно
						выбранный из этой коробки чайный пакетик окажется с ${objects[selected]} чаем.`,
					answers,
				}, {
					text: `В ${container[0]} находятся ${objects[0].im} и ${objects[1].im} шары, причём ${objects[0].rm} в ${chislitlx(relation, 'раз')}
						больше, чем ${objects[1].rm}. Из ${container[1]} случайным образом достали один шар.
						Найдите вероятность того, что он будет ${objects[selected].te}.`,
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
	}, 1000);
})();

// 509755 510110 511866 527387 527430 527451
// 510109 510111 510113
// 510896 511923 511943
// FBF164, 0A894E, C546FE
// FA27E6, 1D5F8F
// C3E952, 823297, DA4C41, AE9FFC, 6A58FE, 7E2FC1, E406E3, 634E6B, BEB1D7, 1901C5, A00C8C
// D257B9, EE68AE, 9B2F60
