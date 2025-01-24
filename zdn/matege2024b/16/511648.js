(function() { 'use strict'; retryWhileError(function() {
	let a=sl(1, 30);
	let b=slKrome(a, 1, 30);
	let c=slKrome(b, 1, 30);
	let e=[a,b,c].shuffle();
	let x=2*(a*b+a*c+b*c);
        NAtask.setTask({
		text:
		    'Площадь поверхности прямоугольного параллелепипеда с ребрами $a$, $b$ и $c$ вычисляется по формуле $S=2(ab+ac+bc)$. Найдите площадь поверхности прямоугольного параллелепипеда с ребрами $'+ e.joinLast('$, $' , '$ и $') + '$.',
		answers: x,
		authors: ['VeronikaKit'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//VeronikaKit
//Решу ЕГЭ (база) 511648
