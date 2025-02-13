(function() {
	'use strict';

	retryWhileError(function() {
		let key = '99575';
		let largestMass = getListedPreference(key, [{
			preference: 'second_largest',
			preferenceValue: 0,
		}, {
			preference: 'first_largest',
			preferenceValue: 1,
		}], sl1());
		
		largestMass = 1;

		let massFirst = sl(10, 99, 0.01);
		let massSecond = massFirst + slKrome(massFirst, 1, massFirst - 1, 0.01) * (-1).pow(largestMass);
		let massDifference = (massFirst - massSecond).abs();
		let massTrird = massFirst + massSecond;

		let percentFirst = sl(1, 50, 0.01);
		let percentSecond = slKrome(percentFirst, 1, 50, 0.01);
		let percentThird = (massFirst * percentFirst + massSecond * percentSecond) / massTrird;

		genAssertZ1000(percentThird, 'Процент третьего сплава слишком дробный');

		let bulk, mixin, juncture;
		if (sl1()) { // Растворы
			bulk = 'раствор';
			mixin = ['соль', 'щёлочь', 'кислота'].iz();
			juncture = 'Два раствора сливают и получают третий, содержащий';
		} else { // Сплавы
			bulk = 'сплав';
			mixin = ['медь', 'олово', 'серебро', 'золото', 'алюминий'].iz();
			juncture = 'Из этих двух сплавов получили третий сплав, содержащий';
		}

		bulk = sklonlxkand(bulk);
		mixin = sklonlxkand(mixin);

		let massUnits = [
			['г', 'в граммах', 'грамм'],
			['кг', 'в килограммах', 'килограмм'],
		].iz();

		let name = ['второго', 'первого'];
		let moreLess = ['больше', 'меньше'];

		if (largestMass) {
			name = name.reverse();
		}
		
		if (sl1()) {
			name = name.reverse();
			moreLess = moreLess.reverse();
		}

		NAtask.setTask({
			text: `Имеется два ${bulk.re}. Первый ${bulk.ie} содержит ${percentFirst}% ${mixin.re}, 
            второй содержит ${percentSecond}% ${mixin.re}. 
            Из этих двух ${bulk.rm} получили третий ${bulk.ve} массой ${massTrird} ${massUnits[0]}, содержащий ${percentThird}% ${mixin.re}.
            На сколько ${massUnits[2]} масса ${name[0]} сплава была ${moreLess[0]} массы ${name[1]}?`,
			answers: massDifference.abs(),
			authors: ['Николай Авдеев', 'Александра Суматохина'],
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 5000);
})();
//https://math-ege.sdamgia.ru/problem?id=99575
