(function() {
	retryWhileError(function() {
		'use strict';

		let quarter = sl(1, 4);
		let angleRange, signFind, signGiven;
		let whatGiven;
		let whatFind = 'tg';

		if (sl1()) {
			whatGiven = 'cos';
			// cos знаки по четвертям: I(+) , II(-), III(-), IV(+)
			if (quarter === 1 || quarter === 4) signGiven = 1;
			else signGiven = -1;
		} else {
			whatGiven = 'sin';
			// sin знаки по четвертям: I(+) , II(+), III(-), IV(-)
			if (quarter === 1 || quarter === 2) signGiven = 1;
			else signGiven = -1;
		}

		// tg знаки по четвертям: I(+) , II(-), III(+), IV(-)
		if (quarter === 1 || quarter === 3) signFind = 1;
		else signFind = -1;

		switch (quarter) {
		case 1:
			angleRange = '0° < \\alpha < 90°';
			break;
		case 2:
			angleRange = '90° < \\alpha < 180°';
			break;
		case 3:
			angleRange = '180° < \\alpha < 270°';
			break;
		case 4:
			angleRange = '270° < \\alpha < 360°';
			break;
		}

		let numerator, denominator, squareRoot;
		let fraction, givenValue;

		numerator = sl(1, 9).pm();
		squareRoot = sl(2, 30);
		genAssert(!squareRoot.isPolnKvadr(), 'Корень извлекается');
		denominator = '\\sqrt{' + squareRoot + '}';
		fraction = Math.abs(numerator) / Math.sqrt(squareRoot);
		genAssert(fraction < 1, 'Значение должно быть меньше 1');
		givenValue = (signGiven === -1 ? '-' : '') + '\\frac{' + Math.abs(numerator) + '}{\\sqrt{' + squareRoot + '}}';

		let otherValue = Math.sqrt(1 - fraction * fraction);
		let tgValue;
		if (whatGiven === 'sin') {
			// tg = sin / cos
			tgValue = fraction / otherValue;
		} else {
			// tg = sin / cos, где sin = otherValue, cos = fraction
			tgValue = otherValue / fraction;
		}

		let answer = signFind * tgValue;
		answer = answer.ts();
		genAssertZ1000(answer, 'более 3 знаков после запятой');

		NAtask.setTask({
			text: '$$' + '\\text{Найдите } \\' + whatFind + '\\alpha \\text{, если } \\' +
				whatGiven + '\\alpha = ' + givenValue + '\\text{ и } ' + angleRange + '.' + '$$',
			answers: answer,
			authors: ['Алендарь Сергей'],
		});

	}, 10000);
})();
//26775
