(function() { 'use strict'; retryWhileError(function() {
	let s=sl(20, 400, 1);
	let n=sl(1, 7, 1);
	let k=sl(5, 20, 1);
	let v=sl(5, 60, 1);
        let x=sl(1, [10, v-1].minE(), 1);
	let a=slKrome(x, 0, 23);
        let b=a+n+k/60+s/(v+x)+s/(v-x);
	genAssert(b.isAlmostInteger(),'Время не может быть дробным');
	genAssert(b<23,'Время прибытия не может быть слишком большим');
	let the_activeFloatingVehicle = sklonlxkand( ["лодка","байдарка","баржа","яхта","моторная лодка"].iz());
	let the_humanSettlementDestination = sklonlxkand( ["пункт","город","село"].iz()); 
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
	NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' в ' + a + ':00 вышла из ' + the_humanSettlementDestination.re + 
			' A в '+ the_humanSettlementDestination.ie +' B, расположенн'+['ый', 'ая', 'ое', 'ые'][the_humanSettlementDestination.rod] +' в ' + s +
			' км от A. Пробыв в ' + the_humanSettlementDestination.pe +' B ' + chislitlx(n, 'час') +' '+ chislitlx(k, 'минута') + ', ' + 
			the_activeFloatingVehicle.ie +' отправилась назад и вернулась в ' + the_humanSettlementDestination.ie +
			' А в ' + b + ':00 того же дня. ' + the_orderToFind.toZagl() +
			' (в км/ч) скорость течения реки, если известно, что собственная скорость ' + the_activeFloatingVehicle.re +
			' равна ' + v + ' км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 20000);})();
//Решу ЕГЭ 5999
