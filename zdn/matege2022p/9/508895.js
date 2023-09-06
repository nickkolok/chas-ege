(function() {
	NAinfo.requireApiVersion(0, 2);
	let k = [1, 2, 3, 0.2, 0.4, 0.5, ].iz().pm();
	let b = sluchch(0, 3).pm();
	let chisl = sluchch(7, 20, 0.5).pm();
	let find, answ;
	if (sl1()) {
		find = `$f(${chisl.ts()})$`;
		answ = (chisl * k + b).ts();
	} else {
		answ = chisl.ts();
		find = `значение $x$, при котором $f(x)=${(chisl * k+ b).ts() }$`;
	}

	let X = [],
		Y = [];
	for (let i = -6; i < 0; i++)
		if ((k * i + b).isZ() && Math.abs(k * i + b) < 6) {
			X.push(i * 20);
			Y.push((k * i + b) * 20);
			//break;
		}
	for (let i = 6; i >= 0; i--)
		if ((k * i + b).isZ() && Math.abs(k * i + b) < 6) {
			X.push(i * 20);
			Y.push((k * i + b) * 20);
			//break;
		}
	b *= 20;
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
		
		ct.scale(1, -1);
		for (let i = -130; i < 130; i++)
			if (Math.abs(k * (i - 1) + b) < 110)
				ct.drawLine(i - 1, k * (i - 1) + b, i, k * i + b);
			//точки
		graph9AmarkCircles(ct, [X,Y].T(), 2);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=kx+b$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=` + (k + `x+` + (b / 20)).replace('+0', '').plusminus() + `$`,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();
//508895 508903
