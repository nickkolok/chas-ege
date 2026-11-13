(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '27118';
		let preference1 = ['wider', 'narrower'];
		let preference2 = ['taller', 'lower'];

		let ratioHeight = sl(2, 10, 0.5);
		let ratioRadius = slKrome(ratioHeight, 2, 10, 0.5);

		let narrower = getSelectedPreferenceFromList(key + '_width', preference1);
		let lower = getSelectedPreferenceFromList(key + '_height', preference2);

		let widthWord = ['шире', 'уже'][narrower];
		let heightWord = ['выше', 'ниже'][lower];

		let widerHigher = [
			[ratioRadius, widthWord],
			[ratioHeight, heightWord],
		];
		let firstSecond = ['второй', 'первой'];

		let variant = sl1();
		if (variant) {
			widerHigher = widerHigher.reverse();
		}

		let r2 = ratioRadius.pow(2);
		let v1_over_v2;

		if (!variant) {
			if (!narrower && !lower) {
				v1_over_v2 = r2 / ratioHeight;
			} else if (!narrower && lower) {
				v1_over_v2 = r2 * ratioHeight;
			} else if (narrower && !lower) {
				v1_over_v2 = 1 / r2 / ratioHeight;
			} else {
				v1_over_v2 = ratioHeight / r2;
			}
		} else {
			if (!narrower && !lower) {
				v1_over_v2 = ratioHeight / r2;
			} else if (!narrower && lower) {
				v1_over_v2 = 1 / r2 / ratioHeight;
			} else if (narrower && !lower) {
				v1_over_v2 = r2 * ratioHeight;
			} else {
				v1_over_v2 = r2 / ratioHeight;
			}
		}

		let answ = [1 / v1_over_v2, v1_over_v2];

		if (variant) {
			answ = answ.reverse();
		}

		if (sl1()) {
			firstSecond = firstSecond.reverse();
			answ = answ.reverse();
		}

		answ = answ[0];
		genAssertZ1000(answ, 'Ответ слишком нецелый');

		let firstIsWider = (variant === narrower);
		let firstIsTaller = (variant !== lower);

		let paint1 = function(ctx) {
			ctx.translate(10, 40);
			ctx.lineWidth = 2;
			let heightConst = 180;

			let firstA = firstIsWider ? 80 : 60;
			let firstHeight = firstIsTaller ? heightConst : heightConst / 2;
			let secondA = firstIsWider ? 70 : 100;
			let secondHeight = firstIsTaller ? heightConst / 2 : heightConst;

			let b = 20;

			//кружка первая
			ctx.translate(0, firstIsTaller ? 0 : heightConst / 2);
			//высота
			ctx.drawLine(100 - firstA, firstHeight, 100 - firstA, 10);
			ctx.drawLine(100 + firstA, firstHeight, 100 + firstA, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, firstA, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(100, firstHeight, b, firstA, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, firstHeight, b, firstA, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//ручка
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(100 + firstA, firstHeight / 2, (firstHeight - firstA) / 2, b, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.ellipse(100 + firstA, firstHeight / 2, (firstHeight - firstA) / 2 + 10, b + 10, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			ctx.translate(250, firstIsTaller ? heightConst / 2 : -heightConst / 2);
			ctx.setLineDash([0, 0]);

			//кружка вторая
			//высота
			ctx.drawLine(100 - secondA, secondHeight, 100 - secondA, 10);
			ctx.drawLine(100 + secondA, secondHeight, 100 + secondA, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, secondA, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(100, secondHeight, b, secondA, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, secondHeight, b, secondA, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//ручка
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(100 + secondA, secondHeight / 2, (secondHeight - 2 * b) / 2, b, Math.PI / 2, Math.PI, 2 * Math.PI);
			ctx.ellipse(100 + secondA, secondHeight / 2, (secondHeight - 2 * b) / 2 + 10, b + 10, Math.PI / 2, Math.PI, 2 * Math.PI);
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
			preference: [preference1, preference2],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 250,
			paint: paint1,
		});
	}, 1000);
})();
//27118
