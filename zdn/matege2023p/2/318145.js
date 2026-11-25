(function() {
	retryWhileError(function() {
		let denominator = sl(3, 10);
		let numerator = sl(1, denominator - 1);

		let n3 = numerator.pow(3);
		let volumeDown = sl(n3, 10 * n3, n3);
		let volumeUp = volumeDown * denominator.pow(3) / n3;

		let question = [
			['нужно долить, чтобы наполнить сосуд доверху', volumeUp - volumeDown],
			['вмещает такой сосуд', volumeUp]
		].iz();

		let paint1 = function(ctx) {
			let apexX = 150, apexY = 150, baseY = 20, baseRX = 90, baseRY = 20;
			let coneHeight = apexY - baseY;
			ctx.translate(0, 20);
			ctx.lineWidth = 2;
			//образующие
			ctx.drawLine(apexX - baseRX, baseY, apexX, apexY);
			ctx.drawLine(apexX + baseRX, baseY, apexX, apexY);
			//эллипс
			ctx.drawEllipse(apexX, baseY, baseRX, baseRY);

			let frac = numerator / denominator;
			let yLiq = apexY - coneHeight * frac;
			let rxLiq = baseRX * frac;
			let ryLiq = baseRY * frac;

			let liquidColor = "#61DC9A";
			ctx.drawSection([
				[apexX - rxLiq, yLiq],
				[apexX + rxLiq, yLiq],
				[apexX, apexY],
			], liquidColor);
			ctx.fillStyle = liquidColor;

			ctx.beginPath();
			ctx.ellipse(apexX, yLiq, rxLiq, ryLiq, 0, 0, 2 * Math.PI);
			ctx.fill();

			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(apexX, yLiq, rxLiq, ryLiq, 0, Math.PI, 2 * Math.PI);
			ctx.setLineDash([]);
			ctx.drawEllipse(apexX, yLiq, rxLiq, ryLiq, 0, 0, Math.PI);

		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'В сосуде, имеющем форму конуса, уровень жидкости достигает ' +
				'$' + numerator.texfrac(denominator) + '$ высоты. Объём жидкости равен ' + volumeDown + ' мл. ' +
				'Сколько миллилитров жидкости ' + question[0] + '?',
			answers: question[1],
			authors: ['Суматохина Александра'],
			analys: '',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 15000);
})();
//318145 505380 505401 506376 506516 506721 509698 514746 514790 520561 520581 520601 520621 318147 318149 318151 318153 318155 318157 318159 318161 318163 318165 318167 318169 318171 318173 318175 318177 318179 318181 318183 318185 318187 318189 318191 318193 318195 318197 318199 318201 318203 318205 318207 318209 318211 318213 318215 318217 318219 318221 318223 318225 318227 318229 318231 318233 318235 318237 318239 318241 318243 318245 318247 318249 318251 318253 318255 318257 318259 318261 318263 318265 318267 318269 318271 318273

