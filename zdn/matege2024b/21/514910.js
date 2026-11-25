(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let numberOfCut = sluchch(3, 199, 1);
        let numberPiecesOfWood = sluchch(numberOfCut + 1, 200, 1);
        let begginingAdverbs = ['изначально', 'в начале', 'сначала', ' '].iz(2);
        let verbTakeVariants = ['взяли', 'было', 'имелось'].iz(2);
        let woodName = ['досок', 'брусьев', 'брёвен'].iz();
        let nameTypeOfCutFirst = ['распили', 'разреза', 'разруби', 'рассек'].iz();
        let nameTypeOfCutSecond = ['распил', 'разрез', 'разруб'].iz();
        let numerAdverbs = ['несколько', 'некоторое количество', 'немало', 'сколько-то'].iz();
        let questionNumerAdverbs = ['Сколько', 'Какое количество'].iz();

        let startText = begginingAdverbs[0] === ' '
            ? verbTakeVariants[0]
            : begginingAdverbs[0] + ' ' + verbTakeVariants[0];


        NAtask.setTask({
            text: startText.toZagl() + ' ' + numerAdverbs + ' ' + woodName + ' и их ' + nameTypeOfCutFirst + 'ли. Всего сделали ' + chislitlx(numberOfCut, 'поперечных ' + nameTypeOfCutSecond, '$') +
                ', в итоге получилось ' + chislitlx(numberPiecesOfWood, 'кусок', '$') + '. ' + questionNumerAdverbs + ' ' + woodName + ' ' + begginingAdverbs[1] + ' ' + verbTakeVariants[1] + '?',
            answers: numberPiecesOfWood - numberOfCut,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/test?likes=514910
//zer00player
