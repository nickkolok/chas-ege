(function() {
	retryWhileError(function() {
		'use strict';

		let func = ['sin', 'cos', 'tg', 'ctg'].iz();
		let baseAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
		let sluchBaseAnglesIndex;
		let angle, signAngle = 0,
			trigValue, isDefined;

		let coef = sl(2, 99).pm();
		let squareRoot = 1;
		let squareRootText = '';

		do {
			sluchBaseAnglesIndex = sl(0, baseAngles.length - 1);
			angle = baseAngles[sluchBaseAnglesIndex];
			if (sl1()) {
				angle = -angle;
				signAngle = 1;
			}

			let angleRad = angle * Math.PI / 180;
			isDefined = true;

			if (func === 'sin') {
				trigValue = Math.sin(angleRad);
				for (let i = 0; i < 4; i++) {
					if (sluchBaseAnglesIndex == 2 + 4 * i) {
						squareRoot = Math.sqrt(2);
						squareRootText = '\\sqrt{2}';
					}
				}
				if (sluchBaseAnglesIndex == 3 || sluchBaseAnglesIndex == 5 || sluchBaseAnglesIndex == 11 || sluchBaseAnglesIndex ==
					13) {
					squareRoot = Math.sqrt(3);
					squareRootText = '\\sqrt{3}';
				}
			} else if (func === 'cos') {
				trigValue = Math.cos(angleRad);
				for (let i = 0; i < 4; i++) {
					if (sluchBaseAnglesIndex == 2 + 4 * i) {
						squareRoot = Math.sqrt(2);
						squareRootText = '\\sqrt{2}';
					}
				}
				if (sluchBaseAnglesIndex == 1 || sluchBaseAnglesIndex == 7 || sluchBaseAnglesIndex == 9 || sluchBaseAnglesIndex ==
					15) {
					squareRoot = Math.sqrt(3);
					squareRootText = '\\sqrt{3}';
				}
			} else if (func === 'tg') {

				if (Math.abs(Math.cos(angleRad)) < 1e-10) {
					isDefined = false;
				} else {
					trigValue = Math.tan(angleRad);
					for (let i = 0; i < 8; i++) {
						if (sluchBaseAnglesIndex == 1 + 2 * i) {
							squareRoot = Math.sqrt(3);
							squareRootText = '\\sqrt{3}';
						}
					}
				}
			} else if (func === 'ctg') {

				if (Math.abs(Math.sin(angleRad)) < 1e-10) {
					isDefined = false;
				} else {
					trigValue = 1 / Math.tan(angleRad); // ctg = 1/tg
					for (let i = 0; i < 8; i++) {
						if (sluchBaseAnglesIndex == 1 + 2 * i) {
							squareRoot = Math.sqrt(3);
							squareRootText = '\\sqrt{3}';
						}
					}
				}
			}

		} while (!isDefined || isNaN(trigValue));

		let answer = coef * squareRoot * trigValue;
		angle = angle + sl(0, 2) * 360;
		let exprStr = coef + squareRootText + '\\' + func + [angle + '°', '(' + angle + '°)'][signAngle];

		NAtask.setTask({
			text: '$$' + exprStr + '$$',
			answers: answer.ts().toString(),
			authors: ['Алендарь Сергей'],
		});

	}, 10000);
})();
//26762
