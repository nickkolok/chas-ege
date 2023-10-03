(function() {
	retryWhileError(function() {
		'use strict';
		let power = sl(3,5);
		let base = sl(2,5);
		let num1 = base.pow(sl(2,10));
		let num2 = base.pow(sl(2,10));
		let num3 = base.pow(sl(2,10));
		genAssert(num2!=num3||num1!=num3||num1!=num2,'Дробь сократилась');
		NAtask.setEvaluationTask({
			expr: 'sqrtpow('+num1+','+power+')'+'sqrtpow('+num2+','+power+')/sqrtpow('+num3+','+power+')',
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 10000);
})();

// 26746 62313 62385 62315 62317 62319 62321 62323 62325 62327 62329 62331 62333 62335 62337 62341 62343 62345 62347 62349 62351 62353 62355 62357 62359 62361 62363 62365 62367 62369 62371 62373 62375 62377 62379 62381 62383
