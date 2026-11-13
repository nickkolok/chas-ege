(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '509770';
	let preference = ['rootQuotient', 'rootProductQuotient', 'productsInsideRoots', 'radicalDifference', 'decimalProduct'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let radicand = sl(2, 13);
	let multiplier = sl(2, 9);
	let root = x => 'sqrt(' + x + ')';
	let expr;
	if (variant === 0) {
		let scaled = radicand * multiplier * multiplier;
		let coefficient = [2, 3, 4, 5, 6, 7].iz();
		let divisor = [2, 4, 5, 8].iz();
		expr = [
			root(scaled) + '/' + root(radicand),
			'(' + coefficient + '*' + root(scaled) + ')/' + root(radicand),
			root(scaled) + '/(' + divisor + '*' + root(radicand) + ')',
		].iz();
	} else if (variant === 1) {
		let other = slKrome(radicand, 2, 13);
		let a = sl(1, 5);
		let b = sl(1, 5);
		expr = '(' + root(radicand * a * a) + '*' + root(other * b * b) + ')/' + root(radicand * other);
	} else if (variant === 2) {
		let other = slKrome(radicand, 2, 13);
		expr = [root(radicand + '*' + (other * multiplier)) + '/' + root((radicand * multiplier) + '*' + other),
			sl(2, 6) + '*' + root(radicand + '*' + (other * multiplier)) + '/' + root((radicand * multiplier) + '*' + other)].iz();
	} else if (variant === 3) {
		expr = '(' + root(radicand * multiplier * multiplier) + '-' + root(radicand) + ')*' + root(radicand);
	} else {
		let decimal = Number((multiplier * multiplier / 10).toFixed(1));
		expr = [root(decimal), root(10)].shuffle().join('*');
	}
	NAtask.setEvaluationTask({expr, authors: ['Алендарь Сергей'], preference});
})();
// B278BE, 482D11, FBAA54, E97836, AF2F6D, 30A33A, 78720B, 70117B, 3E6822, 9560D5, 8D3CD7, B9AF9B, F5FD63, A72CB7, 3713AC, 6F7CFE, F0C57A, 514271, 91C97A, 0C38DA, C820E8, 5A3149, B61E03, E58678, 0D3EBC, BE2A16, 6932D8, B0B1E7, B00974, E75A37, 607744, E734FB, F5E30C, F18073, B86518, 4C7DD4, 5580D4, 537E6E, 9CCF6E, 0FF084, 7B444F, 41E3F5, 66B0F5, 62B3B1, 1D47C2, AC3BC7, C351CD, E09AC3, 50F1E1, C7B6E6, A0B17F, DF38B9, 5836B1, DFEC2D, BB0DD1, EEC0D6, C45E5A, 4B1F35, FD8872, 76D122, 9B9AA7, 057496, 4C8817, 150E21, 6937D2, 985CEA, 48E232, D85E0D, 6015B9, 507D99, 4C4808, 252B1A, 3404ED, B90DD2, 5E5167, 092C40, 5259BC, EDF9DD, 0D418C, 9B5C8F, 7A072B, AB04BA, 5FEF65, 509479, 10AC2B, D537C1, 8F516C, 72F32E, 1CBCA7, 13B72D, D9F5B0
