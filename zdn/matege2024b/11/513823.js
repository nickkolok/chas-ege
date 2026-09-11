(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '513823';
		let preference = ['withoutABCD', 'withABCD'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let length = sl(1, 10);
		let width = sl(1, 10);
		let height = 6 * sl(1, 5);
		let volume = length * width * (height / 6);

		let paint1 = function (ct) {
			ct.translate(180, 220);
			ct.scale(40, 40);
			ct.lineWidth = 3 / 40;
			
			let x1 = 3.5, y1 = 0;
			let x2 = -2, y2 = 2.5;
			let x3 = 0, y3 = -3.5;
			
			ct.beginPath();
			ct.moveTo(0, 0);
			ct.lineTo(x1, y1);
			ct.moveTo(0, 0);
			ct.lineTo(x2, y2);
			ct.moveTo(0, 0);
			ct.lineTo(x3, y3);
			
			ct.moveTo(x1, y1);
			ct.lineTo(x2, y2);
			ct.moveTo(x2, y2);
			ct.lineTo(x3, y3);
			ct.moveTo(x3, y3);
			ct.lineTo(x1, y1);
			
			ct.strokeStyle = om.secondaryBrandColors;
			ct.stroke();
			
			ct.beginPath();
			ct.moveTo(0.6, 0);
			ct.lineTo(0.6, -0.6);
			ct.lineTo(0, -0.6);
			ct.stroke();
		};

		NAtask.setTask({
			text: 'В треугольной пирамиде ' + ['три', '$ABCD$'][rand] + ' ребра ' + ['', '$AB$, $AC$ и $AD$'][rand] + ' взаимно перпендикулярны' +
			[', а их длины равны $' + length + '$, $' + width + '$ и $' + height + '$', ''][rand] + '. Найдите объём этой пирамиды'+['.', ', если $AB=' + length + '$, $AC=' + width + '$ и $AD=' + width + '$.'][rand],
			answers: volume,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=513823
