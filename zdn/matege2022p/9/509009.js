(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return logAB(a, x, b);
	}

	function logAB(a, x, b) {
		return Math.log(x) / Math.log(a) + b;
	}
	let a, b, chisl;
	let X, Y;
	do {
		a = sluchch(2, 10);
		if ((100 / a).isZ() && sl1())
			a = sl(1,5) / a;
		b = sluchch(0, 6).pm();
		chisl = Math.pow(a, sluchch(2, 4));
		X = [];
		Y = [];
		for (let i = 0; i <= 6; i++)
			if (f(i).isZ() && f(i) < 6) {
				X.push(i);
				Y.push(f(i));
			}
	} while (X.length < 2 || (Math.abs(f(chisl)) <= 6 && Math.abs(chisl) <= 6 ));
	let find, answ;
	if (sl1()) {
		find = `$f(${chisl.ts()})$`;
		answ = f(chisl).ts(1);
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${(f(chisl)).ts()}$`;
	}
	let paint1 = function(ct) {
		h = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		//график
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		let i = 0.1;
		do {
			if (f(i - 0.1) < 5.5)
				if (f(i - 0.1) > -6.8)
					ct.drawLine(i - 0.1, f(i - 0.1), i, f(i));
			i += 0.1;
		} while (i < 6.5);
		//точки
	graph9AmarkCircles(ct, [X, Y].T(), 2, 0.15);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=b+\\log{_a}{x}$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=${b}+\\log{_{${a}}} {x}$`,
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
})();
//509009
