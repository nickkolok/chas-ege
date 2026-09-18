(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '512208';
		let r1, h1, r2, h2;
		let V1, V2, ratio;
		do {
			r1 = sl(1, 10);
			h1 = sl(1, 10);
			r2 = sl(1, 10);
			h2 = sl(1, 10);
			V1 = r1 * r1 * h1;
			V2 = r2 * r2 * h2;
			ratio = Math.max(V1, V2) / Math.min(V1, V2);
		} while (!ratio.isAlmostInteger() || ratio <= 1);
		ratio = ratio.round();

		let isV2Greater = V2 > V1;
		let preference1 = isV2Greater ? 
			['second_greater_first', 'first_less_second'] : 
			['first_greater_second', 'second_less_first'];

		let chosenPref = getSelectedPreferenceFromList(key, preference1);

		let questionText;
		if (chosenPref === 'second_greater_first') {
			questionText = 'Во сколько раз объём второго цилиндра больше объёма первого цилиндра?';
		} else if (chosenPref === 'first_less_second') {
			questionText = 'Во сколько раз объём первого цилиндра меньше объёма второго цилиндра?';
		} else if (chosenPref === 'first_greater_second') {
			questionText = 'Во сколько раз объём первого цилиндра больше объёма второго цилиндра?';
		} else if (chosenPref === 'second_less_first') {
			questionText = 'Во сколько раз объём второго цилиндра меньше объёма первого цилиндра?';
		}

		let text = 'Даны два цилиндра. Радиус основания и высота первого цилиндра равны соответственно ' +
			'$' + r1 + '$ и $' + h1 + '$, а второго — $' + r2 + '$ и $' + h2 + '$. ' + questionText;

		NAtask.setTask({
			text: text,
			answers: ratio,
			preference: [preference1],
			authors: ['Селена (Selena)'],
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
