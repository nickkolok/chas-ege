(function() { 'use strict'; retryWhileError(function() {
	/* Велосипедист выехал с постоянной скоростью из города А в город В, расстояние между которыми равно 156 км. На следующий день он отправился обратно со скоростью на 1 км/ч больше прежней. По дороге он сделал остановку на 1 час. В результате он затратил на обратный путь столько же времени, сколько на путь из А в В. Найдите скорость велосипедиста на пути из А в В. Ответ дайте в км/ч. */

	let x=sl(10, 70, 0.01);
	let a=sl(1, 10, 0.01);
	let S=sl(5, 300, 0.01);
	let n=S/x-S/(x+a);
	genAssertZ1000(n,'Время слишком дробное');

	let the_vehicleRacingOnRoad = sklonlxkand(["автомобиль","мотоцикл","велосипед","электросамокат","гироскутер","мотоциклист","велосипедист","гонщик","грузовик","автомобилист"].iz());
	let the_humanSettlementDestination = sklonlxkand(["пункт","город","село","деревня","посёлок","п."].iz());
	let the_afterAWhile = decor.afterAWhile.iz();
	let the_orderToFind = decor.orderToFind.iz();

	NAtask.setTask({
		text:
			'' + the_vehicleRacingOnRoad.ie.toZagl() +' '+['выехал','отправился','начал движение'].iz()+' с постоянной скоростью из ' + the_humanSettlementDestination.re +' A в ' +
			the_humanSettlementDestination.ve +' B, расстояние между которыми '+['равно ' + S + ' км','(в км) равно '+ S].iz()+'. ' + the_afterAWhile.toZagl() +
			' он отправился обратно со скоростью на ' + a + ' км/ч '+['больше','быстрее'].iz()+[' прежней',', чем туда'].iz()+'. '+
			'По '+['дороге','пути'].iz()+' он '+['сделал остановку','остановился'].iz()+['',' у магазина',' в кафе'].iz()+' на ' + [chislitlx(n, 'час'),(n*60).toChMin()].iz() +
			'. В результате он затратил на '+['обратный путь','путь назад','путь обратно'].iz()+' столько же времени, '+
			'сколько на путь '+['из A в B','туда'].iz()+'. ',
		questions: [
			{
				text: the_orderToFind.toZagl() +' скорость ' + the_vehicleRacingOnRoad.re +' на пути '+['из A в B','туда'].iz()+'.',
				answers: x,
			},
			{
				text: the_orderToFind.toZagl() +' скорость ' + the_vehicleRacingOnRoad.re +[' на пути '+['из B в A','обратно','назад'].iz(),' обратном пути'].iz()+'.',
				answers: x + a,
			},
		],
		postquestion: ' Ответ дайте в км/ч.',
		authors: ['Aisse-258'],
	});
	NAtask.modifiers.allDecimalsToStandard();
	NAtask.modifiers.assertSaneDecimals();
	NAtask.modifiers.variativeABC();
}, 200000);})();
/*РешуЕГЭ:26581: 5639 39193 39213 503316 526213 5641 5643 5645 5647 5649 5651
	5653 5655 5657 39177 39179 39181 39183 39185 39187 39189 39191 39195 39197 39199
	39201 39203 39205 39207 39209 39211 26582: 5625 39257 563893 5627 5629 5631
	5633 5635 5637 39215 39217 39219 39221 39223 39225 39227 39229 39231 39233
	39235 39237 39239 39241 39243 39245 39247 39249 39251 39253 39255*/
