(function() { 'use strict'; retryWhileError(function() {
    let x2 = sl(1, 512);
    let x3 = sl(1, 50);
    let x4 = sl(1, 50);
    let x5 = (x2 * x3.pow(2)) / (4 * x4.pow(2));
    genAssert(x5 < 1000, 'Число слишком большое')
    genAssertZ1000(x5);
    
    let ans = (x2*x3) / (2*x4);
    genAssertZ1000(ans);

	NAtask.setTask({
		text: `В боковой стенке высокого цилиндрического бака у самого дна закреплён кран. После его открытия вода начинает
        вытекать из бака, при этом высота столба воды в нём, выраженная в метрах, меняется по закону $H(t) = at^2+bt+H_0$, где
        $H_0$ = ${x5} м - начальный уровень воды, $a = ${(1).texrndfrac(x2)} \\ \\frac{\\mbox{м}}{\\mbox{мин}^2}$ и $b = -${x3.texrndfrac(x4)}  \\ 
        \\frac{\\mbox{м}}{\\mbox{мин}}$, $t$ - время в минутах, прошедшее с момента открытия крана. 
        В течение какого времени вода будет вытекать из бака? Ответ приведите в минутах.`,
		answers: ans,
		authors: ['mcFrene'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//mcFrene
/*РешуЕГЭ: 27960: 28091, 41417, 41421, 520903, 628236, 628267, 28093, 28095,
28097, 28099, 41373, 41375, 41377, 41379, 41381, 41383, 41385, 41387, 41389,
41391, 41393, 41395, 41397, 41399, 41401, 41403, 41405, 41407, 41409, 41411,
41413, 41415, 41419
*/
    