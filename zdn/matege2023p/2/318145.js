(function() {
	retryWhileError(function() {
		let denominator = sl(3, 10);
		let numerator = sl(1, denominator - 1);

		let volumeDown = sl(1, 10) * numerator.pow(3);
		let volumeUp = volumeDown * denominator.pow(3) / numerator.pow(3);

		let question=[['нужно долить, чтобы наполнить сосуд доверху',volumeUp-volumeDown], ['поместится в сосуде',volumeUp]].iz();
		
		let paint1 = function(ctx) {
			ctx.translate(0, 20);
			ctx.lineWidth = 2;
			//образующие
			ctx.drawLine(60, 20, 150, 150);
			ctx.drawLine(240, 20, 150, 150);
			//эллипс
			ctx.beginPath();
			ctx.ellipse(150, 20, 90, 20, 0, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			
			let frac = numerator / denominator;
			let yLiq = 150 - 130 * frac;
			let rxLiq = 90 * frac;
			let ryLiq = 20 * frac;

			ctx.fillStyle = "#61DC9A";
			ctx.beginPath();
			ctx.moveTo(150 - rxLiq, yLiq);
			ctx.lineTo(150 + rxLiq, yLiq);
			ctx.lineTo(150, 150);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse(150, yLiq, rxLiq, ryLiq, 0, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();

			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, yLiq, rxLiq, ryLiq, 0, Math.PI, 2 * Math.PI);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.ellipse(150, yLiq, rxLiq, ryLiq, 0, 0, Math.PI);
			ctx.stroke();
			ctx.closePath();

		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'В сосуде, имеющем форму конуса, уровень жидкости достигает ' +
				'$' + numerator.texfrac(denominator) + '$ высоты. Объём жидкости равен ' + volumeDown + 'мл. ' +
				'Сколько миллилитров жидкости '+question[0]+'?',
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
