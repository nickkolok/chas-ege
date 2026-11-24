(function() {
	'use strict';
	retryWhileError(function() {
		let t1 = sl(-100, -10);
		let t2 = sl(1, -t1 - 1);
		let c = sl(1, 10, 0.5);

		let v0 = -(t1 + t2) * c;
		genAssert(v0 <= 200, 'начальная скорость не должна превышать 200 км/ч');

		let S = -t1 * t2 * c;
		let a = 2 * c;
		let rand = sl1();

		let the_vehicleRacingOnRoad = sklonlxkand(getAdequateVehicles(v0).iz());
		let the_humanSettlementDestination = sklonlxkand(getAdequateDestinations(v0).iz());
		let the_orderToFind = decor.orderToFind.iz();
		let decorPreFormula = [
			`(в ${[`
			км `,`
			м `][rand]}) от ${the_vehicleRacingOnRoad.re} до ${the_humanSettlementDestination.re} вычисляется по формуле`,
			`от ${the_vehicleRacingOnRoad.re} до ${the_humanSettlementDestination.re}, измеряемое в ${['километрах', 'метрах'][rand]}, определяется выражением`
		].iz();
		let decorPostFormula = [`, прошедшее после выезда из ${the_humanSettlementDestination.re}`, ``].iz();
		let decorQuestion = [
			`время, прошедшее после выезда ${the_vehicleRacingOnRoad.re} из ${the_humanSettlementDestination.re}, если известно, что за это время он удалился от 
        ${the_humanSettlementDestination.re} на ${S} ${[`
			км `,`
			м `][rand]}`,
			`наибольшее время, в течение которого ${the_vehicleRacingOnRoad.ie} будет находиться в зоне функционирования сотовой связи, 
        если оператор гарантирует покрытие на расстоянии не далее чем в ${S} ${[`
			км `,`
			м `][rand]} от ${the_humanSettlementDestination.re}`
		].iz();

		NAtask.setTask({
			text: `${the_vehicleRacingOnRoad.ie.toZagl()}, движущийся по ${the_humanSettlementDestination.de} со скоростью $v_0 = ${v0} \\ \\mbox{${[`
			км `,`
			м `][rand]}}/\\mbox{${[`
			ч `,`
			с `][rand]}}$, выезжает из него и сразу 
        после выезда начинает разгоняться с постоянным ускорением $a = ${a} \\ \\mbox{${[`
			км `,`
			м `][rand]}}/\\mbox{${[`
			ч `,`
			с `][rand]}}^2$. Расстояние ${decorPreFormula} 
        $S = v_0 t + \\frac{a t^2}{2} $, где $t$ – время в ${[`
			часах `,`
			секундах `][rand]}${decorPostFormula}. ${the_orderToFind.toZagl()} ${decorQuestion}. Ответ дайте в ${[`
			минутах `,`
			секундах `][rand]}.`,
			answers: [t2 * 60, t2][rand],
			authors: ['mcFrene', 'Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/ );
	}, 2000);
})();
//mcFrene
/*РешуЕГЭ: 27964: 28135, 41565, 41569, 621769, 621899, 660974, 28137, 28139, 28141,
28143, 28145, 41527, 41529, 41531, 41533, 41535, 41537, 41539, 41541, 41543, 41545,
41547, 41549, 41551, 41553, 41555, 41557, 41559, 41561, 41563, 41567
*/
