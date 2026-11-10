(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let number = sl(10, 99);
        let countDivisible = 0;

        for (let i = 1; number * i < 1000; i++) {
            if ((number * i).mzhd(99, 1000))
                countDivisible++;
        }
        genAssertZ1000(countDivisible / 900);

        NAtask.setTask({
            text: `Найдите вероятность того, что случайно выбранное трёхзначное число делится на ${number}.`,
            answers: countDivisible / 900,
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

// 509775 514122 514196 510112 510117
