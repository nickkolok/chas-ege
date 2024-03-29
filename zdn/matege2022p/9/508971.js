(function() {
	NAinfo.requireApiVersion(0, 2);

	function giperbl(k, x, a) {
		return k / (x + a);
	}

	function f(x) {
		return giperbl(k, x, a);
	}

	function drawGraph(ct) {
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		for (let i = -5.5; i < 6.5; i += 0.1)
			if (f(i - 0.1) < 5.5)
				if (f(i - 0.1) > -6.8)
					ct.drawLine(i - 0.1, f(i - 0.1), i, f(i));
	}
	let find, answ, chisl, k, a;
	do {
		a = sluchch(0, 6).pm();
		k = sluchch(1, 8).pm();
		chisl = sluchch(1, 30, 0.5).pm();
	} while (!(1000 * f(chisl)).isZ() || Math.abs(f(chisl)) < 7);
	if (sl1()) {
		find = `$f(${chisl.ts()})$`;
		answ = f(chisl);
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${f(chisl).ts()}$`;
	}
	let X = [],
		Y = [];
	for (let i = -5; i < 6; i++)
		if (f(i).isZ() && Math.abs(f(i)) < 6)
			if (f(i)) {
				X.push(i);
				Y.push(f(i));
			}
	let paint1 = function(ct) {
		h = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		//график
		drawGraph(ct);
		//точки
		graph9AmarkCircles(ct, [X, Y].T(), 2, 0.15);
		//всп полоска
		ct.setLineDash([0.25, 0.5]);
		ct.drawLine(-a, -7, -a, 6);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=\\frac{k}{x+a}$. Найдите ${find}.`,
		answers: answ,
		analys: `$f(x)=\\frac {${k}}{` + (`x+` + a).replace('+0', '').plusminus() + `}$`,
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
})();
//508971 508983
