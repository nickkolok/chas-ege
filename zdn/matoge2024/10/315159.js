(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '315159';
		let preference = ['oneCountry', 'twoCountry', 'notCountry'];
		let rand = getSelectedPreferenceFromList(key, preference);

		var totalAthletes = sluchiz([20, 25, 40, 80, 100, 125])[0];
		var count1 = sl(2, totalAthletes / 3);
		var count2 = sl(2, totalAthletes / 3 - 2);
		var count3 = totalAthletes - count1 - count2;
		let counts = [count1, count2, count3].shuffle();

		let countries = om.strany.re.iz(3);

		let sportName = om.sport.pe.iz();
		let targetPosition = ['первым', 'последним', 'предпоследним', 'вторым', 'третьим'].iz();

		let answerProbability, conditionText, randCount;

		switch (rand) {
		case 0:
			randCount = sl(2);
			answerProbability = counts[randCount] / totalAthletes;
			conditionText = 'из ' + countries[randCount];
			break;
		case 1:
			randCount = arrayOfUniqueValues(2, 0, 2);
			answerProbability = (counts[randCount[0]] + counts[randCount[1]]) / totalAthletes;
			conditionText = 'из ' + [countries[randCount[0]], countries[randCount[1]]].shuffleJoin(' или ');
			break;
		case 2:
			randCount = sl(2);
			answerProbability = 1 - counts[randCount] / totalAthletes;
			conditionText = 'не из ' + countries[randCount];
			break;
		}


		genAssertZ1000(answerProbability);

		NAtask.setTask({
			text: 'В ' + sportName + ' участвуют ' + chislitlx(counts[0], 'спортсмен', '$') + ' из ' + countries[0] + ', $' +
				counts[1] + '$ из ' + countries[1] + ' и $' +
				counts[2] + '$ из ' + countries[2] + '. ' +
				'Порядок, в котором спортсмены выступают, определяется жребием. ' +
				'Найдите вероятность того, что ' + targetPosition + ' будет выступать спортсмен ' + conditionText + '.',
			answers: answerProbability,
			preference,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 200);
})();

//https://math-oge.sdamgia.ru/problem?id=315159
