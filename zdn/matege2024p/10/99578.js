(function() { 'use strict'; retryWhileError(function() {
	/* Имеются два сосуда. Первый содержит 30 кг, а второй — 15 кг раствора кислоты различной концентрации. Если эти растворы смешать, то получится раствор, содержащий 34% кислоты. Если же смешать равные массы этих растворов, то получится раствор, содержащий 46% кислоты. Сколько килограммов кислоты содержится в первом сосуде? */

	let firstMass=sl(1, 50);
	let secondMass=slKrome(firstMass, 1, 50);
	let finalMass = firstMass+secondMass;
	
	let firstProcent=slKrome(firstMass, 1, 50);
	let secondProcent=slKrome([firstProcent, secondMass], 1, 50);
	let firstFinalProcent = (firstMass*firstProcent+secondMass*secondProcent)/finalMass;
	let secondFinalProcent = (firstProcent+secondProcent)/2;
	
	let mixin = sklonlxkand(['соль', 'щёлочь', 'кислота'].iz());

	genAssertZ1000(firstFinalProcent,'Процент концентрации при смешении обоих растворов слишком дробный'); 
	genAssertZ1000(secondFinalProcent,'Процент концентрации при смешении обоих растворов при равной массе слишком дробный'); 


	let rand = sl1();
	let rand2 = sl(0,3);

	NAtask.setTask({
		text:
			'Имеются два сосуда. '+
			'Первый содержит ' + firstMass + ' кг, '+
			'а второй — ' + secondMass + ' кг раствора '+mixin.re+' различной концентрации. '+
			'Если эти растворы смешать, '+
			'то ' + ['получится раствор, содержащий '+firstFinalProcent+'%', 'получили бы '+firstFinalProcent+'-процентный раствор'][rand]+' '+mixin.re+'. '+
			'Если же смешать равные массы этих растворов, '+
			'то '+['получится раствор, содержащий '+secondFinalProcent+'%', 'получили бы '+secondFinalProcent+'-процентный раствор'][rand]+' '+mixin.re+'. ',
		questions: [[{
			text: 'Сколько килограммов '+mixin.re+' содержится в первом сосуде?',
			answers: firstMass,
			},{
			text: 'Сколько килограммов '+mixin.re+' содержится во втором сосуде?',
			answers: secondMass,
			},{
			text: 'Сколько процентов '+mixin.re+' содержится в первом сосуде?',
			answers: firstProcent,
			},{
			text: 'Сколько процентов '+mixin.re+' содержится во втором сосуде?',
			answers: secondProcent,
			}][rand2]],
		authors: ['Александра Суматохина'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99578
