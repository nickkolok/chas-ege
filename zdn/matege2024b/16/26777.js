(function() {
	retryWhileError(function() {
		'use strict';

		let quarter = sl(1, 4);
		let angleRange, signFind, signGiven;
		let whatFind, whatGiven;
		if (sl1()) {
			whatFind = 'sin';
			whatGiven = 'cos';
			// Для cos знаки по четвертям: I(+) , II(-), III(-), IV(+)
			if (quarter === 1 || quarter === 4) signGiven = 1;
			else signGiven = -1;
			if (quarter === 1 || quarter === 2) signFind = 1;
			else signFind = -1;
		} else {
			whatFind = 'cos';
			whatGiven = 'sin';
			// Для sin знаки по четвертям: I(+) , II(+), III(-), IV(-)
			if (quarter === 1 || quarter === 2) signGiven = 1;
			else signGiven = -1;
			if (quarter === 1 || quarter === 4) signFind = 1;
			else signFind = -1;
		}
		switch (quarter) {
		case 1: // 0-90°
			angleRange = '0° < \\alpha < 90°';
			break;
		case 2: // 90-180°
			angleRange = '90° < \\alpha < 180°';
			break;
		case 3: // 180-270°
			angleRange = '180° < \\alpha < 270°';
			break;
		case 4: // 270-360°
			angleRange = '270° < \\alpha < 360°';
			break;
		}
		let factor = sl(2, 16);
		let numerator = sl(2, 9);
		let denominator = sl(2, 20);
		genAssertIrreducible(numerator, denominator);
		let squareRoot = sl(2, 7);
		genAssert(!squareRoot.isPolnKvadr(), 'Корень извлекается');
		let fraction = signGiven * (numerator * Math.sqrt(squareRoot)) / denominator;
		genAssert(fraction < 1, 'Значение не должно превышать 1');
		let givenValue = (signGiven === -1 ? '-' : '') + '\\frac{' + numerator + '\\sqrt{' + squareRoot + '}' + '}{' +
			denominator + '}';
		let answer = signFind * factor * Math.sqrt(1 - Math.pow(fraction, 2));
		genAssertZ1000(answer, 'более 3 знаков после запятой');
		NAtask.setTask({
			text: '$$' + '\\text{Найдите } ' + factor + '\\' + whatFind + '\\alpha \\text{, если } ' +
				'\\' + whatGiven + '\\alpha = ' + givenValue + '\\text{ и } ' + angleRange + '.' + '$$',
			answers: answer,
			authors: ['Алендарь Сергей'],
		});

	}, 10000);
})();
//26777
