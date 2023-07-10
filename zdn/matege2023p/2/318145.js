(function() {
	retryWhileError(function() {
		let denominator = sl(3, 10);
		let numerator = sl(1, denominator - 1);

		let volumeDown = sl(1, 10) * numerator.pow(3);
		let volumeUp = volumeDown * denominator.pow(3) / numerator.pow(3);
		genAssert(volumeDown.isZ(), 'кривое значение');

		let question=[['нужно долить, чтобы наполнить сосуд доверху',volumeUp-volumeDown], ['поместится в весь сосуд',volumeUp]].iz();
		
		let paint1 = function(ctx) {
			ctx.translate(0, 20);
			ctx.lineWidth = 2;
			//образующие
			ctx.drawLine(61, 23, 150, 150);
			ctx.drawLine(239, 23, 150, 150);
			//эллипс
			ctx.beginPath();
			ctx.ellipse(150, 20, 20, 90, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			
			let frac = numerator / denominator;
			let add = 6;
			if (frac < 0.5) {
				frac = 2 / 3;
				add = 3;
			} else
			if (frac > 0.5) {
				frac = 1 / 3;
				add = 9;
			}

			ctx.fillStyle = "#61DC9A";
			ctx.beginPath();
			ctx.moveTo(150 - (90 * (1 - frac) + add), 150 * frac);
			ctx.lineTo(150 + 90 * (1 - frac) + add, 150 * frac);
			ctx.lineTo(150, 150);
			ctx.lineTo(150 - (90 * (1 - frac) + add), 150 * frac);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.ellipse(150, 150 * frac, 10, 90 * (1 - frac) + add, Math
				.PI / 2, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();

			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.ellipse(150, 150 * frac, 10, 90 * (1 - frac) + add, Math
				.PI / 2, -0.5 * Math.PI, -1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, 150 * frac, 10, 90 * (1 - frac) + add, Math
				.PI / 2, 0.5 * Math.PI, 1.5 * Math.PI);
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
