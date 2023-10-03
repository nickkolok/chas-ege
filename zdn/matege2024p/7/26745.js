(function() {
	retryWhileError(function() {
		'use strict';
		let num = sl(2, 5).pow(sl(1, 5));
		let pow1 = sl(2, 20);
		let pow2 = slKrome(pow1, 2, 20);
		let pow3 = slKrome([pow1, pow2], 2, 20);
		NAtask.setEvaluationTask({
			expr: 'sqrtpow(' + num + ',' + pow1 + ')' + 'sqrtpow(' + num + ',' + pow2 + ')/sqrtpow(' + num + ',' + pow3 + ')',
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 10000);
})();
// 26745 62311 509836 510066 517155 639861 639912 62253 62255 62257 62259 62261 62263 62265 62267 62269 62271 62273 62275 62277 62279 62281 62283 62285 62287 62289 62291 62293 62295 62297 62299 62301 62303 62305 62307 62309
