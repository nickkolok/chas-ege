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

				a *= 10;
				b *= 10;
				c *= 10;
				d *= 10;
				ctx.translate(200, 200);
				ctx.translate(-20, 20);

				ctx.lineWidth = 2;
				ctx.strokeStyle = "#809DF2";
				for (let i = 0; i < 2; i++) {
					if (i)
						ctx.translate(20, -b * 0.3);
					ctx.moveTo(-c, -b);
					ctx.lineTo(c, -b);
					ctx.lineTo(c, 0);
					ctx.lineTo(a, 0);
					ctx.lineTo(a, d);
					ctx.stroke();
					if (i)
						ctx.setLineDash([4, 3]);
					ctx.lineTo(-a, d);
					ctx.lineTo(-a, 0);
					ctx.lineTo(-c, 0);
					ctx.lineTo(-c, -b);
					ctx.stroke();

				}
				ctx.setLineDash([0, 0]);
				ctx.drawLine(-a, 0, -c - 20, 0);

				ctx.translate(-20, b * 0.3);

				ctx.drawLine(-c, -b, -c + 20, -b - b * 0.3);
				ctx.drawLine(c, -b, c + 20, -b - b * 0.3);
				ctx.drawLine(c, 0, c + 20, -b * 0.3);
				ctx.drawLine(a, 0, a + 20, -b * 0.3);
				ctx.drawLine(a, d, a + 20, d - b * 0.3);
				ctx.drawLine(-a, 0, -a + 20, 0 - b * 0.3);

				ctx.setLineDash([4, 3]);
				ctx.drawLine(-a, d, -a + 20, d - b * 0.3);
				ctx.drawLine(-c, 0, -c + 20, -b * 0.3);

				//цифорки
				ctx.font = "20px serif";
				ctx.fillText((b / 10).toString(), c + 20 + 3, -b / 2, 18); //b
				ctx.fillText((c / 10).toString(), 20, -b - b * 0.3 - 5, 18); //c
				ctx.fillText((d / 10).toString(), a + 20 + 5, d / 2, 18); //d
				ctx.fillText(k.toString(), a + 10, d * 1.05, 18); //k
				ctx.fillText(f.toString(), 0, d + 20, 18); //f


			};
			NAtask.setTask({
				text: 'Найдите ' + ['площадь поверхности', 'объём'][rand] +
					' многогранника, изображённого на рисунке (все двугранные углы – прямые).',
				answers: s,
			});
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27193 25671 25673 25675 25677 25679
