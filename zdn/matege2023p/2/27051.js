(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let radius = sl(3, 12, 3);
			let height = sl(3, 12, 3);
			let rand1 = sl1();
			let rand2 = sl1();
			let nameFigura = ['объём', (radius.pow(2) * height).pow(2), ((radius.pow(2) * height) / 3).pow(2), ', делённый на $\\pi$'];

			let paint1 = function(ct) {
				ct.scale = (60, 60);
				radius = 180;
				height = 300;
				ct.translate(200, 200);

				ct.lineWidth = 2;
				//цилиндр
				ct.beginPath();
				ct.ellipse(0, -height / 2, radius, 40, 0, 0, 2 * Math.PI);
				ct.stroke();

				ct.beginPath();
				ct.ellipse(0, height / 2, radius, 40, 0, 0, Math.PI);
				ct.stroke();

				ct.beginPath();
				ct.setLineDash([4, 5]);
				ct.ellipse(0, height / 2, radius, 40, 0, Math.PI, 2 * Math.PI);
				ct.stroke();

				ct.setLineDash([0, 0]);
				ct.drawLine(-radius, height / 2, -radius, -height / 2);
				ct.drawLine(radius, height / 2, radius, -height / 2);

				//конус
				ct.setLineDash([4, 5]);
				ct.drawLine(-radius, height / 2, 0, -height / 2);
				ct.drawLine(radius, height / 2, 0, -height / 2);

				ct.setLineDash([4, 5]);
				ct.drawLine(0, height / 2, 0, -height / 2);
				ct.drawLine(0, height / 2, radius, height / 2);



			};
			NAtask.setTask({
				text: 'Цилиндр и конус имеют общие основание и высоту. ' +
					nameFigura[0].toZagl() + ' ' + ['цилиндра', 'конуса'][rand1] + ' ' + 'равен' +
					' $' + nameFigura[1 + rand1].texsqrt(1) + '$. Найдите ' + nameFigura[0] + ' ' + ['цилиндра', 'конуса'][1 -
						rand1
					] + '.',
				answers: nameFigura[2 - rand1].sqrt(),
			});
			NAtask.modifiers.multiplyAnswerBySqrt(3);
			chas2.task.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
// 27051 4989 5019 514020 514039 526247 642312 4991 4993 4995 4997 4999 5001 5003 5005 5007 5009 5011 5013 5015 5017  27064 5059 72967 72969 72971 72973 72975 72977 72979 72981 72983 72985 72987 72989 72991 72993 72995 72997 72999 73001 73003 73005 73007 73009 73011
