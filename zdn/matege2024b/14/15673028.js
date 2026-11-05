(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '15673028';
		let preference = ['commonBase', 'relatedBases', 'productBase', 'decimalBase', 'signedSum'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let base = sl(2, 9);
		let a = sl(-7, 7);
		let b = slKrome(0, -7, 7);
		let k = sl(1, 4);
		let expr;

		if (variant === 0) {
			let power = exponent => base + '^(' + exponent + ')';
			expr = [
				power(a) + '*' + power(b) + '/' + power(a + b - k),
				power(a + b + k) + '/(' + power(a) + '*' + power(b) + ')',
				'forceBrackets(' + power(a) + ')^2/' + power(2 * a - k),
			].iz();
		} else if (variant === 1) {
			base = sl(2, 7);
			a = sl(3, 9);
			b = sl(2, a);
			expr = [
				(base * base) + '^' + a + '/' + base + '^' + (2 * a - k),
				'divideColon(' + (base ** 3) + '^' + a + '/' + (base ** 2) + '^' + b + ',' + base + '^' + (3 * a - 2 * b - k) + ')',
			].iz();
		} else if (variant === 2) {
			base = [2, 4, 5, 8].iz();
			let other = slKrome(base, 2, 9);
			a = sl(6, 14);
			let baseExponent = a + [-1, 1].iz();
			expr = (base * other) + '^' + a + '/(' + base + '^' + baseExponent + '*' + other + '^' + (a - 1) + ')';
		} else if (variant === 3) {
			a = sl(1, 4);
			expr = [
				'forceBrackets(0.1)^' + a + '/10^(-' + a + ')*10^' + k,
				'forceBrackets(0.1)^' + a + '*10^' + (a + 2) + '*' + base + '^2',
			].iz();
		} else {
			let signBase = [-1, -10].iz();
			expr = signBase === -1 ?
				sl(1, 9) + '*forceBrackets(-1)^' + sl(2, 8) + '+' + sl(1, 9) + '*forceBrackets(-1)^' + sl(2, 8) :
				'forceBrackets(-10)^' + sl(3, 4) + '+forceBrackets(-10)^2+forceBrackets(-10)^0';
		}
		NAtask.setEvaluationTask({expr, preference});
	}, 1000);
})();
// EF26C4, 6F1974, ED92D9, 7216C5, F5F9F4, F25008, 2EB777, DAC572, DC7C73, D097B6, CF17B1, A96129, DA66D5, 5A8A57, D9BDAC, CCEDA8, 8A71A0, E76CC9, 8042C9, 038B98, 204CE2, 503B63, B21E73, 558EBD, CEA2B1, 004F58, 8848C8, 9D3EDB, A6C297, 1CA948, 250EA4, 93CEA8, 0A0136, 8A9A85, 833113, 7D3D14, D8F6CB, CCFECC, 93AF9E, 41C882, 794E81, C53807, D7052A, 757A87, 43E57B, 65DBB5, 3C42BD, 05471B, 175E1B, 15571A, 3E5613, D358DE, 52B3C4, 4F5FEB, 9A8934, B0E295, 63893B, 4054F9, 9F95FD
