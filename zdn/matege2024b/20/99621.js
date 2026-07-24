(function() { 'use strict'; retryWhileError(function() {
	let a=sl(1, 50, 1);
	let b=sl(a+1, 50, 1);
	let c=sl(1, 59, 1);
        let v=(a*b*c)/(60*(b-a));
 let [name1,name2]=om.childMaleNames.iz(2);
 let rebenok=sklonlxkand(name1);
        let rebenoka=sklonlxkand(name2);
	genAssert(v.isAlmostInteger(),'Количество вопросов не может быть дробным');
	NAtask.setTask({
		text: rebenok.ie+' и '+rebenoka.ie+' выполняют одинаковый тест. '+rebenok.ie+' отвечает за час на '+chislitlx(a, 'вопрос')+' теста, а '+rebenoka.ie+' - на '+
		chislitlx(b, 'вопрос')+'. Они одновременно начали отвечать на вопросы теста, и '+rebenok.ie+' закончил свой тест позже '+rebenoka.re+' на '+chislitlx(c,'минута')+'. Сколько вопросов содержит тест?',
		answers: v,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
