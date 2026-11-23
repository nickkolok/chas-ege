(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';
       

        let probability = sl(0.01, 0.99, 0.01);

        let device = sklonlxkand(['телефон', 'планшет', 'смартфон'].iz());

        NAtask.setTask({
            text: `Вероятность того, что стекло ${`мобильного `.esli(device.ie == 'телефон')}${device.re} разобьётся 
			при падении на твёрдую поверхность, равна $${probability.ts()}$. 
		    Найдите вероятность того, что при падении на твёрдую поверхность стекло 
			${`мобильного `.esli(device.ie == 'телефон')}${device.re} не разобьётся.`,
            answers: 1 - probability,
            
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();
// Решу ЕГЭ 525539
// 08D94A, 13FE4D, 43BF02, CF350E, 6F1603, 3AC90C, BEB177, 586E7B, 1E1EB5, 610AB2, 8D5525, C658D9, FB97A4, 6050AB, 98F0EE, EE1AED, 2A3668, E36569, 7E2B3F, B9AD80
