(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3523';
		// Варианты прототипа ФИПИ «динамика: закон тяготения»:
		// bothMassesDistDown — 40CDC8, bothMassesDistUp — C2EAAF, oneMassDistDown — 771FB7.
		let preference = ['bothMassesDistDown', 'bothMassesDistUp', 'oneMassDistDown'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Во сколько раз увеличивается масса шара (каждого или одного) и меняется расстояние
		let massFactor = sl(2, 5);
		let distFactor = sl(2, 4);

		let bothMasses = rand !== 2;
		let distDown = rand !== 1;

		// F = G*m1*m2/r^2. Масса каждого в k раз, расстояние в n раз ближе: F' = k^2*n^2*F;
		// масса каждого в k раз, расстояние в n раз дальше: F' = (k^2/n^2)*F;
		// масса одного в k раз, расстояние в n раз ближе: F' = k*n^2*F.
		let answer = (bothMasses ? massFactor.sqr() : massFactor) *
			(distDown ? distFactor.sqr() : 1 / distFactor.sqr());

		genAssert(answer > 1, 'сила тяготения должна увеличиться');
		genAssert((answer * 100).isAlmostInteger(), 'в ответе не больше двух знаков после запятой');

		let massPhrase = bothMasses ? 'массу каждого из шаров' : 'массу одного из шаров';
		let distPhrase = distDown ? 'уменьшить' : 'увеличить';
		let numerator = bothMasses
			? massFactor + 'm_1 \\cdot ' + massFactor + 'm_2'
			: massFactor + 'm_1 \\cdot m_2';
		let denominator = distDown ? 'r/' + distFactor : distFactor + 'r';

		NAtask.setTask({
			text: 'Свинцовые шары взаимодействуют силами всемирного тяготения. ' +
				'Во сколько раз увеличится модуль силы тяготения, если ' + massPhrase + ' увеличить в ' +
				chislitlx(massFactor, 'раз') + ', а расстояние между их центрами ' + distPhrase + ' в ' +
				chislitlx(distFactor, 'раз') + '?',
			answers: answer,
			analys: 'Согласно закону всемирного тяготения, сила притяжения между двумя шарами равна ' +
				'$$F = G \\frac{m_1 m_2}{r^2}.$$ ' +
				'Если ' + massPhrase + ' увеличить в ' + chislitlx(massFactor, 'раз') + ', ' +
				'а расстояние между их центрами ' + distPhrase + ' в ' + chislitlx(distFactor, 'раз') + ', ' +
				'новая сила будет равна ' +
				'$$F\' = G \\frac{' + numerator + '}{(' + denominator + ')^2} = ' +
				answer.ts() + ' \\cdot G \\frac{m_1 m_2}{r^2} = ' + answer.ts() + ' F.$$ ' +
				'Таким образом, модуль силы тяготения увеличится в ' + answer.ts() + ' раз.',
			preference: [preference],
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=29673
//zer00player
// ФИПИ C2EAAF 40CDC8 771FB7
