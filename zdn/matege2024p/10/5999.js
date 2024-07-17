(function() { 'use strict'; retryWhileError(function() {
	let s=sl(20, 400, 1);
	let n=sl(1, 7, 1);
	let x=sl(1, 30, 1);
	let k=sl(5, 20, 1);
	let a=slKrome(x, 1, 50);
        let b=a+n+k/60+s/(a+x)+s/(a-x);
	genAssert(b>a,'Время отправления не должно быть больше времени прибытия');
	genAssert(Number.isInteger(b),'Время не может быть дробным');
	genAssert(b<23,'Время прибытия не может быть слишком большим');
	let the_activeFloatingVehicle = sklonlxkand( ["лодка","байдарка","баржа","яхта","моторная лодка"].iz());
	let the_humanSettlementDestination = sklonlxkand( ["пункт","город","село"].iz()); 
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
	NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' в ' + a + ':00 вышла из ' + the_humanSettlementDestination.re + 
			' A в '+ the_humanSettlementDestination.ie +' B, расположенный в ' + s +
			' км от A. Пробыв в ' + the_humanSettlementDestination.pe +' B ' + chislitlx(n, 'час') +' '+ k + ' минут, ' + 
			the_activeFloatingVehicle.ie +' отправилась назад и вернулась в ' + the_humanSettlementDestination.ie +
			' А в ' + b + ':00 того же дня. ' + the_orderToFind.toZagl() +
			' (в км/ч) скорость течения реки, если известно, что собственная скорость ' + the_activeFloatingVehicle.re +
			' равна ' + a + ' км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
//VeronikaKit
//Решу ЕГЭ 5999
