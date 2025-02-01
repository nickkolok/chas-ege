(function() { 'use strict'; retryWhileError(function() {
	let s=sl(20, 300, 1);
	let n=sl(1, 5, 1);
	let x=sl(1,15,1);
	let v=slKrome(x, 3, 40);
	let b=sl(1, 23, 1);
        let a=b-n-s/(v+x)-s/(v-x);
	genAssert(b>a,'Время отправления не должно быть больше времени прибытия');
	genAssert(Number.isInteger(a),'Время не может быть дробным');
	genAssert(a>0,'Время отправления не может быть отрицательным');
	genAssert(a<15,'Время отправления не может быть слишком большим');
	let the_activeFloatingVehicle = sklonlxkand( ["лодка","байдарка","баржа","яхта","моторная лодка"].iz());
	let the_humanSettlementDestination = sklonlxkand(["пункт","город","село"].iz()); 
	let the_orderToFind = decor.orderToFind.iz(); 
	NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' в ' + a + ':00 вышла из ' + the_humanSettlementDestination.re + 
			' A в '+ the_humanSettlementDestination.ie +' B, расположенный в ' + s +
			' км от A. Пробыв в ' + the_humanSettlementDestination.pe +' B ' + chislitlx(n, 'час') + ', ' + 
			the_activeFloatingVehicle.ie +' отправилась назад и вернулась в ' + the_humanSettlementDestination.ie +
			' А в ' + b + ':00 того же дня. ' + the_orderToFind.toZagl() +
			' (в км/ч) скорость течения реки, если известно, '+
			'что собственная скорость '+ the_activeFloatingVehicle.re + ' равна ' +  v + ' км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
        NAtask.modifiers.variativeABC();
}, 20000);})();
//VeronikaKit
//Решу ЕГЭ 5997
