	function graph9AdrawFunction(ct, f, o){
		for (let i = o.minX; i < o.maxX; i += o.step)
			if (f(i - o.step) < o.maxY&&f(i - o.step) > o.minY)
					ct.drawLine(i - o.step, f(i - o.step), i, f(i));
	}
	retryWhileUndefined(function() {
		NAinfo.requireApiVersion(0, 2);
		function axb(a, x, b) {
			if (a > 0)
				return Math.pow(a, x) + b;
			return -Math.pow(a.abs(), x) + b;
		}

		function f(x) {
			return axb(a, x, b);
		}
		let a = slKrome([1], 0.25, 20, 0.25).pm();
		let b = sluchch(1, 10).pm();
		let chisl = sluchch(0, 5).pm();
		if (f(chisl).abs() < 6 && f(chisl).isZ())
			return;
		//если находится в видимой части и целое(можно определить по графику)
		if (!(1000 * f(chisl)).isZ())
			return;
		if (f(chisl).abs() >10000 )
			return;
		//слишком большое
		let find, answ;
		if (sl1()) {
			find = `$f(${chisl.ts()})$`;
			answ = f(chisl);
		} else {
			answ = chisl;
			find = `значение $x$, при котором $f(x)=${f(chisl).ts() }$`;
		}
		let X = [],
			Y = [];
		for (let i = -5; i < 6; i++)
			if (f(i).isZ() && Math.abs(f(i)) < 6)
				if (f(i)) {
					X.push(i);
					Y.push(f(i));
				}
		if (X.length < 2)
			return;
		let paint1 = function(ct) {
			h = 300;
			//Оси координат
			graph9AdrawAxes_20_300(ct);
			ct.translate(-10, -10);
			ct.translate(h / 2, h / 2);
			ct.scale(20, -20);
			ct.lineWidth = 0.1;
			//график
			graph9AdrawFunction(ct, f, {minX: -5.5,	maxX: 6.5, minY: -6.8, maxY: 5.5, step: 0.05});
			//точки
			graph9AmarkCircles(ct, [X, Y].T(), 2, 0.15);
		};
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=${`-`.esli(a<0)}a^x+b$. Найдите ${find}. `,
			answers: answ,
			analys: `$f(x)=` + (a + `^{x}+` + (b)).replace('+0', '').plusminus() + `$`,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
		return true;
	}, 1000000);
	//509095 509089
