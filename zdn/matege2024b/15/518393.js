(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();
        let riverLength = ['большей', 'меньшей'][rand];
        let shortOrLong = ['длиннее', 'короче'].iz();
        let shortRivePart = sl(3, 7, 1);
        let longRivePart = shortRivePart + sl(1, 10, 1);
        let unitOfLenght = sl(5, 20, 1);

        genAssertIrreducible(longRivePart, shortRivePart, 'части отношения у короткой реки и длинной имеют общие множители по мимо 1');

        NAtask.setTask({
            text:
                'Длины двух рек относятся как ' + shortRivePart + ':' + longRivePart +
                ', при этом одна из них ' + shortOrLong + ' другой на ' + (longRivePart - shortRivePart) * unitOfLenght + ' км. Найдите длину ' +
                riverLength + ' реки. Ответ дайте в километрах.',
            answers: unitOfLenght * [longRivePart, shortRivePart][rand],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=518393
//zer00player
