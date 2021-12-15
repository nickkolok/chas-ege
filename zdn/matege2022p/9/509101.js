retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);
	function axb(a, x, b) {
		if(a>0)
		       return Math.pow(a,x+b);
		return -Math.pow(a.abs(), x+b);
	}
	function f(x) {
		return axb(a, x, b);
	}
	let a = slKrome([1], 0.25, 20, 0.25).pm();
	let b = sluchch(0, 20,0.5).pm();
	let chisl = sluchch(0,10).pm();
	if (f(chisl).abs() < 6 && f(chisl).isZ())
		return;
	//если находится в видимой части и целое(можно определить по графику)
	if (!(1000 * f(chisl)).isZ())
		return;
	//если нецелое
	if(f(chisl).abs()>10000)
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
	let points=intPoints(f,{minX:-5,maxX:6,minY:-6,maxY:5});
	if (points.length<2)
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
		graph9AmarkCircles(ct, points, 2, 0.15);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=${`-`.esli(a<0)}a^{x+b}$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=`+a+ `^{`+(`x+`+b).replace(`+0`,``)+`}$`,
	});
	chas2.task.modifiers.beautifyAlgebraicNotation();
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//509101 509107
