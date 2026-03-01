(function () {
    'use strict';
    retryWhileError(function () {

        let yellow = sl(10, 40, 1);
        let green = sl(5, 30, 1);
        let total = yellow + green;
        let targetColor = sl1();

        let probability = [green - 1, yellow][targetColor] / (total - 1);
        let colorSecond = ['тоже зелёным', 'жёлтым'][targetColor];

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'Из ящика, где хранятся $' + yellow + '$ жёлтых и $' + green + '$ зелёных карандашей, ' +
                'не глядя достали два карандаша. Известно, что первый карандаш оказался зелёным. ' +
                'Найдите вероятность того, что второй карандаш оказался ' + colorSecond + '.',
            answers: probability,
        });
    }, 100);
})();
//3252902
//Открытый банк заданий 31A2A6
