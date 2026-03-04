(function () {
    'use strict';
    retryWhileError(function () {

        let diceSides = 6;
        let minSum = sl(1, 6);
        let maxSum = minSum + slKrome(minSum, 1, 3);

        let favorable = 0;
        for (let i = 1; i <= diceSides; i++) {
            for (let j = 1; j <= diceSides; j++) {
                let sum = i + j;
                if (sum >= minSum && sum <= maxSum) {
                    favorable++;
                }
            }
        }

        console.log(minSum, maxSum, favorable);

        let probability = favorable / 36;

        let sumsText = [];
        for (let s = minSum; s <= maxSum; s++) {
            sumsText.push(s);
        }
        let sumsStr = sumsText.joinLast(', ', ' или ');

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'Симметричный игральный кубик бросают два раза. ' +
                'Найдите вероятность события «сумма выпавших очков равна ' + sumsStr + '».',
            answers: probability,
        });
    }, 100);
})();
//2621348
//Открытый банк заданий 27FFA4
