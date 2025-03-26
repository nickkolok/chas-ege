(function() { 'use strict'; retryWhileError(function() {
	let a=sl(1, 50, 1);
	let b=slKrome(a, 1, 50);
	let c=sl(1, 59, 1);
    let v=(a*b*c)/(60*(b-a));
	genAssert(v.isAlmostInteger(),'Колличество вопросов не может быть дробным');
	genAssert(v>0, 'Колличество вопросов не может быть отрицательным');
	NAtask.setTask({
		text: 'Петя и Ваня выполняют одинаковый тест. Петя отвечает за час на '+chislitlx(a, 'вопрос')+' теста, а Ваня - на '+
		b+'. Они одновременно начали отвечать на вопросы теста, и Петя закончил свой тест позже Вани на '+chislitlx(c,'минута')+'. Сколько вопросов содержит тест?',
		answers: v,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
//РешуЕГЭ-99621
