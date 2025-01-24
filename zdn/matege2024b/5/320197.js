(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';
       

        let probability = sl(0.4, 0.8, 0.01);

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
