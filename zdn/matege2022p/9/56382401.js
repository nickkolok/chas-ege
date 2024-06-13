retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return (k * x.abs() + b).abs();
	}
	let k = sl(1, 3).pm();
	let b = sl(-3, 3);
	if ((-b / k).abs() > 6 && f(-b / k).abs() > 6)
		return;
	let sign1 = (k>0)?['>', ' \\geq '].iz():['<', ' \\leq '].iz();
	let sign2 = (b==0)?[' \\geq ',' \\leq '].iz():(((b>0))?['>', ' \\geq '].iz():['<', ' \\leq '].iz());
	
	let p = intPoints(f, {
		minX: 0,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	if (p.length < 4)
		return;
	for (let i = 0; i < p.length; i++)
		p[i][0] = p[i][0].pm();

	let num1 = sl(6, 10, 0.5);
	let variant = [
		['произведение коэффициентов $k$ и $b$', k * b, sl1()],
		['сумму коэффициентов $k$ и $b$', k + b, true],
		['$f(' + num1 + ')$', f(num1).ts(), sl1()],
		['коэффициент $k$', k, true],
		['коэффициент $b$', b, true]
	].iz();

	let paint1 = function(ct) {
		let h = 300;
		let w = 300;
		//Оси координат
		graph9AdrawAxes_20_300(ct);
		ct.translate(-10, -10);
		ct.lineWidth = 0.1;
		ct.translate(h / 2, h / 2);
		ct.scale(20, -20);
		//График
		graph9AdrawFunction(ct, f, {
			minX: -6,
			maxX: 6,
			minY: -7,
			maxY: 5.7,
			step: 0.05,
		});

		//точки
		graph9AmarkCircles(ct, p, 4, 0.15);
	};
	NAtask.setTask({
		text: 'На рисунке изображен график функций $f(x)=\\Bigl|k|x|+b\\Bigr|$' + (', где $k' + sign1 + '0$, $b' +
				sign2 + '0$').esli(variant[2]) + '. Найдите ' + variant[0] +
			'.',
		answers: variant[1],
		analys: ('$f(x)=\\Bigl|' + k.ts() + '|x|+' + b.ts() + '\\Bigr|').replace('+-', '-') + '$'
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 100000);
//56382401
