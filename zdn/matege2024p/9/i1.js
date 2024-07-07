(function() { 'use strict'; retryWhileError(function() {
	let a=sl(1, 7, 1);
	let b=sl(2, 5, 1);
	let c=sl(1, 7, 0.01);
	let d=sl(17, 25, 1);

	let T = a*Math.pow(10, b);

	let mantP = (57*Math.pow(a, 4)*c).toFixedLess(2); // Знаков после запятой всегда не больше двух! При использовании ts() артифачит.
	let expP = 4*b+d-9;

	let S;
	let pw = Math.pow(10, c.toFixedLess(2).length - 2);
	let intc = Number((c * pw).toFixed()); // Полученное число всегда целое.
	if(intc % 2 === 0 || intc % 5 === 0)
		S = [c, intc.texrndfrac(pw)].iz();
	else
		S = c;

	NAtask.setTask({
		text: `Для определения эффективной температуры звёзд используют закон
		Стефана–Больцмана, согласно которому мощность излучения $P$ (в ваттах)
		нагретого тела прямо пропорциональна площади его поверхности и четвёртой степени температуры: 
		$P = \\sigma S T^4$, где $\\sigma = 5,7 \\cdot 10^{-8} \\frac{\\mbox{Вт}}{\\mbox{м}^2 \\cdot \\mbox{К}^2}$ - постоянная, площадь поверхности
		$S$ измеряется в квадратных метрах, а температура $T$ – в градусах Кельвина. 
		Известно, что некоторая звезда имеет 
		площадь поверхности $S = ${S} \\cdot 10^{${d}} \\ \\mbox{м}^2$, а излучаемая ею мощность $P = ${mantP} \\cdot 10^{${expP}} \\ \\mbox{Вт}$. Определите температуру этой звезды. Дайте ответ в градусах Кельвина.
		`,
		answers: T,
		authors: [''],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//mcFrene
