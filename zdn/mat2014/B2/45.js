(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var mass = [
		[1, 2, 3],
		[2, 2, 2],
		[3, 2, 4],
		[4, 2, 2],
		[5, 2, 5],
		[6, 2, 4],
		[7, 2, 2]
	].iz();
	var a = sluchch(1, 2);
	var b1 = mass[0];
	var b2 = b1 * (1 / mass[a]);
	var b3 = b2 * (1 / mass[a]);
	NAtask.setTask({
		text: 'Найдите сумму бесконечной геометрической прогрессии $' + b1 + '$; $' + b2 + '$; $' + b3 + '$.',
		answers: b1 / (1 - (1 / mass[a])),
	});
	NAtask.modifiers.allDecimalsToStandard();
	NAtask.modifiers.assertSaneDecimals();
})();
