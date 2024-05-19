(function() {

	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let radiusRatio = sl(2, 50, 0.1);
		let heightRatio = sl(2, 50, 0.1);

		let cyl1 = new Cylinder({
			radius: sl(1, 50),
			height: sl(1, 50) / Math.PI
		});
		let cyl2 = new Cylinder({
			radius: cyl1.radius * radiusRatio,
			height: cyl1.height / heightRatio
		});

		let variant = 1;

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

		};

		NAtask.setTask({
			text: 'Дано два цилиндра. Объём первого цилиндра равен $' + cyl1.volume + '$. ' +
				'У второго цилиндра высота в $' + heightRatio + '$ раза меньше, а радиус основания ' +
				'в $' + radiusRatio + '$ раза больше, чем у первого. Найдите объём второго цилиндра.',
			answers: cyl2.volume,
			authors: ['Суматохина Александра'],
		});
		//NAtask.modifiers.multiplyAnswerBySqrt(12);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
//3243
//https://self-edu.ru/ege2021_36.php?id=9_8
