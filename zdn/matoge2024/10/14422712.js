(function () {
    'use strict';
    retryWhileError(function () {

	let total = sl(10, 50);           
	let heads = sl(1, total-1);         
	let tails = total - heads;           
	let position = sl(1, total);      

	NAtask.setTask({
		text: 'Монету бросили ' + chislitlx(total, 'раз', '$v') + '. Известно, что орёл выпал ' + chislitlx(heads, 'раз', '$v') + '. ' +
			'Найдите вероятность того, что при $' + position + '$-м по счёту броске выпала решка.',
		answers: tails / total,
	});
	NAtask.modifiers.assertSaneDecimals();
    }, 100);
})();
//14422712
//Открытый банк заданий DC12B8
