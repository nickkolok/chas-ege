(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Во сколько раз увеличивается масса каждого шара и уменьшается расстояние
		let massFactor = sl(2, 5);
		let distFactor = sl(2, 4);

		// Согласование «раз/раза»
		let endingM = (massFactor >= 2 && massFactor <= 4) ? 'а' : '';
		let endingD = (distFactor >= 2 && distFactor <= 4) ? 'а' : '';

		// F = G*m1*m2/r^2;  F' = G*(k*m1)*(k*m2)/(r/n)^2 = k^2*n^2*F
		let answer = massFactor * massFactor * distFactor * distFactor;

		NAtask.setTask({
			text: 'Свинцовые шары взаимодействуют силами всемирного тяготения. ' +
				'Во сколько раз увеличится модуль силы тяготения, если массу каждого из шаров увеличить в ' +
				massFactor + ' раз' + endingM + ', а расстояние между их центрами уменьшить в ' +
				distFactor + ' раз' + endingD + '?',
			answers: answer,
			analys: 'Согласно закону всемирного тяготения, сила притяжения между двумя шарами равна ' +
				'$$F = G \\frac{m_1 m_2}{r^2}.$$ ' +
				'Если массу каждого из шаров увеличить в ' + massFactor + ' раз' + endingM + ', ' +
				'а расстояние между их центрами уменьшить в ' + distFactor + ' раз' + endingD + ', ' +
				'новая сила будет равна ' +
				'$$F\' = G \\frac{' + massFactor + 'm_1 \\cdot ' + massFactor + 'm_2}{(r/' + distFactor + ')^2} = ' +
				'G \\frac{' + (massFactor * massFactor) + ' m_1 m_2}{r^2 / ' + (distFactor * distFactor) + '} = ' +
				answer + ' \\cdot G \\frac{m_1 m_2}{r^2} = ' + answer + ' F.$$ ' +
				'Таким образом, модуль силы тяготения увеличится в ' + answer + ' раз.',
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=29673
//zer00player
