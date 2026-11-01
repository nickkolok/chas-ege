(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '208015';
		let preference = ['phone', 'smartphone'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let product = ['мобильного телефона', 'смартфона'][variant];
		let prices = Array.from({length: 6}, () => 100 * sl(80, 250));
		let rows = [['Магазин', 'Цена, руб.'].tr('th')].concat(prices.map((price, i) => ['Магазин ' + (i + 1), price].tr()));
		NAtask.setTask({
		    text: 'В таблице представлены данные о стоимости одной модели ' + product + ' в различных магазинах.' +
		        rows.join('').toTable() + ' Найдите наименьшую стоимость среди представленных предложений. Ответ дайте в рублях.',
		    answers: prices.minE(), preference,
		});
	}, 1000);
})();
// ФИПИ, ЕГЭ база, задание 3.
// 3.67: 208015, 17068E
// 3.68: BE03F9, F13600, 8F01AC
// 3.69: 738D10, 5D08D0, C4AEDA, 054FA6, 01BC80, 13DC01, 8FCCB1, 5A3023, 3AE9D4, 8396A0, 37D1C5, B39E36, F7998B
