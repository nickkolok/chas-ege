(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_humanSettlementDestination = sklonlxkand(decor.humanSettlementDestination.iz());
		let pass = om.rusbukv.iz(2);

		let vehicleKeys = Object.keys(om.adequateSpeed.vehicle);
		let drive = vehicleKeys.iz();
		let speedInterval = om.adequateSpeed.vehicle[drive];
		let speed1 = sl(speedInterval[0], speedInterval[1], 1);
		let speed2 = slKrome([speed1], speedInterval[0], speedInterval[1], 1);
		let driver = sklonlxkand(drive);

		let time = sl(2, 12) / 6;
		let distancePart = speed2 * time;

		genAssertZ1000(distancePart, 'длина дороги имеет меньше трёх знаков после запятой');

		let resultTime = (distancePart / speed1) - time;

		genAssert(resultTime > 0, "Первый должен был выехать раньше");

		let resultMinutes = resultTime * 60;

		genAssert(resultMinutes.isAlmostInteger(), "Разница должна быть целым числом минут");
		genAssert(resultMinutes < 30, "Минут должно быть не больше 30");

		NAtask.setTask({
			text: 'Расстояние между ' + the_humanSettlementDestination.tm + ' ' + pass[0] + ' и ' + pass[1] + ' равно $' + distancePart * 2 + '$ км. ' +
				'Из ' + the_humanSettlementDestination.re + ' ' + pass[0] + ' в ' + the_humanSettlementDestination.ie + ' ' + pass[1] +
				' выехал' + ['', 'а'][driver.rod] + ' перв' + ['ый', 'ая'][driver.rod] + ' ' + driver.ie + ' со скоростью $' + speed1 + '$ км/ч, ' +
				'а через несколько минут после этого из ' + the_humanSettlementDestination.re + ' ' + pass[0] + ' в ' + the_humanSettlementDestination.ie + ' ' + pass[1] +
				' навстречу перв' + ['ому', 'ой'][driver.rod] + ' ' + driver.de + ' выехал' + ['', 'а'][driver.rod] + ' втор' + ['ой', 'ая'][driver.rod] +
				' ' + driver.ie + ' со скоростью $' + speed2 + '$ км/ч. В момент встречи оказалось, ' +
				'что они проехали равные расстояния. ' +
				'Через сколько минут после выезда перв' + ['ого', 'ой'][driver.rod] + ' ' + driver.re + ' выехал' +
				['', 'а'][driver.rod] + ' втор' + ['ой', 'ая'][driver.rod] + '?',
			answers: resultMinutes,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();

//4032141
//Открытый банк заданий 3D868D
//zer00player

