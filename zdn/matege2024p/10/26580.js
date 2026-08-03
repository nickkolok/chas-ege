(function() { 'use strict'; retryWhileError(function() {
	/* Из пункта А в пункт В, расстояние между которыми 50 км, одновременно выехали автомобилист и велосипедист. За час автомобилист проезжает на 30 км больше, чем велосипедист. Определите скорость велосипедиста, если известно, что он прибыл в пункт В на 1 час 30 минут позже автомобилиста. Ответ дайте в км/ч. */

	let n=[0, 0, sl(1, 10)].iz();
	let k=[0, sl(1, 59)].iz();
	genAssert(n || k, 'Время в пути должно быть ненулевым'); //Заготовочка!

	let a=sl(1, 30, 1);
	let x=sl(1, 50, 1);
	let S=((60*n+k)*x**2+(60*a*n+a*k)*x)/(60*a);
	// Уравнение относительно x, которое должен решить ученик, вообще-то получается квадратным,
	// но второй корень всегда отрицателен.

	genAssert(S > 10, 'Расстояние должно быть не очень маленьким');
	genAssert(S.isAlmostInteger(), 'Расстояние должно быть целым');

	let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz()); // ["пункт","город","село","деревня"]
	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
	let the_vehicleRacingOnRoad = sklonlxkand([
		["автомобиль","грузовик","автомобилист"].iz(),["мотоцикл","мотоциклист"].iz(),["велосипед","велосипедист"].iz(),"электросамокат","гироскутер",
	].iz(2)); // ["автомобиль","мотоцикл","велосипед","электросамокат","гироскутер","мотоциклист","велосипедист","машина","гонщик","грузовик","автомобилист"]

	NAtask.setTask({
		text:
			'Из ' + the_humanSettlementDestination.re + ' A в ' + the_humanSettlementDestination.ve + ' B, ' +
			'расстояние между которыми ' + S + ' км, ' +
			'одновременно выехали ' + the_vehicleRacingOnRoad[0].ie + ' и ' + the_vehicleRacingOnRoad[1].ie + '. ' +
			'За час ' + the_vehicleRacingOnRoad[0].ie +' проезжает на ' + a + ' км больше, '+
			'чем ' + the_vehicleRacingOnRoad[1].ie + '. ',
		questions: [
			{
				text:  the_orderToFind.toZagl() +' скорость ' + the_vehicleRacingOnRoad[1].re + ', если известно, что он прибыл в ' +
					the_humanSettlementDestination.ve +' B на ' + (n*60 + k).toChMin() + ' позже ' + the_vehicleRacingOnRoad[0].re +'. ',
				answers: x,
			},
			{
				text:  the_orderToFind.toZagl() +' скорость ' + the_vehicleRacingOnRoad[0].re + ', если известно, что он прибыл в ' +
					the_humanSettlementDestination.ve +' B на ' + (n*60 + k).toChMin() + ' раньше ' + the_vehicleRacingOnRoad[1].re +'. ',
				answers: x + a,
			},
		],
		postquestion: ' Ответ дайте в км/ч.',
		authors: ['Николай Авдеев'],
	});
	NAtask.modifiers.allDecimalsToStandard();
	NAtask.modifiers.variativeABC();
}, 2000);})();
// РешуЕГЭ:
// 26580: 5955 39175 522120 522146 525450 561173 561225 5957 5959 5961 5963 5965 39101 39103 39105 39107 39109 39111 39113 39115 39117 39119 39121 39123 39125 39127 39129 39131 39133 39135 39137 39139 39141 39143 39145 39147 39149 39151 39153 39155 39157 39159 39161 39163 39165 39167 39169 39171 39173
