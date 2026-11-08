(function() { 'use strict'; retryWhileError(function() {
	let s=sl(1, 200, 1);
	let n=sl(1, 10, 1);
	let a=sl(1, 15, 1);
	let v=(a**2*n**2+2*s*a*n).sqrt();
        let x=v/n;
	genAssert(x>0,'Скорость не может быть отрицательной'); //Заготовочка!
	genAssertZ1000(x,'Скорость не должна быть слишком дробной'); //Заготовочка!
        let the_activeFloatingVehicle = sklonlxkand(["лодка","байдарка","баржа","яхта","моторная лодка"].iz());
	let the_humanSettlementDestination = sklonlxkand(["пункт","город"].iz()); 
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
        NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' прошла против течения реки ' + s +' км и вернулась в ' + the_humanSettlementDestination.ie +
			' отправления, затратив на обратный путь на ' + chislitlx(n, 'час') +' меньше. ' + the_orderToFind.toZagl() +' скорость '+
			the_activeFloatingVehicle.re + ' в неподвижной воде, если скорость течения равна '  + a + ' км/ч. Ответ дайте в км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//VeronikaKit
//Решу ЕГЭ 26586
