(function() { 'use strict'; retryWhileError(function() {
        let n=sl(1, 3, 1);
        let s=sl(10, 400, 1);
        let a=sl(5,50,1);
        let x=sl(1, 30, 1);
        let k=n+s/(a-x)+s/(a+x);
        genAssert(Number.isInteger(k),'Время не должно быть дробным');
        genAssert(k>n,'Общее затраченное время больше стоянки');
        genAssert(k<20,'Время стоянки не должно быть слишком большим');
        let the_activeFloatingVehicle = sklonlxkand(decor.activeFloatingVehicle.iz());
        let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz()); // ["пункт","город","село","деревня"]
        let the_orderToFind = decor.orderToFind.iz(); 

        NAtask.setTask({
		text:
			'' + the_activeFloatingVehicle.ie.toZagl() +' проходит по течению реки до ' + the_humanSettlementDestination.re +' назначения ' + s + 
			' км и после стоянки возвращается в ' + the_humanSettlementDestination.ie +' отправления. ' + 
			the_orderToFind.toZagl() +' скорость течения, если скорость ' + the_activeFloatingVehicle.re +' в неподвижной воде равна '+ a +
		    ' км/ч, стоянка длится ' + chislitlx(n, 'час') + ', ' + 'а в ' + the_humanSettlementDestination.ie +' отправления ' +
		    the_activeFloatingVehicle.ie +' возвращается через ' + chislitlx(k, 'час') + '. '+
			'Ответ дайте в км/ч.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//VeronikaKit
//Решу ЕГЭ 26588
