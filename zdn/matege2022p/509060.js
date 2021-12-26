retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);
	function f(x) {
		return logAB(zn,a, x, b);
	}
	function logAB(zn,a, x, b) {
		return zn*Math.log(x+b) / Math.log(a);
	}
		let zn=(1).pm();
		let a = slKrome(1,0.25,20,0.25);
		let b = sluchch(0,20).pm();
		let chisl = sluchch(0,20)/[1,2,4].iz().pm();
	if ((f(chisl).abs() < 6 && f(chisl).isZ())||(!(1000 * f(chisl)).isZ()))
		return;
	let find, answ;
	if (sl1()) {
		find = `$f(${chisl.ts()})$`;
		answ = f(chisl).ts();
	} else {
		answ = chisl;
		find = `значение $x$, при котором $f(x)=${(f(chisl)).ts()}$`;
	}
	let points=intPoints(f,{minX:-5,maxX:6,minY:-7,maxY:6});
	if (points.length<2)
		return;
	let paint1 = function(ct) {
		h = 300;
		//Оси координат 
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		//график
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		graph9AdrawFunction(ct, f, {minX: -5.5,	maxX: 6.5, minY: -6.8, maxY: 5.5, step: 0.05});
		//точки
		graph9AmarkCircles(ct, points, 2, 0.15);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=\\log{_a}{(x+b)}$. Найдите ${find}. `,
		answers: answ,
		analys: `$f(x)=${`-`.esli(zn<0)}\\log{_{${a}}} {(`+(`x+`+b).replace(`+0`,``).plusminus()+`)}$`,
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
return true;
}, 100000);
//509060
