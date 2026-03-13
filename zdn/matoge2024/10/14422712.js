(function () {
    'use strict';
    retryWhileError(function () {

	let total = sl(10, 50);           
	let heads = sl(1, total-1);         
	let tails = total - heads;           
	let position = sl(1, total);
	let rand = sl1();
	let reverse = ['орёл','решка'][1 - rand];      
	let answer = tails / total;
	genAssertZ1000(answer);

	NAtask.setTask({
		text: 'Монету бросили ' + chislitlx(total, 'раз', 'v$') + '. Известно, что ' + ['орёл', 'решка'][rand] + ' выпал ' + chislitlx(heads, 'раз', '$v') + '. ' +
			'Найдите вероятность того, что при $' + position + '$-м по счёту броске выпал'+ ['','а'][1 - rand] + ' ' + reverse + '.',
		answers: answer,
	});
	NAtask.modifiers.assertSaneDecimals();
    }, 100);
})();
//14422712
//Открытый банк заданий DC12B8
