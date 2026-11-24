(function() { 'use strict'; retryWhileError(function() {
	
	let pow1 = slKrome(5,3,7);
	let pow2 = [5,10].iz();
	
	let base = sl(2,5);
	let V_1=sl(10,1000,0.5);
	let p_2 = base.pow(pow1);
	
	let ans = V_1/base.pow(pow2);
	genAssertZ1000(ans);

    let decor = p_2 === 1 ? `равно одной атмосфере` : chislitlx(p_2, 'атмосфера', '$');

	NAtask.setTask({
		text: `Установка для демонстрации адиабатического сжатия представляет собой сосуд с поршнем, резко сжимающим газ. При этом объём и давление
        связаны соотношением $p_1 V_1^{${(pow1/pow2).ts()}} = p_2 V_2^{${(pow1/pow2).ts()}}$, где $p_2$ и $p_2$ - давление газа (в атмосферах) в начальном и конечном состояниях,
        $V_1$ и $V_2$ - объём газа (в литрах) в начальном и конечном состояниях. Изначально объём газа равен $${V_1.ts()}$ л, а давление газа равно 
        одной атмосфере. До какого объёма нужно сжать газ, чтобы давление в сосуде стало ${decor}? Ответ дайте в литрах.`,
		answers: ans,
		analys: `$V_2=\\left(\\frac{V_1^{${pow1/pow2}}\\cdot p_1}{p_2}\\right)^\\frac{1}{${pow1/pow2}}=\\left(\\frac{${V_1}^{${pow1/pow2}}}{${p_2}}\\right)^\\frac{1}{${pow1/pow2}}=(${base}^{${-pow1}})^\\frac{${pow2}}{${pow1}}\\cdot${V_1}=${ans}$`,
		authors: ['mcFrene'],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
}, 20000);})();
//mcFrene
/*РешуЕГЭ: 525114: 563892
*/
