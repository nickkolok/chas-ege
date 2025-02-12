(function() {
	'use strict';

	retryWhileError(function() {
		let key = '1';
		let largestMass = getListedPreference(key, [{
			preference: 'second_largest',
			preferenceValue: 0,
		}, {
			preference: 'first_largest',
			preferenceValue: 1,
		}], sl1());
		
		let massForFind = getListedPreference(key, [{
			preference: 'find_first_mass',
			preferenceValue: 0,
		}, {
			preference: 'find_second_mass',
			preferenceValue: 1,
		}, {
			preference: 'find_third_mass',
			preferenceValue: 2,
		}], sl(0,2));

		let massFirst = sl(10, 99,0.01);
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
			['г', 'в граммах'],
			['кг', 'в килограммах'],
		].iz();

		NAtask.setTask({
			text: `Имеется два ${bulk.re}. Первый ${bulk.ie} содержит ${percentFirst}% ${mixin.re}, 
            второй содержит ${percentSecond}% ${mixin.re}. 
            Масса ${['второго', 'первого'][largestMass]} ${bulk.re} больше массы ${[ 'первого', 'второго'][largestMass]} ${bulk.re} на ${massDifference} ${massUnits[0]}. 
            ${juncture} ${percentThird}% ${mixin.re}. Найдите массу ${['первого', 'второго', 'третьего'][massForFind]} ${bulk.re}. 
            Ответ дайте ${massUnits[1]}.`,
			answers: [massFirst, massSecond, massTrird][massForFind],
			authors: ['Николай Авдеев', 'Александра Суматохина'],
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 5000);
})();
//https://math-ege.sdamgia.ru/problem?id=512333
