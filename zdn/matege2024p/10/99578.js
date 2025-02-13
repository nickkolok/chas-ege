(function () {
	'use strict'; retryWhileError(function () {
		/* Имеются два сосуда. Первый содержит 30 кг, а второй — 15 кг раствора кислоты различной концентрации. Если эти растворы смешать, то получится раствор, содержащий 34% кислоты. Если же смешать равные массы этих растворов, то получится раствор, содержащий 46% кислоты. Сколько килограммов кислоты содержится в первом сосуде? */

		let key = '99578';
		let decorRand = sl1();	//0 - концентрация в %, 1 - процентный раствор
		let rand = getListedPreference(key, [{
			preference: 'mass_of_mixin_in_first',
			preferenceValue: 0,
		}, {
			preference: 'mass_of_mixin_in_second',
			preferenceValue: 1,
		}, {
			preference: 'procent_of_mixin_in_first',
			preferenceValue: 2,
		}, {
			preference: 'procent_of_mixin_in_second',
			preferenceValue: 3,
		}], sl(0, 3));

		let firstMass = sl(1, 50);
		let secondMass = slKrome(firstMass, 1, 50);
		let finalMass = firstMass + secondMass;

		let firstProcent = slKrome(firstMass, 1, 50);
		let secondProcent = slKrome([firstProcent, secondMass], 1, 50);
		let firstFinalProcent = (firstMass * firstProcent + secondMass * secondProcent) / finalMass;
		let secondFinalProcent = (firstProcent + secondProcent) / 2;

		let mixin = sklonlxkand(['соль', 'щёлочь', 'кислота'].iz());

		genAssertZ1000(firstFinalProcent, 'Процент концентрации при смешении обоих растворов слишком дробный');
		genAssertZ1000(secondFinalProcent, 'Процент концентрации при смешении обоих растворов при равной массе слишком дробный');

		NAtask.setTask({
			text:
				'Имеются два сосуда. ' +
				'Первый содержит ' + firstMass + ' кг, ' +
				'а второй — ' + secondMass + ' кг раствора ' + mixin.re + ' различной концентрации. ' +
				'Если эти растворы смешать, ' +
				'то получится ' + ['раствор, содержащий ' + firstFinalProcent + '%', firstFinalProcent + '-процентный раствор'][decorRand] + ' ' + mixin.re + '. ' +
				'Если же смешать равные массы этих растворов, ' +
				'то получится ' + ['раствор, содержащий ' + secondFinalProcent + '%', secondFinalProcent + '-процентный раствор'][decorRand] + ' ' + mixin.re + '. ',
			questions: [[{
				text: 'Сколько килограммов ' + mixin.re + ' содержится в первом сосуде?',
				answers: firstMass * firstProcent / 100,
			}, {
				text: 'Сколько килограммов ' + mixin.re + ' содержится во втором сосуде?',
				answers: secondMass * secondProcent / 100,
			}, {
				text: 'Сколько процентов составляет концентрация раствора в первом сосуде?',
				answers: firstProcent,
			}, {
				text: 'Сколько процентов составляет концентрация раствора во втором сосуде?',
				answers: secondProcent,
			}][rand]],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard(/*true*/);
	}, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99578
