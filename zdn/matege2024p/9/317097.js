(function() { 'use strict'; retryWhileError(function() {
    let a = sl(1, 4);
    let b = sl(a+1, 5);
    let c = sl(2,5)
    let K = c.pow(b) - 1;
    let rExp = sl(0.01, 0.99, 0.01);

    let rPok = b * K / (50 * a) - 0.1;
    genAssert(rPok>0, 'число не должно быть отрицательным');
    genAssert(Math.abs(rPok-rExp) < 1, 'оценки экспертов и покупателей не должны сильно отличаться');
    genAssertZ1000(rPok);

    
    let ans = rPok - (rPok - rExp) / c.pow(a);
    genAssert(ans>0, 'число не должно быть отрицательным');
    genAssertZ1000(ans);

    let shop = ['«Альфа»', '«Бета»'].iz();
	NAtask.setTask({
		text: `Рейтинг $R$ интернет-магазина вычисляется по формуле $R = r_\\text{пок} - \\frac{r_\\text{пок} - r_\\text{экс}}{(K+1)^m}$,
        где $m = \\frac{0,02 K}{r_\\text{пок} + 0,1}$, $r_\\text{пок}$ - средняя оценка магазина покупателями 
        $r_\\text{экс}$ - оценка магазина экспертами и $K$ - число покупателей, оценивших магазин. 
        Найдите рейтинг интернет-магазина ${shop}, если число покупателей, оставивших отзыв о магазине, равно ${K},
        их средняя оценка равна ${rPok}, а оценка экспертов равна ${rExp}.`,
		answers: ans,
		authors: ['mcFrene'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//mcFrene
/*РешуЕГЭ: 317097: 505466, 509575, 509922, 516377, 516397, 635960, 635857
*/
