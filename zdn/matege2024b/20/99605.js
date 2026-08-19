(function() { 'use strict'; retryWhileError(function() {
	let a=sl(10, 150, 1);
	let b=slKrome(a, 10, 150);
	let c=slKrome([a,b], 10, 150);
        let v=3*a*b*c/(a*b+b*c+a*c);
        let d=['пути', 'трассы'].iz();
	genAssert(v.isAlmostInteger(),'Скорость не может быть дробной');
	NAtask.setTask({
		text:'Первую треть '+d+' автомобиль ехал со скоростью '+a+' км/ч, вторую треть - со скоростью '+b+' км/ч, а последнюю - со скоростью '+c+' км/ч. Найдите среднюю скорость автомобиля на протяжении всего пути. Ответ дайте в км/ч.',
		answers: v,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
//РешуЕГЭ-99605
