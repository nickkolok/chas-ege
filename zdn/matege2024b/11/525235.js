(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let object = [
			['бака', 'его', 'этого бака'],
			['цистерны', 'её', 'этой цистерны'],
			['резервуара', 'его', 'этого резервуара'],
			['сосуда', 'его', 'этого сосуда'],
		].iz();

		let b = sl(1, 3);
		let a = sl([1, 1, 3, 5][b], 6);
		let height = 20 * b;
		let square = 50 * a;
		let volume = a * b;

		let paint = function (ct) {
			let R = Math.sqrt(square / Math.PI);
			let k = Math.min(220 / height, 110 / R);
			let r = R * k;
			let H = height * k;
			let ry = 0.3 * r;
			ct.translate(150, 170);
			ct.lineWidth = 2;
			ct.drawEllipse(0, -H / 2, r, ry);
			ct.drawLine(-r, -H / 2, -r, H / 2);
			ct.drawLine(r, -H / 2, r, H / 2);
			ct.drawEllipse(0, H / 2, r, ry, 0, 0, Math.PI);
			ct.setLineDash([6, 4]);
			ct.drawEllipse(0, H / 2, r, ry, 0, Math.PI, 2 * Math.PI);
			ct.setLineDash([]);
		};

		NAtask.setTask({
			text: 'Высота ' + object[0] + ' цилиндрической формы равна $' + height + '$ см, ' +
				'а площадь ' + object[1] + ' основания равна $' + square + '$ квадратным сантиметрам. ' +
				'Чему равен объём ' + object[2] + ' (в литрах)? В одном литре 1000 кубических сантиметров.',
			analys: 'Объём цилиндра равен произведению площади основания на высоту: ' +
				'$V = ' + square + ' \\cdot ' + height + ' = ' + (square * height) + '$ кубических сантиметров. ' +
				'В литрах: $' + (square * height) + ' : 1000 = ' + volume + '$ л.',
			answers: volume,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 340,
			paint: paint,
		});
	}, 1000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=525235
