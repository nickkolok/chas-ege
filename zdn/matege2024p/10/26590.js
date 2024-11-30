(function() { 'use strict'; retryWhileError(function() {
	let s=sl(10, 300, 1);
	let n=sl(1, 9);
	let a=sl(1, 20);
	let v=Math.sqrt(n**2*a**2+4*n*s*a);
        let x=(-n*a+v)/(2*n);
	genAssert(x>0,'Скорость не может быть отрицательной'); 
	genAssertZ1000(x,'Скорость не может быть слишком дробной');
        let the_berthForFloatingVehicle = sklonlxkand(decor.berthForFloatingVehicle.iz()); // ["пристань","причал"]
	let the_activeFloatingVehicle = sklonlxkand( ["пароход","теплоход","каяк","корабль","паром","катер"].iz()); 
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
	let the_humanSettlementDestination = sklonlxkand(["пункт","город","село","деревню"].iz()); 
        NAtask.setTask({
		text:
			'От ' + the_berthForFloatingVehicle.im +' A к ' + the_berthForFloatingVehicle.im +' B, расстояние между которыми равно '+s+' км, '+
			'отправился с постоянной скоростью первый ' + the_activeFloatingVehicle.ie +', '+
			'а через ' + chislitlx(n, 'час') + ' после этого следом за ним, '+
			'со скоростью на ' + a + ' км/ч большей, отправился второй. ' + 
			the_orderToFind.toZagl() +' скорость первого ' + the_activeFloatingVehicle.re +', если в ' + 
			the_humanSettlementDestination.ie +' B оба '+ the_activeFloatingVehicle.re +' прибыли одновременно. Ответ дайте в км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
	NAtask.modifiers.variativeABC();
}, 2000);})();
//VeronikaKit
//Решу ЕГЭ 26590
