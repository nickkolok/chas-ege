(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let a = sl(10, 17);
			let b = sl(5, 14);
			let c = sl(5, 10);
			let d = sl(10, 16);
			let k = slKrome(d, 5, 16);
			let f = a + c;
			
			let rand = sl1();
			let s = [2 * (f * k + (d + b) * f + (d + b) * k) - 2 * ((f - c) * b), k * (f * d + c * b)][rand];

			let paint1 = function(ctx) {

				a *= 13;
				b *= 10;
				c *= 10;
				d *= 10;
				ctx.translate(200, 200);
				ctx.translate(-95, 0);

				ctx.lineWidth = 2;
				for (let i = 0; i < 2; i++) {
					if (i)
						ctx.translate(30, -b*0.2);
					ctx.moveTo(-c, -b);
					ctx.lineTo(c, -b);
					ctx.lineTo(c, 0);
					ctx.lineTo(a, 0);
					ctx.lineTo(a, d);
					ctx.stroke();
					if (i)
						ctx.setLineDash([4, 3]);
					ctx.lineTo(-c, d);
					ctx.lineTo(-c, -b);
					ctx.stroke();
				}
				ctx.setLineDash([0, 0]);

				ctx.translate(-30, b*0.2);

				ctx.drawLine(-c, -b, -c + 30, -b - b*0.2);
				ctx.drawLine(c, -b, c + 30, -b - b*0.2);
				ctx.drawLine(c, 0, c + 30, -b*0.2);
				ctx.drawLine(a, 0, a + 30, -b*0.2);
				ctx.drawLine(a, d, a + 30, d - b*0.2);

				ctx.setLineDash([4, 3]);
				ctx.drawLine(-c, d, -c + 30, d - b*0.2);

				//цифорки
				ctx.font = "20px serif";
				ctx.fillText((b / 10).toString(), c + 30 + 3, -b / 2, 18); //b
				ctx.fillText((c / 10).toString(), 30, -b - b*0.2 - 5, 18); //c
				ctx.fillText((d / 10).toString(), a + 30 + 5, d / 2, 18); //d
				ctx.fillText(k.toString(), a + 10, d * 1.05, 18); //k
				ctx.fillText(f.toString(), 0, d + 30+10, 18); //f


			};
			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: s,
			});
			chas2.task.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
// 27187 25531 25539 639857 639908 25533 25535 25537 27188 25551 25559 25553 25555 25557
