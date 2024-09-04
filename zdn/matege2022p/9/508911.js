(function() {
	NAinfo.requireApiVersion(0, 2);

	function parabl(a, b, c, x) {
		return a * x * x + b * x + c;
	}
	let a, b, c, D;
	let x0, y0;
	do {
		a = sluchch(1, 2).pm();
		b = sluchch(0, 10).pm();
		c = sluchch(0, 10).pm();
		D = b * b - 4 * a * c;
		x0 = -b / (2 * a);
		y0 = parabl(a, b, c, x0);
	} while (D < 0 || !D.isPolnKvadr() || (Math.abs(x0) > 6 || Math.abs(y0) > 5));
	let chisl = sluchch(7, 20, 0.5).pm();
	let answ = parabl(a, b, c, chisl);
	let X = [],
		Y = [];
	if (x0.isZ() && y0.isZ()) {
		X.push(x0 * 20);
		Y.push(-0.05 * parabl(a, b * 20, c * 400, x0 * 20));
	}

	if (parabl(a, b, c, 0).isZ() && Math.abs(parabl(a, b, c, i)) <= 6 && !X.includes(0)) {
		X.push(0);
		Y.push(-0.05 * parabl(a, b * 20, c * 400, 0));
	}
	//if (X.length < 2)
	for (let i = x0.ceil() + 1; i < 7; i++)
		if (parabl(a, b, c, i).isZ() && Math.abs(parabl(a, b, c, i)) <= 6) {
			X.push(i * 20);
			Y.push(-0.05 * parabl(a, b * 20, c * 400, i * 20));
		}
		//if (X.length < 2)
	for (let i = x0.ceil() - 1; i > -7; i--)
		if (parabl(a, b, c, i).isZ() && Math.abs(parabl(a, b, c, i)) <= 6) {
			X.push(i * 20);
			Y.push(-0.05 * parabl(a, b * 20, c * 400, i * 20));
		}
	let XY = [X, Y].T().iz(3).filter(function(e) {
		return e;
	});

	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordinatePlane (w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//график

		for (let i = -130; i < 130; i++){
			let y = -0.05 * parabl(a, b * 20, c * 400, i - 1);
			if ( y.abs() <= 130 && (y > -110 || i.abs() >= 15))
				ct.drawLine(i - 1, -0.05 * parabl(a, b * 20, c * 400, i - 1), i, -0.05 * parabl(a, b * 20, c * 400, i));
		}
		//точки
		graph9AmarkCircles(ct, XY);
	};
	let text;
	if (!sl(5)) {
		text = `${a}x^2+bx+c`.plusminus();
		XY.pop();
	} else
	if (!x0.isZ && !y0.isZ() || Math.abs(a) == 1)
		text = `ax^2+bx+c`;
	else {
		text = `ax^2+`;
		if (!c) {
			if (b) {
				text += (`${b}x+c`).plusminus();
				if(XY.length>2)
				         XY.pop();
				//XY.pop();
			} else
				text += `bx+c`;
		} else {
			text += (`bx+` + `${c}`).plusminus();
			XY = XY.filter(v => v[0]);
			if(XY.length>2)
				XY.pop();
		}
	}
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=${text.plusminus()}$${`,где числа $a,$ $b$ и $c $ - целые `.esli(text == `ax ^ 2 + bx + c `)}. Найдите $f(${chisl})$.`,
		answers: answ,
		analys: `$f(x)=${(a + `x ^ 2 +` + b + `x +` + c).replace('+0x', '').replace('+0', '').plusminus()}$`.plusminus(),
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();
//508911 et al
//TODO
