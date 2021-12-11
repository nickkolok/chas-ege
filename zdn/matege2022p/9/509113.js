(function() {
	NAinfo.requireApiVersion(0, 2);
	let k = sluchch(1, 5).pm() / [1,2].iz();
	let chisl = Math.pow(sluchch(6, 20), 2);
	chisl *= (100).pow(sl(-2,2));

	let find, answ;
	if (sl1()) {
		find = `$f(${chisl.ts(1)})$`;
		answ = (k * Math.sqrt(chisl)).ts();
	} else {
		answ = chisl.ts();
		find = `значение $x$, при котором $f(x)=${(k*Math.sqrt(chisl)).ts(1)}$`;
	}
	let X = [],
		Y = [];
	for (let i = 1; i < 7; i++)
		if ((k * Math.sqrt(i)).isZ() && (k * Math.sqrt(i)).abs() < 6) {
			X.push(i * 20);
			Y.push(k * Math.sqrt(20 * i * 20));
			//break;
		}
	let paint1 = function(ct) {
		h = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		//график
		ct.translate(h / 2, h / 2);
		ct.scale(1, -1);
		for (let i = 0; i < 130; i++)
			if (k * Math.sqrt(20 * i) < 110)
				if (k * Math.sqrt(20 * i) > -130)
					ct.drawLine(i - 1, k * Math.sqrt(20 * (i - 1)), i, k * Math.sqrt(20 * i));
		//точки
		graph9AmarkCircles(ct, [X,Y].T(), 1);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=k\\sqrt{x}$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=${k}\\sqrt{x}$`.plusminus(),
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
})();
//509113 509118
//TODO: иррациональные k, более длинные оси
