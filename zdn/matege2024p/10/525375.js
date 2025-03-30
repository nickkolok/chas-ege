(function() { 'use strict'; retryWhileError(function() {
	let s=sl(20, 300, 1);
	let n=sl(1, 5, 1);
	let x = sl(2, 50, 1);
	let k=sl(5, 20, 1);
	let a = sl(1, x-1);
    let b=a+n+k/60+s/(x+a)+s/(x-a);
	genAssert(b>a,'Время отправления не должно быть больше времени прибытия');
	genAssert(Number.isInteger(b),'Время не может быть дробным');
	genAssert(b<23,'Время прибытия не может быть слишком большим');
	let the_activeFloatingVehicle = sklonlxkand( ["лодка","байдарка","баржа","яхта","моторная лодка"].iz());
	let the_humanSettlementDestination = sklonlxkand( ["пункт","город","село"].iz()); 
	NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' в ' + a + ':00 вышла из ' + the_humanSettlementDestination.re + 
			' A в '+ the_humanSettlementDestination.ie +' B, расположенный в ' + s +
			' км от A. Пробыв в ' + the_humanSettlementDestination.pe +' B ' + chislitlx(n, 'час') +' '+ k + ' минут, ' + 
			the_activeFloatingVehicle.ie +' отправилась назад и вернулась в ' + the_humanSettlementDestination.ie +
			' А в ' + b + ':00 того же дня. Найдите ',
		questions: [
			{
				text: ' (в км/ч) собственную скорость '+ the_activeFloatingVehicle.re +', если известно, '+
			    'что скорость течения реки равна ' + a + ' км/ч.',
			    answer: x,
			},
			{
				text: ' (в км/ч) скорость течения реки, если известно, что собственная скорость ' + the_activeFloatingVehicle.re +
			    ' равна ' + x + ' км/ч.',
			    answer: a,
			},
	    ],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
//VeronikaKit
//РешуЕГЭ525375
