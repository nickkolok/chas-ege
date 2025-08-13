(function () {
	'use strict'; retryWhileError(function () {
		let s = sl(20, 300);
		let n = sl(1, 5);
		let x = sl(1, 15);
		let v = sl(x + 1, 40);
		let a = sl(1, 12);
		let b = a + n + s / (v + x) + s / (v - x);
		genAssert(b.isAlmostInteger(), 'Время не может быть дробным');
		genAssert(b < 24, 'Время отправления не может быть слишком большим');
		let the_activeFloatingVehicle = sklonlxkand(decor.activeFloatingVehicleF.iz());
		let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz());
		let the_orderToFind = decor.orderToFind.iz();
		NAtask.setTask({
			text:
				'' + the_activeFloatingVehicle.ie.toZagl() + ' в ' + a + ':00 вышла из ' + the_humanSettlementDestination.re +
				' A в ' + the_humanSettlementDestination.ie + ' B, расположенн'+['ый', 'ая', 'ое'][the_humanSettlementDestination.rod]+' в ' + s +
				' км от A. Пробыв в ' + the_humanSettlementDestination.pe + ' B ' + chislitlx(n, 'час') + ', ' +
				the_activeFloatingVehicle.ie + ' отправилась назад и вернулась в ' + the_humanSettlementDestination.ie +
				' А в ' + b + ':00 того же дня. ' + the_orderToFind.toZagl() +
				' (в км/ч) скорость течения реки, если известно, ' +
				'что собственная скорость ' + the_activeFloatingVehicle.re + ' равна ' + v + ' км/ч.',
			answers: x,
			authors: ['VeronikaKit'],
		});
		NAtask.modifiers.allDecimalsToStandard(/*true*/);
		NAtask.modifiers.variativeABC();
	}, 20000);
})();
//VeronikaKit
//Решу ЕГЭ 5997
