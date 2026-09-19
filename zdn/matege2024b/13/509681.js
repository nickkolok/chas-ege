(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '509681';
		let preference = ['volume', 'surface'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let k = sl(2, 10);
		let r2 = sl(1, 10);
		let r1 = k * r2;

		let nominative = rand === 0 ? 'объём' : 'площадь поверхности';
		let genitive = rand === 0 ? 'объёма' : 'площади поверхности';
		let answer = rand === 0 ? Math.pow(k, 3) : Math.pow(k, 2);

		NAtask.setTask({
			text: 'Даны два шара с радиусами $' + r1 + '$ и $' + r2 + '$. Во сколько раз ' + nominative + ' большего шара больше ' + genitive + ' меньшего шара?',
			answers: answer,
			authors: ['Селена'],
		});
	}, 1000);
})();
//509681
