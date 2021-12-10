(function() {
	NAinfo.requireApiVersion(0, 2);
	let find, answ, chisl, k, b, a;
	let X, Y;
	do {
		X = [];
		Y = [];
		do {
			a = sluchch(0, 4);
			b = sluchch(0, 3).pm();
			k = sluchch(0, 10).pm();
			chisl = sluchch(5, 30).pm();
		} while (!(1000 * (k * chisl + a) / (chisl + b)).isZ() || Math.abs((k * chisl + a) / (chisl + b)) < 7);
		for (let i = -6; i < 7; i++)
			if (((k * i + a) / (i + b)).isZ() && Math.abs((k * i + a) / (i + b)) < 6) {
				X.push(20 * (i + b) - 20 * b);
				Y.push(-20 * (k * i + a) / (i + b));
			}
	} while (X.length < 2);
	if (sl1()) {
		find = `$f(${chisl.ts(1)})$`;
		answ = (k * chisl + a) / (chisl + b);
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${((k*chisl+a)/(chisl+b)).ts(1)}$`;
	}
	let paint1 = function(ct) {
		h = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		//график
		ct.translate(h / 2, h / 2);
		for (let i = -130; i < 130; i++)
			if (-20 * (k * i + a * 20) / (i + b * 20) < 130)
				if (-20 * (k * i + a * 20) / (i + b * 20) > -110)
					ct.drawLine(i - 1, -20 * (k * (i - 1) + a * 20) / (i - 1 + b * 20), i, -20 * (k * i + a * 20) / (i + b * 20));
		//асимптота
		ct.setLineDash([5, 10]);
		ct.drawLine(-b * 20, -130, -b * 20, 150);
		if (k < 6 && k >= -6)
			ct.drawLine(-130, -k * 20, 130, -k * 20);
		//точки
		graph9AmarkCircles(ct, [X,Y].T());
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=\\frac{kx+a}{x+b}$. Найдите ${find}.`,
		answers: answ,
		analys: `$f(x)=\\frac {` + (k + `x+` + a).replace('+0', '').plusminus() + `}{` + (`x+` + b).replace('+0', '').plusminus() + `}$`,
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
})();
//509001 508983
