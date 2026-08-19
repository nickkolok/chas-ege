(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';
        let key = "510114";
	    
        let probability = sl(0.4, 0.8, 0.01);

        let pen = sklonlxkand(['ручка', 'маркер', 'фломастер', 'линер'].iz());

        NAtask.setTask({
            text: `Вероятность того, что нов${[`ый`, `ая`][pen.rod]} ${`шариковая `.esli(pen.ie == 'ручка')}${pen.ie} пишет плохо или вовсе
				не пишет, равна $${probability.ts()}$. Покупатель, не глядя, берёт ${[`один`, `одну`][pen.rod]} ${`шариковую `.esli(pen.ie == 'ручка')}${pen.ve}
				из коробки. Найдите вероятность того, что ${[`этот`, `эту`][pen.rod]} ${pen.ie} пишет хорошо.`,
            answers: 1 - probability,
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

// 510114 510963 510983 511903 528135 528156 510116
