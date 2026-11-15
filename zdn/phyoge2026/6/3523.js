(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Случайные коэффициенты
		let massFactor = sl(2, 5); // во сколько раз увеличивается масса каждого шара
		let distFactor = sl(2, 4); // во сколько раз уменьшается расстояние

		// Ответ: масса увеличивается в massFactor раз (для каждого шара, значит в числителе massFactor^2)
		// расстояние уменьшается в distFactor раз (в знаменателе (1/distFactor)^2 = distFactor^2 в числителе)
		let answer = massFactor * massFactor * distFactor * distFactor;

		NAtask.setTask({
			text: 'Свинцовые шары взаимодействуют силами всемирного тяготения. ' +
				'Во сколько раз увеличится модуль силы тяготения, если массу каждого из шаров увеличить в ' + 
				massFactor + ' раз' + (massFactor === 1 ? '' : 'а') + ', ' +
				'а расстояние между их центрами уменьшить в ' + distFactor + ' раз' + (distFactor === 1 ? '' : 'а') + '?',
			answers: answer,
			analys: 'Согласно закону всемирного тяготения, сила притяжения между двумя шарами равна $F = G \\frac{m_1 m_2}{r^2}$. ' +
				'Если массу каждого из шаров увеличить в ' + massFactor + ' раз' + (massFactor === 1 ? '' : 'а') + ', ' +
				'а расстояние между их центрами уменьшить в ' + distFactor + ' раз' + (distFactor === 1 ? '' : 'а') + ', ' +
				'новая сила будет равна $F' = G \\frac{(' + massFactor + 'm_1) (' + massFactor + 'm_2)}{(r/' + distFactor + ')^2} = ' +
				'G \\frac{' + (massFactor * massFactor) + ' m_1 m_2}{r^2 / ' + (distFactor * distFactor) + '} = ' +
				(massFactor * massFactor * distFactor * distFactor) + ' G \\frac{m_1 m_2}{r^2} = ' + answer + ' F$. ' +
				'Таким образом, модуль силы тяготения увеличится в ' + answer + ' раз.',
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=29673
//zer00player
