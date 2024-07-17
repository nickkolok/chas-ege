(function() { 'use strict'; retryWhileError(function() {
	let s=sl(1, 200, 1);
	let k=sl(1, 15, 1);
	let b=sl(1, 24, 1);
	let n=sl(1, 5, 1);
	let x=slKrome(k, 5, 50);
	let a=b-n-s/(x+k)-s/(x-k);
	genAssert(Number.isInteger(a),'Время не может быть дробным');
	genAssert(a>0,'Время отправления не может быть отрицательным');
	genAssert(a<15,'Время отправления не может быть слишком большим');
	genAssert(b>a,'Время отправления не может быть больше времени прибытия');
        let the_activeFloatingVehicle = sklonlxkand(["пароход","теплоход","каяк","корабль","паром","катер"].iz()); 
	let the_orderToFind = decor.orderToFind.iz();

	NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' в  ' + a + ':00 вышел по течению реки из пункта A в пункт B, расположенный в '+
			s + ' км от A. Пробыв в пункте B ' + chislitlx(n, 'час') + ', ' +  the_activeFloatingVehicle.ie +
			' отправился назад и вернулся в пункт A в ' + b + ':00 того же дня. ' + the_orderToFind.toZagl() + ' собственную скорость ' + 
			the_activeFloatingVehicle.re +'(в км/ч), если известно, что скорость течения реки ' + k + ' км/ч. Ответ дайте в км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//VeronikaKit
//Решу ЕГЭ 523375
