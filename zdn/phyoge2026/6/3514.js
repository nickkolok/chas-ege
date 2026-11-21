(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k = sl(1, 5, 1) * 100; // Жёсткость пружины в Н/м
		let x_vals = [0, 1, 2, 3, 4]; // Растяжение в см
		let F_vals = x_vals.map(function(x) { return k * x / 100; });
		
		let data = [];
		for(let i = 0; i < x_vals.length; i++){
			data.push([x_vals[i], F_vals[i]]);
		}

		let maxF = F_vals[F_vals.length - 1];
		let step = maxF <= 10 ? 2 : (maxF <= 25 ? 5 : 10);
		let yMax = Math.ceil((maxF + 1) / step) * step;
		let yTicks = [];
		for(let i = 0; i <= yMax; i += step){
			yTicks.push(i);
		}

		let xText = 4;
		let FText = F_vals[4];

		NAtask.setTask({
			text: 'На рисунке представлен график зависимости силы упругости $F_{\\text{упр}}$, возникающей в пружине, ' +
				'от её растяжения $x$. Чему равна жёсткость пружины? Ответ дайте в Н/м.',
			answers: k,
			analys: 'По графику определяем, что при растяжении пружины на $x = ' + xText + '$ см $= ' + (xText/100) + '$ м сила упругости равна $F_{\\text{упр}} = ' + FText + '$ Н. ' +
				'Согласно закону Гука, $F_{\\text{упр}} = kx$, откуда жёсткость пружины $k = \\frac{F_{\\text{упр}}}{x} = \\frac{' + FText + '}{' + (xText/100) + '} = ' + k + '$ Н/м.',
		});

		NAtask.modifiers.addJqplot({
			dataArray: [data],
			options: {
				axes: {
					xaxis: {
						label: 'x, см',
						min: 0,
						max: 4,
						ticks: [0, 1, 2, 3, 4]
					},
					yaxis: {
						label: 'F, Н',
						min: 0,
						max: yMax,
						ticks: yTicks
					}
				},
				seriesDefaults: {
					lineWidth: 2,
					markerOptions: { size: 5 }
				}
			}
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3514
// DAC30E
//zer00player
