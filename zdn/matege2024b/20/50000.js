(function() { 'use strict'; retryWhileError(function() {
	let a=sl(2, 300, 1);
	let b=sl(10, 150, 1);
	let c=sl(2, 300, 1);
	let d=slKrome(b, 10, 150);
        let e=sl(2, 300, 1);
	let f=sl(10, 150, 1);
        let v=(a+c+e)/((a/b)+(c/d)+(e/f));
	genAssert(v.isAlmostInteger(),'скорость не может быть дробной');
	NAtask.setTask({
		text:'Первые '+a+' км автомобиль ехал со скоростью '+b+' км/ч, а затем '+e+' км - со скоростью '+f+' км/ч. Найдите среднюю скорость автомобиля на протяжении всего пути. Ответ дайте в км/ч.',
		answers: v,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
