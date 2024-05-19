(function() {
	NAinfo.requireApiVersion(0, 2);

	function gr(raz, ir, x) {
		return raz * Math.sqrt(ir * x);
	}

	function make(razh, irrazh) {
		return {
			raz: razh,
			ir: irrazh,
		};
	}

	function f(x) {
		return gr(k.raz, k.ir, x);
	}
	let k, chisl, X, Y;
	do {
		k = make(sl(1, 10) / [1, 2, ].iz().pm(), [2, 3, 5, 6, 7, ].iz());
		chisl = make(sl(5, 10) / [1, 2, ].iz(), k.ir);
		X = [];
		Y = [];
		for (let i = 0; i < 14; i++)
			if (f(i).isZ() && f(i) < 9)
				if (f(i) > -9) {
					X.push(i);
					Y.push(f(i));
				}
	} while (X.length < 2);
	let find, answ;
	if (sl1()) {
		find = `$f(${(Math.pow(chisl.raz,2)*chisl.ir).ts(1)})$`;
		answ = k.raz * chisl.raz * k.ir;
	} else {
		answ = Math.pow(chisl.raz, 2);
		find = `значение $x$, при котором $f(x)=${(k.raz*chisl.raz).ts(1)}\\sqrt{${chisl.ir}}$`.plusminus();
	}
	let paint1 = function(ct) {
		let h = 400;
		let w = 600;
		//Оси координат
		ct.translate(-200, 0);
		ct.drawCoordPlane(w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);

		//график

		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		let i = 0.1;
		do {
			if (gr(k.raz, k.ir, i - 0.1) < 9)
				if (gr(k.raz, k.ir, i - 0.1) > -9)
					ct.drawLine(i - 0.1, gr(k.raz, k.ir, i - 0.1), i, gr(k.raz, k.ir, i));
			i += 0.1;
		} while (i < 14.3);
		//точки
		graph9AmarkCircles(ct, [X, Y].T(), 2, 0.15);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=k\\sqrt{x}$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=${k.raz.ts(1)}\\sqrt{${k.ir}}\\cdot\\sqrt{x}$`.plusminus(),
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();
//509121
