(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';
        let key = "510114";

        let variant = getListedPreference(key, [{
            preference: 'pen',
            preferenceValue: 0,
        }, {
            preference: 'device',
            preferenceValue: 1,

        },], sl1());

        let probability = sl(0.4, 0.8, 0.01);

        let pen = sklonlxkand(['ручка', 'маркер', 'фломастер', 'линер'].iz());
        let device = sklonlxkand(['телефон', 'планшет', 'смартфон'].iz());

        NAtask.setTask({
            questions: [[
                {
                    text: `Вероятность того, что нов${[`ый`, `ая`][pen.rod]} ${`шариковая `.esli(pen.ie == 'ручка')}${pen.ie} пишет плохо или вовсе
				не пишет, равна $${probability.ts()}$. Покупатель, не глядя, берёт ${[`один`, `одну`][pen.rod]} ${`шариковую `.esli(pen.ie == 'ручка')}${pen.ve}
				из коробки. Найдите вероятность того, что ${[`этот`, `эту`][pen.rod]} ${pen.ie} пишет хорошо.`,
                    answers: 1 - probability,
                },
                {
                    text: `Вероятность того, что стекло ${`мобильного `.esli(device.ie == 'телефон')}${device.re} разобьётся 
					при падении на твёрдую поверхность, равна $${probability.ts()}$. 
					Найдите вероятность того, что при падении на твёрдую поверхность стекло 
					${`мобильного `.esli(device.ie == 'телефон')}${device.re} не разобьётся.`,
                    answers: 1 - probability,
                }
            ][variant]],
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

// 510114 510963 510983 511903 528135 528156 510116
// 320197 324627 506678 506743 506845 525539 324629 324631 324633 324635 324637 324639 324641 324643 324645 324647 324649
