retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	const trig = ['sin', 'cos'].iz();
	const a = sl(1, 6).pm();
	const b = sl(2, 5);
	// Оба экстремума должны помещаться на графике между y = -6 и y = 6.
	const d = sl(Math.abs(a) - 6, 6 - Math.abs(a));
	const c = sl1();
	const factor = sl(0.5, 1.5, 0.5);
	const phase = factor * c;
	const showA = sl1();
	const knownA = a === 1 ? '' : a === -1 ? '-' : a;
	const frequency = '\\frac{\\pi}{' + b + '}x';

	function f(x) {
		return a * Math[trig](Math.PI * (x / b + phase)) + d;
	}

	const formula = (showA ? knownA : 'a') + '\\' + trig + '(' +
		(showA ? '\\frac{\\pi}{b}x' : frequency) + '+' + factor.texfracpi(1) + ' c)+d';
	let limits = showA ? ', $b>0$' : ', $a' + (a > 0 ? '>' : '<') + '0$';
	const unknown = showA ? 'b' : 'a';
	const variant = sl(1, 3);
	let question, answer;
	if (variant === 3) {
		limits += ', $0 \\leq c \\leq 1$';
		const unknownValue = showA ? b : a;
		if (sl1()) {
			question = 'сумму $' + unknown + '+c+d$';
			answer = unknownValue + c + d;
		} else {
			question = 'произведение $' + unknown + '\\cdot c\\cdot d$';
			answer = unknownValue * c * d;
		}
	} else {
		const x = sl(5, 10).pm();
		const value = f(x);
		if (!value.isAlmostInteger())
			return;
		question = variant === 1 ? '$f(' + x + ')$' : '$f(f(' + x + '))$';
		const result = variant === 1 ? value : f(Math.round(value));
		if (!result.isAlmostInteger())
			return;
		answer = Math.round(result);
	}

	// Соседние экстремумы по обе стороны от нуля задают амплитуду, сдвиг и полупериод.
	let firstExtremum = ((trig === 'sin' ? 0.5 : 0) - phase) % 1;
	if (firstExtremum > 0)
		firstExtremum -= 1;
	const extrema = [firstExtremum * b, (firstExtremum + 1) * b]
		.map(x => [x, Math.round(f(x))]);

	const solution = knownA + '\\' + trig + '(' + frequency +
		(phase ? '+' + phase.texfracpi(1) : '') + ')' + (d ? '+' + d : '');
	NAtask.setTask({
		text: 'На рисунке изображён график функции $f(x)=' + formula +
			'$, где $' + unknown + '$, $c$ и $d$ — целые' + limits +
			'. Найдите ' + question + '.',
		answers: answer,
		analys: '$f(x)=' + solution.plusminus() + '$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 320,
		height: 320,
		paint: function(ct) {
			ct.drawCoordPlane(320, 320, { hor: 1, ver: 1 }, { x1: '1', y1: '1' }, 20);
			ct.scale(20, -20);
			ct.lineWidth = 0.1;
			graph9AdrawFunction(ct, f, {
				minX: -7,
				maxX: 7,
				minY: -7,
				maxY: 7,
				step: 0.05,
			});
			graph9AmarkCircles(ct, extrema, undefined, 0.15);
		},
	});
	return true;
}, 100000);
//564543 564555 564551 564552
