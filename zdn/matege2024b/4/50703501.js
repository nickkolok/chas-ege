(function() { 'use strict'; retryWhileError(function() {
	let b=sl(2, 30);
	let c=slKrome(b, 2, 30);
	let e=slKrome([b,c], 2, 30);
	let a=b*c*e;
	let x=(b+1)*(c+1)*(e+1);
	genAssert(b.isPrime(), 'Проверка на простое число');
	genAssert(c.isPrime(), 'Проверка на простое число');
	genAssert(e.isPrime(), 'Проверка на простое число');
        NAtask.setTask({
		text:
			'Если $p_1$, $p_2$ и $p_3$ - различные простые числа, то сумма всех делителей числа $p_1\\cdot p_2\\cdot p_3$ равна $(p_1+1)(p_2+1)(p_3+1)$. Найдите сумму всех делителей числа $'+a+'='+b+'\\cdot'+c+'\\cdot'+e+'$.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//VeronikaKit
//Решу ЕГЭ (база)507035
