(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	let a, b, c, e;
	do {
		a = sluchch(2, 100);
		c = sluchch(1, 90);
		b = Math.pow(Math.pow(a, 2) - Math.pow(c, 2), 0.5);
		e = c / a;
	} while ((b <= 0) || !(b * 100).isZ() || !(e * 100000).isZ());
	if (a < b) {
		let c = a;
		a = b;
		b = c;
	}

	let plmin = [`-`,`+`].iz();

	let varis =
		[
			`его уравнение имеет вид $\\frac{x^2}{${a}}+\\frac{y^2}{${b}}=1$`,
			`один из его фокальных радиусов $r=${a}${plmin}${e}x$`,
			`его вершины $K(${a.pm()}, 0)$ и $K(0, ${b.pm()})$`,
			`расстояние между фокусами равно $${2*c}$`,
			[
				`сумма расстояний от фокусов до некоторой точки $M$, лежащей на эллипсе, равна $r=${2*a}$`,
				`его большая полуось равна $a=${a}$`,
				`его большая ось равна $${2*a}$`
			].iz() +
			`, a ` +
			[
				`его эксцентриситет $\\varepsilon=${c/a}$`,
				`его малая полуось равна $${b}$`,
				`его малая ось равна $${b*2}$`,
				`одна из вершин эллипса - точка $K(0, ${b.pm()})$`,
			].iz(),
		].iz();
	let n = 0;
	let wrAns = [`$F(${a.pm()},0)$`, `$F(0,${b.pm()})$`, `$F(${b.pm()},${c.pm()})$`, ]; //(a,0), (0,b) (b,c)
	let k = 0;
	while (k < n) {
		let h;
		if (sl1())
			h = `$F(${c.pm()+sluchch(1,20,0.5).pm()},0)$`;
		else
			h = `$F(0, ${c.pm()+sluchch(1,20,0.5).pm()})$`;
		if (!wrAns.includes(h, 0)) {
			wrAns.push(h);
			k++;
		}
	}
	NAtask.setTask({
		text: `Какая из точек является фокусом эллипса, находящегося в каноническом положении, если ${varis}?`,
		answers: `$F(${c*Math.pow(-1,c%3)},0)$`,
		wrongAnswers: wrAns,
	});
	AtoB(n);
})();
// По мотивам Бахвалов, №465
// SugarHedgehog
// Немного исправили Aisse-258 и NickKolok

