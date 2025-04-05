(function() { 'use strict'; retryWhileError(function() {
	let s=sl(20, 300, 1);
	let n=slKrome(s, 250, 1000);
    let x=2*s*n/(n+s);
    let persona=sklonlxkand( ["путешественник","странник"].iz()); 
    let voda=sklonlxkand(["море","океан"].iz());
    let the_activeFloatingVehicle=sklonlxkand( ["яхта","катер"].iz());
	genAssert(Number.isInteger(x),'Скорость не может быть дробной');
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
	NAtask.setTask({
		text:
            persona.ie.toZagl()+' переплыл '+voda.ve+' на '+ the_activeFloatingVehicle.pe+' со средней скоростью '+s+
            ' км/ч. Обратно он летел на спортивном самолете со скоростью '+ n+' км/ч. '+the_orderToFind.toZagl()+' среднюю скорость '+persona.re+' на протяжении всего пути. Ответ дайте в км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
//Решу ЕГЭ 99604
