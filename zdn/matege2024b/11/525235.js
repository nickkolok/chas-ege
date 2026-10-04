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
		
		// Используем класс Cylinder из lib/figure.js
		let radius = Math.sqrt(square / Math.PI);
		let cylinder = new Cylinder({ radius: radius, height: height });
		let volume = Math.round(cylinder.volume / 1000);

		let paint = function (ct) {
			let r = Math.min(220 / cylinder.height, 110 / cylinder.radius) * cylinder.radius;
			let H = Math.min(220 / cylinder.height, 110 / cylinder.radius) * cylinder.height;
			let ry = 0.3 * r;
			ct.translate(150, 170);
			ct.lineWidth = 2;
			// Верхнее основание (целиком видимо)
			ct.drawEllipse(0, -H / 2, r, ry);
			// Боковые стороны
			ct.drawLine(-r, -H / 2, -r, H / 2);
			ct.drawLine(r, -H / 2, r, H / 2);
			// Нижнее основание (видимая часть - верхняя дуга)
			ct.drawEllipse(0, H / 2, r, ry, 0, 0, Math.PI);
			// Нижнее основание (невидимая часть - нижняя дуга, пунктир)
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
