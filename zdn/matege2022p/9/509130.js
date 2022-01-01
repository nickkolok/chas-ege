CanvasRenderingContext2D.prototype.drawСoordPlane = function(w, h, kl, text, mash) {
	kl.gor *= mash;
	kl.ver *= mash;
	let width = (w / 2) % (kl.gor);
	let high = (h / 2) % (kl.ver);
	this.lineWidth = 0.5;
	this.setkaVer2(w, h, kl.gor, kl.ver, 1);
	this.translate(w / 2 - width, h / 2 - high);
	//стрелки
	this.lineWidth = 1.5;
	this.drawArrow(0, h / 2 + high - 10, 0, -h / 2 + high + 10);
	this.drawArrow(-w / 2 + width + 10, 0, w / 2 + width - 10, 0);
	this.font = "12px liberation_sans";
	this.fillText(`x`, w / 2 + width - 20, 15);
	this.fillText(`y`, -15, -h / 2 + high + 20);
	//единичные отрезки
	this.font = "12px liberation_sans";
	this.fillText("0", -10, 12);
	this.drawLine(kl.gor, 5, kl.gor, -5);
	this.drawLine(-5, -kl.ver, 5, -kl.ver);
	this.font = `${text.sh1}px liberation_sans`;
	this.fillText(text.x1, kl.gor, 15);
	this.font = `${text.sh2}px liberation_sans`;
	this.fillText(text.y1, -15, -kl.ver);
};
CanvasRenderingContext2D.prototype.setkaVer2 = function(h, w, gor, ver, mash) {
	gor *= mash;
	ver *= mash;
	for (let i = 0; i < w; i += gor)
		this.drawLine(i, 0, i, w);
	for (let i = 0; i < h; i += ver)
		this.drawLine(0, i, h, i);
};
retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function cos(a, b, x) {
		return a * Math.cos(x * Math.PI / 2) + b;
	}

	function f(x) {
		return 0.5 * cos(a, b, x);
	}
	let a = sluchch(1, 10).pm();
	let b = sluchch(0, 8).pm();
	let find, answ;
	if (sl1()) {
		find = `a`;
		answ = a;
	} else {
		find = `b`;
		answ = b;
	}
	if (a + b > 5 || a + b < -6)
		return;
	let X = [],
		Y = [];
	for (let i = -2; i < 4; i++)
		if (2*f(i) < 5 && 2*f(i) > -6) {
			X.push(i);
			Y.push(f(i));
		}
	if(X.length<2)
		return;
	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат 
		ct.drawСoordPlane(w, h, {
			gor: 2,
			ver: 1
		}, {
			x1: `π/2`,	y1: `1`,sh1: 13, sh2: 12,}, 20);
		//График
		ct.scale(40, -40);
		ct.lineWidth = 0.05;
		graph9AdrawFunction(ct, f, {minX: -2.6,	maxX: 4,minY: -4,maxY: 3,step: 0.05,});
		//точки
		graph9AmarkCircles(ct, [X, Y].T(), 2, 0.1);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=a\cosx+b$. Найдите $${find}$.`,
		answers: answ,
		analys: `$f(x)=` + (a + `\cos x+` + b).replace(`+0`, ``).plusminus() + `$ `,
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//509123 509130
