(function() {

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let ratioHeight = sl(2, 10, 0.5);
		let ratioRadius = slKrome(ratioHeight, 2, 10, 0.5);

		let widerHigher = [
			[ratioRadius, 'шире'],
			[ratioHeight, 'выше']
		];
		let firstSecond = ['второй', 'первой'];
		let answ = [ratioHeight / ratioRadius.pow(2), ratioRadius.pow(2) / ratioHeight];

		let variant = sl1();
		if (variant) {
			widerHigher = widerHigher.reverse();
			answ = answ.reverse();
		}

		if (sl1()) {
			firstSecond = firstSecond.reverse();
			answ = answ.reverse();
		}

		answ = answ[0];
		genAssertZ1000(answ, 'Ответ слишком нецелый');

		let paint1 = function(ctx) {
			ctx.translate(10, 40);
			ctx.lineWidth = 2;
			let heightConst = 180;
			ctx.translate(0, 50);
			variant = 1 - variant;
			ctx.strokeStyle = "#809DF2";

			let height = [heightConst, heightConst / 2][variant];
			
			let a = [60, 80][variant];
			let b = 20;

			//кружка первая
			ctx.translate(0, [0, heightConst / 2][variant]);
			//высота
			ctx.drawLine(100 - a, height, 100 - a, 10);
			ctx.drawLine(100 + a, height, 100 + a, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(100, height, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//ручка
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(100 + a, height / 2, (height - a) / 2, b, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.ellipse(100 + a, height / 2, (height - a) / 2 + 10, b + 10, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			ctx.translate(250, [heightConst / 2, -heightConst / 2][variant]);
			ctx.setLineDash([0, 0]);

			a = [70, 100][1 - variant];
			height = [heightConst, heightConst / 2][1 - variant];

			//кружка вторая
			//высота
			ctx.drawLine(100 - a, height, 100 - a, 10);
			ctx.drawLine(100 + a, height, 100 + a, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//ручка
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(100 + a, height / 2, (height - 2 * b) / 2, b, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.ellipse(100 + a, height / 2, (height - 2 * b) / 2 + 10, b + 10, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

		};

		NAtask.setTask({
			text: ' Первая цилиндрическая кружка в ' + chislitlx(widerHigher[0][0], 'раз') +
				' ' + widerHigher[0][1] + ' второй, а вторая в ' + chislitlx(widerHigher[1][0], 'раз') +
				' ' + widerHigher[1][1] + ' первой. Найдите отношение объёма ' +
				'' + firstSecond[0] + ' кружки к объёму ' + firstSecond[1] + '.',
			answers: answ,
			authors: ['Суматохина Александра'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27118
